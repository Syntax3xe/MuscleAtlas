// 3D muscle map. Loads three.js on demand and replaces the 2D SVG figures once
// WebGL is confirmed working; if anything fails, the SVG map stays in place.
(() => {
  const THREE_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
  const stage = document.querySelector(".figure-stage");
  if (!stage) return;

  // ---------------------------------------------------------------------------
  // Figure definition. Units are roughly metres; the figure faces +Z with feet
  // at y = 0. Paired parts are written for the figure's left side (x > 0) and
  // mirrored automatically.
  // ---------------------------------------------------------------------------
  const BODY_PARTS = [
    { name: "head", type: "ellipsoid", center: [0, 1.63, 0], radii: [0.095, 0.115, 0.105] },
    { name: "neck", type: "capsule", from: [0, 1.45, -0.005], to: [0, 1.56, 0], radius: 0.05 },
    // Torso silhouette as [half-width, y] pairs, lathed and flattened front-to-back.
    {
      name: "torso", type: "lathe", depth: 0.62, profile: [
        [0.001, 0.8], [0.1, 0.82], [0.15, 0.86], [0.168, 0.93], [0.16, 1.0], [0.14, 1.08], [0.145, 1.16],
        [0.165, 1.26], [0.178, 1.35], [0.17, 1.42], [0.13, 1.475], [0.06, 1.5], [0.001, 1.505]
      ]
    },
    { name: "shoulder", paired: true, type: "ellipsoid", center: [0.185, 1.4, 0], radii: [0.065, 0.06, 0.065] },
    { name: "upperArm", paired: true, type: "capsule", from: [0.2, 1.39, 0], to: [0.25, 1.12, -0.01], radius: 0.048 },
    { name: "forearm", paired: true, type: "capsule", from: [0.25, 1.12, -0.01], to: [0.29, 0.87, 0.03], radius: 0.04 },
    { name: "hand", paired: true, type: "ellipsoid", center: [0.3, 0.8, 0.035], radii: [0.03, 0.06, 0.02] },
    { name: "thigh", paired: true, type: "capsule", from: [0.095, 0.93, 0], to: [0.105, 0.52, 0.01], radius: 0.072 },
    { name: "shin", paired: true, type: "capsule", from: [0.105, 0.52, 0.01], to: [0.105, 0.09, -0.01], radius: 0.05 },
    { name: "foot", paired: true, type: "ellipsoid", center: [0.105, 0.035, 0.045], radii: [0.045, 0.03, 0.1] }
  ];

  // Each muscle piece is projected onto a body part from a horizontal angle
  // (0 = front, 90 = outer side, 180 = back, -90 = inner side) at height y.
  // size = ellipsoid radii [width, length, thickness]; tilt rotates it on the surface.
  const MUSCLE_PIECES = [
    { id: "sternocleidomastoid", part: "neck", y: 1.5, angle: 35, size: [0.013, 0.055, 0.012], tilt: -28 },
    { id: "trapezius", part: "torso", y: 1.43, angle: 180, dx: 0.075, size: [0.085, 0.045, 0.014], tilt: 22 },
    { id: "trapezius", part: "torso", y: 1.3, angle: 180, mirror: false, size: [0.035, 0.15, 0.016] },
    { id: "supraspinatus", part: "torso", y: 1.42, angle: 180, dx: 0.1, size: [0.04, 0.016, 0.02], tilt: 12 },
    { id: "rhomboids", part: "torso", y: 1.33, angle: 180, dx: 0.065, size: [0.03, 0.05, 0.018], tilt: -18 },
    { id: "infraspinatus", part: "torso", y: 1.32, angle: 180, dx: 0.13, size: [0.04, 0.045, 0.017] },
    { id: "teres-minor", part: "torso", y: 1.255, angle: 180, dx: 0.155, size: [0.024, 0.016, 0.016], tilt: 30 },
    { id: "teres-major", part: "torso", y: 1.215, angle: 180, dx: 0.14, size: [0.032, 0.018, 0.017], tilt: 30 },
    { id: "latissimus", part: "torso", y: 1.14, angle: 180, dx: 0.095, size: [0.065, 0.13, 0.016], tilt: -14 },
    { id: "lower-back", part: "torso", y: 1.03, angle: 180, dx: 0.032, size: [0.024, 0.12, 0.02] },
    { id: "gluteus-medius", part: "torso", y: 0.99, angle: 135, size: [0.055, 0.035, 0.02], tilt: 10 },
    { id: "glutes", part: "torso", y: 0.885, angle: 180, dx: 0.08, size: [0.075, 0.075, 0.036] },

    { id: "pectorals", part: "torso", y: 1.33, angle: 0, dx: 0.08, size: [0.085, 0.065, 0.03], tilt: 10 },
    { id: "serratus-anterior", part: "torso", y: 1.2, angle: 62, size: [0.03, 0.05, 0.014], tilt: -10 },
    { id: "abdominals", part: "torso", y: 1.08, angle: 0, dx: 0.034, size: [0.032, 0.13, 0.018] },
    { id: "obliques", part: "torso", y: 1.07, angle: 52, size: [0.042, 0.1, 0.016], tilt: 10 },
    { id: "iliopsoas", part: "torso", y: 0.9, angle: 0, dx: 0.06, size: [0.024, 0.05, 0.016], tilt: -20 },
    { id: "tensor-fasciae-latae", part: "torso", y: 0.89, angle: 80, size: [0.024, 0.045, 0.017] },

    { id: "deltoids", part: "shoulder", y: 1.4, angle: 45, size: [0.055, 0.07, 0.03] },
    { id: "rear-deltoids", part: "shoulder", y: 1.4, angle: 140, size: [0.045, 0.065, 0.028] },
    { id: "biceps", part: "upperArm", y: 1.26, angle: 0, size: [0.03, 0.09, 0.022] },
    { id: "brachialis", part: "upperArm", y: 1.17, angle: 55, size: [0.02, 0.045, 0.016] },
    { id: "triceps", part: "upperArm", y: 1.27, angle: 180, size: [0.035, 0.1, 0.022] },
    { id: "pronator-teres", part: "forearm", y: 1.07, angle: -15, size: [0.012, 0.04, 0.014], tilt: -30 },
    { id: "brachioradialis", part: "forearm", y: 1.03, angle: 65, size: [0.016, 0.07, 0.015] },
    { id: "wrist-flexors", part: "forearm", y: 0.97, angle: -5, size: [0.022, 0.08, 0.014] },
    { id: "forearm-extensors", part: "forearm", y: 1.0, angle: 180, size: [0.026, 0.09, 0.016] },

    { id: "rectus-femoris", part: "thigh", y: 0.71, angle: 5, size: [0.03, 0.15, 0.02] },
    { id: "vastus-lateralis", part: "thigh", y: 0.69, angle: 75, size: [0.032, 0.15, 0.02] },
    { id: "vastus-medialis", part: "thigh", y: 0.6, angle: -45, size: [0.03, 0.07, 0.022] },
    { id: "sartorius", part: "thigh", y: 0.72, angle: -20, size: [0.012, 0.2, 0.013], tilt: -22 },
    { id: "adductors", part: "thigh", y: 0.8, angle: -90, size: [0.035, 0.1, 0.02] },
    { id: "biceps-femoris", part: "thigh", y: 0.7, angle: 155, size: [0.028, 0.14, 0.02] },
    { id: "semitendinosus", part: "thigh", y: 0.7, angle: -155, size: [0.026, 0.14, 0.02] },

    { id: "gastrocnemius", part: "shin", y: 0.4, angle: 155, size: [0.026, 0.085, 0.026] },
    { id: "gastrocnemius", part: "shin", y: 0.4, angle: -155, size: [0.026, 0.085, 0.026] },
    { id: "soleus", part: "shin", y: 0.27, angle: 180, size: [0.04, 0.07, 0.02] },
    { id: "achilles-tendon", part: "shin", y: 0.14, angle: 180, size: [0.012, 0.06, 0.014], tendon: true },
    { id: "tibialis", part: "shin", y: 0.35, angle: 25, size: [0.02, 0.12, 0.016] },
    { id: "peroneals", part: "shin", y: 0.32, angle: 95, size: [0.016, 0.11, 0.014] }
  ];

  // Atlas entries that describe a group of the pieces above.
  const GROUPS = {
    quadriceps: ["rectus-femoris", "vastus-lateralis", "vastus-medialis"],
    hamstrings: ["biceps-femoris", "semitendinosus"],
    calves: ["gastrocnemius", "soleus"],
    forearms: ["wrist-flexors", "pronator-teres", "brachioradialis"],
    "hip-flexors": ["iliopsoas", "rectus-femoris", "sartorius", "tensor-fasciae-latae"]
  };

  const MIN_ZOOM = 0.75;
  const BASE_DISTANCE = 3.4;
  const BODY_CENTER_Y = 0.86;

  async function init() {
    let THREE;
    try {
      THREE = await import(THREE_URL);
    } catch (error) {
      console.warn("3D map unavailable; using the 2D map instead.", error);
      return;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
      console.warn("WebGL unavailable; using the 2D map instead.", error);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const canvas = renderer.domElement;
    canvas.className = "body-3d";
    canvas.tabIndex = 0;
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "3D muscle map. Drag or use arrow keys to rotate; select muscles from the list or by clicking them.");

    const tooltip = document.createElement("div");
    tooltip.className = "map-tooltip";
    tooltip.hidden = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 20);

    scene.add(new THREE.HemisphereLight(0xfff7ee, 0x6b5a50, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(1.5, 2.5, 2.5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffe2d0, 0.9);
    rim.position.set(-2, 1.5, -2.5);
    scene.add(rim);

    // --- materials -----------------------------------------------------------
    const colors = {
      skinLight: new THREE.Color("#ead8c6"),
      skinDark: new THREE.Color("#6b5d52"),
      muscleLight: new THREE.Color("#cf9a84"),
      muscleDark: new THREE.Color("#8e6152"),
      hover: new THREE.Color("#e0906c"),
      selected: new THREE.Color("#c2361c"),
      tendon: new THREE.Color("#e3c7a6")
    };
    colors.muscle = colors.muscleLight.clone();
    const skinMaterial = new THREE.MeshStandardMaterial({ color: colors.skinLight, roughness: 0.85, metalness: 0 });

    // --- body ----------------------------------------------------------------
    const figure = new THREE.Group();
    scene.add(figure);
    const parts = new Map();
    const up = new THREE.Vector3(0, 1, 0);

    function mirrorPoint(point, side) {
      return new THREE.Vector3(point[0] * side, point[1], point[2]);
    }

    function addPart(def, side) {
      const key = def.paired ? `${def.name}:${side}` : def.name;
      let mesh;
      let axisFrom;
      let axisTo;
      if (def.type === "lathe") {
        const curve = new THREE.CatmullRomCurve3(def.profile.map(([radius, y]) => new THREE.Vector3(radius, y, 0)));
        const points = curve.getPoints(80).map((point) => new THREE.Vector2(Math.max(point.x, 0.001), point.y));
        const geometry = new THREE.LatheGeometry(points, 64);
        geometry.scale(1, 1, def.depth);
        geometry.computeVertexNormals();
        mesh = new THREE.Mesh(geometry, skinMaterial);
        axisFrom = new THREE.Vector3(0, def.profile[def.profile.length - 1][1], 0);
        axisTo = new THREE.Vector3(0, def.profile[0][1], 0);
      } else if (def.type === "ellipsoid") {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), skinMaterial);
        mesh.position.copy(mirrorPoint(def.center, side));
        mesh.scale.set(...def.radii);
        axisFrom = mesh.position.clone().add(new THREE.Vector3(0, def.radii[1], 0));
        axisTo = mesh.position.clone().add(new THREE.Vector3(0, -def.radii[1], 0));
      } else {
        axisFrom = mirrorPoint(def.from, side);
        axisTo = mirrorPoint(def.to, side);
        const direction = axisTo.clone().sub(axisFrom);
        mesh = new THREE.Mesh(new THREE.CapsuleGeometry(def.radius, direction.length(), 10, 28), skinMaterial);
        mesh.position.copy(axisFrom).add(axisTo).multiplyScalar(0.5);
        mesh.quaternion.setFromUnitVectors(up, direction.normalize());
      }
      mesh.userData.isBody = true;
      figure.add(mesh);
      parts.set(key, { mesh, axisFrom, axisTo });
    }

    BODY_PARTS.forEach((def) => {
      if (def.paired) {
        addPart(def, 1);
        addPart(def, -1);
      } else {
        addPart(def, 1);
      }
    });
    figure.updateMatrixWorld(true);

    // --- muscles -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const meshesById = new Map();
    const muscleMeshes = [];
    const muscleGeometry = new THREE.SphereGeometry(1, 32, 22);

    function axisPointAt(part, y) {
      const { axisFrom, axisTo } = part;
      const span = axisTo.y - axisFrom.y;
      const t = Math.abs(span) < 1e-6 ? 0.5 : THREE.MathUtils.clamp((y - axisFrom.y) / span, 0, 1);
      return axisFrom.clone().lerp(axisTo, t);
    }

    function addMusclePiece(piece, side) {
      const part = parts.get(parts.has(`${piece.part}:${side}`) ? `${piece.part}:${side}` : piece.part);
      if (!part) throw new Error(`Unknown body part: ${piece.part}`);

      // A tiny offset keeps rays off mesh seams, where exact hits can slip between triangles.
      const angle = (THREE.MathUtils.degToRad(piece.angle) + 0.003) * side;
      const outward = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
      const origin = axisPointAt(part, piece.y);
      origin.x += (piece.dx || 0) * side;
      origin.addScaledVector(outward, 2);
      raycaster.set(origin, outward.clone().negate());
      const hit = raycaster.intersectObject(part.mesh, false)[0];
      if (!hit) {
        console.warn(`Could not place ${piece.id} on ${piece.part}`);
        return;
      }

      const normal = hit.face.normal.clone().transformDirection(part.mesh.matrixWorld).normalize();
      const along = part.axisFrom.clone().sub(part.axisTo).normalize();
      const yAxis = along.addScaledVector(normal, -along.dot(normal)).normalize();
      const xAxis = new THREE.Vector3().crossVectors(yAxis, normal).normalize();
      const basis = new THREE.Matrix4().makeBasis(xAxis, yAxis, normal);
      const tilt = new THREE.Quaternion().setFromAxisAngle(normal, THREE.MathUtils.degToRad(piece.tilt || 0) * side);

      const material = new THREE.MeshStandardMaterial({
        color: piece.tendon ? colors.tendon : colors.muscle,
        roughness: piece.tendon ? 0.55 : 0.62,
        metalness: 0,
        emissive: new THREE.Color(0x000000)
      });
      const mesh = new THREE.Mesh(muscleGeometry, material);
      mesh.quaternion.setFromRotationMatrix(basis).premultiply(tilt);
      mesh.scale.set(...piece.size);
      mesh.position.copy(hit.point).addScaledVector(normal, -piece.size[2] * 0.5);
      mesh.userData = { id: piece.id, tendon: Boolean(piece.tendon), normal };
      figure.add(mesh);
      muscleMeshes.push(mesh);
      if (!meshesById.has(piece.id)) meshesById.set(piece.id, []);
      meshesById.get(piece.id).push(mesh);
    }

    MUSCLE_PIECES.forEach((piece) => {
      addMusclePiece(piece, 1);
      if (piece.mirror !== false) addMusclePiece(piece, -1);
    });

    function meshesFor(id) {
      return (GROUPS[id] || [id]).flatMap((memberId) => meshesById.get(memberId) || []);
    }

    // --- camera control ------------------------------------------------------
    const view = { yaw: 0, pitch: 0.08, targetY: BODY_CENTER_Y };
    const goal = { yaw: 0, pitch: 0.08, targetY: BODY_CENTER_Y, distance: BASE_DISTANCE };
    let distance = BASE_DISTANCE;
    let needsRender = true;

    function zoomToDistance(zoom) {
      return BASE_DISTANCE / Math.max(zoom, MIN_ZOOM);
    }

    function focusYFor(id) {
      const meshes = meshesFor(id);
      if (!meshes.length) return BODY_CENTER_Y;
      return meshes.reduce((sum, mesh) => sum + mesh.position.y, 0) / meshes.length;
    }

    function updateGoalTarget() {
      const zoom = BASE_DISTANCE / goal.distance;
      const blend = THREE.MathUtils.clamp((zoom - 1) / 1.25, 0, 1);
      goal.targetY = THREE.MathUtils.lerp(BODY_CENTER_Y, focusYFor(selectedMuscleId), blend);
    }

    function nearestYaw(targetYaw) {
      const turn = Math.PI * 2;
      return targetYaw + Math.round((goal.yaw - targetYaw) / turn) * turn;
    }

    function faceMuscle(id) {
      const meshes = meshesFor(id);
      if (!meshes.length) return;
      const normal = meshes.reduce((sum, mesh) => sum.add(mesh.userData.normal), new THREE.Vector3());
      if (normal.lengthSq() < 1e-6) return;
      goal.yaw = nearestYaw(Math.atan2(normal.x, normal.z));
      goal.pitch = 0.08;
    }

    function syncViewButtons() {
      const facing = Math.cos(goal.yaw) >= 0 ? "front" : "back";
      document.querySelectorAll(".view-button").forEach((button) => {
        const active = button.dataset.view === facing;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    }

    // --- highlight state -----------------------------------------------------
    let selectedMuscleId = typeof selectedId === "string" ? selectedId : null;
    let hoveredId = null;

    function paint() {
      const selected = new Set(selectedMuscleId ? meshesFor(selectedMuscleId) : []);
      const hovered = new Set(hoveredId ? meshesFor(hoveredId) : []);
      muscleMeshes.forEach((mesh) => {
        const base = mesh.userData.tendon ? colors.tendon : colors.muscle;
        const isSelected = selected.has(mesh);
        mesh.material.color.copy(isSelected ? colors.selected : hovered.has(mesh) ? colors.hover : base);
        mesh.material.emissive.set(isSelected ? 0x4a1206 : 0x000000);
      });
      needsRender = true;
    }

    function applyTheme() {
      const dark = document.documentElement.dataset.theme === "dark";
      skinMaterial.color.copy(dark ? colors.skinDark : colors.skinLight);
      colors.muscle.copy(dark ? colors.muscleDark : colors.muscleLight);
      paint();
    }

    // --- interaction ---------------------------------------------------------
    const pointer = new THREE.Vector2();
    let drag = null;
    let selectingFrom3D = false;

    function pickAt(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(figure.children, false)[0];
      return hit && hit.object.userData.id ? hit.object.userData.id : null;
    }

    function nameFor(id) {
      const muscle = typeof muscles !== "undefined" ? muscles.find((item) => item.id === id) : null;
      return muscle ? muscle.name : id;
    }

    function setHover(id, clientX, clientY) {
      if (id !== hoveredId) {
        hoveredId = id;
        paint();
      }
      canvas.style.cursor = drag && drag.moved ? "grabbing" : id ? "pointer" : "grab";
      if (!id) {
        tooltip.hidden = true;
        return;
      }
      const rect = stage.getBoundingClientRect();
      tooltip.textContent = nameFor(id);
      tooltip.style.left = `${clientX - rect.left}px`;
      tooltip.style.top = `${clientY - rect.top}px`;
      tooltip.hidden = false;
    }

    canvas.addEventListener("pointerdown", (event) => {
      drag = { x: event.clientX, y: event.clientY, yaw: goal.yaw, pitch: goal.pitch, moved: false };
      canvas.setPointerCapture(event.pointerId);
    });

    canvas.addEventListener("pointermove", (event) => {
      if (drag) {
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) > 4) drag.moved = true;
        if (drag.moved) {
          goal.yaw = drag.yaw - dx * 0.01;
          goal.pitch = THREE.MathUtils.clamp(drag.pitch + dy * 0.006, -0.6, 0.8);
          view.yaw = goal.yaw;
          view.pitch = goal.pitch;
          syncViewButtons();
          tooltip.hidden = true;
          needsRender = true;
          return;
        }
      }
      setHover(pickAt(event.clientX, event.clientY), event.clientX, event.clientY);
    });

    canvas.addEventListener("pointerup", (event) => {
      const wasClick = drag && !drag.moved;
      drag = null;
      if (!wasClick) return;
      const id = pickAt(event.clientX, event.clientY);
      if (id && typeof selectMuscle === "function") {
        selectingFrom3D = true;
        selectMuscle(id);
        selectingFrom3D = false;
      }
    });

    // Fired when the browser takes over a vertical swipe to scroll the page.
    canvas.addEventListener("pointercancel", () => {
      drag = null;
    });

    canvas.addEventListener("pointerleave", () => {
      if (!drag) setHover(null, 0, 0);
    });

    canvas.addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 0.5 : 0.2;
      if (event.key === "ArrowLeft") goal.yaw += step;
      else if (event.key === "ArrowRight") goal.yaw -= step;
      else if (event.key === "ArrowUp") goal.pitch = Math.min(0.8, goal.pitch + 0.1);
      else if (event.key === "ArrowDown") goal.pitch = Math.max(-0.6, goal.pitch - 0.1);
      else return;
      event.preventDefault();
      syncViewButtons();
    });

    document.querySelectorAll(".view-button").forEach((button) => {
      button.addEventListener("click", () => {
        goal.yaw = nearestYaw(button.dataset.view === "back" ? Math.PI : 0);
        goal.pitch = 0.08;
        syncViewButtons();
      });
    });

    document.addEventListener("atlas:select", (event) => {
      selectedMuscleId = event.detail.id;
      if (!selectingFrom3D) faceMuscle(selectedMuscleId);
      updateGoalTarget();
      syncViewButtons();
      paint();
    });

    document.addEventListener("atlas:zoom", (event) => {
      goal.distance = zoomToDistance(event.detail.zoom);
      updateGoalTarget();
    });

    new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // --- render loop ---------------------------------------------------------
    function resize() {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      needsRender = true;
    }
    new ResizeObserver(resize).observe(stage);

    function approach(current, target, rate) {
      const next = current + (target - current) * rate;
      return Math.abs(target - next) < 1e-4 ? target : next;
    }

    function frame() {
      const rate = 0.14;
      const before = view.yaw + view.pitch + view.targetY + distance;
      view.yaw = approach(view.yaw, goal.yaw, rate);
      view.pitch = approach(view.pitch, goal.pitch, rate);
      view.targetY = approach(view.targetY, goal.targetY, rate);
      distance = approach(distance, goal.distance, rate);
      if (before !== view.yaw + view.pitch + view.targetY + distance) needsRender = true;

      if (needsRender) {
        const cosPitch = Math.cos(view.pitch);
        camera.position.set(
          Math.sin(view.yaw) * cosPitch * distance,
          view.targetY + Math.sin(view.pitch) * distance,
          Math.cos(view.yaw) * cosPitch * distance
        );
        camera.lookAt(0, view.targetY, 0);
        renderer.render(scene, camera);
        needsRender = false;
      }
      requestAnimationFrame(frame);
    }

    // --- mount ---------------------------------------------------------------
    stage.append(canvas, tooltip);
    stage.classList.add("is-3d");
    document.querySelector(".map-legend > span:first-child").lastChild.textContent = " Drag to rotate · scroll to zoom · click a muscle";
    const footnote = document.querySelector(".anatomy-footnote");
    if (footnote) footnote.lastChild.textContent = " Stylized 3D model of major muscles and selected related structures; individual anatomy varies.";

    goal.distance = zoomToDistance(typeof mapZoom === "number" ? mapZoom : 1);
    distance = goal.distance;
    if (selectedMuscleId) faceMuscle(selectedMuscleId);
    view.yaw = goal.yaw;
    updateGoalTarget();
    view.targetY = goal.targetY;
    syncViewButtons();
    applyTheme();
    paint();
    resize();
    frame();
  }

  init();
})();
