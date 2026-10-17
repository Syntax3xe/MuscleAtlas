const references = {
  nhsFlexibility: {
    label: "NHS flexibility exercises",
    url: "https://www.nhs.uk/live-well/exercise/flexibility-exercises/"
  },
  cdcActivity: {
    label: "CDC adult activity guidelines",
    url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
  },
  aaosHip: {
    label: "AAOS hip conditioning program",
    url: "https://orthoinfo.org/en/recovery/hip-conditioning-program/"
  },
  aaosShoulder: {
    label: "AAOS shoulder conditioning program",
    url: "https://orthoinfo.org/en/recovery/rotator-cuff-and-shoulder-conditioning-program/"
  },
  harvardStretching: {
    label: "Harvard Health: The importance of stretching",
    url: "https://www.health.harvard.edu/healthy-aging-and-longevity/the-importance-of-stretching"
  }
};

const muscles = [
  { id: "pectorals", name: "Pectorals", region: "upper", view: "front", location: "Front of the chest", references: ["harvardStretching", "aaosShoulder"], stretches: [
    { name: "Doorway chest stretch", instructions: "Place your forearms on the doorframe around shoulder height. Step through gently, keeping your ribs relaxed.", dosage: "20–30 sec" },
    { name: "Supported chest opener", instructions: "Clasp your hands behind you or hold a towel, then gently draw your shoulders back without arching your lower back.", dosage: "5 slow breaths" }
  ], causes: ["Long periods with shoulders rounded forward", "A sudden increase in pressing or pushing exercises", "Unfamiliar lifting or carrying"] },
  { id: "deltoids", name: "Deltoids", region: "upper", view: "front", location: "Shoulder cap", references: ["aaosShoulder", "harvardStretching"], stretches: [
    { name: "Cross-body shoulder stretch", instructions: "Bring one arm across your chest. Use the other arm to guide it gently while keeping the stretching shoulder relaxed.", dosage: "20–30 sec each side" },
    { name: "Relaxed arm pendulum", instructions: "Support yourself with one hand on a table, hinge forward, and let the other arm hang. Make small, easy circles.", dosage: "8 circles each way" }
  ], causes: ["Repeated overhead reaching or lifting", "A rapid increase in shoulder training volume", "Holding tension while working at a desk"] },
  { id: "biceps", name: "Biceps", region: "upper", view: "front", location: "Front of the upper arm", references: ["harvardStretching"], stretches: [
    { name: "Wall biceps stretch", instructions: "Stand beside a wall and place your straight arm behind you at a comfortable height, palm against the wall. Turn your chest gently away.", dosage: "20 sec each side" },
    { name: "Straight-arm palm turn", instructions: "Extend your arm slightly behind your body with the elbow straight and palm facing forward. Stop at a mild stretch.", dosage: "15–20 sec each side" }
  ], causes: ["Repeated curls, pulling, or carrying", "Sudden effort with a bent elbow", "Returning to training after a break"] },
  { id: "triceps", name: "Triceps", region: "upper", view: "back", location: "Back of the upper arm", references: ["aaosShoulder", "harvardStretching"], stretches: [
    { name: "Overhead triceps stretch", instructions: "Raise one arm, bend the elbow so your hand rests behind your head, and gently guide the elbow back with your other hand.", dosage: "20–30 sec each side" },
    { name: "Supported overhead reach", instructions: "Reach one arm overhead and lean slightly away from that side, keeping your torso tall and the movement comfortable.", dosage: "5 slow breaths each side" }
  ], causes: ["Repeated pressing or overhead work", "A sudden increase in push-ups or dips", "Reaching overhead for extended periods"] },
  { id: "forearms", name: "Forearms", region: "upper", view: "front", location: "Front of the forearm", references: ["harvardStretching"], stretches: [
    { name: "Wrist extensor stretch", instructions: "Straighten one arm with the palm down. Use the other hand to gently bend the wrist so the fingers point toward the floor.", dosage: "20 sec each side" },
    { name: "Wrist flexor stretch", instructions: "Straighten one arm with the palm up. Gently draw the fingers down and back with your other hand.", dosage: "20 sec each side" }
  ], causes: ["Long periods of gripping or typing", "Repetitive wrist and hand movements", "Unfamiliar racquet, tool, or climbing activity"] },
  { id: "forearm-extensors", name: "Forearm extensors", region: "upper", view: "back", location: "Back of the forearm", references: ["harvardStretching"], stretches: [
    { name: "Wrist flexor stretch", instructions: "Straighten your arm with the palm up. Gently draw the fingers down and back until you feel a stretch along the forearm.", dosage: "20 sec each side" },
    { name: "Slow wrist circles", instructions: "Keep your forearm supported and make small, controlled circles with your wrist in both directions.", dosage: "8 circles each way" }
  ], causes: ["Repeated wrist extension or gripping", "Long sessions using a mouse or hand tools", "A sudden increase in lifting volume"] },
  { id: "sternocleidomastoid", name: "Neck flexors", region: "upper", view: "front", location: "Front and sides of the neck", references: ["nhsFlexibility"], stretches: [
    { name: "Gentle neck side stretch", instructions: "Sit tall and keep one shoulder gently lowered. Slowly tilt your head toward the opposite side; do not pull on your head.", dosage: "5 sec, repeat 3 times each side" },
    { name: "Chin tuck", instructions: "Look straight ahead and draw your chin gently backward, making a small double-chin shape without tipping your head.", dosage: "5 relaxed repetitions" }
  ], causes: ["Sustained forward-head posture", "Sleeping in an unfamiliar position", "Long periods looking down at a screen"] },
  { id: "rear-deltoids", name: "Rear deltoids", region: "upper", view: "back", location: "Back of the shoulder", references: ["aaosShoulder", "harvardStretching"], stretches: [
    { name: "Cross-body rear-shoulder stretch", instructions: "Bring one arm across your chest at shoulder height. Gently draw it closer with your other arm while keeping the shoulder down.", dosage: "20–30 sec each side" },
    { name: "Child’s pose with arm reach", instructions: "Kneel and reach both arms forward. Walk your hands slightly to one side to lengthen the opposite shoulder and upper back.", dosage: "20 sec each side" }
  ], causes: ["Repeated pulling or rowing", "A sudden increase in upper-body training", "Unfamiliar reaching behind the body"] },
  { id: "latissimus", name: "Latissimus dorsi", region: "upper", view: "back", location: "Sides of the mid-to-upper back", references: ["aaosShoulder", "harvardStretching"], stretches: [
    { name: "Child’s pose with side reach", instructions: "From hands and knees, sit your hips back and walk both hands to one side. Keep the opposite hip grounded.", dosage: "20–30 sec each side" },
    { name: "Supported overhead side bend", instructions: "Hold a stable support overhead with one hand and gently shift your hips away, keeping your ribs relaxed.", dosage: "15–20 sec each side" }
  ], causes: ["Repeated pulling or overhead activity", "A sudden increase in swimming or climbing", "Limited recovery after back training"] },
  { id: "abdominals", name: "Abdominals", region: "core", view: "front", location: "Front of the trunk", references: ["harvardStretching"], stretches: [
    { name: "Gentle standing backbend", instructions: "Stand tall, place your hands at your hips, and lean back only a small amount. Keep the movement easy and pain-free.", dosage: "5 slow repetitions" },
    { name: "Sphinx pose", instructions: "Lie on your stomach and prop yourself on your forearms. Lift your chest gently while keeping your hips relaxed on the floor.", dosage: "15–20 sec if comfortable" }
  ], causes: ["Unfamiliar core exercise or repeated sit-ups", "Coughing or strenuous effort", "Rapid increases in training volume"] },
  { id: "obliques", name: "Obliques", region: "core", view: "front", location: "Sides of the trunk", references: ["nhsFlexibility", "harvardStretching"], stretches: [
    { name: "Standing side reach", instructions: "Stand with feet hip-width apart and slide one hand down your thigh as you reach the other arm overhead. Avoid twisting.", dosage: "20 sec each side" },
    { name: "Supported seated rotation", instructions: "Sit tall with both feet grounded. Turn your chest gently to one side, using your hand on the chair for light support.", dosage: "15 sec each side" }
  ], causes: ["Repeated twisting or side-bending", "Unfamiliar rotational exercise", "Sudden reaching or lifting from one side"] },
  { id: "lower-back", name: "Spinal extensors", region: "core", view: "back", location: "Along the lower spine", references: ["nhsFlexibility", "harvardStretching"], stretches: [
    { name: "Single knee-to-chest", instructions: "Lie on your back and bring one knee toward your chest, holding behind the thigh. Keep the other leg relaxed.", dosage: "15–20 sec each side" },
    { name: "Cat-cow", instructions: "On hands and knees, slowly round your back, then gently let your belly lower as you lift your chest. Move within a comfortable range.", dosage: "6 slow cycles" }
  ], causes: ["Prolonged sitting or a sudden activity change", "Lifting with more load than usual", "Repeated bending or twisting"] },
  { id: "hip-flexors", name: "Hip flexors", region: "lower", view: "front", location: "Front of the hip and upper thigh", references: ["aaosHip", "harvardStretching"], stretches: [
    { name: "Half-kneeling hip-flexor stretch", instructions: "Kneel on one knee with the other foot forward. Gently tuck your pelvis and shift forward until the front of the back hip stretches.", dosage: "20–30 sec each side" },
    { name: "Standing hip extension", instructions: "Stand tall while holding a support. Move one straight leg a short distance behind you without arching your lower back.", dosage: "8 easy repetitions each side" }
  ], causes: ["Extended sitting followed by vigorous activity", "Repeated sprinting, kicking, or stair climbing", "A sudden increase in running volume"] },
  { id: "glutes", name: "Gluteals", region: "lower", view: "back", location: "Back of the hip", references: ["aaosHip"], stretches: [
    { name: "Figure-four stretch", instructions: "Lie on your back, cross one ankle over the opposite thigh, and draw the uncrossed leg toward you until your buttock stretches.", dosage: "20–30 sec each side" },
    { name: "Knee-to-opposite-shoulder", instructions: "Lie on your back and gently guide one bent knee toward the opposite shoulder, keeping your hips on the floor.", dosage: "15–20 sec each side" }
  ], causes: ["Unfamiliar hill running or squats", "Long periods sitting", "A sudden increase in walking or training"] },
  { id: "quadriceps", name: "Quadriceps", region: "lower", view: "front", location: "Front of the thigh", references: ["harvardStretching"], stretches: [
    { name: "Standing quad stretch", instructions: "Stand near a support, bend one knee, and hold your ankle. Bring your heel toward your buttock without arching your back.", dosage: "20–30 sec each side" },
    { name: "Side-lying quad stretch", instructions: "Lie on your side, bend the top knee, and gently bring the heel toward your buttock while keeping your knees close.", dosage: "20–30 sec each side" }
  ], causes: ["Downhill running or repeated stairs", "A new or heavier squat routine", "Sudden increases in running distance"] },
  { id: "adductors", name: "Adductors", region: "lower", view: "front", location: "Inner thigh", references: ["aaosHip"], stretches: [
    { name: "Seated butterfly stretch", instructions: "Sit tall with the soles of your feet together. Let your knees relax outward; do not press them down.", dosage: "20–30 sec" },
    { name: "Side-lunge shift", instructions: "Stand with a wide stance and bend one knee while keeping the other leg long. Shift only until the inner thigh feels a mild stretch.", dosage: "5 gentle repetitions each side" }
  ], causes: ["Unfamiliar lateral movement or quick direction changes", "Sudden increases in kicking or sprinting", "A new wide-stance exercise"] },
  { id: "hamstrings", name: "Hamstrings", region: "lower", view: "back", location: "Back of the thigh", references: ["aaosHip", "harvardStretching"], stretches: [
    { name: "Supine strap hamstring stretch", instructions: "Lie on your back, loop a towel behind one thigh or foot, and raise the leg until you feel a gentle stretch. Keep the knee slightly soft.", dosage: "20–30 sec each side" },
    { name: "Seated hip hinge", instructions: "Sit near the front of a chair with one leg extended and heel down. Keep your back long and hinge forward slightly from your hips.", dosage: "5 slow repetitions each side" }
  ], causes: ["Sudden sprinting or acceleration", "A rapid increase in running distance", "Long periods sitting followed by intense activity"] },
  { id: "tibialis", name: "Tibialis anterior", region: "lower", view: "front", location: "Front of the shin", references: ["harvardStretching"], stretches: [
    { name: "Kneeling shin stretch", instructions: "Kneel with the tops of your feet on the floor and sit back only as far as comfortable. Skip this if it bothers your knees or ankles.", dosage: "15 sec if comfortable" },
    { name: "Ankle point-and-flex", instructions: "Sit with your leg supported and slowly point your toes away, then draw them back toward your shin.", dosage: "8 slow repetitions" }
  ], causes: ["Sudden increases in running or walking", "A change in surface, shoes, or training routine", "Repeated uphill walking"] },
  { id: "calves", name: "Calves", region: "lower", view: "back", location: "Back of the lower leg", references: ["nhsFlexibility"], stretches: [
    { name: "Straight-knee wall calf stretch", instructions: "Face a wall, step one leg back, keep that knee straight and heel down, and bend the front knee toward the wall.", dosage: "20–30 sec each side" },
    { name: "Bent-knee wall calf stretch", instructions: "Use the same wall stance, then slightly bend the back knee while keeping its heel on the floor.", dosage: "20–30 sec each side" }
  ], causes: ["A sudden increase in running, jumping, or hills", "Standing for long periods", "A change in footwear or training surface"] },
  { id: "trapezius", name: "Trapezius", region: "upper", view: "back", location: "Upper back and base of the neck", references: ["nhsFlexibility", "aaosShoulder"], stretches: [
    { name: "Gentle upper-trapezius stretch", instructions: "Sit tall and lower one shoulder. Tilt your head to the opposite side without pulling on it or rotating your neck.", dosage: "5 sec, repeat 3 times each side" },
    { name: "Shoulder rolls", instructions: "Let your arms relax and slowly roll your shoulders up, back, and down without forcing the range.", dosage: "8 slow repetitions" }
  ], causes: ["Sustained shoulder tension or desk posture", "Carrying a heavy bag on one side", "Repeated overhead work"] },
  { id: "serratus-anterior", name: "Serratus anterior", region: "upper", view: "front", location: "Along the sides of the rib cage beneath the armpits", references: ["aaosShoulder", "harvardStretching"], stretches: [
    { name: "Child’s-pose side reach", instructions: "From hands and knees, sit your hips back and reach both arms forward. Walk your hands to one side without rotating your chest.", dosage: "20 sec each side" },
    { name: "Wall slide with reach", instructions: "Face a wall with your forearms supported. Slide your arms up, then gently reach your chest away from the wall without shrugging.", dosage: "6 slow repetitions" }
  ], causes: ["Repeated pushing or punching", "A sudden increase in overhead activity", "Prolonged reaching or carrying"] },
  { id: "brachialis", name: "Brachialis", region: "upper", view: "front", location: "Deep in the front of the upper arm near the elbow", references: ["harvardStretching"], stretches: [
    { name: "Straight-elbow arm stretch", instructions: "Straighten one elbow with the palm facing forward. Use your other hand to gently extend the wrist until the front of the arm feels mild tension.", dosage: "15–20 sec each side" },
    { name: "Easy elbow extension", instructions: "Let your arm rest by your side and slowly straighten the elbow without locking it. Keep your shoulder relaxed.", dosage: "8 slow repetitions each side" }
  ], causes: ["Repeated elbow bending or heavy carrying", "A rapid increase in curls or pulling exercises", "Returning to upper-body training after a break"] },
  { id: "brachioradialis", name: "Brachioradialis", region: "upper", view: "front", location: "Thumb-side of the upper forearm", references: ["harvardStretching"], stretches: [
    { name: "Thumb-side forearm stretch", instructions: "Extend your arm with the thumb pointing down. Gently bend the wrist toward the little-finger side until you feel a light stretch.", dosage: "15–20 sec each side" },
    { name: "Gentle forearm rotation", instructions: "Keep your elbow tucked at your side and slowly turn your palm up and down through a comfortable range.", dosage: "8 repetitions each side" }
  ], causes: ["Repeated gripping with the thumb up", "Repetitive lifting or tool use", "A sudden increase in pulling exercises"] },
  { id: "vastus-lateralis", name: "Vastus lateralis", region: "lower", view: "front", location: "Outer portion of the front thigh", references: ["harvardStretching"], stretches: [
    { name: "Side-lying quadriceps stretch", instructions: "Lie on your side, bend the top knee, and gently bring your heel toward your buttock. Keep the knees close and hips steady.", dosage: "20–30 sec each side" },
    { name: "Standing quadriceps stretch", instructions: "Hold a support, bend one knee, and bring the heel toward your buttock without arching your lower back.", dosage: "20–30 sec each side" }
  ], causes: ["Downhill running or repeated stairs", "A new or heavier squat routine", "Sudden increases in running distance"] },
  { id: "sartorius", name: "Sartorius", region: "lower", view: "front", location: "Runs diagonally across the front of the thigh", references: ["aaosHip", "harvardStretching"], stretches: [
    { name: "Half-kneeling hip-flexor stretch", instructions: "Kneel on one knee, tuck your pelvis, and shift forward slightly. Keep the stretching-side thigh gently behind and close to the midline.", dosage: "20 sec each side" },
    { name: "Supported standing thigh stretch", instructions: "Hold a stable support, bend one knee, and bring the heel gently toward your buttock with the thighs close together.", dosage: "20 sec each side" }
  ], causes: ["Repeated sprinting, kicking, or climbing", "Sudden increases in running or training", "Unfamiliar hip and knee movements"] },
  { id: "tensor-fasciae-latae", name: "Tensor fasciae latae", region: "lower", view: "front", location: "Outer front of the hip", references: ["aaosHip"], stretches: [
    { name: "Standing outer-hip stretch", instructions: "Stand beside a wall for support. Cross the leg nearest the wall behind the other and gently lean your hip toward the wall.", dosage: "20–30 sec each side" },
    { name: "Half-kneeling hip-flexor stretch", instructions: "Kneel on one knee, gently tuck your pelvis, and shift forward while keeping your torso tall.", dosage: "20 sec each side" }
  ], causes: ["Sudden increases in running or cycling", "Repeated hip flexion or uphill activity", "Prolonged sitting followed by vigorous exercise"] },
  { id: "peroneals", name: "Fibularis (peroneal) muscles", region: "lower", view: "front", location: "Outer side of the lower leg", references: ["harvardStretching"], stretches: [
    { name: "Gentle outer-ankle stretch", instructions: "Sit with your leg relaxed and slowly point the foot slightly down and inward, using your hand only for light guidance.", dosage: "15 sec each side" },
    { name: "Ankle circles", instructions: "Lift one foot and draw small, controlled circles with your toes in both directions.", dosage: "8 circles each way" }
  ], causes: ["A sudden change in walking or running volume", "Uneven surfaces or unfamiliar footwear", "Repeated ankle-turning activity"] },
  { id: "infraspinatus", name: "Infraspinatus", region: "upper", view: "back", location: "Back of the shoulder blade", references: ["aaosShoulder"], stretches: [
    { name: "Gentle cross-body shoulder stretch", instructions: "Bring one arm across your chest and guide it gently closer with the other arm. Keep your shoulder down and stop if the joint pinches.", dosage: "15–20 sec each side" },
    { name: "Supported shoulder rotation", instructions: "Keep your elbow bent and close to your side. Slowly turn your forearm across your body, then return to neutral.", dosage: "8 easy repetitions each side" }
  ], causes: ["Repeated throwing or overhead work", "A rapid increase in shoulder training", "Long periods with the shoulder held forward"] },
  { id: "rhomboids", name: "Rhomboids", region: "upper", view: "back", location: "Between the shoulder blades", references: ["aaosShoulder", "harvardStretching"], stretches: [
    { name: "Self-hug upper-back stretch", instructions: "Wrap your arms around your chest and gently reach your elbows forward to widen the space between your shoulder blades.", dosage: "20 sec" },
    { name: "Child’s pose reach", instructions: "Kneel and reach both arms forward, letting your chest settle gently toward the floor without forcing the shoulders.", dosage: "20–30 sec" }
  ], causes: ["Prolonged slouched posture", "Repeated pulling or rowing", "A sudden increase in carrying or upper-back exercise"] },
  { id: "teres-major", name: "Teres major", region: "upper", view: "back", location: "Back of the armpit, below the shoulder blade", references: ["aaosShoulder"], stretches: [
    { name: "Supported overhead side reach", instructions: "Hold a stable support overhead, sit your hips back, and gently lean away while keeping your ribs relaxed.", dosage: "15–20 sec each side" },
    { name: "Child’s-pose side reach", instructions: "From hands and knees, sit your hips back and walk your hands diagonally to the opposite side.", dosage: "20 sec each side" }
  ], causes: ["Repeated pulling or overhead activity", "A sudden increase in swimming or climbing", "Unfamiliar reaching behind the body"] },
  { id: "gluteus-medius", name: "Gluteus medius", region: "lower", view: "back", location: "Upper outer portion of the buttock", references: ["aaosHip"], stretches: [
    { name: "Supine figure-four stretch", instructions: "Lie on your back, cross one ankle over the opposite thigh, and draw the uncrossed leg toward your chest.", dosage: "20–30 sec each side" },
    { name: "Standing outer-hip stretch", instructions: "Hold a wall for support, cross one leg behind the other, and gently shift your hip toward the crossed-leg side.", dosage: "20 sec each side" }
  ], causes: ["Unfamiliar hill running or side-stepping", "A sudden increase in walking or training", "Long periods sitting followed by activity"] },
  { id: "soleus", name: "Soleus", region: "lower", view: "back", location: "Deep calf muscle beneath the gastrocnemius", references: ["nhsFlexibility", "aaosHip"], stretches: [
    { name: "Bent-knee wall calf stretch", instructions: "Face a wall, step one leg back, and bend both knees while keeping the back heel grounded. Lean forward gently.", dosage: "20–30 sec each side" },
    { name: "Seated bent-knee calf stretch", instructions: "Sit with one knee bent and loop a towel around the ball of your foot. Gently draw your toes toward your shin.", dosage: "20 sec each side" }
  ], causes: ["A sudden increase in running, jumping, or hills", "Prolonged standing", "Repeated bent-knee or push-off activity"] },
  { id: "achilles-tendon", name: "Achilles tendon", region: "lower", view: "back", location: "Tendon connecting the calf muscles to the heel", references: ["nhsFlexibility", "harvardStretching"], stretches: [
    { name: "Gentle straight-knee calf stretch", instructions: "Only if comfortable: face a wall, step one leg back, keep its heel down and knee straight, then lean forward gently. Stop if this causes Achilles pain.", dosage: "15–20 sec, easy range" },
    { name: "Gentle bent-knee calf stretch", instructions: "Only if comfortable: use a supported wall stance, slightly bend the back knee, and keep its heel grounded. Do not stretch into tendon pain.", dosage: "15–20 sec, easy range" }
  ], causes: ["A sudden increase in running, jumping, or hill work", "Repeated push-off activity or prolonged standing", "A rapid change in footwear or training volume"] }
];

const activities = [
  {
    id: "running",
    title: "Running",
    kicker: "01 / REPEATED IMPACT",
    description: "Each stride cycles through landing, single-leg support, and push-off. The work is shared across the lower body and trunk; hills, pace, surface, and stride all change the demands.",
    movement: "Expect repeated calf-and-foot loading, hip and knee control on one leg, and arm swing to help balance.",
    muscles: ["glutes", "gluteus-medius", "quadriceps", "hamstrings", "calves", "soleus", "tibialis", "hip-flexors", "achilles-tendon"],
    notes: [
      "Begin with a few minutes of easy walking or jogging and build pace gradually.",
      "Increase duration, speed, and hills progressively rather than changing everything at once.",
      "After warming up, use comfortable calf, hamstring, quadriceps, or hip-flexor stretches if they feel useful; stop if pain increases."
    ],
    references: ["cdcActivity", "nhsFlexibility", "harvardStretching"]
  },
  {
    id: "biking",
    title: "Biking",
    kicker: "02 / REPETITIVE PEDALING",
    description: "Pedaling repeats hip and knee motion while the saddle and handlebars shape how long you hold one posture. Indoor cycling, road riding, climbing, and bike fit can shift the load.",
    movement: "Legs provide most of the repeated pedal work; the trunk, shoulders, arms, and hands help support and steer you.",
    muscles: ["quadriceps", "hamstrings", "glutes", "hip-flexors", "calves", "soleus", "lower-back", "abdominals", "trapezius", "forearms"],
    notes: [
      "Start with an easy spin before harder efforts and let cadence or resistance build gradually.",
      "Vary posture and take breaks on longer rides; persistent discomfort can be a reason to review bike fit.",
      "After riding, try comfortable hip, thigh, calf, or chest mobility rather than forcing a deep stretch."
    ],
    references: ["cdcActivity", "nhsFlexibility", "harvardStretching"]
  },
  {
    id: "swimming",
    title: "Swimming",
    kicker: "03 / REPEATED REACH & ROTATION",
    description: "Stroke choice changes the pattern: freestyle and backstroke repeat overhead reaching and pulling, while breaststroke and butterfly use different leg and trunk actions. Technique and distance matter.",
    movement: "Shoulders and upper back guide the pull; the trunk helps rotate and transfer force, and legs contribute kick and body position.",
    muscles: ["latissimus", "pectorals", "deltoids", "rear-deltoids", "triceps", "biceps", "serratus-anterior", "infraspinatus", "abdominals", "obliques", "glutes", "calves"],
    notes: [
      "Ease into the session with relaxed swimming and controlled shoulder movement before increasing effort.",
      "Build distance or intensity gradually, especially when returning to the pool or adding a new stroke.",
      "Use gentle shoulder, chest, and upper-back mobility within a pain-free range; do not force an overhead position."
    ],
    references: ["cdcActivity", "aaosShoulder", "harvardStretching"]
  },
  {
    id: "lifting",
    title: "Lifting",
    kicker: "04 / LOAD & CONTROL",
    description: "Lifting is not one movement: squats, hinges, presses, pulls, and carries place different demands on different muscle groups. Choose the atlas areas that match the exercises you do.",
    movement: "Leg and hip muscles, trunk bracing, back, chest, shoulders, and arms contribute in different combinations depending on the lift and technique.",
    muscles: ["glutes", "quadriceps", "hamstrings", "adductors", "lower-back", "abdominals", "latissimus", "pectorals", "deltoids", "triceps", "biceps", "forearms"],
    notes: [
      "Warm up with easy movement and lighter, controlled versions of the exercises you plan to do.",
      "Use a load and range you can control, and increase training demands progressively.",
      "Include the muscle groups your program trains; targeted flexibility work can be added after warming up when comfortable."
    ],
    references: ["cdcActivity", "aaosHip", "aaosShoulder", "harvardStretching"]
  }
];

const list = document.querySelector("#muscleList");
const searchInput = document.querySelector("#muscleSearch");
const regionFilter = document.querySelector("#regionFilter");
const resultCount = document.querySelector("#resultCount");
const emptySearch = document.querySelector("#emptySearch");
const frontMap = document.querySelector("#frontMap");
const backMap = document.querySelector("#backMap");
let selectedId = "pectorals";

function selectMuscle(id) {
  const muscle = muscles.find((item) => item.id === id);
  if (!muscle) return;
  selectedId = id;
  document.querySelector("#detailName").textContent = muscle.name;
  document.querySelector("#detailLocation").textContent = muscle.location;
  document.querySelector("#regionTag").textContent = muscle.region === "core" ? "CORE" : `${muscle.region.toUpperCase()} BODY`;
  document.querySelector("#stretchList").replaceChildren(...muscle.stretches.map((stretch) => makeStretchListItem(stretch, muscle.name)));
  document.querySelector("#sourceList").replaceChildren(...muscle.references.map(makeSourceListItem));
  document.querySelector("#causeList").replaceChildren(...muscle.causes.map((cause) => makeListItem(cause)));
  renderList();
  setView(muscle.view);
  document.querySelectorAll(".muscle-zone").forEach((zone) => {
    zone.classList.toggle("is-selected", zone.dataset.muscle === id);
    zone.setAttribute("aria-pressed", String(zone.dataset.muscle === id));
  });
}

function makeListItem(text) {
  const item = document.createElement("li");
  item.textContent = text;
  return item;
}

function makeStretchListItem(stretch, muscleName) {
  const item = document.createElement("li");
  const heading = document.createElement("div");
  const name = document.createElement("strong");
  const instructions = document.createElement("span");
  const dosage = document.createElement("span");
  const links = document.createElement("span");
  const youtubeLink = document.createElement("a");
  const googleLink = document.createElement("a");
  const query = `${muscleName} ${stretch.name}`;
  const youtubeURL = new URL("https://www.youtube.com/results");
  const googleURL = new URL("https://www.google.com/search");

  youtubeURL.searchParams.set("search_query", query);
  googleURL.searchParams.set("q", query);
  heading.className = "stretch-heading";
  name.className = "stretch-name";
  name.textContent = stretch.name;
  links.className = "stretch-links";
  [youtubeLink, googleLink].forEach((link) => {
    link.className = "stretch-link";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  youtubeLink.href = youtubeURL.toString();
  youtubeLink.setAttribute("aria-label", `Search YouTube for ${query}`);
  youtubeLink.textContent = "YouTube ↗";
  googleLink.href = googleURL.toString();
  googleLink.setAttribute("aria-label", `Search Google for ${query}`);
  googleLink.textContent = "Google ↗";
  links.append(youtubeLink, googleLink);
  instructions.className = "stretch-instructions";
  instructions.textContent = stretch.instructions;
  dosage.className = "stretch-dosage";
  dosage.textContent = stretch.dosage;
  heading.append(name, links);
  item.append(heading, instructions, dosage);
  return item;
}

function makeSourceListItem(referenceId) {
  const reference = references[referenceId];
  if (!reference) throw new Error(`Unknown stretch reference: ${referenceId}`);

  const item = document.createElement("li");
  const link = document.createElement("a");
  link.href = reference.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = reference.label;
  item.append(link);
  return item;
}

function setExplorerMode(tab) {
  document.querySelectorAll(".explorer-tabs [role='tab']").forEach((button) => {
    const active = button === tab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
    document.querySelector(`#${button.dataset.panel}`).hidden = !active;
  });
  if (tab.dataset.panel === "activityExplorer") {
    const selectedActivity = document.querySelector(".activity-tab[aria-selected='true']");
    renderActivity(selectedActivity.dataset.activity);
  }
}

function makeActivityMuscleButton(id) {
  const muscle = muscles.find((item) => item.id === id);
  if (!muscle) throw new Error(`Unknown activity muscle: ${id}`);

  const item = document.createElement("li");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "activity-muscle";
  button.textContent = muscle.name;
  button.addEventListener("click", () => {
    searchInput.value = "";
    regionFilter.value = "all";
    selectMuscle(muscle.id);
    setExplorerMode(document.querySelector("#musclesTab"));
  });
  item.append(button);
  return item;
}

function renderActivity(id) {
  const activity = activities.find((item) => item.id === id);
  if (!activity) throw new Error(`Unknown activity: ${id}`);

  const tab = document.querySelector(`.activity-tab[data-activity="${id}"]`);
  document.querySelectorAll(".activity-tab").forEach((button) => {
    const active = button === tab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  document.querySelector("#activityDetails").setAttribute("aria-labelledby", tab.id);
  document.querySelector("#activityKicker").textContent = activity.kicker;
  document.querySelector("#activityTitle").textContent = activity.title;
  document.querySelector("#activityDescription").textContent = activity.description;
  document.querySelector("#movementNote").textContent = activity.movement;
  document.querySelector("#activityMuscles").replaceChildren(...activity.muscles.map(makeActivityMuscleButton));
  document.querySelector("#activityNotes").replaceChildren(...activity.notes.map(makeListItem));
  document.querySelector("#activitySources").replaceChildren(...activity.references.map(makeSourceListItem));
}

function enableTabArrowKeys(selector) {
  document.querySelectorAll(selector).forEach((tab) => {
    tab.addEventListener("keydown", (event) => {
      const tabs = [...tab.parentElement.querySelectorAll("[role='tab']")];
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = currentIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % tabs.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    });
  });
}

function renderList() {
  const query = searchInput.value.trim().toLowerCase();
  const region = regionFilter.value;
  const matches = muscles.filter((muscle) => {
    const matchesQuery = `${muscle.name} ${muscle.location}`.toLowerCase().includes(query);
    return matchesQuery && (region === "all" || muscle.region === region);
  });
  list.replaceChildren(...matches.map((muscle) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "muscle-option";
    button.classList.toggle("is-selected", muscle.id === selectedId);
    button.setAttribute("aria-current", muscle.id === selectedId ? "true" : "false");
    button.innerHTML = `<span class="option-name">${muscle.name}</span><span class="option-arrow" aria-hidden="true">↗</span>`;
    button.addEventListener("click", () => selectMuscle(muscle.id));
    item.append(button);
    return item;
  }));
  resultCount.textContent = String(matches.length).padStart(2, "0");
  emptySearch.hidden = matches.length > 0;
}

function setView(view) {
  const isFront = view === "front";
  frontMap.toggleAttribute("hidden", !isFront);
  backMap.toggleAttribute("hidden", isFront);
  frontMap.classList.toggle("is-active", isFront);
  backMap.classList.toggle("is-active", !isFront);
  document.querySelectorAll(".view-button").forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

document.querySelectorAll(".explorer-tabs [role='tab']").forEach((tab) => {
  tab.addEventListener("click", () => setExplorerMode(tab));
});
document.querySelectorAll(".activity-tab").forEach((tab) => {
  tab.addEventListener("click", () => renderActivity(tab.dataset.activity));
});
enableTabArrowKeys(".explorer-tabs [role='tab']");
enableTabArrowKeys(".activity-tab");

searchInput.addEventListener("input", renderList);
regionFilter.addEventListener("change", renderList);
document.querySelectorAll(".view-button").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
document.querySelectorAll(".muscle-zone").forEach((zone) => {
  zone.addEventListener("click", () => selectMuscle(zone.dataset.muscle));
  zone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectMuscle(zone.dataset.muscle);
    }
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderActivity("running");
selectMuscle(selectedId);
