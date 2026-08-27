const STORAGE_KEY = "stableEmpireSave_v1";
const SAVE_SCHEMA_VERSION = 10;
const UPDATE_BACKUP_KEY = "stableEmpireSave_preUpdateBackup_v1";
const SAVE_META_KEY = "stableEmpireSave_meta_v1";
const AUDIO_PREF_KEY = "stableEmpireAudio_v2";
const GAME_PLAYLIST = [
  { title: "Morning at the Stable", file: "assets/morning-at-the-stable.mp3" },
  { title: "Cedar Valley Roads", file: "assets/cedar-valley-roads.mp3" },
  { title: "Hooves at Sundown", file: "assets/hooves-at-sundown.mp3" },
  { title: "County Fair Lights", file: "assets/county-fair-lights.mp3" }
];

const BREEDS = ["Morgan", "Quarter Horse", "Thoroughbred", "Mustang", "Shire", "Appaloosa", "Arabian", "Standardbred"];
const COATS = ["Bay", "Dark Bay", "Chestnut", "Black", "Grey", "Palomino", "Buckskin", "Roan", "Paint"];
const TEMPERAMENTS = ["Calm", "Brave", "Energetic", "Curious", "Stubborn", "Friendly", "Independent", "Nervous"];
const TRAITS = ["Fast Learner", "Strong Build", "Sure-Footed", "Gentle Temperament", "High Endurance", "Natural Racer", "Hardy", "Intelligent"];
const SPECIALIZATIONS = ["None", "Racing", "Endurance", "Trail", "Ranch", "Show", "Jumping", "Draft"];

const HORSE_STAT_KEYS = ["speed", "stamina", "handling", "strength", "intelligence"];

const INJURY_TYPES = [
  { name: "Minor Muscle Strain", days: [2, 4], severity: "Minor" },
  { name: "Sore Hoof", days: [2, 5], severity: "Minor" },
  { name: "Tendon Soreness", days: [4, 7], severity: "Moderate" },
  { name: "Overtraining Fatigue", days: [2, 4], severity: "Minor" }
];

const WEATHER_BY_SEASON = {
  Spring: [
    { name: "Clear", icon: "☀️", note: "Good conditions for most activities." },
    { name: "Light Rain", icon: "🌦️", note: "Outdoor footing is a little softer." },
    { name: "Rain", icon: "🌧️", note: "Outdoor training is harder and trails are muddy." },
    { name: "Breezy", icon: "🍃", note: "Cool, comfortable working weather." }
  ],
  Summer: [
    { name: "Sunny", icon: "☀️", note: "Excellent event weather." },
    { name: "Hot", icon: "🌡️", note: "Horses use extra energy during hard exercise." },
    { name: "Dry", icon: "🌾", note: "Fast footing at the event grounds." },
    { name: "Thunderstorm", icon: "⛈️", note: "Outdoor trail riding is unsafe today." }
  ],
  Autumn: [
    { name: "Cool", icon: "🍂", note: "Ideal conditioning weather." },
    { name: "Overcast", icon: "☁️", note: "Calm, steady conditions." },
    { name: "Rain", icon: "🌧️", note: "Muddy footing affects outdoor work." },
    { name: "Windy", icon: "💨", note: "Nervous horses may gain more stress." }
  ],
  Winter: [
    { name: "Cold", icon: "❄️", note: "Horses recover a little more slowly outdoors." },
    { name: "Snow", icon: "🌨️", note: "Outdoor competition conditions are difficult." },
    { name: "Clear", icon: "☀️", note: "Cold but workable." },
    { name: "Storm", icon: "🌨️", note: "Most outdoor work should wait." }
  ]
};

const ESTATE_BUILDINGS = [
  {
    id: "extraBarn",
    name: "Additional Barn",
    icon: "🏚️",
    cost: 1800,
    acres: 2,
    max: 3,
    description: "Adds four permanent horse stalls.",
    effect: "+4 horse capacity"
  },
  {
    id: "paddock",
    name: "Improved Paddock",
    icon: "🌿",
    cost: 900,
    acres: 1.5,
    max: 3,
    description: "More turnout space helps horses relax and recover.",
    effect: "Better daily stress recovery"
  },
  {
    id: "indoorArena",
    name: "Indoor Arena",
    icon: "🏟️",
    cost: 2400,
    acres: 2,
    max: 1,
    description: "Train regardless of bad weather.",
    effect: "Removes most weather practice penalties"
  },
  {
    id: "foalingBarn",
    name: "Foaling Barn",
    icon: "🍼",
    cost: 2600,
    acres: 1.5,
    max: 1,
    description: "A quiet dedicated building for breeding mares and foals.",
    effect: "Shorter pregnancy timer + healthier newborns"
  },
  {
    id: "vetWing",
    name: "Veterinary Wing",
    icon: "🩺",
    cost: 3000,
    acres: 1,
    max: 1,
    description: "Basic veterinary facilities on your own property.",
    effect: "Cheaper treatment + faster injury recovery"
  },
  {
    id: "feedWarehouse",
    name: "Feed Warehouse",
    icon: "🌾",
    cost: 1500,
    acres: 1,
    max: 1,
    description: "Bulk feed storage for a growing operation.",
    effect: "Adds 20 feed immediately and occasional supply savings"
  },
  {
    id: "trophyHall",
    name: "Trophy Hall",
    icon: "🏆",
    cost: 3200,
    acres: 1,
    max: 1,
    description: "Display your stable's competition history to visitors.",
    effect: "+1 extra reputation for competition wins"
  },
  {
    id: "privateTrack",
    name: "Private Training Track",
    icon: "🏁",
    cost: 4500,
    acres: 3,
    max: 1,
    description: "A private track for serious competition preparation.",
    effect: "Improved practice gains"
  }
];

const CUSTOMER_NAMES = [
  "Mae Holloway", "Catherine Monroe", "Jonah Reed", "Abigail Porter",
  "Walter Briggs", "Nora Whitfield", "Henry Cole", "Beatrice Lane",
  "Silas Turner", "Ada Bennett", "Francis Doyle", "Martha Hale"
];

const CUSTOMER_JOB_TYPES = [
  { type: "training", title: "Training Program", desc: "Complete a training session for a client's horse.", min: 190, max: 350 },
  { type: "care", title: "Condition & Care", desc: "Demonstrate a full feed-and-groom care routine.", min: 120, max: 230 },
  { type: "practice", title: "Competition Preparation", desc: "Complete a practice session at the Equestrian Grounds.", min: 210, max: 390 },
  { type: "trail", title: "Trail Confidence", desc: "Take a horse through Oak Hollow Trails.", min: 180, max: 320 },
  { type: "specialize", title: "Specialist Program", desc: "Specialize one of your horses for a formal discipline.", min: 300, max: 520 }
];

const DEFAULT_RIVALS = [
  { id: "riverview", name: "Riverview Stables", owner: "Eleanor Rivers", focus: "Show & Racing", reputation: 58, wins: 8, horses: 7 },
  { id: "oakridge", name: "Oakridge Farm", owner: "Caleb Ward", focus: "Breeding & Endurance", reputation: 42, wins: 5, horses: 9 },
  { id: "redhollow", name: "Red Hollow Ranch", owner: "Miriam Cole", focus: "Ranch & Draft", reputation: 36, wins: 3, horses: 8 }
];


const REPAIR_NAMES = {
  roof: "Roof",
  stalls: "Stalls",
  fence: "Fencing",
  arena: "Training Arena",
  feedStorage: "Feed Storage",
  water: "Water System",
  tackRoom: "Tack Room"
};


const TOWN_LOCATIONS = [
  { id: "stable", name: "Your Stable", icon: "🏠", type: "Home Base", x: 18, y: 70, subtitle: "Barn, paddocks & office" },
  { id: "mainstreet", name: "Main Street", icon: "🏘️", type: "Town Center", x: 37, y: 49, subtitle: "Town shops & services" },
  { id: "generalstore", name: "General Store", icon: "🌾", type: "Supplies", x: 31, y: 58, subtitle: "Feed, treats & brushes" },
  { id: "tackshop", name: "Tack Shop", icon: "🧰", type: "Equipment", x: 47, y: 43, subtitle: "Gear & horseshoes" },
  { id: "vet", name: "Veterinarian", icon: "🩺", type: "Health", x: 53, y: 60, subtitle: "Horse treatment" },
  { id: "farrier", name: "Farrier", icon: "🧲", type: "Hoof Care", x: 43, y: 70, subtitle: "Shoes & hoof service" },
  { id: "bank", name: "Bank", icon: "🏦", type: "Finance", x: 60, y: 49, subtitle: "Loans & expansion money" },
  { id: "noticeboard", name: "Notice Board", icon: "📌", type: "Contracts", x: 61, y: 36, subtitle: "Fresh work in town" },
  { id: "horsemarket", name: "Horse Market", icon: "🐴", type: "Buying & Selling", x: 76, y: 46, subtitle: "New horses arrive often" },
  { id: "auction", name: "Auction Yard", icon: "🔨", type: "Auction", x: 87, y: 37, subtitle: "Bid against county stables" },
  { id: "racetrack", name: "Equestrian Grounds", icon: "🏁", type: "Events", x: 73, y: 23, subtitle: "Races, trials & competitions" },
  { id: "rivalstable", name: "Riverview Stables", icon: "🐎", type: "Rival Stable", x: 84, y: 66, subtitle: "A respected competitor" },
  { id: "trails", name: "Oak Hollow Trails", icon: "🌲", type: "Trail Route", x: 22, y: 31, subtitle: "Practice riding trails" }
];


const PRACTICE_TYPES = [
  {
    id: "sprint",
    name: "Sprint Drills",
    icon: "💨",
    description: "Short, fast runs that mainly improve speed.",
    primary: "speed",
    secondary: "handling",
    playerSkill: "riding"
  },
  {
    id: "endurance",
    name: "Endurance Conditioning",
    icon: "🌾",
    description: "Longer conditioning work focused on stamina and recovery.",
    primary: "stamina",
    secondary: "strength",
    playerSkill: "riding"
  },
  {
    id: "handling",
    name: "Handling Course",
    icon: "🎯",
    description: "Turns, gates and controlled maneuvers that improve handling.",
    primary: "handling",
    secondary: "intelligence",
    playerSkill: "handling"
  },
  {
    id: "ranch",
    name: "Ranch Skills Practice",
    icon: "🤠",
    description: "Practical arena work that develops strength and handling.",
    primary: "strength",
    secondary: "handling",
    playerSkill: "handling"
  }
];

const COMPETITIONS = [
  {
    id: "county-sprint",
    name: "Cedar Valley Sprint",
    icon: "🏁",
    category: "Race",
    description: "A fast county sprint where raw speed matters most.",
    fee: 100,
    minTraining: 35,
    horseEnergy: 20,
    playerEnergy: 10,
    prizeMin: 430,
    prizeMax: 620,
    difficultyMin: 62,
    difficultyMax: 92,
    reputation: 7,
    specialty: "Racing",
    weights: { speed: .38, stamina: .18, handling: .12, training: .16, health: .06, bond: .04 }
  },
  {
    id: "meadow-endurance",
    name: "Long Meadow Endurance",
    icon: "🌄",
    category: "Endurance Race",
    description: "A longer event where stamina, health and steady handling decide the winner.",
    fee: 130,
    minTraining: 45,
    horseEnergy: 26,
    playerEnergy: 12,
    prizeMin: 580,
    prizeMax: 820,
    difficultyMin: 68,
    difficultyMax: 98,
    reputation: 9,
    specialty: "Endurance",
    weights: { stamina: .40, speed: .16, handling: .12, training: .14, health: .10, strength: .05 }
  },
  {
    id: "cloverleaf",
    name: "Cloverleaf Handling Challenge",
    icon: "🎯",
    category: "Timed Course",
    description: "A technical pattern of tight turns where handling and intelligence matter.",
    fee: 90,
    minTraining: 30,
    horseEnergy: 18,
    playerEnergy: 10,
    prizeMin: 340,
    prizeMax: 510,
    difficultyMin: 58,
    difficultyMax: 88,
    reputation: 6,
    specialty: "Trail",
    weights: { handling: .38, speed: .18, intelligence: .16, training: .15, bond: .08 }
  },
  {
    id: "ranch-trial",
    name: "Cedar Valley Ranch Trial",
    icon: "🤠",
    category: "Working Horse",
    description: "A practical ranch competition testing control, strength and good judgment.",
    fee: 110,
    minTraining: 40,
    horseEnergy: 22,
    playerEnergy: 11,
    prizeMin: 450,
    prizeMax: 660,
    difficultyMin: 64,
    difficultyMax: 94,
    reputation: 8,
    specialty: "Ranch",
    weights: { handling: .28, strength: .25, intelligence: .18, stamina: .12, training: .14, bond: .05 }
  },
  {
    id: "showmanship",
    name: "County Showmanship",
    icon: "🎀",
    category: "Show",
    description: "Presentation, responsiveness and the horse-handler bond take center stage.",
    fee: 75,
    minTraining: 30,
    horseEnergy: 14,
    playerEnergy: 8,
    prizeMin: 300,
    prizeMax: 460,
    difficultyMin: 56,
    difficultyMax: 86,
    reputation: 7,
    specialty: "Show",
    weights: { intelligence: .25, handling: .25, bond: .22, health: .12, training: .16 }
  },
  {
    id: "heavy-pull",
    name: "Heavy Horse Pull",
    icon: "💪",
    category: "Strength",
    description: "A strength-focused event built for powerful, conditioned horses.",
    fee: 120,
    minTraining: 35,
    horseEnergy: 24,
    playerEnergy: 10,
    prizeMin: 480,
    prizeMax: 700,
    difficultyMin: 64,
    difficultyMax: 95,
    reputation: 8,
    specialty: "Draft",
    weights: { strength: .45, stamina: .20, health: .12, training: .12, handling: .08 }
  }
];

const EVENT_CHALLENGES = [
  {
    id: "track-regular",
    title: "Track Regular",
    description: "Complete 3 practice sessions.",
    target: 3,
    progress: () => state.raceRecord.practiceSessions,
    reward: 180,
    reputation: 2
  },
  {
    id: "three-event-tour",
    title: "Three Event Tour",
    description: "Enter 3 official competitions.",
    target: 3,
    progress: () => state.raceRecord.entries,
    reward: 250,
    reputation: 3
  },
  {
    id: "winners-circle",
    title: "Winner's Circle",
    description: "Win 2 official competitions.",
    target: 2,
    progress: () => state.raceRecord.wins,
    reward: 350,
    reputation: 4
  },
  {
    id: "versatile-stable",
    title: "Versatile Stable",
    description: "Win 2 different types of competitions.",
    target: 2,
    progress: () => Object.values(state.raceRecord.winsByType || {}).filter(v => v > 0).length,
    reward: 500,
    reputation: 6
  }
];

const ADVERTISING_CAMPAIGNS = [
  {
    id: "flyers",
    name: "Town Flyers",
    icon: "📜",
    description: "Post flyers around Cedar Valley and the local shops.",
    cost: 60,
    days: 2,
    exposure: 4,
    reputation: 1,
    dailyIncome: 8,
    prizeBonus: 0
  },
  {
    id: "newspaper",
    name: "Newspaper Advertisement",
    icon: "📰",
    description: "Place a proper ad in the county newspaper.",
    cost: 140,
    days: 4,
    exposure: 10,
    reputation: 3,
    dailyIncome: 18,
    prizeBonus: .03
  },
  {
    id: "event-posters",
    name: "Race Day Posters",
    icon: "🎟️",
    description: "Advertise your stable around competition grounds and busy trails.",
    cost: 275,
    days: 5,
    exposure: 18,
    reputation: 5,
    dailyIncome: 28,
    prizeBonus: .08
  },
  {
    id: "county-campaign",
    name: "County-Wide Campaign",
    icon: "⭐",
    description: "A major campaign aimed at making your stable a recognized county name.",
    cost: 450,
    days: 7,
    exposure: 30,
    reputation: 8,
    dailyIncome: 42,
    prizeBonus: .12
  }
];


const STORY_CHAPTERS = [
  {
    number: 1,
    title: "The Inheritance",
    subtitle: "A worn-down stable and one dependable horse.",
    quests: [
      {
        id: "inheritance-first-morning",
        title: "First Morning",
        story: "The stable has seen better years, but the first responsibility is still the same: take care of the horse that came with it.",
        objectives: [{ metric: "dailyCare", label: "Feed and groom a horse on the same day", target: 1 }],
        reward: { money: 100, reputation: 1, feed: 3 }
      },
      {
        id: "inheritance-patch",
        title: "Patch the Place",
        story: "Loose boards, tired fencing and a leaking corner of the barn make it clear that this property needs work before it can become anything more.",
        objectives: [{ metric: "repairs", label: "Complete a stable repair", target: 1 }],
        reward: { money: 180, reputation: 1 }
      },
      {
        id: "inheritance-supplies",
        title: "Supplies for Tomorrow",
        story: "A stable cannot run on good intentions. Cedar Valley's merchants are ready to sell what you need, if you can afford it.",
        objectives: [{ metric: "storePurchases", label: "Make a supply purchase in town", target: 1 }],
        reward: { money: 120, treats: 4 }
      },
      {
        id: "inheritance-first-job",
        title: "A Job Worth Doing",
        story: "The notice board offers a chance to prove that the new owner of this place can actually deliver.",
        objectives: [{ metric: "contractsCompleted", label: "Complete a contract", target: 1 }],
        reward: { money: 250, reputation: 2 }
      },
      {
        id: "inheritance-word",
        title: "Word Gets Around",
        story: "People have started mentioning your stable by name. A little more work could turn curiosity into genuine respect.",
        objectives: [{ metric: "reputation", label: "Reach 12 reputation", target: 12 }],
        reward: { money: 300, reputation: 3 }
      }
    ]
  },
  {
    number: 2,
    title: "Beyond the Barn",
    subtitle: "Start building something larger than a one-horse operation.",
    quests: [
      {
        id: "beyond-practice",
        title: "Practice Makes Progress",
        story: "A serious stable needs more than chores. Proper conditioning will show what your horses are capable of.",
        objectives: [{ metric: "practiceSessions", label: "Complete a practice session", target: 1 }],
        reward: { money: 175, reputation: 1 }
      },
      {
        id: "beyond-oak-hollow",
        title: "Oak Hollow",
        story: "The winding trails beyond town are where many Cedar Valley riders test a horse's calmness and endurance.",
        objectives: [{ metric: "trailRides", label: "Ride the Oak Hollow Trails", target: 1 }],
        reward: { money: 200, reputation: 2 }
      },
      {
        id: "beyond-second-horse",
        title: "Room for Another",
        story: "One horse made this place a stable. A second horse makes it the beginning of a business.",
        objectives: [{ metric: "horsesOwned", label: "Own 2 horses", target: 2 }],
        reward: { money: 275, feed: 5 }
      },
      {
        id: "beyond-specialist",
        title: "A Horse With a Purpose",
        story: "Cedar Valley remembers horses that are exceptional at something, not merely adequate at everything.",
        objectives: [{ metric: "specializedHorses", label: "Specialize a horse", target: 1 }],
        reward: { money: 325, reputation: 2 }
      },
      {
        id: "beyond-help",
        title: "Extra Hands",
        story: "There are now enough chores, horses and customers that doing everything alone is beginning to cost you time.",
        objectives: [{ metric: "staffOwned", label: "Hire 1 staff member", target: 1 }],
        reward: { money: 350, reputation: 2 }
      }
    ]
  },
  {
    number: 3,
    title: "The Cedar Valley Circuit",
    subtitle: "Take your horses out of the barn and into the public eye.",
    quests: [
      {
        id: "circuit-first-entry",
        title: "Take the Gate",
        story: "The Cedar Valley Equestrian Grounds are busy this week. Entering is the only way to learn whether your training holds up under pressure.",
        objectives: [{ metric: "competitionEntries", label: "Enter an official competition", target: 1 }],
        reward: { money: 200, reputation: 1 }
      },
      {
        id: "circuit-first-win",
        title: "First Victory",
        story: "A respectable finish earns attention. A victory earns a name.",
        objectives: [{ metric: "competitionWins", label: "Win an official competition", target: 1 }],
        reward: { money: 450, reputation: 4, exposure: 3 }
      },
      {
        id: "circuit-variety",
        title: "More Than One Trick",
        story: "The county has more than one kind of horseman. Show that your stable can compete across different disciplines.",
        objectives: [{ metric: "competitionTypesEntered", label: "Enter 3 different competition types", target: 3 }],
        reward: { money: 500, reputation: 3 }
      },
      {
        id: "circuit-advertise",
        title: "Your Name on a Poster",
        story: "Competition brings spectators. Spectators become customers if they know where to find you.",
        objectives: [
          { metric: "campaignsStarted", label: "Start an advertising campaign", target: 1 },
          { metric: "exposure", label: "Reach 10 stable exposure", target: 10 }
        ],
        reward: { money: 550, reputation: 3 }
      },
      {
        id: "circuit-contender",
        title: "A Real Contender",
        story: "You are no longer the unknown stable at the edge of town. A few more wins will make the county pay attention.",
        objectives: [{ metric: "competitionWins", label: "Win 3 official competitions", target: 3 }],
        reward: { money: 700, reputation: 5, exposure: 5 }
      }
    ]
  },
  {
    number: 4,
    title: "Riverview Takes Notice",
    subtitle: "The county's established stables begin watching your rise.",
    quests: [
      {
        id: "riverview-customers",
        title: "The Customers Choose",
        story: "Riverview Stables has held Cedar Valley's attention for years. The easiest way to challenge that is simple: do better work.",
        objectives: [{ metric: "contractsCompleted", label: "Complete 4 contracts total", target: 4 }],
        reward: { money: 600, reputation: 4 }
      },
      {
        id: "riverview-team",
        title: "Build the Team",
        story: "A serious rival has trainers, hands and people who keep the place moving while the owner looks ahead.",
        objectives: [{ metric: "staffOwned", label: "Employ 2 staff members", target: 2 }],
        reward: { money: 650, reputation: 3 }
      },
      {
        id: "riverview-property",
        title: "No More Fixer-Upper",
        story: "Visitors compare your grounds with every established property they have seen. Four well-kept areas will change the first impression.",
        objectives: [{ metric: "property80", label: "Have 4 property areas at 80% condition or better", target: 4 }],
        reward: { money: 650, reputation: 4 }
      },
      {
        id: "riverview-versatile",
        title: "Across the Program",
        story: "Riverview's people expected you to disappear after one lucky event. Competing broadly proves otherwise.",
        objectives: [{ metric: "competitionTypesEntered", label: "Enter 4 different competition types", target: 4 }],
        reward: { money: 700, reputation: 4, exposure: 4 }
      },
      {
        id: "riverview-respect",
        title: "Earned Respect",
        story: "Eleanor Rivers of Riverview finally sends word: 'You have built more than I expected. Keep going.'",
        objectives: [{ metric: "reputation", label: "Reach 35 reputation", target: 35 }],
        reward: { money: 900, reputation: 6, exposure: 5 }
      }
    ]
  },
  {
    number: 5,
    title: "The Business of Horses",
    subtitle: "Turn reputation into a stable that can support itself.",
    quests: [
      {
        id: "business-buying",
        title: "An Eye for Stock",
        story: "Good stable owners know when to train what they have and when to bring in something new.",
        objectives: [{ metric: "marketPurchases", label: "Purchase 2 horses from the market total", target: 2 }],
        reward: { money: 550, reputation: 2 }
      },
      {
        id: "business-sale",
        title: "A Good Home and a Good Price",
        story: "Selling a horse well is part judgment, part business, and part knowing when your work is finished.",
        objectives: [{ metric: "horsesSold", label: "Sell a horse", target: 1 }],
        reward: { money: 650, reputation: 2 }
      },
      {
        id: "business-earned",
        title: "Money Through the Gate",
        story: "A real operation has money coming in from many directions: customers, events, sales and careful management.",
        objectives: [{ metric: "moneyEarned", label: "Earn $5,000 over your career", target: 5000 }],
        reward: { money: 750, reputation: 3 }
      },
      {
        id: "business-publicity",
        title: "Keep Them Talking",
        story: "One advertisement gets noticed. Repeated promotion makes the stable familiar.",
        objectives: [{ metric: "campaignsStarted", label: "Start 3 advertising campaigns total", target: 3 }],
        reward: { money: 700, reputation: 3, exposure: 8 }
      },
      {
        id: "business-reserve",
        title: "A Proper Reserve",
        story: "Success is not the money you make today. It is having enough left to survive tomorrow.",
        objectives: [{ metric: "cash", label: "Have $5,000 cash available", target: 5000 }],
        reward: { money: 1000, reputation: 4 }
      }
    ]
  },
  {
    number: 6,
    title: "Restore the Legacy",
    subtitle: "Transform the inherited property into a stable worth remembering.",
    quests: [
      {
        id: "legacy-expand",
        title: "Raise Another Barn",
        story: "The original property is no longer enough for what you are becoming.",
        objectives: [{ metric: "stableLevel", label: "Reach Stable Level 2", target: 2 }],
        reward: { money: 900, reputation: 4 }
      },
      {
        id: "legacy-restoration",
        title: "From Roof to Rail",
        story: "The old stable should no longer look inherited. It should look rebuilt.",
        objectives: [{ metric: "allPropertyCondition", label: "Raise every property area to at least 90%", target: 90 }],
        reward: { money: 1200, reputation: 6 }
      },
      {
        id: "legacy-specialists",
        title: "A Stable of Specialists",
        story: "Build a roster with defined strengths rather than a collection of interchangeable horses.",
        objectives: [{ metric: "specializedHorses", label: "Own 3 specialized horses", target: 3 }],
        reward: { money: 1000, reputation: 5 }
      },
      {
        id: "legacy-trained",
        title: "Finished Horses",
        story: "The strongest advertisement for a trainer is a horse that leaves the program polished and ready.",
        objectives: [{ metric: "training80", label: "Own 2 horses with 80+ training", target: 2 }],
        reward: { money: 1250, reputation: 6 }
      },
      {
        id: "legacy-roster",
        title: "Full Barn, Full Future",
        story: "The quiet stable you inherited now has a proper roster and a reason to keep expanding.",
        objectives: [{ metric: "horsesOwned", label: "Own 4 horses", target: 4 }],
        reward: { money: 1200, reputation: 5, feed: 10 }
      }
    ]
  },
  {
    number: 7,
    title: "County Championship Season",
    subtitle: "The entire county knows who you are. Now prove what the stable can do.",
    quests: [
      {
        id: "championship-experience",
        title: "Seasoned Competitors",
        story: "A championship stable does not rely on one lucky afternoon.",
        objectives: [{ metric: "competitionEntries", label: "Enter 10 official competitions total", target: 10 }],
        reward: { money: 900, reputation: 4 }
      },
      {
        id: "championship-disciplines",
        title: "Three Disciplines, Three Wins",
        story: "Different courses require different horses, different preparation and different judgment.",
        objectives: [{ metric: "uniqueWins", label: "Win 3 different competition types", target: 3 }],
        reward: { money: 1300, reputation: 6, exposure: 6 }
      },
      {
        id: "championship-wins",
        title: "The Winning Habit",
        story: "Winning once gets remembered for a week. Winning repeatedly becomes part of the stable's identity.",
        objectives: [{ metric: "competitionWins", label: "Win 6 official competitions total", target: 6 }],
        reward: { money: 1500, reputation: 7 }
      },
      {
        id: "championship-crowd",
        title: "Crowds Know the Name",
        story: "Customers arrive already knowing the stable sign before they ever reach your road.",
        objectives: [{ metric: "exposure", label: "Reach 40 stable exposure", target: 40 }],
        reward: { money: 1200, reputation: 6 }
      },
      {
        id: "championship-standing",
        title: "County Standing",
        story: "There is no argument left about whether your stable belongs among Cedar Valley's best.",
        objectives: [{ metric: "reputation", label: "Reach 60 reputation", target: 60 }],
        reward: { money: 1800, reputation: 8, exposure: 8 }
      }
    ]
  },
  {
    number: 8,
    title: "Stable Empire",
    subtitle: "Finish what began with an old barn and a single horse.",
    quests: [
      {
        id: "empire-property",
        title: "The Estate",
        story: "The operation has outgrown the word 'little.' Expand again and make the property match the business.",
        objectives: [{ metric: "stableLevel", label: "Reach Stable Level 3", target: 3 }],
        reward: { money: 1500, reputation: 5 }
      },
      {
        id: "empire-crew",
        title: "People Who Built It With You",
        story: "A stable empire is not built alone. Keep a dependable crew around you.",
        objectives: [{ metric: "staffOwned", label: "Employ 3 staff members", target: 3 }],
        reward: { money: 1500, reputation: 5 }
      },
      {
        id: "empire-clients",
        title: "A County Full of Clients",
        story: "Your books are no longer filled with favors and odd jobs. They are filled with people choosing your stable.",
        objectives: [{ metric: "contractsCompleted", label: "Complete 10 contracts total", target: 10 }],
        reward: { money: 1800, reputation: 6 }
      },
      {
        id: "empire-versatility",
        title: "No Weak Discipline",
        story: "Five different event victories make it impossible to call your success a specialty or an accident.",
        objectives: [{ metric: "uniqueWins", label: "Win 5 different competition types", target: 5 }],
        reward: { money: 2200, reputation: 8, exposure: 10 }
      },
      {
        id: "empire-final",
        title: "The Stable Empire",
        story: "The old property is restored, the barn is full, the county knows your name, and the stable can stand on its own. What you inherited was land. What you built is a legacy.",
        objectives: [
          { metric: "cash", label: "Have $10,000 cash available", target: 10000 },
          { metric: "reputation", label: "Reach 75 reputation", target: 75 },
          { metric: "horsesOwned", label: "Own 5 horses", target: 5 },
          { metric: "allPropertyCondition", label: "Raise every property area to at least 95%", target: 95 }
        ],
        reward: { money: 5000, reputation: 15, exposure: 20, title: "Cedar Valley Stablemaster" }
      }
    ]
  }
];

const STORY_QUESTS = STORY_CHAPTERS.flatMap(chapter =>
  chapter.quests.map(quest => ({
    ...quest,
    chapter: chapter.number,
    chapterTitle: chapter.title
  }))
);


const CUTSCENE_CHARACTERS = {
  eleanor: {
    name: "Eleanor Rivers",
    image: "assets/characters/eleanor-rivers.svg",
    voice: { pitch: 0.92, rate: 0.92 }
  },
  mae: {
    name: "Mae Holloway",
    image: "assets/characters/mae-holloway.svg",
    voice: { pitch: 1.08, rate: 0.98 }
  },
  thomas: {
    name: "Thomas Bell",
    image: "assets/characters/thomas-bell.svg",
    voice: { pitch: 0.86, rate: 0.94 }
  },
  samuel: {
    name: "Samuel Mercer",
    image: "assets/characters/samuel-mercer.svg",
    voice: { pitch: 0.82, rate: 1.03 }
  },
  clara: {
    name: "Dr. Clara Whitmore",
    image: "assets/characters/clara-whitmore.svg",
    voice: { pitch: 1.04, rate: 0.96 }
  },
  jonah: {
    name: "Jonah Reed",
    image: "assets/characters/jonah-reed.svg",
    voice: { pitch: 0.78, rate: 0.9 }
  }
};

const CUTSCENES = [
  {
    id: "opening-inheritance",
    title: "The Inheritance",
    chapter: "Prologue",
    trigger: { type: "newGame" },
    background: "assets/scenes/stable-dawn.svg",
    lines: [
      { speaker: "Narrator", text: "By sunrise, the deed was signed, the key was in your hand, and the old stable belonged to you." },
      { speaker: "Narrator", text: "The roof sagged. The fencing leaned. One dependable horse watched from a stall as if waiting to see what you would do next." },
      { speaker: "Mae Holloway", character: "mae", text: "Folks around Cedar Valley remember this place. Not always kindly, mind you. But they remember it." },
      { speaker: "Mae Holloway", character: "mae", text: "If you mean to bring it back, start small. Care for the horse. Fix what you can. Let the rest come after." },
      {
        speaker: () => state.ownerName,
        text: "Then that's where I'll start.",
        choices: [
          { label: "I'm going to rebuild all of it.", flag: "openingAmbition", value: "ambitious" },
          { label: "One good day at a time.", flag: "openingAmbition", value: "steady" }
        ]
      }
    ]
  },
  {
    id: "first-client",
    title: "A Name on the Board",
    chapter: "Chapter 1",
    trigger: { type: "afterQuest", questId: "inheritance-first-job" },
    background: "assets/scenes/cedar-main-street.svg",
    lines: [
      { speaker: "Mae Holloway", character: "mae", text: "I heard you finished that notice-board job properly." },
      { speaker: "Mae Holloway", character: "mae", text: "That matters around here. People remember who shows up when they say they will." },
      { speaker: "Narrator", text: "For the first time, the stable's name is spoken in town as a business rather than an abandoned property." }
    ]
  },
  {
    id: "riverview-hears",
    title: "Across the Fence",
    chapter: "Chapter 1",
    trigger: { type: "afterQuest", questId: "inheritance-word" },
    background: "assets/scenes/riverview-stables.svg",
    lines: [
      { speaker: "Narrator", text: "Across Cedar Valley, another stable has started hearing the same name." },
      { speaker: "Eleanor Rivers", character: "eleanor", text: "The old place by Oak Hollow?" },
      { speaker: "Eleanor Rivers", character: "eleanor", text: "Interesting. Most people give up on properties like that before the first winter." },
      { speaker: "Eleanor Rivers", character: "eleanor", text: "Keep an eye on them." }
    ]
  },
  {
    id: "first-event-entry",
    title: "At the Starting Gate",
    chapter: "Chapter 3",
    trigger: { type: "afterQuest", questId: "circuit-first-entry" },
    background: "assets/scenes/event-grounds.svg",
    lines: [
      { speaker: "Thomas Bell", character: "thomas", text: "Stable name?" },
      { speaker: () => state.ownerName, text: () => state.stableName + "." },
      { speaker: "Thomas Bell", character: "thomas", text: "Right. I've heard it once or twice lately." },
      { speaker: "Thomas Bell", character: "thomas", text: "The county doesn't care what a horse cost or where a stable started. Once that gate opens, the clock settles the argument." }
    ]
  },
  {
    id: "first-victory",
    title: "The First Ribbon",
    chapter: "Chapter 3",
    trigger: { type: "afterQuest", questId: "circuit-first-win" },
    background: "assets/scenes/event-grounds.svg",
    lines: [
      { speaker: "Narrator", text: "The result is posted. Your stable's name sits at the top." },
      { speaker: "Thomas Bell", character: "thomas", text: "That's not a bad way to introduce yourself to Cedar Valley." },
      { speaker: "Mae Holloway", character: "mae", text: "I told you people would remember." },
      { speaker: "Narrator", text: "Spectators linger near your horse. A few ask where your stable is located." }
    ]
  },
  {
    id: "riverview-arrives",
    title: "The Established Name",
    chapter: "Chapter 4",
    trigger: { type: "afterQuest", questId: "riverview-customers" },
    background: "assets/scenes/stable-dawn.svg",
    lines: [
      { speaker: "Narrator", text: "A well-kept carriage stops outside your stable just after noon." },
      { speaker: "Eleanor Rivers", character: "eleanor", text: "So this is the place everyone has been talking about." },
      { speaker: "Eleanor Rivers", character: "eleanor", text: "Eleanor Rivers. Riverview Stables." },
      {
        speaker: "Eleanor Rivers",
        character: "eleanor",
        text: "Tell me something. Are you trying to build a business here, or are you trying to beat mine?",
        choices: [
          { label: "There's room in Cedar Valley for both of us.", relationship: 12, flag: "riverviewApproach", value: "respectful" },
          { label: "I'm building the best stable in the county.", relationship: -8, flag: "riverviewApproach", value: "competitive" },
          { label: "I haven't decided what Riverview is to me yet.", relationship: 0, flag: "riverviewApproach", value: "neutral" }
        ]
      },
      { speaker: "Eleanor Rivers", character: "eleanor", text: "Good. At least you know enough to choose your words carefully." }
    ]
  },
  {
    id: "riverview-respect",
    title: "Earned Respect",
    chapter: "Chapter 4",
    trigger: { type: "afterQuest", questId: "riverview-respect" },
    background: "assets/scenes/riverview-stables.svg",
    lines: [
      { speaker: "Eleanor Rivers", character: "eleanor", text: () => riverviewRelationship() >= 10 ? "You've handled yourself better than I expected." : "You're persistent. I'll give you that much." },
      { speaker: "Eleanor Rivers", character: "eleanor", text: "You have built more than I expected. Keep going." },
      {
        speaker: "Eleanor Rivers",
        character: "eleanor",
        text: "From here, we can make one another better—or spend years making one another miserable.",
        choices: [
          { label: "I'd rather have a worthy ally.", relationship: 15, flag: "riverviewLongTerm", value: "ally" },
          { label: "A worthy rival sounds more interesting.", relationship: -12, flag: "riverviewLongTerm", value: "rival" }
        ]
      }
    ]
  },
  {
    id: "auction-lesson",
    title: "Under the Hammer",
    chapter: "Chapter 5",
    trigger: { type: "afterQuest", questId: "business-buying" },
    background: "assets/scenes/auction-yard.svg",
    lines: [
      { speaker: "Samuel Mercer", character: "samuel", text: "Don't stare at the prettiest horse in the ring. That's how I know which bidder brought too much money." },
      { speaker: "Samuel Mercer", character: "samuel", text: "Watch the feet. Watch the breathing. Watch who else is bidding." },
      { speaker: "Samuel Mercer", character: "samuel", text: "A horse business is won before the hammer falls." },
      { speaker: "Narrator", text: "Mercer tips his hat and turns back toward the auction ring." }
    ]
  },
  {
    id: "restoration-night",
    title: "Lights in Every Window",
    chapter: "Chapter 6",
    trigger: { type: "afterQuest", questId: "legacy-restoration" },
    background: "assets/scenes/stable-night.svg",
    lines: [
      { speaker: "Narrator", text: "Late that evening, the stable is quiet enough to hear horses shifting in clean stalls." },
      { speaker: "Dr. Clara Whitmore", character: "clara", text: "I remember treating a horse here years ago. Rain came through the roof faster than I could finish the examination." },
      { speaker: "Dr. Clara Whitmore", character: "clara", text: "This doesn't feel like the same place anymore." },
      { speaker: "Narrator", text: "For the first time, the property looks less like something you rescued and more like something you built." }
    ]
  },
  {
    id: "championship-invite",
    title: "The Championship Notice",
    chapter: "Chapter 7",
    trigger: { type: "afterQuest", questId: "championship-experience" },
    background: "assets/scenes/event-grounds.svg",
    lines: [
      { speaker: "Thomas Bell", character: "thomas", text: "Ten entries. That means I don't have to explain how these grounds work anymore." },
      { speaker: "Thomas Bell", character: "thomas", text: "The county championship is coming up." },
      { speaker: "Thomas Bell", character: "thomas", text: "Your stable has earned a place in the conversation. What you do with that place is up to you." }
    ]
  },
  {
    id: "championship-rival",
    title: "Two Stable Signs",
    chapter: "Chapter 7",
    trigger: { type: "afterQuest", questId: "championship-disciplines" },
    background: "assets/scenes/championship.svg",
    lines: [
      { speaker: "Narrator", text: "Two stable banners hang near the championship grounds: yours and Riverview's." },
      { speaker: "Eleanor Rivers", character: "eleanor", text: () => riverviewRelationship() >= 15 ? "Whatever happens out there, you've earned your place beside us." : "You wanted the county's attention. Now you have it." },
      {
        speaker: "Eleanor Rivers",
        character: "eleanor",
        text: "Ready?",
        choices: [
          { label: "Let's give them a championship worth remembering.", relationship: 5 },
          { label: "I'm here to win.", relationship: -3 }
        ]
      }
    ]
  },
  {
    id: "county-standing-scene",
    title: "A County Name",
    chapter: "Chapter 7",
    trigger: { type: "afterQuest", questId: "championship-standing" },
    background: "assets/scenes/cedar-main-street.svg",
    lines: [
      { speaker: "Jonah Reed", character: "jonah", text: "Used to be I had to explain where your stable was." },
      { speaker: "Jonah Reed", character: "jonah", text: "Now I mention the name and folks start telling me which horse of yours they saw compete." },
      { speaker: "Mae Holloway", character: "mae", text: "Told you they'd remember." },
      { speaker: "Narrator", text: "Cedar Valley no longer speaks of your stable as the new place. It is simply part of the county." }
    ]
  },
  {
    id: "finale-legacy",
    title: "Stable Empire",
    chapter: "Finale",
    trigger: { type: "afterQuest", questId: "empire-final" },
    background: "assets/scenes/championship.svg",
    lines: [
      { speaker: "Narrator", text: "The stable began with worn boards, uncertain money and one horse waiting in a quiet stall." },
      { speaker: "Mae Holloway", character: "mae", text: "Not bad for a place people had already written off." },
      { speaker: "Thomas Bell", character: "thomas", text: "Your horses belong at any gate in the county." },
      { speaker: "Samuel Mercer", character: "samuel", text: "And you finally learned not to overpay at my auctions." },
      { speaker: "Eleanor Rivers", character: "eleanor", text: () => riverviewRelationship() >= 20 ? "Cedar Valley is better with both of us in it." : "You built the rival I was warned about." },
      { speaker: "Narrator", text: () => state.stableName + " is no longer a restoration project. It is a legacy." },
      { speaker: () => state.ownerName, text: "And we're not finished yet." }
    ]
  }
];

let activeCutscene = null;
let cutsceneLineIndex = 0;
let cutsceneReplayMode = false;
let cutsceneMusicVolumeBefore = null;

const DEFAULT_STATE = () => ({
  version: 1,
  saveSchemaVersion: SAVE_SCHEMA_VERSION,
  lastSavedAt: null,
  ownerName: "Stable Owner",
  stableName: "Dusty Creek Stables",
  money: 650,
  energy: 100,
  reputation: 5,
  day: 1,
  seasonIndex: 0,
  year: 1,
  stableLevel: 1,
  stableXp: 0,
  capacity: 3,
  stableStyle: {
    theme: "Rustic Ranch",
    exterior: "Natural Timber",
    fence: "Split Rail",
    signText: "Dusty Creek Stables"
  },
  condition: {
    roof: 72,
    stalls: 68,
    fence: 54,
    arena: 62,
    feedStorage: 80,
    water: 74,
    tackRoom: 66
  },
  inventory: {
    feed: 12,
    treats: 5,
    brushes: 1,
    medicine: 1,
    horseshoes: 0
  },
  playerSkills: {
    riding: 1,
    training: 1,
    handling: 1,
    business: 1,
    breeding: 0,
    veterinary: 0
  },
  horses: [],
  staff: [],
  contracts: [],
  market: [],
  raceRecord: {
    wins: 0,
    entries: 0,
    bestTime: null,
    practiceSessions: 0,
    entriesByType: {},
    winsByType: {},
    recentResults: []
  },
  challenges: { claimed: [] },
  marketing: {
    exposure: 0,
    campaign: null
  },
  story: {
    currentQuestId: STORY_QUESTS[0].id,
    completed: [],
    finished: false,
    title: null
  },
  cutscenes: {
    seen: [],
    voiceEnabled: false,
    flags: {}
  },
  relationships: {
    riverview: 0
  },
  questStats: {
    repairs: 0,
    storePurchases: 0,
    trailRides: 0,
    marketPurchases: 0,
    campaignsStarted: 0,
    vetVisits: 0,
    farrierVisits: 0,
    staffHired: 0,
    specializations: 0,
    totalDays: 0
  },
  world: {
    weather: { name: "Clear", icon: "☀️", note: "Good conditions for most activities." },
    forecast: { name: "Clear", icon: "☀️", note: "Good conditions for most activities." }
  },
  estate: {
    landAcres: 12,
    landPurchases: 0,
    buildings: {
      extraBarn: 0,
      paddock: 1,
      indoorArena: 0,
      foalingBarn: 0,
      vetWing: 0,
      feedWarehouse: 0,
      trophyHall: 0,
      privateTrack: 0
    }
  },
  customers: {
    leads: [],
    completed: 0
  },
  rivals: DEFAULT_RIVALS.map(rival => ({ ...rival })),
  auction: {
    horse: null,
    currentBid: 0,
    highBidder: "NPC",
    highBidderName: "Riverview Stables",
    daysLeft: 1
  },
  stats: { horsesTrained: 0, horsesSold: 0, contractsCompleted: 0, moneyEarned: 0 },
  log: ["You arrived at your inherited stable. It needs work, but it is yours."],
  lastRandomEventDay: 0
});

let state = DEFAULT_STATE();
let activeView = "dashboard";
let selectedTownLocation = "stable";

const el = (id) => document.getElementById(id);
const money = (n) => `$${Math.round(n).toLocaleString()}`;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];


function horseSexLabel(h) {
  if (h.age < 1) return h.sex === "Mare" ? "Filly Foal" : "Colt Foal";
  if (h.age < 3) return h.sex === "Mare" ? "Young Filly" : h.sex === "Stallion" ? "Young Colt" : "Young Gelding";
  return h.sex;
}

function horseLifeStage(h) {
  if (h.age < 1) return "Foal";
  if (h.age === 1) return "Yearling";
  if (h.age === 2) return "Young Horse";
  if (h.age >= 15) return "Senior";
  return "Adult";
}

function coatGeneFor(coat) {
  const map = {
    "Black":"E-a", "Bay":"E-A", "Dark Bay":"E-A+", "Chestnut":"ee",
    "Grey":"G-", "Palomino":"ee-Cr", "Buckskin":"E-A-Cr",
    "Roan":"Rn-", "Paint":"TO-"
  };
  return map[coat] || "Mixed";
}

function createPotentialFromStats(h, bonusMin = 8, bonusMax = 24) {
  const potential = {};
  HORSE_STAT_KEYS.forEach(key => {
    potential[key] = clamp(Math.max(Number(h[key] || 20), Number(h[key] || 20) + rand(bonusMin, bonusMax)), 25, 100);
  });
  return potential;
}

function normalizeHorseData(rawHorse = {}, marketHorse = false) {
  const h = { ...rawHorse };

  h.id = h.id || (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
  h.name = h.name || "Unnamed Horse";
  h.breed = h.breed || "Morgan";
  h.sex = ["Mare","Stallion","Gelding"].includes(h.sex) ? h.sex : "Mare";
  h.age = Number.isFinite(Number(h.age)) ? Number(h.age) : 4;
  h.coat = h.coat || "Bay";
  h.temperament = h.temperament || "Calm";
  h.trait = h.trait || "Hardy";
  h.health = clamp(Number(h.health ?? 85), 0, 100);
  h.energy = clamp(Number(h.energy ?? 85), 0, 100);
  h.bond = clamp(Number(h.bond ?? 10), 0, 100);
  h.training = clamp(Number(h.training ?? 0), 0, 100);
  h.specialization = h.specialization || "None";
  h.fed = Boolean(h.fed);
  h.groomed = Boolean(h.groomed);
  h.hoofCare = clamp(Number(h.hoofCare ?? 80), 0, 100);

  HORSE_STAT_KEYS.forEach(key => {
    h[key] = clamp(Number(h[key] ?? 45), 0, 100);
  });

  h.potential = {
    ...createPotentialFromStats(h),
    ...(h.potential || {})
  };
  HORSE_STAT_KEYS.forEach(key => {
    h.potential[key] = clamp(Math.max(h[key], Number(h.potential[key] ?? h[key])), h[key], 100);
  });

  h.fitness = clamp(Number(h.fitness ?? Math.round((h.stamina + h.health + h.training) / 3)), 0, 100);
  h.stress = clamp(Number(h.stress ?? 10), 0, 100);
  h.injury = h.injury && h.injury.name
    ? {
        name: h.injury.name,
        severity: h.injury.severity || "Minor",
        daysLeft: Math.max(1, Number(h.injury.daysLeft || 2))
      }
    : null;

  h.pedigree = {
    sire: null,
    dam: null,
    generation: 1,
    bloodline: "Foundation",
    ...(h.pedigree || {})
  };

  h.genetics = {
    coatGene: coatGeneFor(h.coat),
    ...(h.genetics || {})
  };

  const defaultMaxUses = h.sex === "Mare" ? 3 : h.sex === "Stallion" ? 6 : 0;
  h.breeding = {
    pregnant: false,
    dueInDays: 0,
    mateId: null,
    mateName: null,
    uses: 0,
    maxUses: defaultMaxUses,
    ...(h.breeding || {})
  };

  if (h.sex === "Gelding") {
    h.breeding.pregnant = false;
    h.breeding.maxUses = 0;
  }

  h.favorite = Boolean(h.favorite);
  h.retired = Boolean(h.retired);
  h.healthRecords = Array.isArray(h.healthRecords) ? h.healthRecords.slice(-15) : [];
  h.value = Number(h.value || 0);

  return h;
}

function averagePotential(h) {
  return Math.round(HORSE_STAT_KEYS.reduce((sum, key) => sum + Number(h.potential?.[key] || h[key] || 0), 0) / HORSE_STAT_KEYS.length);
}

function applyHorseStatGain(h, key, amount) {
  const cap = Number(h.potential?.[key] ?? 100);
  const before = Number(h[key] || 0);
  h[key] = clamp(before + amount, 0, cap);
  return h[key] - before;
}

function estateBuildingCount(id) {
  return Number(state.estate?.buildings?.[id] || 0);
}

function maybeInjureHorse(h, intensity = 1) {
  if (!h || h.injury || h.age < 2) return false;

  let chance = 0.015 * intensity;
  chance += Math.max(0, 45 - h.fitness) * 0.0012;
  chance += Math.max(0, h.stress - 55) * 0.0015;
  chance += Math.max(0, 30 - h.energy) * 0.0012;
  chance += Math.max(0, 55 - h.hoofCare) * 0.001;

  if (h.trait === "Hardy") chance *= 0.65;
  if (estateBuildingCount("vetWing")) chance *= 0.85;

  if (Math.random() >= chance) return false;

  const injuryType = choice(INJURY_TYPES);
  h.injury = {
    name: injuryType.name,
    severity: injuryType.severity,
    daysLeft: rand(injuryType.days[0], injuryType.days[1])
  };
  h.health = clamp(h.health - rand(3, 8), 0, 100);
  h.healthRecords.push(`Y${state.year} ${seasons()[state.seasonIndex]} ${state.day}: ${h.injury.name}`);
  addLog(`${h.name} developed ${h.injury.name.toLowerCase()} and needs rest.`);
  return true;
}

function createHorse(breed = choice(BREEDS), starter = false) {
  const age = rand(3, 9);
  const base = starter ? 50 : rand(35, 72);

  const horse = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    name: starter ? "Copper" : choice(["Willow", "Dakota", "River", "Scout", "Maple", "Bandit", "Belle", "Jasper", "Star", "Dusty", "Storm", "Daisy"]),
    breed,
    sex: choice(["Mare", "Stallion", "Gelding"]),
    age,
    coat: choice(COATS),
    temperament: starter ? "Calm" : choice(TEMPERAMENTS),
    trait: starter ? "Fast Learner" : choice(TRAITS),
    health: starter ? 92 : rand(70, 100),
    energy: starter ? 85 : rand(65, 100),
    bond: starter ? 25 : rand(0, 20),
    speed: clamp(base + rand(-12, 12), 20, 90),
    stamina: clamp(base + rand(-12, 12), 20, 90),
    handling: clamp(base + rand(-12, 12), 20, 90),
    strength: clamp(base + rand(-12, 12), 20, 90),
    intelligence: clamp(base + rand(-12, 12), 20, 90),
    training: starter ? 20 : rand(0, 35),
    specialization: "None",
    fed: false,
    groomed: false,
    hoofCare: 80,
    fitness: starter ? 55 : rand(38, 72),
    stress: starter ? 8 : rand(5, 22),
    injury: null,
    pedigree: {
      sire: null,
      dam: null,
      generation: 1,
      bloodline: starter ? "Cedar Valley Foundation" : choice(["Foundation", "Mercer Line", "Willow Creek Line", "Prairie Line"])
    },
    genetics: {},
    breeding: {},
    favorite: false,
    retired: false,
    healthRecords: [],
    value: starter ? 320 : 0
  };

  horse.genetics.coatGene = coatGeneFor(horse.coat);
  horse.potential = createPotentialFromStats(horse, starter ? 15 : 8, starter ? 28 : 25);

  const normalized = normalizeHorseData(horse);
  normalized.value = starter ? 320 : horseValue(normalized);
  return normalized;
}

function horseValue(h) {
  h = normalizeHorseData(h);
  const stats = HORSE_STAT_KEYS.reduce((sum, key) => sum + Number(h[key] || 0), 0);
  const potential = HORSE_STAT_KEYS.reduce((sum, key) => sum + Number(h.potential?.[key] || h[key] || 0), 0);
  const trainingBonus = h.training * 5;
  const healthFactor = Math.max(.35, h.health / 100);
  const specialtyBonus = h.specialization === "None" ? 0 : 300;
  const traitBonus = ["Natural Racer", "Fast Learner", "High Endurance"].includes(h.trait) ? 140 : 60;
  const pedigreeBonus = Math.max(0, Number(h.pedigree?.generation || 1) - 1) * 70;
  const fitnessBonus = h.fitness * 2;
  const injuryPenalty = h.injury ? 180 : 0;
  const ageFactor = h.age < 3 ? .65 : h.age >= 15 ? .78 : 1;

  return Math.max(
    120,
    Math.round(
      ((stats * 2.0) + (potential * .72) + trainingBonus + specialtyBonus + traitBonus + pedigreeBonus + fitnessBonus - injuryPenalty)
      * healthFactor
      * ageFactor
    )
  );
}

function recalcHorseValues() {
  state.horses = (state.horses || []).map(h => normalizeHorseData(h));
  state.market = (state.market || []).map(h => normalizeHorseData(h, true));
  state.horses.forEach(h => h.value = horseValue(h));
  state.market.forEach(h => h.value = horseValue(h));
  if (state.auction?.horse) {
    state.auction.horse = normalizeHorseData(state.auction.horse, true);
    state.auction.horse.value = horseValue(state.auction.horse);
  }
}

function seasons() { return ["Spring", "Summer", "Autumn", "Winter"]; }

function addLog(message) {
  state.log.unshift(`Day ${state.day}: ${message}`);
  state.log = state.log.slice(0, 40);
}

function toast(message) {
  const t = el("toast");
  t.textContent = message;
  t.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

function spend(cost) {
  if (state.money < cost) {
    toast("You do not have enough money.");
    return false;
  }
  state.money -= cost;
  return true;
}

function useEnergy(cost) {
  if (state.energy < cost) {
    toast("You are too tired. End the day to recover.");
    return false;
  }
  state.energy -= cost;
  return true;
}

function earn(amount) {
  state.money += amount;
  state.stats.moneyEarned += amount;
}


function deepMergeSave(defaultValue, savedValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(savedValue) ? savedValue : [...defaultValue];
  }

  if (
    defaultValue &&
    typeof defaultValue === "object" &&
    !Array.isArray(defaultValue)
  ) {
    const result = { ...defaultValue };
    if (savedValue && typeof savedValue === "object" && !Array.isArray(savedValue)) {
      Object.keys(savedValue).forEach(key => {
        if (key in defaultValue) {
          result[key] = deepMergeSave(defaultValue[key], savedValue[key]);
        } else {
          // Preserve unknown fields from future/experimental builds instead of deleting them.
          result[key] = savedValue[key];
        }
      });
    }
    return result;
  }

  return savedValue === undefined ? defaultValue : savedValue;
}

function createPreUpdateBackup(raw, fromVersion) {
  try {
    const existing = JSON.parse(localStorage.getItem(UPDATE_BACKUP_KEY) || "null");
    const alreadySame = existing?.raw === raw;
    if (alreadySame) return;

    localStorage.setItem(UPDATE_BACKUP_KEY, JSON.stringify({
      createdAt: new Date().toISOString(),
      fromVersion: Number(fromVersion || 1),
      raw
    }));
  } catch {
    // A backup failure should never prevent the actual save from loading.
  }
}

function migrateSaveData(parsed, rawForBackup = null) {
  const defaults = DEFAULT_STATE();
  const sourceVersion = Number(parsed?.saveSchemaVersion || parsed?.version || 1);

  if (rawForBackup && sourceVersion < SAVE_SCHEMA_VERSION) {
    createPreUpdateBackup(rawForBackup, sourceVersion);
  }

  const migrated = deepMergeSave(defaults, parsed || {});

  migrated.saveSchemaVersion = SAVE_SCHEMA_VERSION;
  migrated.lastSavedAt = parsed?.lastSavedAt || null;

  migrated.horses = Array.isArray(parsed?.horses)
    ? parsed.horses.map(h => normalizeHorseData(h))
    : [];

  migrated.market = Array.isArray(parsed?.market)
    ? parsed.market.map(h => normalizeHorseData(h, true))
    : [];

  migrated.staff = Array.isArray(parsed?.staff) ? parsed.staff : [];
  migrated.log = Array.isArray(parsed?.log) ? parsed.log.slice(0, 60) : defaults.log;

  migrated.raceRecord = deepMergeSave(defaults.raceRecord, parsed?.raceRecord || {});
  migrated.raceRecord.entriesByType = { ...(parsed?.raceRecord?.entriesByType || {}) };
  migrated.raceRecord.winsByType = { ...(parsed?.raceRecord?.winsByType || {}) };
  migrated.raceRecord.recentResults = Array.isArray(parsed?.raceRecord?.recentResults)
    ? parsed.raceRecord.recentResults.slice(0, 12)
    : [];

  migrated.challenges = {
    claimed: Array.isArray(parsed?.challenges?.claimed) ? parsed.challenges.claimed : []
  };

  migrated.marketing = deepMergeSave(defaults.marketing, parsed?.marketing || {});
  migrated.marketing.campaign = parsed?.marketing?.campaign ? { ...parsed.marketing.campaign } : null;

  migrated.story = deepMergeSave(defaults.story, parsed?.story || {});
  migrated.story.completed = Array.isArray(parsed?.story?.completed) ? parsed.story.completed : [];

  migrated.cutscenes = deepMergeSave(defaults.cutscenes, parsed?.cutscenes || {});
  migrated.cutscenes.seen = Array.isArray(parsed?.cutscenes?.seen) ? parsed.cutscenes.seen : [];
  migrated.cutscenes.flags = { ...(parsed?.cutscenes?.flags || {}) };

  migrated.relationships = deepMergeSave(defaults.relationships, parsed?.relationships || {});
  migrated.questStats = deepMergeSave(defaults.questStats, parsed?.questStats || {});
  migrated.stats = deepMergeSave(defaults.stats, parsed?.stats || {});

  migrated.world = deepMergeSave(defaults.world, parsed?.world || {});
  migrated.estate = deepMergeSave(defaults.estate, parsed?.estate || {});
  migrated.estate.buildings = deepMergeSave(defaults.estate.buildings, parsed?.estate?.buildings || {});

  migrated.customers = deepMergeSave(defaults.customers, parsed?.customers || {});
  migrated.customers.leads = Array.isArray(parsed?.customers?.leads) ? parsed.customers.leads : [];

  migrated.rivals = Array.isArray(parsed?.rivals) && parsed.rivals.length
    ? parsed.rivals.map((rival, index) => ({ ...DEFAULT_RIVALS[index % DEFAULT_RIVALS.length], ...rival }))
    : DEFAULT_RIVALS.map(rival => ({ ...rival }));

  migrated.auction = deepMergeSave(defaults.auction, parsed?.auction || {});
  migrated.auction.horse = parsed?.auction?.horse
    ? normalizeHorseData(parsed.auction.horse, true)
    : null;

  migrated.contracts = (Array.isArray(parsed?.contracts) ? parsed.contracts : []).map(c => ({
    ...c,
    category: c.category || "Contract",
    durationDays: Number(c.durationDays || c.days || 5),
    daysLeft: Number(c.daysLeft ?? c.durationDays ?? c.days ?? 5),
    failed: Boolean(c.failed),
    accepted: Boolean(c.accepted),
    completed: Boolean(c.completed)
  }));

  if (!STORY_QUESTS.some(q => q.id === migrated.story.currentQuestId)) {
    const nextStoryQuest = STORY_QUESTS.find(q => !migrated.story.completed.includes(q.id));
    migrated.story.currentQuestId = nextStoryQuest?.id || STORY_QUESTS[STORY_QUESTS.length - 1].id;
    migrated.story.finished = !nextStoryQuest;
  }

  return migrated;
}

function updateSaveSafetyStatus(message = null) {
  const status = el("saveSafetyStatus");
  if (!status) return;

  if (message) {
    status.textContent = message;
    return;
  }

  if (!state.lastSavedAt) {
    status.textContent = `Save schema v${SAVE_SCHEMA_VERSION} • autosave ready`;
    return;
  }

  const date = new Date(state.lastSavedAt);
  const time = Number.isNaN(date.getTime())
    ? "recently"
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  status.textContent = `v${SAVE_SCHEMA_VERSION} • saved ${time}`;
}

function updateBackupButton() {
  const button = el("restoreBackupBtn");
  if (!button) return;

  let backup = null;
  try {
    backup = JSON.parse(localStorage.getItem(UPDATE_BACKUP_KEY) || "null");
  } catch {}

  button.classList.toggle("hidden", !backup?.raw);
  if (backup?.createdAt) {
    const date = new Date(backup.createdAt);
    button.title = `Backup created ${date.toLocaleString()} from save version ${backup.fromVersion || "legacy"}`;
  }
}

function restorePreUpdateBackup() {
  let backup = null;
  try {
    backup = JSON.parse(localStorage.getItem(UPDATE_BACKUP_KEY) || "null");
  } catch {}

  if (!backup?.raw) return toast("No pre-update backup is available.");
  if (!confirm("Restore the automatic pre-update backup? Your current save will be replaced, then migrated again on reload.")) return;

  localStorage.setItem(STORAGE_KEY, backup.raw);
  location.reload();
}

function saveGame(showToast = true) {
  state.saveSchemaVersion = SAVE_SCHEMA_VERSION;
  state.lastSavedAt = new Date().toISOString();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(SAVE_META_KEY, JSON.stringify({
      saveSchemaVersion: SAVE_SCHEMA_VERSION,
      lastSavedAt: state.lastSavedAt,
      ownerName: state.ownerName,
      stableName: state.stableName
    }));
    updateSaveSafetyStatus();
    updateBackupButton();
    if (showToast) toast("Game saved.");
  } catch {
    toast("Save failed. Your browser may be out of local storage space.");
  }
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;

  try {
    const parsed = JSON.parse(raw);
    const sourceVersion = Number(parsed?.saveSchemaVersion || parsed?.version || 1);

    state = migrateSaveData(parsed, raw);
    recalcHorseValues();

    if (!state.auction.horse) refreshAuction(false);
    if (!state.world?.weather?.name) initializeWorldWeather();

    // Immediately write the migrated representation back into the SAME original save key.
    // This preserves the player's career while upgrading its structure.
    if (sourceVersion < SAVE_SCHEMA_VERSION) {
      addLog(`Save safely upgraded from schema v${sourceVersion} to v${SAVE_SCHEMA_VERSION}.`);
      saveGame(false);
    }

    updateSaveSafetyStatus();
    updateBackupButton();
    return true;
  } catch (error) {
    console.error("Stable Empire save load failed:", error);
    return false;
  }
}

function startNewGame() {
  const ownerName = el("ownerNameInput").value.trim() || "Stable Owner";
  const stableName = el("stableNameInput").value.trim() || "Dusty Creek Stables";
  const starterBreed = el("starterHorseInput").value;

  state = DEFAULT_STATE();
  state.ownerName = ownerName;
  state.stableName = stableName;
  state.stableStyle.signText = stableName;

  const horse = createHorse(starterBreed, true);
  state.horses = [horse];

  initializeWorldWeather();
  refreshMarket();
  refreshAuction(false);
  generateContracts();
  addLog(`${ownerName} officially opened ${stableName}.`);

  saveGame(false);
  el("newGameModal").classList.add("hidden");
  renderAll();
  toast("Welcome to Stable Empire.");
  maybePlayCutscene("newGame");
}

function refreshMarket() {
  state.market = Array.from({ length: 4 }, () => createHorse());
  state.market.forEach(h => {
    h.value = Math.round(horseValue(h) * (1.05 + Math.random() * .2));
  });
}

function generateContracts() {
  const templates = [
    {
      title: "Basic Training",
      desc: "Raise any horse's training level through a training session.",
      reward: rand(180, 320),
      days: 5,
      type: "training",
      category: "Training"
    },
    {
      title: "Race Preparation",
      desc: "Complete a practice session at the Cedar Valley Race Track.",
      reward: rand(160, 280),
      days: 4,
      type: "practice",
      category: "Racing"
    },
    {
      title: "Horse Care",
      desc: "Feed and groom any horse on the same day.",
      reward: rand(90, 170),
      days: 3,
      type: "care",
      category: "Care"
    },
    {
      title: "Stable Maintenance",
      desc: "Repair any part of your stable property.",
      reward: rand(120, 220),
      days: 6,
      type: "repair",
      category: "Property"
    },
    {
      title: "Trail Conditioning",
      desc: "Take one of your horses riding on the Oak Hollow Trails.",
      reward: rand(130, 230),
      days: 4,
      type: "trail",
      category: "Riding"
    },
    {
      title: "Local Horse Purchase",
      desc: "Purchase a horse from the Cedar Valley Horse Market.",
      reward: rand(140, 250),
      days: 6,
      type: "buyHorse",
      category: "Trading"
    },
    {
      title: "Successful Sale",
      desc: "Sell one of your horses to a new owner.",
      reward: rand(160, 300),
      days: 6,
      type: "sellHorse",
      category: "Trading"
    },
    {
      title: "Stable Expansion",
      desc: "Expand your stable to increase horse capacity.",
      reward: rand(250, 420),
      days: 8,
      type: "expand",
      category: "Property"
    },
    {
      title: "Hire a Helping Hand",
      desc: "Hire any staff member for your stable.",
      reward: rand(130, 240),
      days: 5,
      type: "hireStaff",
      category: "Staff"
    },
    {
      title: "County Competition",
      desc: "Enter any eligible horse in an official County Race.",
      reward: rand(180, 320),
      days: 5,
      type: "raceEntry",
      category: "Racing"
    },
    {
      title: "Winning Form",
      desc: "Win an official County Race.",
      reward: rand(350, 600),
      days: 8,
      type: "raceWin",
      category: "Racing"
    },
    {
      title: "Specialist Training",
      desc: "Give a horse an official specialization after reaching the training requirement.",
      reward: rand(220, 380),
      days: 7,
      type: "specialize",
      category: "Training"
    }
  ];

  // Never remove contracts that the player already accepted.
  // This was the old bug: board refreshes replaced the entire contract list.
  const activeContracts = state.contracts.filter(c => c.accepted && !c.completed && !c.failed);

  // Keep a small completed-history section so the player can see recent successes.
  const recentCompleted = state.contracts
    .filter(c => c.completed)
    .slice(-3);

  const existingTitles = new Set([
    ...activeContracts.map(c => c.title),
    ...recentCompleted.map(c => c.title)
  ]);

  const availablePool = shuffle(
    templates.filter(template => !existingTitles.has(template.title))
  );

  const availableContracts = availablePool.slice(0, 6).map(c => ({
    ...c,
    id: `${Date.now()}-${Math.random()}`,
    accepted: false,
    completed: false,
    failed: false,
    durationDays: c.days,
    daysLeft: c.days
  }));

  state.contracts = [...activeContracts, ...availableContracts, ...recentCompleted];
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - .5);
}

function checkContracts(actionType) {
  let completed = 0;

  state.contracts.forEach(c => {
    if (c.accepted && !c.completed && !c.failed && c.type === actionType) {
      c.completed = true;
      c.accepted = false;
      earn(c.reward);
      state.reputation += c.source === "customer" ? 4 : 3;
      state.stats.contractsCompleted += 1;

      if (c.source === "customer") {
        state.customers.completed += 1;
        state.marketing.exposure += 1;
      }

      addLog(`Completed ${c.source === "customer" ? "customer job" : "contract"} "${c.title}" and earned ${money(c.reward)}.`);
      completed++;
    }
  });

  if (completed) {
    toast(completed > 1
      ? `${completed} jobs completed! Rewards paid.`
      : "Job completed! Reward paid.");
  }
}


function initializeWorldWeather() {
  const season = seasons()[state.seasonIndex];
  const options = WEATHER_BY_SEASON[season] || WEATHER_BY_SEASON.Spring;
  state.world.weather = { ...choice(options) };
  state.world.forecast = { ...choice(options) };
}

function advanceWorldWeather() {
  const season = seasons()[state.seasonIndex];
  const options = WEATHER_BY_SEASON[season] || WEATHER_BY_SEASON.Spring;
  state.world.weather = state.world.forecast?.name ? { ...state.world.forecast } : { ...choice(options) };
  state.world.forecast = { ...choice(options) };
}

function weatherPracticeModifier() {
  const weather = state.world?.weather?.name || "Clear";
  if (estateBuildingCount("indoorArena")) return 1;
  if (["Thunderstorm", "Storm"].includes(weather)) return .72;
  if (["Rain", "Snow"].includes(weather)) return .84;
  return 1;
}

function weatherExtraEnergy() {
  const weather = state.world?.weather?.name || "Clear";
  if (["Hot", "Snow", "Cold"].includes(weather)) return 3;
  if (["Thunderstorm", "Storm"].includes(weather)) return 5;
  return 0;
}

function weatherSummary() {
  const weather = state.world?.weather || { name: "Clear", icon: "☀️", note: "" };
  return `${weather.icon} ${weather.name}`;
}

function usedEstateAcres() {
  return ESTATE_BUILDINGS.reduce((sum, building) => {
    return sum + estateBuildingCount(building.id) * building.acres;
  }, 0);
}

function availableEstateAcres() {
  return Math.max(0, Number(state.estate.landAcres || 0) - usedEstateAcres());
}

function landPurchaseCost() {
  return 2500 + Number(state.estate.landPurchases || 0) * 1250;
}

function buildEstateFacility(id) {
  const building = ESTATE_BUILDINGS.find(b => b.id === id);
  if (!building) return;

  const current = estateBuildingCount(id);
  if (current >= building.max) return toast(`${building.name} is already at its maximum level.`);
  if (availableEstateAcres() < building.acres) return toast("You need more land before building this facility.");
  if (!spend(building.cost)) return;

  state.estate.buildings[id] = current + 1;

  if (id === "extraBarn") state.capacity += 4;
  if (id === "paddock") state.capacity += 1;
  if (id === "feedWarehouse" && current === 0) state.inventory.feed += 20;

  state.reputation += 2;
  addLog(`Built ${building.name} on the stable estate.`);
  saveGame(false);
  renderAll();
  toast(`${building.name} completed.`);
}

function buyEstateLand() {
  const cost = landPurchaseCost();
  if (!spend(cost)) return;

  state.estate.landAcres += 5;
  state.estate.landPurchases += 1;
  state.reputation += 1;
  addLog(`Purchased 5 additional acres for ${money(cost)}.`);
  saveGame(false);
  renderAll();
}

function eligibleBreedingMares() {
  return state.horses.filter(h =>
    h.sex === "Mare" &&
    h.age >= 3 &&
    !h.retired &&
    !h.injury &&
    !h.breeding?.pregnant &&
    Number(h.breeding?.uses || 0) < Number(h.breeding?.maxUses || 3)
  );
}

function eligibleBreedingStallions() {
  return state.horses.filter(h =>
    h.sex === "Stallion" &&
    h.age >= 3 &&
    !h.retired &&
    !h.injury &&
    Number(h.breeding?.uses || 0) < Number(h.breeding?.maxUses || 6)
  );
}

function breedingFee() {
  return estateBuildingCount("foalingBarn") ? 175 : 250;
}

function breedSelectedHorses() {
  const mare = state.horses.find(h => h.id === el("breedingMareSelect")?.value);
  const stallion = state.horses.find(h => h.id === el("breedingStallionSelect")?.value);

  if (!mare || !stallion) return toast("Choose an eligible mare and stallion.");
  if (!eligibleBreedingMares().some(h => h.id === mare.id)) return toast(`${mare.name} is not currently eligible to breed.`);
  if (!eligibleBreedingStallions().some(h => h.id === stallion.id)) return toast(`${stallion.name} is not currently eligible to breed.`);
  if (!spend(breedingFee())) return;

  mare.breeding.pregnant = true;
  mare.breeding.dueInDays = estateBuildingCount("foalingBarn") ? 9 : 12;
  mare.breeding.mateId = stallion.id;
  mare.breeding.mateName = stallion.name;
  mare.breeding.uses += 1;
  stallion.breeding.uses += 1;

  state.playerSkills.breeding += Math.random() < .55 ? 1 : 0;
  addLog(`${mare.name} was bred to ${stallion.name}. Foal expected in ${mare.breeding.dueInDays} days.`);
  saveGame(false);
  renderAll();
  toast("Breeding completed.");
}

function createFoalFromParents(mare, stallion) {
  const parentPotential = key => Math.round(
    ((mare.potential?.[key] || mare[key]) + (stallion?.potential?.[key] || stallion?.[key] || mare[key])) / 2
  );

  const foalSex = Math.random() < .5 ? "Mare" : "Stallion";
  const sameBreed = stallion && mare.breed === stallion.breed;
  const breed = sameBreed ? mare.breed : choice([mare.breed, stallion?.breed || mare.breed]);
  const coat = Math.random() < .44 ? mare.coat : Math.random() < .78 && stallion ? stallion.coat : choice(COATS);
  const base = rand(15, 28);

  const foal = normalizeHorseData({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    name: choice(["Promise", "Legacy", "Comet", "Meadow", "Echo", "Valor", "Dawn", "Ember", "Riverlight", "Clover"]),
    breed,
    sex: foalSex,
    age: 0,
    coat,
    temperament: Math.random() < .5 ? mare.temperament : stallion?.temperament || choice(TEMPERAMENTS),
    trait: Math.random() < .38 ? mare.trait : Math.random() < .7 && stallion ? stallion.trait : choice(TRAITS),
    health: estateBuildingCount("foalingBarn") ? rand(90, 100) : rand(82, 98),
    energy: 100,
    bond: 18,
    speed: clamp(base + rand(-4, 5), 10, 38),
    stamina: clamp(base + rand(-4, 5), 10, 38),
    handling: clamp(base + rand(-4, 5), 10, 38),
    strength: clamp(base + rand(-4, 5), 10, 38),
    intelligence: clamp(base + rand(-4, 5), 10, 38),
    training: 0,
    specialization: "None",
    fitness: 22,
    stress: 5,
    pedigree: {
      sire: stallion?.name || mare.breeding?.mateName || "Unknown",
      dam: mare.name,
      generation: Math.max(Number(mare.pedigree?.generation || 1), Number(stallion?.pedigree?.generation || 1)) + 1,
      bloodline: `${mare.name} × ${stallion?.name || mare.breeding?.mateName || "Unknown"}`
    },
    breeding: { pregnant: false, dueInDays: 0, mateId: null, mateName: null, uses: 0, maxUses: foalSex === "Mare" ? 3 : 6 },
    healthRecords: [`Y${state.year} ${seasons()[state.seasonIndex]} ${state.day}: Born at ${state.stableName}`]
  });

  HORSE_STAT_KEYS.forEach(key => {
    const inherited = parentPotential(key) + rand(-5, 7) + Math.floor(state.playerSkills.breeding / 5);
    foal.potential[key] = clamp(Math.max(foal[key], inherited), foal[key], 100);
  });

  foal.genetics.coatGene = coatGeneFor(foal.coat);
  foal.value = horseValue(foal);
  return foal;
}

function processPregnancies() {
  const births = [];

  state.horses.forEach(mare => {
    if (!mare.breeding?.pregnant) return;

    mare.breeding.dueInDays = Math.max(0, Number(mare.breeding.dueInDays || 1) - 1);

    if (mare.breeding.dueInDays <= 0) {
      const stallion = state.horses.find(h => h.id === mare.breeding.mateId);
      const foal = createFoalFromParents(mare, stallion);

      mare.breeding.pregnant = false;
      mare.breeding.dueInDays = 0;
      mare.breeding.mateId = null;
      mare.breeding.mateName = null;

      births.push({ mare, foal });
    }
  });

  births.forEach(({ mare, foal }) => {
    state.horses.push(foal);
    state.reputation += 2;
    addLog(`${mare.name} delivered a healthy ${horseSexLabel(foal)} named ${foal.name}.`);
    toast(`${foal.name} was born at ${state.stableName}!`);
  });
}

function renderBreeding() {
  const mares = eligibleBreedingMares();
  const stallions = eligibleBreedingStallions();
  const pregnant = state.horses.filter(h => h.breeding?.pregnant);
  const bloodlines = state.horses
    .filter(h => Number(h.pedigree?.generation || 1) > 1)
    .sort((a,b) => Number(b.pedigree.generation) - Number(a.pedigree.generation));

  el("breedingView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">BREEDING PROGRAM</div>
        <h2>Bloodlines & Foals</h2>
        <p>Build multi-generation lines with inherited potential, traits, coats and pedigrees.</p>
      </div>
      <span class="pill gold">Breeding Skill ${state.playerSkills.breeding}</span>
    </div>

    <div class="grid two">
      <div class="card">
        <h3>Plan a Breeding</h3>
        <p>Both horses must be age 3+, healthy, uninjured and have breeding uses remaining.</p>

        <label>Mare
          <select id="breedingMareSelect">
            ${mares.length
              ? mares.map(h => `<option value="${h.id}">${escapeHtml(h.name)} — Gen ${h.pedigree.generation} • ${h.breeding.uses}/${h.breeding.maxUses} uses</option>`).join("")
              : `<option value="">No eligible mares</option>`
            }
          </select>
        </label>

        <label style="margin-top:.6rem">Stallion
          <select id="breedingStallionSelect">
            ${stallions.length
              ? stallions.map(h => `<option value="${h.id}">${escapeHtml(h.name)} — Gen ${h.pedigree.generation} • ${h.breeding.uses}/${h.breeding.maxUses} uses</option>`).join("")
              : `<option value="">No eligible stallions</option>`
            }
          </select>
        </label>

        <div class="notice" style="margin-top:.8rem">
          Breeding fee: <strong>${money(breedingFee())}</strong><br>
          Pregnancy length: <strong>${estateBuildingCount("foalingBarn") ? 9 : 12} game days</strong>
          ${estateBuildingCount("foalingBarn") ? " • Foaling Barn bonus active" : ""}
        </div>

        <button id="breedHorsesBtn" class="primary" style="margin-top:.8rem" ${mares.length && stallions.length ? "" : "disabled"}>
          Breed Selected Horses
        </button>
      </div>

      <div class="card">
        <h3>Expecting Mares</h3>
        <div class="list">
          ${pregnant.length ? pregnant.map(mare => `
            <div class="list-item">
              <div class="row">
                <div>
                  <strong>${escapeHtml(mare.name)}</strong>
                  <div class="muted">Bred to ${escapeHtml(mare.breeding.mateName || "Unknown")}</div>
                </div>
                <span class="pill gold">${mare.breeding.dueInDays} days</span>
              </div>
            </div>
          `).join("") : `<div class="muted">No mares are currently in foal.</div>`}
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:1rem">
      <div class="row wrap">
        <div>
          <h3 style="margin-bottom:.2rem">Bloodline Book</h3>
          <div class="muted">Home-bred horses automatically record sire, dam and generation.</div>
        </div>
        <span class="pill">${bloodlines.length} home-bred</span>
      </div>

      <div class="grid three" style="margin-top:.8rem">
        ${bloodlines.length ? bloodlines.map(h => `
          <div class="list-item">
            <strong>${escapeHtml(h.name)}</strong>
            <div class="muted">${escapeHtml(h.breed)} • Generation ${h.pedigree.generation}</div>
            <div style="margin-top:.4rem"><small>Sire</small><br>${escapeHtml(h.pedigree.sire || "Unknown")}</div>
            <div style="margin-top:.35rem"><small>Dam</small><br>${escapeHtml(h.pedigree.dam || "Unknown")}</div>
            <div style="margin-top:.35rem"><small>Potential</small><br><strong>${averagePotential(h)}</strong>/100</div>
          </div>
        `).join("") : `<div class="notice">Your first home-bred foal will appear here.</div>`}
      </div>
    </div>
  `;

  const button = el("breedHorsesBtn");
  if (button) button.addEventListener("click", breedSelectedHorses);
}

function generateCustomerLead(force = false) {
  if (state.customers.leads.length >= 5) return false;

  const chance = .10 + Math.min(.36, state.marketing.exposure / 180) + Math.min(.12, state.reputation / 500);
  if (!force && Math.random() > chance) return false;

  const customer = choice(CUSTOMER_NAMES);
  const job = choice(CUSTOMER_JOB_TYPES);
  const reputationBonus = Math.round(state.reputation * 1.8);
  const reward = rand(job.min, job.max) + reputationBonus;

  state.customers.leads.push({
    id: `${Date.now()}-${Math.random()}`,
    customer,
    title: job.title,
    desc: job.desc,
    type: job.type,
    reward,
    daysLeft: rand(4, 7)
  });

  addLog(`${customer} contacted the stable about ${job.title.toLowerCase()}.`);
  return true;
}

function acceptCustomerLead(id) {
  const lead = state.customers.leads.find(l => l.id === id);
  if (!lead) return;

  state.contracts.push({
    id: `customer-${lead.id}`,
    title: `${lead.customer}: ${lead.title}`,
    desc: lead.desc,
    reward: lead.reward,
    days: lead.daysLeft,
    durationDays: lead.daysLeft,
    daysLeft: lead.daysLeft,
    type: lead.type,
    category: "Customer",
    source: "customer",
    customer: lead.customer,
    accepted: true,
    completed: false,
    failed: false
  });

  state.customers.leads = state.customers.leads.filter(l => l.id !== id);
  addLog(`Accepted ${lead.customer}'s customer job.`);
  saveGame(false);
  renderAll();
}

function processCustomerLeads() {
  state.customers.leads.forEach(lead => lead.daysLeft = Math.max(0, Number(lead.daysLeft || 1) - 1));
  state.customers.leads = state.customers.leads.filter(lead => lead.daysLeft > 0);
  generateCustomerLead(false);
}

function processRivals() {
  state.rivals.forEach(rival => {
    if (Math.random() < .32) {
      rival.reputation += rand(0, 2);
    }
    if (Math.random() < .16) {
      rival.wins += 1;
      rival.reputation += 1;
    }
    if (Math.random() < .10) {
      rival.horses = clamp(rival.horses + choice([-1, 1]), 4, 14);
    }
  });
}

function refreshAuction(logIt = true) {
  const horse = createHorse(choice(BREEDS));
  horse.age = rand(3, 8);
  horse.training = rand(10, 48);
  horse.fitness = rand(48, 82);
  HORSE_STAT_KEYS.forEach(key => {
    horse.potential[key] = clamp(Math.max(horse.potential[key], horse[key] + rand(10, 24)), horse[key], 100);
  });
  horse.value = horseValue(horse);

  const opening = Math.max(350, Math.round(horse.value * .58 / 50) * 50);
  const bidder = choice(state.rivals);

  state.auction = {
    horse,
    currentBid: opening,
    highBidder: "NPC",
    highBidderName: bidder?.name || "County Bidder",
    daysLeft: 1
  };

  if (logIt) addLog(`A new ${horse.breed} entered the Cedar Valley auction.`);
}

function placeAuctionBid() {
  if (!state.auction?.horse) refreshAuction(false);

  const increment = Math.max(100, Math.round(state.auction.currentBid * .08 / 50) * 50);
  const bid = state.auction.currentBid + increment;

  if (state.money < bid) return toast(`You need ${money(bid)} available to make that bid.`);
  if (state.horses.length >= state.capacity) return toast("You need an open stall before bidding.");

  state.auction.currentBid = bid;
  state.auction.highBidder = "player";
  state.auction.highBidderName = state.stableName;

  const npcInterest = .48 + Math.max(0, 55 - state.reputation) * .002;
  if (Math.random() < npcInterest) {
    const rival = choice(state.rivals);
    state.auction.currentBid += Math.max(100, Math.round(state.auction.currentBid * .06 / 50) * 50);
    state.auction.highBidder = "NPC";
    state.auction.highBidderName = rival.name;
    toast(`${rival.name} countered your bid.`);
  } else {
    toast(`You are the high bidder at ${money(state.auction.currentBid)}.`);
  }

  saveGame(false);
  renderTown();
}

function processAuctionDay() {
  if (!state.auction?.horse) {
    refreshAuction(false);
    return;
  }

  state.auction.daysLeft = Math.max(0, Number(state.auction.daysLeft || 1) - 1);
  if (state.auction.daysLeft > 0) return;

  if (state.auction.highBidder === "player") {
    if (state.horses.length < state.capacity && state.money >= state.auction.currentBid) {
      const horse = normalizeHorseData(state.auction.horse);
      state.money -= state.auction.currentBid;
      state.horses.push(horse);
      state.reputation += 1;
      state.questStats.marketPurchases += 1;
      addLog(`Won ${horse.name} at auction for ${money(state.auction.currentBid)}.`);
    } else {
      addLog(`You could not complete the auction purchase for ${state.auction.horse.name}.`);
    }
  } else {
    addLog(`${state.auction.highBidderName} won ${state.auction.horse.name} at the county auction.`);
  }

  refreshAuction(false);
}

function renderRivalStandings() {
  const rows = [
    { name: state.stableName, owner: state.ownerName, focus: "Your Stable", reputation: state.reputation, wins: state.raceRecord.wins, horses: state.horses.length, player: true },
    ...state.rivals
  ].sort((a,b) => b.reputation - a.reputation);

  return `
    <div class="rival-standings">
      ${rows.map((rival, index) => `
        <div class="rival-row ${rival.player ? "player" : ""}">
          <span class="rank-number">#${index + 1}</span>
          <div>
            <strong>${escapeHtml(rival.name)}</strong>
            <small>${escapeHtml(rival.owner || "")} • ${escapeHtml(rival.focus || "")}</small>
          </div>
          <div class="rival-numbers">
            <span>⭐ ${rival.reputation}</span>
            <span>🏆 ${rival.wins}</span>
            <span>🐴 ${rival.horses}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderHeader() {
  el("money").textContent = money(state.money);
  el("date").textContent = `${seasons()[state.seasonIndex]} ${state.day}, Y${state.year}`;
  el("energy").textContent = state.energy;
  el("reputation").textContent = state.reputation;
  el("stableNameSidebar").textContent = state.stableName;
  el("stableLevelSidebar").textContent = `Level ${state.stableLevel} • ${state.horses.length}/${state.capacity} horses`;
}



function resolveSceneValue(value) {
  return typeof value === "function" ? value() : value;
}

function riverviewRelationship() {
  return Number(state.relationships.riverview || 0);
}

function riverviewRelationshipLabel() {
  const value = riverviewRelationship();
  if (value >= 30) return "Trusted Ally";
  if (value >= 12) return "Respectful";
  if (value <= -30) return "Bitter Rival";
  if (value <= -12) return "Competitive Rival";
  return "Neutral";
}

function cutsceneById(id) {
  return CUTSCENES.find(scene => scene.id === id);
}

function cutsceneForTrigger(type, questId = null) {
  return CUTSCENES.find(scene =>
    scene.trigger?.type === type &&
    (questId === null || scene.trigger?.questId === questId)
  );
}

function unlockCutscene(id) {
  if (!state.cutscenes.seen.includes(id)) {
    state.cutscenes.seen.push(id);
  }
}

function maybePlayCutscene(type, questId = null) {
  const scene = cutsceneForTrigger(type, questId);
  if (!scene) return false;
  if (state.cutscenes.seen.includes(scene.id)) return false;

  requestAnimationFrame(() => startCutscene(scene.id));
  return true;
}

function startCutscene(sceneId, { replay = false } = {}) {
  const scene = cutsceneById(sceneId);
  if (!scene) return;

  activeCutscene = scene;
  cutsceneLineIndex = 0;
  cutsceneReplayMode = replay;

  const overlay = el("cutsceneOverlay");
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("cutscene-open");

  const bg = el("cutsceneBackground");
  bg.src = scene.background;
  bg.alt = scene.title;

  el("cutsceneTitle").textContent = scene.title;
  el("cutsceneChapter").textContent = scene.chapter || "STORY CINEMATIC";

  const music = el("bgMusic");
  if (music && !music.paused) {
    cutsceneMusicVolumeBefore = music.volume;
    music.volume = Math.max(0.04, audioPrefs.volume * .32);
  } else {
    cutsceneMusicVolumeBefore = null;
  }

  updateCutsceneVoiceButton();
  renderCutsceneLine();
}

function closeCutscene({ skipped = false } = {}) {
  if (!activeCutscene) return;

  if (!cutsceneReplayMode) {
    unlockCutscene(activeCutscene.id);
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  const overlay = el("cutsceneOverlay");
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cutscene-open");

  const music = el("bgMusic");
  if (music && cutsceneMusicVolumeBefore !== null) {
    music.volume = audioPrefs.volume;
  }

  const finishedScene = activeCutscene;
  activeCutscene = null;
  cutsceneLineIndex = 0;
  cutsceneReplayMode = false;
  cutsceneMusicVolumeBefore = null;

  saveGame(false);
  renderStory();

  if (skipped) toast(`Skipped "${finishedScene.title}".`);
}

function speakCutsceneLine(line) {
  if (!state.cutscenes.voiceEnabled || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const text = String(resolveSceneValue(line.text) || "").trim();
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const character = line.character ? CUTSCENE_CHARACTERS[line.character] : null;

  utterance.pitch = character?.voice?.pitch || 1;
  utterance.rate = character?.voice?.rate || 0.95;
  utterance.volume = 0.9;

  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter(v => /^en/i.test(v.lang || ""));
  if (englishVoices.length) {
    const offset = line.character
      ? Object.keys(CUTSCENE_CHARACTERS).indexOf(line.character)
      : 0;
    utterance.voice = englishVoices[Math.abs(offset) % englishVoices.length];
  }

  window.speechSynthesis.speak(utterance);
}

function updateCutsceneVoiceButton() {
  const button = el("cutsceneVoiceBtn");
  if (!button) return;

  const supported = "speechSynthesis" in window;
  button.disabled = !supported;
  button.textContent = state.cutscenes.voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off";
  button.title = supported
    ? "Use your browser's installed voices for spoken dialogue"
    : "Spoken dialogue is not supported in this browser";
}

function toggleCutsceneVoice() {
  if (!("speechSynthesis" in window)) return;

  state.cutscenes.voiceEnabled = !state.cutscenes.voiceEnabled;
  if (!state.cutscenes.voiceEnabled) window.speechSynthesis.cancel();

  updateCutsceneVoiceButton();
  saveGame(false);

  if (state.cutscenes.voiceEnabled && activeCutscene) {
    speakCutsceneLine(activeCutscene.lines[cutsceneLineIndex]);
  }
}

function renderCutsceneLine() {
  if (!activeCutscene) return;

  const line = activeCutscene.lines[cutsceneLineIndex];
  if (!line) {
    closeCutscene();
    return;
  }

  const speaker = resolveSceneValue(line.speaker) || "Narrator";
  const text = resolveSceneValue(line.text) || "";
  const character = line.character ? CUTSCENE_CHARACTERS[line.character] : null;

  el("cutsceneSpeaker").textContent = speaker;
  el("cutsceneText").textContent = text;
  el("cutsceneProgress").textContent = `${cutsceneLineIndex + 1} / ${activeCutscene.lines.length}`;

  const portrait = el("cutsceneCharacter");
  if (character) {
    portrait.src = character.image;
    portrait.alt = character.name;
    portrait.classList.remove("hidden");
    portrait.classList.remove("enter");
    void portrait.offsetWidth;
    portrait.classList.add("enter");
  } else {
    portrait.classList.add("hidden");
    portrait.removeAttribute("src");
    portrait.alt = "";
  }

  const relationship = el("cutsceneRelationship");
  if (line.character === "eleanor") {
    relationship.textContent = `Riverview: ${riverviewRelationshipLabel()} (${riverviewRelationship() >= 0 ? "+" : ""}${riverviewRelationship()})`;
    relationship.classList.remove("hidden");
  } else {
    relationship.classList.add("hidden");
  }

  const choices = el("cutsceneChoices");
  const continueButton = el("cutsceneContinueBtn");

  if (Array.isArray(line.choices) && line.choices.length) {
    choices.innerHTML = line.choices.map((choice, index) => `
      <button type="button" data-cutscene-choice="${index}">
        ${escapeHtml(resolveSceneValue(choice.label))}
      </button>
    `).join("");
    choices.classList.remove("hidden");
    continueButton.classList.add("hidden");

    choices.querySelectorAll("[data-cutscene-choice]").forEach(button => {
      button.addEventListener("click", () => chooseCutsceneOption(Number(button.dataset.cutsceneChoice)));
    });
  } else {
    choices.innerHTML = "";
    choices.classList.add("hidden");
    continueButton.classList.remove("hidden");
    continueButton.textContent = cutsceneLineIndex === activeCutscene.lines.length - 1 ? "Finish Scene" : "Continue";
  }

  speakCutsceneLine(line);
}

function chooseCutsceneOption(index) {
  if (!activeCutscene) return;

  const line = activeCutscene.lines[cutsceneLineIndex];
  const choice = line?.choices?.[index];
  if (!choice) return;

  if (typeof choice.relationship === "number") {
    state.relationships.riverview = clamp(
      riverviewRelationship() + choice.relationship,
      -100,
      100
    );
  }

  if (choice.flag) {
    state.cutscenes.flags[choice.flag] = choice.value ?? true;
  }

  saveGame(false);
  nextCutsceneLine();
}

function nextCutsceneLine() {
  if (!activeCutscene) return;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  cutsceneLineIndex += 1;

  if (cutsceneLineIndex >= activeCutscene.lines.length) {
    closeCutscene();
    return;
  }

  renderCutsceneLine();
}

function replayCutscene(sceneId) {
  if (!state.cutscenes.seen.includes(sceneId)) return;
  startCutscene(sceneId, { replay: true });
}

function renderCinematicArchive() {
  const unlocked = CUTSCENES.filter(scene => state.cutscenes.seen.includes(scene.id));

  return `
    <div class="card cinematic-archive">
      <div class="row wrap">
        <div>
          <h3 style="margin-bottom:.2rem">🎬 Cinematic Archive</h3>
          <div class="muted">Replay major story scenes you have already unlocked.</div>
        </div>
        <span class="pill">${unlocked.length}/${CUTSCENES.length} unlocked</span>
      </div>

      <div class="cinematic-archive-grid">
        ${unlocked.length ? unlocked.map(scene => `
          <button class="cinematic-replay-card" type="button" data-replay-cutscene="${scene.id}">
            <img src="${scene.background}" alt="">
            <span>
              <small>${escapeHtml(scene.chapter)}</small>
              <strong>${escapeHtml(scene.title)}</strong>
            </span>
          </button>
        `).join("") : `
          <div class="notice">Story cinematics will appear here after you encounter them.</div>
        `}
      </div>

      <div class="cinematic-settings">
        <div>
          <strong>Spoken Dialogue</strong>
          <div class="muted">Uses voices installed in the player's browser. Custom recorded/AI voice files can replace this later.</div>
        </div>
        <button id="storyVoiceToggleBtn" type="button">
          ${state.cutscenes.voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off"}
        </button>
      </div>
    </div>
  `;
}

function setupCinematicArchiveEvents() {
  document.querySelectorAll("[data-replay-cutscene]").forEach(button => {
    button.addEventListener("click", () => replayCutscene(button.dataset.replayCutscene));
  });

  const voiceButton = el("storyVoiceToggleBtn");
  if (voiceButton) {
    voiceButton.addEventListener("click", () => {
      state.cutscenes.voiceEnabled = !state.cutscenes.voiceEnabled;
      saveGame(false);
      renderStory();
    });
  }
}

function currentStoryQuest() {
  if (state.story.finished) return null;

  return STORY_QUESTS.find(q => q.id === state.story.currentQuestId)
    || STORY_QUESTS.find(q => !state.story.completed.includes(q.id))
    || null;
}

function getStoryMetric(metric) {
  const specializedHorses = state.horses.filter(h => h.specialization && h.specialization !== "None").length;
  const propertyValues = Object.values(state.condition);
  const enteredTypes = Object.values(state.raceRecord.entriesByType || {}).filter(v => v > 0).length;
  const wonTypes = Object.values(state.raceRecord.winsByType || {}).filter(v => v > 0).length;

  switch (metric) {
    case "dailyCare":
      return state.horses.filter(h => h.fed && h.groomed).length;
    case "repairs":
      return state.questStats.repairs;
    case "storePurchases":
      return state.questStats.storePurchases;
    case "contractsCompleted":
      return state.stats.contractsCompleted;
    case "reputation":
      return state.reputation;
    case "practiceSessions":
      return state.raceRecord.practiceSessions;
    case "trailRides":
      return state.questStats.trailRides;
    case "horsesOwned":
      return state.horses.length;
    case "specializedHorses":
      return specializedHorses;
    case "staffOwned":
      return state.staff.length;
    case "competitionEntries":
      return state.raceRecord.entries;
    case "competitionWins":
      return state.raceRecord.wins;
    case "competitionTypesEntered":
      return enteredTypes;
    case "campaignsStarted":
      return state.questStats.campaignsStarted;
    case "exposure":
      return state.marketing.exposure;
    case "property80":
      return propertyValues.filter(v => v >= 80).length;
    case "marketPurchases":
      return state.questStats.marketPurchases;
    case "horsesSold":
      return state.stats.horsesSold;
    case "moneyEarned":
      return state.stats.moneyEarned;
    case "cash":
      return state.money;
    case "stableLevel":
      return state.stableLevel;
    case "allPropertyCondition":
      return propertyValues.length ? Math.min(...propertyValues) : 0;
    case "training80":
      return state.horses.filter(h => h.training >= 80).length;
    case "uniqueWins":
      return wonTypes;
    case "totalDays":
      return state.questStats.totalDays;
    default:
      return 0;
  }
}

function storyObjectiveStatus(objective) {
  const value = getStoryMetric(objective.metric);
  return {
    value,
    complete: value >= objective.target,
    percent: Math.min(100, Math.round((value / objective.target) * 100))
  };
}

function isStoryQuestComplete(quest) {
  return quest.objectives.every(objective => storyObjectiveStatus(objective).complete);
}

function applyStoryReward(reward = {}) {
  if (reward.money) earn(reward.money);
  if (reward.reputation) state.reputation += reward.reputation;
  if (reward.exposure) state.marketing.exposure += reward.exposure;
  if (reward.feed) state.inventory.feed += reward.feed;
  if (reward.treats) state.inventory.treats += reward.treats;
  if (reward.title) state.story.title = reward.title;
}

function rewardText(reward = {}) {
  const parts = [];
  if (reward.money) parts.push(money(reward.money));
  if (reward.reputation) parts.push(`+${reward.reputation} reputation`);
  if (reward.exposure) parts.push(`+${reward.exposure} exposure`);
  if (reward.feed) parts.push(`+${reward.feed} feed`);
  if (reward.treats) parts.push(`+${reward.treats} treats`);
  if (reward.title) parts.push(`Title: ${reward.title}`);
  return parts.join(" • ");
}

function claimStoryQuest() {
  const quest = currentStoryQuest();
  if (!quest || !isStoryQuestComplete(quest)) return;

  if (!state.story.completed.includes(quest.id)) {
    state.story.completed.push(quest.id);
  }

  applyStoryReward(quest.reward);
  addLog(`Story quest completed: "${quest.title}".`);

  const currentIndex = STORY_QUESTS.findIndex(q => q.id === quest.id);
  const nextQuest = STORY_QUESTS[currentIndex + 1];

  if (nextQuest) {
    state.story.currentQuestId = nextQuest.id;
    toast(`Quest complete! Next: ${nextQuest.title}`);
  } else {
    state.story.finished = true;
    toast("The Stable Empire campaign is complete!");
    addLog("Completed the Stable Empire story campaign.");
  }

  saveGame(false);
  renderAll();
  maybePlayCutscene("afterQuest", quest.id);
}

function renderStorySummaryCard() {
  const quest = currentStoryQuest();

  if (!quest) {
    return `
      <div class="card story-dashboard-card">
        <div class="row wrap">
          <div>
            <div class="eyebrow">STORY COMPLETE</div>
            <h3>The Stable Empire</h3>
          </div>
          <span class="pill gold">${escapeHtml(state.story.title || "Legacy Complete")}</span>
        </div>
        <p>You completed all ${STORY_QUESTS.length} quests across ${STORY_CHAPTERS.length} chapters.</p>
        <button data-open-story>View Story Record</button>
      </div>
    `;
  }

  const complete = isStoryQuestComplete(quest);
  const chapter = STORY_CHAPTERS.find(c => c.number === quest.chapter);

  return `
    <div class="card story-dashboard-card">
      <div class="row wrap">
        <div>
          <div class="eyebrow">CURRENT STORY QUEST</div>
          <h3>${escapeHtml(quest.title)}</h3>
        </div>
        <span class="pill ${complete ? "green" : "gold"}">Chapter ${quest.chapter}</span>
      </div>
      <div class="muted">${escapeHtml(chapter?.title || quest.chapterTitle)}</div>
      <p>${escapeHtml(quest.story)}</p>
      <button data-open-story class="${complete ? "primary" : ""}">
        ${complete ? "Claim Story Reward" : "Open Story"}
      </button>
    </div>
  `;
}

function renderStory() {
  const quest = currentStoryQuest();
  const completedCount = state.story.completed.length;
  const overallPercent = Math.round((completedCount / STORY_QUESTS.length) * 100);

  const currentChapter = quest
    ? STORY_CHAPTERS.find(chapter => chapter.number === quest.chapter)
    : STORY_CHAPTERS[STORY_CHAPTERS.length - 1];

  el("storyView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">STABLE EMPIRE CAMPAIGN</div>
        <h2>The Cedar Valley Legacy</h2>
        <p>A ${STORY_CHAPTERS.length}-chapter, ${STORY_QUESTS.length}-quest campaign that follows your stable from inheritance to county-wide success.</p>
      </div>
      <span class="pill gold">${completedCount}/${STORY_QUESTS.length} quests</span>
    </div>

    <div class="story-world-status">
      <div class="card">
        <span class="eyebrow">RIVERVIEW RELATIONSHIP</span>
        <strong>${escapeHtml(riverviewRelationshipLabel())}</strong>
        <div class="progress relationship-progress"><span style="width:${(riverviewRelationship() + 100) / 2}%"></span></div>
        <small>${riverviewRelationship() >= 0 ? "+" : ""}${riverviewRelationship()} relationship</small>
      </div>
      <div class="card">
        <span class="eyebrow">CINEMATICS</span>
        <strong>${state.cutscenes.seen.length}/${CUTSCENES.length} Unlocked</strong>
        <small>Major scenes trigger as you advance the campaign.</small>
      </div>
    </div>

    <div class="story-overall card">
      <div class="row wrap">
        <div>
          <strong>Campaign Progress</strong>
          <div class="muted">${overallPercent}% complete</div>
        </div>
        ${state.story.title ? `<span class="pill gold">${escapeHtml(state.story.title)}</span>` : ""}
      </div>
      <div class="progress" style="margin-top:.6rem">
        <span style="width:${overallPercent}%"></span>
      </div>
    </div>

    ${quest ? `
      <div class="story-hero card">
        <div class="story-chapter-kicker">CHAPTER ${quest.chapter} — ${escapeHtml(currentChapter?.title || "")}</div>
        <h3>${escapeHtml(quest.title)}</h3>
        <p class="story-narrative">${escapeHtml(quest.story)}</p>

        <div class="story-objectives">
          ${quest.objectives.map(objective => {
            const status = storyObjectiveStatus(objective);
            return `
              <div class="story-objective ${status.complete ? "complete" : ""}">
                <div class="row wrap">
                  <strong>${status.complete ? "✓" : "○"} ${escapeHtml(objective.label)}</strong>
                  <span>${Math.min(status.value, objective.target).toLocaleString()} / ${objective.target.toLocaleString()}</span>
                </div>
                <div class="progress">
                  <span style="width:${status.percent}%"></span>
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <div class="story-reward">
          <span>Quest Reward</span>
          <strong>${escapeHtml(rewardText(quest.reward))}</strong>
        </div>

        <button
          id="claimStoryQuestBtn"
          class="primary large"
          ${isStoryQuestComplete(quest) ? "" : "disabled"}
        >
          ${isStoryQuestComplete(quest) ? "Complete Quest & Claim Reward" : "Objectives Incomplete"}
        </button>
      </div>
    ` : `
      <div class="story-hero card">
        <div class="story-chapter-kicker">CAMPAIGN COMPLETE</div>
        <h3>The Stable Empire</h3>
        <p class="story-narrative">What began with an old barn and one dependable horse became one of Cedar Valley's defining stables.</p>
        <div class="notice">Final title: <strong>${escapeHtml(state.story.title || "Cedar Valley Stablemaster")}</strong></div>
      </div>
    `}

    <div class="story-chapters">
      ${STORY_CHAPTERS.map(chapter => {
        const chapterQuests = chapter.quests;
        const chapterCompleted = chapterQuests.filter(q => state.story.completed.includes(q.id)).length;
        const chapterActive = quest?.chapter === chapter.number;
        const unlocked = chapter.number <= (quest?.chapter || STORY_CHAPTERS.length);

        return `
          <div class="card story-chapter ${chapterActive ? "active" : ""} ${!unlocked ? "locked" : ""}">
            <div class="row wrap">
              <div>
                <div class="story-chapter-number">Chapter ${chapter.number}</div>
                <h3>${escapeHtml(chapter.title)}</h3>
                <div class="muted">${escapeHtml(chapter.subtitle)}</div>
              </div>
              <span class="pill ${chapterCompleted === chapterQuests.length ? "green" : ""}">
                ${chapterCompleted}/${chapterQuests.length}
              </span>
            </div>

            <div class="story-quest-list">
              ${chapterQuests.map(q => {
                const done = state.story.completed.includes(q.id);
                const active = quest?.id === q.id;
                const statusText = done ? "Completed" : active ? "Current Quest" : unlocked ? "Locked by previous quest" : "Locked";
                return `
                  <div class="story-quest-row ${done ? "done" : ""} ${active ? "current" : ""}">
                    <span>${done ? "✓" : active ? "➜" : "•"}</span>
                    <div>
                      <strong>${escapeHtml(q.title)}</strong>
                      <small>${statusText}</small>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      }).join("")}
    </div>

    ${renderCinematicArchive()}
  `;

  const claimButton = el("claimStoryQuestBtn");
  if (claimButton) claimButton.addEventListener("click", claimStoryQuest);
  setupCinematicArchiveEvents();
}

function renderDashboard() {
  const avgCondition = Math.round(Object.values(state.condition).reduce((a,b)=>a+b,0) / Object.keys(state.condition).length);
  const avgHorseHealth = state.horses.length ? Math.round(state.horses.reduce((a,h)=>a+h.health,0)/state.horses.length) : 0;
  const avgFitness = state.horses.length ? Math.round(state.horses.reduce((a,h)=>a+Number(h.fitness || 0),0)/state.horses.length) : 0;
  const activeCustomerJobs = state.contracts.filter(c => c.source === "customer" && c.accepted && !c.completed && !c.failed).length;

  el("dashboardView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">WELCOME BACK, ${escapeHtml(state.ownerName.toUpperCase())}</div>
        <h2>${escapeHtml(state.stableName)}</h2>
        <p>${seasons()[state.seasonIndex]}, Year ${state.year}. Build your reputation one horse at a time.</p>
      </div>
      <span class="pill gold">${escapeHtml(state.stableStyle.theme)}</span>
    </div>

    ${renderStorySummaryCard()}

    <div class="grid four">
      ${statCard("🐴 Horses", `${state.horses.length}/${state.capacity}`, "Current capacity")}
      ${statCard("🛠️ Property", `${avgCondition}%`, "Average condition")}
      ${statCard("💪 Fitness", `${avgFitness}%`, "Average horse fitness")}
      ${statCard("🏆 Event Wins", state.raceRecord.wins, `${state.raceRecord.entries} total entries`)}
    </div>

    <div class="grid three" style="margin-top:1rem">
      <div class="card weather-card">
        <div class="eyebrow">TODAY'S WEATHER</div>
        <div class="weather-main">${escapeHtml(state.world.weather.icon)} <strong>${escapeHtml(state.world.weather.name)}</strong></div>
        <p>${escapeHtml(state.world.weather.note)}</p>
        <small>Tomorrow: ${escapeHtml(state.world.forecast.icon)} ${escapeHtml(state.world.forecast.name)}</small>
      </div>

      <div class="card">
        <div class="eyebrow">CUSTOMER BUSINESS</div>
        <h3>${state.customers.leads.length} New Inquiries</h3>
        <p>${activeCustomerJobs} active customer job${activeCustomerJobs === 1 ? "" : "s"}.</p>
        <button data-dashboard-view="contracts">Open Customer Work</button>
      </div>

      <div class="card">
        <div class="eyebrow">ESTATE</div>
        <h3>${state.estate.landAcres} Acres</h3>
        <p>${usedEstateAcres().toFixed(1)} used • ${availableEstateAcres().toFixed(1)} available</p>
        <button data-dashboard-view="stable">Open Estate Builder</button>
      </div>
    </div>

    <div class="grid two" style="margin-top:1rem">
      <div class="card">
        <h3>Today's Stable</h3>
        <div class="list">
          ${state.horses.map(h => `
            <div class="list-item">
              <div class="row">
                <div>
                  <strong>${h.favorite ? "⭐ " : ""}${escapeHtml(h.name)}</strong>
                  <div class="muted">${escapeHtml(h.breed)} • ${escapeHtml(horseLifeStage(h))}</div>
                </div>
                <span class="pill ${h.injury ? "danger-pill" : ""}">${h.injury ? escapeHtml(h.injury.name) : `${h.health}% health`}</span>
              </div>
            </div>
          `).join("") || `<div class="muted">You do not own any horses yet.</div>`}
        </div>
      </div>

      <div class="card">
        <h3>Recent Events</h3>
        <div class="event-log">
          ${state.log.map(x => `<div>${escapeHtml(x)}</div>`).join("")}
        </div>
      </div>
    </div>

    <div class="grid two" style="margin-top:1rem">
      <div class="card">
        <h3>Player Skills</h3>
        ${skillLine("Riding", state.playerSkills.riding)}
        ${skillLine("Training", state.playerSkills.training)}
        ${skillLine("Horse Handling", state.playerSkills.handling)}
        ${skillLine("Business", state.playerSkills.business)}
        ${skillLine("Breeding", state.playerSkills.breeding)}
        ${skillLine("Veterinary", state.playerSkills.veterinary)}
      </div>
      <div class="card">
        <h3>Supplies</h3>
        <div class="grid three">
          ${inventoryTile("🌾", "Feed", state.inventory.feed)}
          ${inventoryTile("🍎", "Treats", state.inventory.treats)}
          ${inventoryTile("🪮", "Brushes", state.inventory.brushes)}
          ${inventoryTile("🩺", "Medicine", state.inventory.medicine)}
          ${inventoryTile("🧲", "Horseshoes", state.inventory.horseshoes)}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll("[data-open-story]").forEach(button => {
    button.addEventListener("click", () => switchView("story"));
  });

  document.querySelectorAll("[data-dashboard-view]").forEach(button => {
    button.addEventListener("click", () => switchView(button.dataset.dashboardView));
  });
}

function statCard(icon, value, label) {
  return `<div class="card stat-card"><div>${icon}</div><strong>${value}</strong><small>${label}</small></div>`;
}

function skillLine(name, value) {
  const pct = Math.min(100, value * 5);
  return `<div style="margin:.7rem 0">
    <div class="row"><span>${name}</span><strong>${value}</strong></div>
    <div class="progress"><span style="width:${pct}%"></span></div>
  </div>`;
}

function inventoryTile(icon, name, value) {
  return `<div class="list-item"><div>${icon}</div><strong>${value}</strong><div class="muted">${name}</div></div>`;
}

function renderHorses() {
  const favorites = [...state.horses].sort((a,b) => Number(b.favorite) - Number(a.favorite));

  el("horsesView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">YOUR HORSES</div>
        <h2>Stable Roster</h2>
        <p>Develop fitness, manage stress, protect health and train each horse toward its natural potential.</p>
      </div>
      <span class="pill">${state.horses.length}/${state.capacity} stalls occupied</span>
    </div>

    ${favorites.length ? `<div class="grid two">${favorites.map(renderHorseCard).join("")}</div>` : `
      <div class="card"><p>You currently own no horses. Visit the Horse Market or Auction Yard in town.</p></div>
    `}
  `;

  document.querySelectorAll("[data-horse-action]").forEach(btn => btn.addEventListener("click", onHorseAction));
}

function renderHorseCard(h) {
  const potential = averagePotential(h);
  const breedingText = h.sex === "Gelding"
    ? "Not breedable"
    : `${h.breeding.uses}/${h.breeding.maxUses} breeding uses`;
  const status = h.injury
    ? `<span class="pill danger-pill">🩹 ${escapeHtml(h.injury.name)} • ${h.injury.daysLeft}d</span>`
    : h.breeding?.pregnant
      ? `<span class="pill gold">🍼 In foal • ${h.breeding.dueInDays}d</span>`
      : `<span class="pill green">Healthy to work</span>`;

  return `
    <div class="card horse-card">
      <div class="horse-head">
        <div>
          <div class="horse-name">${h.favorite ? "⭐ " : ""}${escapeHtml(h.name)}</div>
          <div class="muted">${escapeHtml(h.breed)} • ${escapeHtml(horseSexLabel(h))} • Age ${h.age} • ${escapeHtml(horseLifeStage(h))}</div>
        </div>
        <div style="text-align:right">
          <span class="pill gold">${money(h.value)}</span>
          <div class="muted" style="margin-top:.4rem">${escapeHtml(h.coat)} • ${escapeHtml(h.genetics.coatGene)}</div>
        </div>
      </div>

      <div class="horse-tags">
        <span class="pill">${escapeHtml(h.temperament)}</span>
        <span class="pill green">${escapeHtml(h.trait)}</span>
        <span class="pill blue">${escapeHtml(h.specialization)}</span>
        ${status}
      </div>

      <div class="stats-mini">
        ${miniStat("Health", h.health)}
        ${miniStat("Energy", h.energy)}
        ${miniStat("Fitness", h.fitness)}
        ${miniStat("Stress", h.stress)}
        ${miniStat("Bond", h.bond)}
        ${miniStat("Training", h.training)}
        ${miniStat("Potential", potential)}
        ${miniStat("Generation", h.pedigree.generation)}
        ${miniStat("Hooves", h.hoofCare)}
      </div>

      <details class="horse-details">
        <summary>Performance & Pedigree</summary>
        <div class="potential-grid">
          ${HORSE_STAT_KEYS.map(key => `
            <div>
              <span>${key[0].toUpperCase() + key.slice(1)}</span>
              <strong>${h[key]} / ${h.potential[key]}</strong>
            </div>
          `).join("")}
        </div>
        <div class="pedigree-line">
          <span>Sire: <strong>${escapeHtml(h.pedigree.sire || "Unknown")}</strong></span>
          <span>Dam: <strong>${escapeHtml(h.pedigree.dam || "Unknown")}</strong></span>
          <span>${escapeHtml(breedingText)}</span>
        </div>
      </details>

      <div class="actions">
        <button data-horse-action="feed" data-id="${h.id}">🌾 Feed</button>
        <button data-horse-action="groom" data-id="${h.id}">🪮 Groom</button>
        <button data-horse-action="train" data-id="${h.id}">🎓 Train</button>
        <button data-horse-action="treat" data-id="${h.id}">🍎 Treat</button>
        <button data-horse-action="specialize" data-id="${h.id}">⭐ Specialize</button>
        <button data-horse-action="favorite" data-id="${h.id}">${h.favorite ? "★ Unfavorite" : "☆ Favorite"}</button>
        <button data-horse-action="rename" data-id="${h.id}">✏️ Rename</button>
        <button data-horse-action="sell" data-id="${h.id}" class="danger">Sell</button>
      </div>
    </div>
  `;
}

function miniStat(label, value) {
  return `<div><strong>${value}</strong><small>${label}</small></div>`;
}

function onHorseAction(e) {
  const id = e.currentTarget.dataset.id;
  const action = e.currentTarget.dataset.horseAction;
  const h = state.horses.find(x => x.id === id);
  if (!h) return;

  if (action === "feed") {
    if (h.fed) return toast(`${h.name} has already been fed today.`);
    if (state.inventory.feed <= 0) return toast("You are out of feed.");
    state.inventory.feed--;
    h.fed = true;
    h.health = clamp(h.health + 3, 0, 100);
    h.energy = clamp(h.energy + 8, 0, 100);
    h.stress = clamp(h.stress - 2, 0, 100);
    addLog(`Fed ${h.name}.`);
  }

  if (action === "groom") {
    if (h.groomed) return toast(`${h.name} has already been groomed today.`);
    if (state.inventory.brushes <= 0) return toast("You need a grooming brush.");
    if (!useEnergy(5)) return;
    h.groomed = true;
    h.bond = clamp(h.bond + 4, 0, 100);
    h.stress = clamp(h.stress - 5, 0, 100);
    state.playerSkills.handling += Math.random() < .3 ? 1 : 0;
    addLog(`Groomed ${h.name}.`);
  }

  if (action === "train") {
    if (h.age < 2) return toast(`${h.name} is too young for formal training.`);
    if (h.injury) return toast(`${h.name} needs to recover from ${h.injury.name.toLowerCase()} first.`);
    if (h.stress >= 85) return toast(`${h.name} is too stressed to train safely.`);
    if (h.breeding?.pregnant && h.breeding.dueInDays <= 3) return toast(`${h.name} is too close to foaling for training.`);
    if (h.energy < 18) return toast(`${h.name} needs more rest.`);
    if (!useEnergy(15)) return;

    const rawGain = rand(4, 8) + Math.floor(state.playerSkills.training / 5) + (h.trait === "Fast Learner" ? 2 : 0);
    const ageCap = h.age === 2 ? 60 : 100;
    const gain = Math.max(0, Math.min(rawGain, ageCap - h.training));

    h.training = clamp(h.training + gain, 0, ageCap);
    h.energy = clamp(h.energy - 14, 0, 100);
    h.bond = clamp(h.bond + 2, 0, 100);
    h.fitness = clamp(h.fitness + rand(1, 2), 0, 100);
    h.stress = clamp(h.stress + rand(5, 9), 0, 100);

    if (Math.random() < .35) state.playerSkills.training += 1;
    if (h.training >= 100) state.stats.horsesTrained += 1;

    maybeInjureHorse(h, 1.1);
    addLog(`Trained ${h.name} (+${gain} training).`);
    checkContracts("training");
  }

  if (action === "treat") {
    if (state.inventory.treats <= 0) return toast("You are out of treats.");
    state.inventory.treats--;
    h.bond = clamp(h.bond + 7, 0, 100);
    h.energy = clamp(h.energy + 3, 0, 100);
    h.stress = clamp(h.stress - 4, 0, 100);
    addLog(`Gave ${h.name} a treat.`);
  }

  if (action === "specialize") {
    if (h.age < 3) return toast(`${h.name} must be at least age 3 to specialize.`);
    if (h.training < 60) return toast(`${h.name} needs at least 60 training first.`);
    const options = SPECIALIZATIONS.filter(x => x !== "None");
    const answer = prompt(`Choose specialization:\n${options.join(", ")}`, h.specialization === "None" ? "Racing" : h.specialization);
    if (!answer) return;
    const match = options.find(x => x.toLowerCase() === answer.trim().toLowerCase());
    if (!match) return toast("That specialization is not available.");
    if (!spend(250)) return;
    h.specialization = match;
    state.reputation += 2;
    addLog(`${h.name} specialized in ${match}.`);
    state.questStats.specializations += 1;
    checkContracts("specialize");
  }

  if (action === "favorite") {
    h.favorite = !h.favorite;
    addLog(`${h.name} was ${h.favorite ? "added to" : "removed from"} favorites.`);
  }

  if (action === "rename") {
    const name = prompt("Enter a new horse name:", h.name);
    if (!name?.trim()) return;
    h.name = name.trim().slice(0, 28);
    addLog(`Renamed a horse to ${h.name}.`);
  }

  if (action === "sell") {
    if (h.breeding?.pregnant) return toast("You cannot sell a mare that is currently in foal.");
    if (h.age < 1) return toast("Foals cannot be sold until they are at least one year old.");
    const sale = Math.round(h.value * .9);
    if (!confirm(`Sell ${h.name} for ${money(sale)}?`)) return;
    earn(sale);
    state.horses = state.horses.filter(x => x.id !== h.id);
    state.stats.horsesSold += 1;
    state.reputation += 1;
    addLog(`Sold ${h.name} for ${money(sale)}.`);
    checkContracts("sellHorse");
  }

  if (h.fed && h.groomed) checkContracts("care");
  recalcHorseValues();
  saveGame(false);
  renderAll();
}

function renderStable() {
  const used = usedEstateAcres();
  const available = availableEstateAcres();

  el("stableView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">PROPERTY & ESTATE MANAGEMENT</div>
        <h2>Build Your Stable Estate</h2>
        <p>Repair the inherited property, buy land and choose which facilities define your operation.</p>
      </div>
      <span class="pill gold">Level ${state.stableLevel} • ${state.estate.landAcres} acres</span>
    </div>

    <div class="estate-overview card">
      <div class="row wrap">
        <div>
          <h3 style="margin-bottom:.2rem">Estate Plan</h3>
          <div class="muted">${used.toFixed(1)} acres developed • ${available.toFixed(1)} acres available</div>
        </div>
        <button id="buyLandBtn">Buy +5 Acres — ${money(landPurchaseCost())}</button>
      </div>

      <div class="estate-map">
        <div class="estate-tile core"><span>🏠</span><strong>Main Stable</strong><small>Level ${state.stableLevel}</small></div>
        ${ESTATE_BUILDINGS.flatMap(building =>
          Array.from({ length: estateBuildingCount(building.id) }, (_, index) => `
            <div class="estate-tile">
              <span>${building.icon}</span>
              <strong>${escapeHtml(building.name)}</strong>
              <small>${building.max > 1 ? `#${index + 1}` : escapeHtml(building.effect)}</small>
            </div>
          `)
        ).join("")}
        <div class="estate-tile open"><span>🌱</span><strong>Open Land</strong><small>${available.toFixed(1)} acres</small></div>
      </div>
    </div>

    <div class="grid two" style="margin-top:1rem">
      <div class="card">
        <h3>Property Condition</h3>
        ${Object.entries(state.condition).map(([key, value]) => {
          const cost = Math.max(25, Math.round((100-value) * 3.2));
          return `<div class="condition-line">
            <strong>${REPAIR_NAMES[key]}</strong>
            <div class="progress"><span style="width:${value}%"></span></div>
            <span>${value}%</span>
            <button data-repair="${key}" ${value >= 100 ? "disabled" : ""}>Repair ${money(cost)}</button>
          </div>`;
        }).join("")}
      </div>

      <div class="card">
        <h3>Core Stable Expansion</h3>
        <p>Traditional expansion still raises your stable level and base capacity.</p>
        <div class="notice">Current capacity: <strong>${state.capacity} horses</strong></div>
        <button id="expandStableBtn" class="primary" style="margin-top:.8rem">Expand Stable — ${money(expansionCost())}</button>

        <hr>
        <h3>Customization</h3>
        <div class="form-grid">
          <label>Theme
            <select id="themeSelect">
              ${["Rustic Ranch","Western Prestige","Victorian Estate","Racing Stable","Breeder's Estate","Working Ranch","Luxury Equestrian Estate"].map(x=>`<option ${x===state.stableStyle.theme?"selected":""}>${x}</option>`).join("")}
            </select>
          </label>
          <label>Exterior
            <select id="exteriorSelect">
              ${["Natural Timber","Dark Timber","Whitewashed Wood","Red Barn","Stone & Timber","Cream & Walnut"].map(x=>`<option ${x===state.stableStyle.exterior?"selected":""}>${x}</option>`).join("")}
            </select>
          </label>
          <label>Fence
            <select id="fenceSelect">
              ${["Split Rail","Painted Board","Post & Rail","Stone Boundary","Decorative Estate"].map(x=>`<option ${x===state.stableStyle.fence?"selected":""}>${x}</option>`).join("")}
            </select>
          </label>
          <label>Stable Sign
            <input id="signInput" maxlength="36" value="${escapeAttr(state.stableStyle.signText)}">
          </label>
        </div>
        <button id="saveCustomizationBtn" style="margin-top:.8rem">Save Customization — $50</button>
      </div>
    </div>

    <div class="card" style="margin-top:1rem">
      <div class="row wrap">
        <div>
          <h3 style="margin-bottom:.2rem">Build New Facilities</h3>
          <div class="muted">Facilities permanently change how your stable operates.</div>
        </div>
        <span class="pill">${available.toFixed(1)} acres available</span>
      </div>

      <div class="facility-grid">
        ${ESTATE_BUILDINGS.map(building => {
          const count = estateBuildingCount(building.id);
          const full = count >= building.max;
          const noLand = available < building.acres;
          return `
            <div class="facility-card">
              <div class="row wrap">
                <strong>${building.icon} ${escapeHtml(building.name)}</strong>
                <span class="pill">${count}/${building.max}</span>
              </div>
              <p>${escapeHtml(building.description)}</p>
              <div class="muted">${building.acres} acres • ${escapeHtml(building.effect)}</div>
              <button data-build-facility="${building.id}" ${full || noLand ? "disabled" : ""}>
                ${full ? "Completed" : `Build — ${money(building.cost)}`}
              </button>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  document.querySelectorAll("[data-repair]").forEach(btn => btn.addEventListener("click", () => repairStable(btn.dataset.repair)));
  document.querySelectorAll("[data-build-facility]").forEach(btn => btn.addEventListener("click", () => buildEstateFacility(btn.dataset.buildFacility)));
  el("buyLandBtn").addEventListener("click", buyEstateLand);
  el("expandStableBtn").addEventListener("click", expandStable);
  el("saveCustomizationBtn").addEventListener("click", saveCustomization);
}

function expansionCost() {
  return 900 + (state.stableLevel - 1) * 850;
}

function repairStable(key) {
  const value = state.condition[key];
  if (value >= 100) return;
  const cost = Math.max(25, Math.round((100-value) * 3.2));
  if (!spend(cost)) return;
  state.condition[key] = 100;
  state.reputation += 1;
  state.questStats.repairs += 1;
  addLog(`Repaired ${REPAIR_NAMES[key]} to full condition.`);
  checkContracts("repair");
  saveGame(false);
  renderAll();
}

function expandStable() {
  const cost = expansionCost();
  if (!spend(cost)) return;
  state.stableLevel += 1;
  state.capacity += state.stableLevel <= 3 ? 3 : 5;
  state.reputation += 5;
  addLog(`Expanded the stable to Level ${state.stableLevel}. Capacity is now ${state.capacity}.`);
  checkContracts("expand");
  saveGame(false);
  renderAll();
}

function saveCustomization() {
  if (!spend(50)) return;
  state.stableStyle.theme = el("themeSelect").value;
  state.stableStyle.exterior = el("exteriorSelect").value;
  state.stableStyle.fence = el("fenceSelect").value;
  state.stableStyle.signText = el("signInput").value.trim() || state.stableName;
  addLog(`Updated stable customization: ${state.stableStyle.theme}.`);
  saveGame(false);
  renderAll();
}


function townLocationById(id) {
  return TOWN_LOCATIONS.find(location => location.id === id) || TOWN_LOCATIONS[0];
}

function switchGameView(view) {
  switchView(view);
}

function openTownLocation(id) {
  selectedTownLocation = id;
  renderTown();
}

function trailRide() {
  const horseId = el("trailRideHorseSelect")?.value;
  const horse = state.horses.find(h => h.id === horseId);
  if (!horse) return toast("Choose a horse for the trail ride.");
  if (horse.age < 2) return toast(`${horse.name} is too young for the Oak Hollow trails.`);
  if (horse.injury) return toast(`${horse.name} needs to recover before trail riding.`);
  if (["Thunderstorm", "Storm"].includes(state.world.weather.name)) return toast("Oak Hollow Trails are closed during severe weather.");
  if (!useEnergy(10 + weatherExtraEnergy())) return;
  if (horse.energy < 14 + weatherExtraEnergy()) return toast(`${horse.name} needs more rest before hitting the trails.`);

  horse.energy = clamp(horse.energy - (14 + weatherExtraEnergy()), 0, 100);
  horse.bond = clamp(horse.bond + 5, 0, 100);
  horse.training = clamp(horse.training + 3, 0, 100);
  horse.fitness = clamp(horse.fitness + rand(2, 4), 0, 100);
  horse.stress = clamp(horse.stress - (horse.temperament === "Calm" ? 5 : 2), 0, 100);
  state.playerSkills.riding += Math.random() < .45 ? 1 : 0;
  state.reputation += Math.random() < .2 ? 1 : 0;

  maybeInjureHorse(horse, .65);

  addLog(`Took ${horse.name} out on the Oak Hollow trails.`);
  state.questStats.trailRides += 1;
  checkContracts("trail");
  saveGame(false);
  renderAll();
  toast(`${horse.name} enjoyed the trail ride.`);
}

function renderTownDetail(locationId) {
  const location = townLocationById(locationId);
  const outstandingLoan = state.loanBalance && state.loanBalance > 0
    ? `<div class="notice" style="margin-top:.75rem">Outstanding loan balance: <strong>${money(state.loanBalance)}</strong></div>`
    : "";

  const acceptedContracts = state.contracts.filter(c => c.accepted && !c.completed).length;
  const completedContracts = state.contracts.filter(c => c.completed).length;

  const quickLinks = `
    <div class="map-quick-links">
      <button data-map-jump="stable">Stable</button>
      <button data-map-jump="horsemarket">Horse Market</button>
      <button data-map-jump="racetrack">Event Grounds</button>
      <button data-map-jump="trails">Trails</button>
    </div>
  `;

  const intro = `
    <div class="row wrap">
      <div>
        <div class="detail-icon">${location.icon}</div>
        <h3>${escapeHtml(location.name)}</h3>
      </div>
      <span class="pill gold">${escapeHtml(location.type)}</span>
    </div>
    <div>
      <span class="location-tag">${escapeHtml(location.subtitle)}</span>
      <span class="location-tag">Connected by trail</span>
    </div>
  `;

  if (locationId === "stable") {
    return `
      ${intro}
      <p class="location-description">This is your home base. From here you manage repairs, upgrades, horses and staff. The trail from town curves past your paddocks and up toward Oak Hollow.</p>
      <div class="notice">Stable level <strong>${state.stableLevel}</strong> • Capacity <strong>${state.horses.length}/${state.capacity}</strong> • Theme <strong>${escapeHtml(state.stableStyle.theme)}</strong></div>
      <div class="location-actions">
        <button data-switch-view="stable" class="primary">Open Stable Management</button>
        <button data-switch-view="horses">View Horses</button>
      </div>
      ${quickLinks}
    `;
  }

  if (locationId === "mainstreet") {
    return `
      ${intro}
      <p class="location-description">Main Street is the heart of Cedar Valley. The bank, notice board, supply shops and several service providers are all clustered here. This central stop ties the whole map together like a Sims-style neighborhood hub.</p>
      <div class="location-actions">
        <button data-map-jump="generalstore">Go to General Store</button>
        <button data-map-jump="bank">Visit Bank</button>
        <button data-map-jump="noticeboard">Check Notice Board</button>
      </div>
      ${quickLinks}
    `;
  }

  if (locationId === "generalstore") {
    return `
      ${intro}
      <p class="location-description">Stock up on everyday supplies for the barn and keep your horses well fed and cared for.</p>
      <div class="location-actions">
        <button data-buy="feed" data-cost="60" data-qty="10">10 Feed — $60</button>
        <button data-buy="treats" data-cost="35" data-qty="8">8 Treats — $35</button>
        <button data-buy="brushes" data-cost="25" data-qty="1">Brush — $25</button>
      </div>
      ${quickLinks}
    `;
  }

  if (locationId === "tackshop") {
    return `
      ${intro}
      <p class="location-description">A small but reliable tack and outfitting shop with room to expand in future updates.</p>
      <div class="location-actions">
        <button data-buy="horseshoes" data-cost="45" data-qty="4">4 Horseshoes — $45</button>
        <button data-buy="brushes" data-cost="25" data-qty="1">Brush — $25</button>
      </div>
      ${quickLinks}
    `;
  }

  if (locationId === "vet") {
    return `
      ${intro}
      <p class="location-description">When one of your horses is under the weather, the town veterinarian can help get them back on their feet.</p>
      <div class="location-actions">
        <button id="vetBtn" class="primary">Treat Lowest-Health Horse — $100</button>
      </div>
      ${quickLinks}
    `;
  }

  if (locationId === "farrier") {
    return `
      ${intro}
      <p class="location-description">Good hoof care keeps a stable running properly. The farrier services all horses currently on your property.</p>
      <div class="location-actions">
        <button id="farrierBtn" class="primary">Farrier Visit — $70</button>
      </div>
      ${quickLinks}
    `;
  }

  if (locationId === "bank") {
    return `
      ${intro}
      <p class="location-description">Use the bank when you need a push toward stable expansion or extra operating money.</p>
      <div class="location-actions">
        <button id="loanBtn" class="primary">Take $1,000 Loan</button>
      </div>
      <div class="muted" style="margin-top:.55rem">Prototype loan: repay $1,150 automatically over time.</div>
      ${outstandingLoan}
      ${quickLinks}
    `;
  }

  if (locationId === "noticeboard") {
    return `
      ${intro}
      <p class="location-description">Horse owners, ranchers and townsfolk post requests here. Keep checking back for work and reputation.</p>
      <div class="notice">Accepted contracts: <strong>${acceptedContracts}</strong> • Completed contracts: <strong>${completedContracts}</strong></div>
      <div class="location-actions">
        <button id="refreshContractsBtn" class="primary">Refresh Contracts — $15</button>
        <button data-switch-view="contracts">Open Contracts Page</button>
      </div>
      ${quickLinks}
    `;
  }

  if (locationId === "horsemarket") {
    return `
      ${intro}
      <p class="location-description">The horse market refreshes every few days with a new rotation of animals. Better reputation can set you up for better buying later.</p>
      <div class="notice">Market stock refreshes every 3 days. Capacity: <strong>${state.horses.length}/${state.capacity}</strong> stalls used.</div>
      <div class="market-stack">
        ${state.market.map(h => `
          <div class="market-horse">
            <div class="row">
              <div>
                <strong>${escapeHtml(h.name)}</strong>
                <div class="muted">${escapeHtml(h.breed)} • ${escapeHtml(h.sex)} • ${escapeHtml(h.coat)}</div>
              </div>
              <strong>${money(h.value)}</strong>
            </div>
            <div style="margin:.55rem 0">
              <span class="pill">${escapeHtml(h.temperament)}</span>
              <span class="pill green">${escapeHtml(h.trait)}</span>
            </div>
            <div class="muted">Speed ${h.speed} • Stamina ${h.stamina} • Handling ${h.handling} • Training ${h.training}</div>
            <button data-buy-horse="${h.id}" style="margin-top:.7rem">Buy Horse</button>
          </div>
        `).join("")}
      </div>
    `;
  }


  if (locationId === "auction") {
    const horse = state.auction.horse;
    const nextBid = state.auction.currentBid + Math.max(100, Math.round(state.auction.currentBid * .08 / 50) * 50);
    return `
      ${intro}
      <p class="location-description">County stables bid against one another here. The auction settles when you end the day.</p>
      ${horse ? `
        <div class="auction-horse-card">
          <div class="row wrap">
            <div>
              <h3>${escapeHtml(horse.name)}</h3>
              <div class="muted">${escapeHtml(horse.breed)} • ${escapeHtml(horseSexLabel(horse))} • Age ${horse.age} • ${escapeHtml(horse.coat)}</div>
            </div>
            <span class="pill gold">Potential ${averagePotential(horse)}</span>
          </div>
          <div class="grid three" style="margin-top:.7rem">
            ${miniStat("Training", horse.training)}
            ${miniStat("Fitness", horse.fitness)}
            ${miniStat("Health", horse.health)}
          </div>
          <div class="notice" style="margin-top:.75rem">
            Current bid: <strong>${money(state.auction.currentBid)}</strong><br>
            High bidder: <strong>${escapeHtml(state.auction.highBidderName)}</strong><br>
            Auction closes: <strong>End of day</strong>
          </div>
          <button id="auctionBidBtn" class="primary" style="margin-top:.7rem">Bid ${money(nextBid)}</button>
        </div>
      ` : `<div class="notice">Preparing the next auction lot.</div>`}
      ${quickLinks}
    `;
  }

  if (locationId === "racetrack") {
    return `
      ${intro}
      <p class="location-description">The Cedar Valley Equestrian Grounds host races, ranch trials, handling courses, showmanship events and practice sessions throughout the season.</p>
      <div class="location-actions">
        <button data-switch-view="racing" class="primary">Open Event Grounds</button>
      </div>
      ${quickLinks}
    `;
  }

  if (locationId === "rivalstable") {
    return `
      ${intro}
      <p class="location-description">Cedar Valley's established operations continue improving while you do. Their reputation, competition wins and horse counts change over time.</p>
      <div class="notice">Riverview relationship: <strong>${escapeHtml(riverviewRelationshipLabel())}</strong> (${riverviewRelationship() >= 0 ? "+" : ""}${riverviewRelationship()})</div>
      ${renderRivalStandings()}
      ${quickLinks}
    `;
  }

  if (locationId === "trails") {
    return `
      ${intro}
      <p class="location-description">Oak Hollow is a network of winding trails through meadows and low forest. It gives the map that neighborhood-style movement you were after and provides a gentle riding activity between town and the race grounds.</p>
      ${state.horses.length ? `
        <label class="location-select">Choose a horse for the trail ride
          <select id="trailRideHorseSelect">
            ${state.horses.map(h => `<option value="${h.id}">${escapeHtml(h.name)} — Energy ${h.energy}</option>`).join("")}
          </select>
        </label>
      ` : `<div class="notice">You need a horse before you can ride the trails.</div>`}
      <div class="location-actions">
        <button id="trailRideBtn" class="primary" ${state.horses.length ? "" : "disabled"}>Go Trail Riding</button>
      </div>
      ${quickLinks}
    `;
  }

  return `${intro}<p class="location-description">This stop will be developed more in a future update.</p>`;
}

function setupTownMapEvents() {
  document.querySelectorAll("[data-map-location]").forEach(button => {
    button.addEventListener("click", () => openTownLocation(button.dataset.mapLocation));
  });

  document.querySelectorAll("[data-map-jump]").forEach(button => {
    button.addEventListener("click", () => openTownLocation(button.dataset.mapJump));
  });

  document.querySelectorAll("[data-buy]").forEach(btn => btn.addEventListener("click", () => buyItem(btn.dataset.buy, Number(btn.dataset.cost), Number(btn.dataset.qty))));
  document.querySelectorAll("[data-buy-horse]").forEach(btn => btn.addEventListener("click", () => buyHorse(btn.dataset.buyHorse)));
  document.querySelectorAll("[data-switch-view]").forEach(btn => btn.addEventListener("click", () => switchGameView(btn.dataset.switchView)));

  const vetButton = el("vetBtn");
  if (vetButton) vetButton.addEventListener("click", vetVisit);

  const farrierButton = el("farrierBtn");
  if (farrierButton) farrierButton.addEventListener("click", farrierVisit);

  const loanButton = el("loanBtn");
  if (loanButton) loanButton.addEventListener("click", takeLoan);

  const contractsButton = el("refreshContractsBtn");
  if (contractsButton) {
    contractsButton.addEventListener("click", () => {
      if (!spend(15)) return;
      generateContracts();
      addLog("Checked the town notice board for new contracts.");
      saveGame(false);
      renderAll();
    });
  }

  const trailRideButton = el("trailRideBtn");
  if (trailRideButton) trailRideButton.addEventListener("click", trailRide);

  const auctionBidButton = el("auctionBidBtn");
  if (auctionBidButton) auctionBidButton.addEventListener("click", placeAuctionBid);
}

function renderTown() {
  const activeLocation = townLocationById(selectedTownLocation);

  el("townView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">CEDAR VALLEY COUNTY MAP</div>
        <h2>World Map</h2>
        <p>Explore an actual map-style town view with trails, services and clickable destinations.</p>
      </div>
      <span class="pill gold">${escapeHtml(activeLocation.name)}</span>
    </div>

    <div class="town-map-layout">
      <div class="card map-card">
        <h3 style="margin-bottom:.65rem">Neighborhood Map</h3>
        <div class="sims-map">
          <div class="map-cloud one"></div>
          <div class="map-cloud two"></div>

          <div class="map-patch hill" style="left:70%;top:26%;width:160px;height:90px;"></div>
          <div class="map-patch hill" style="left:76%;top:13%;width:120px;height:70px;"></div>
          <div class="map-patch field" style="left:8%;top:74%;width:130px;height:70px;"></div>
          <div class="map-patch field" style="left:16%;top:42%;width:90px;height:52px;"></div>

          <div class="map-river-label">Willow River</div>
          <div class="map-hills-label">North Ridge</div>
          <div class="map-meadow-label">South Meadow</div>

          <svg class="trail-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path class="river-path" d="M0,22 C9,20 16,22 23,28 C31,35 40,36 52,34 C64,32 73,29 81,21 C89,13 95,8 100,6"></path>

            <path class="trail-main" d="M18,70 C21,61 25,54 31,58 C35,60 37,54 37,49 C37,45 43,44 47,43 C54,41 57,44 60,49"></path>
            <path class="trail-edge" d="M18,70 C21,61 25,54 31,58 C35,60 37,54 37,49 C37,45 43,44 47,43 C54,41 57,44 60,49"></path>

            <path class="trail-main" d="M60,49 C62,44 61,40 61,36 C61,31 69,28 73,23"></path>
            <path class="trail-edge" d="M60,49 C62,44 61,40 61,36 C61,31 69,28 73,23"></path>

            <path class="trail-main" d="M60,49 C67,48 72,47 76,46"></path>
            <path class="trail-edge" d="M60,49 C67,48 72,47 76,46"></path>

            <path class="trail-main" d="M76,46 C80,51 82,57 84,66"></path>
            <path class="trail-edge" d="M76,46 C80,51 82,57 84,66"></path>

            <path class="trail-main" d="M37,49 C31,45 25,38 22,31"></path>
            <path class="trail-edge" d="M37,49 C31,45 25,38 22,31"></path>

            <path class="trail-main" d="M31,58 C36,61 40,66 43,70"></path>
            <path class="trail-edge" d="M31,58 C36,61 40,66 43,70"></path>

            <path class="trail-main" d="M43,70 C47,66 51,63 53,60"></path>
            <path class="trail-edge" d="M43,70 C47,66 51,63 53,60"></path>
          </svg>

          ${TOWN_LOCATIONS.map(location => `
            <button
              class="map-node ${location.id === activeLocation.id ? "active" : ""}"
              style="left:${location.x}%; top:${location.y}%"
              data-map-location="${location.id}"
              aria-label="Open ${escapeAttr(location.name)}"
              type="button"
            >
              <span class="map-node-icon">${location.icon}</span>
              <span class="map-node-text">
                <strong>${escapeHtml(location.name)}</strong>
                <small>${escapeHtml(location.type)}</small>
              </span>
            </button>
          `).join("")}
        </div>

        <div class="map-caption">
          Click a location to travel there. The roads and trails are purely visual right now, but they make the world feel more like a neighborhood map instead of a list of cards.
        </div>
      </div>

      <div class="card map-detail">
        ${renderTownDetail(activeLocation.id)}
      </div>
    </div>
  `;

  setupTownMapEvents();
}

function shopCard(icon, name, desc, body) {
  return `<div class="card shop-card"><div class="icon">${icon}</div><h3>${name}</h3><p>${desc}</p><div class="actions">${body}</div></div>`;
}

function buyItem(item, cost, qty) {
  if (!spend(cost)) return;
  state.inventory[item] = (state.inventory[item] || 0) + qty;
  state.questStats.storePurchases += 1;
  addLog(`Purchased ${qty} ${item} for ${money(cost)}.`);
  saveGame(false);
  renderAll();
}

function buyHorse(id) {
  if (state.horses.length >= state.capacity) return toast("Your stable has no open stalls.");
  const h = state.market.find(x => x.id === id);
  if (!h) return;
  if (!spend(h.value)) return;

  const horse = normalizeHorseData(h);
  state.horses.push(horse);
  state.market = state.market.filter(x => x.id !== id);
  state.reputation += 1;
  state.questStats.marketPurchases += 1;

  addLog(`Purchased ${horse.name}, a ${horse.breed}, for ${money(horse.value)}.`);
  checkContracts("buyHorse");
  saveGame(false);
  renderAll();
}

function vetVisit() {
  if (!state.horses.length) return toast("You have no horses to treat.");

  const injured = state.horses.filter(h => h.injury).sort((a,b)=>b.injury.daysLeft-a.injury.daysLeft)[0];
  const h = injured || [...state.horses].sort((a,b)=>a.health-b.health)[0];

  if (!h.injury && h.health >= 100) return toast("All of your horses are already healthy.");

  const cost = estateBuildingCount("vetWing") ? 70 : 100;
  if (!spend(cost)) return;

  h.health = 100;
  h.stress = clamp(h.stress - 10, 0, 100);

  if (h.injury) {
    h.healthRecords.push(`Y${state.year} ${seasons()[state.seasonIndex]} ${state.day}: Treated ${h.injury.name}`);
    h.injury = null;
  }

  state.playerSkills.veterinary += Math.random() < .25 ? 1 : 0;
  state.questStats.vetVisits += 1;
  addLog(`The veterinarian treated ${h.name}.`);
  saveGame(false);
  renderAll();
}

function farrierVisit() {
  if (!state.horses.length) return toast("You have no horses.");
  if (!spend(70)) return;
  state.horses.forEach(h => {
    h.hoofCare = 100;
    h.healthRecords.push(`Y${state.year} ${seasons()[state.seasonIndex]} ${state.day}: Farrier visit`);
  });
  state.questStats.farrierVisits += 1;
  addLog("The farrier serviced all horses currently at the stable.");
  saveGame(false);
  renderAll();
}

function takeLoan() {
  if (state.loanBalance && state.loanBalance > 0) return toast("You already have an active loan.");
  earn(1000);
  state.loanBalance = 1150;
  addLog("Bank approved a $1,000 stable loan. $1,150 is owed.");
  saveGame(false);
  renderAll();
}

function challengeStatus(challenge) {
  const rawProgress = Number(challenge.progress()) || 0;
  const progress = Math.min(rawProgress, challenge.target);
  const claimed = state.challenges.claimed.includes(challenge.id);

  return {
    progress,
    claimed,
    complete: rawProgress >= challenge.target
  };
}

function claimEventChallenge(id) {
  const challenge = EVENT_CHALLENGES.find(c => c.id === id);
  if (!challenge) return;

  const status = challengeStatus(challenge);
  if (!status.complete || status.claimed) return;

  earn(challenge.reward);
  state.reputation += challenge.reputation;
  state.challenges.claimed.push(id);
  addLog(`Claimed challenge "${challenge.title}" for ${money(challenge.reward)}.`);
  saveGame(false);
  renderAll();
  toast(`Challenge claimed! ${money(challenge.reward)} awarded.`);
}

function activeMarketingBonus() {
  return state.marketing.campaign?.prizeBonus || 0;
}

function startAdvertisingCampaign(id) {
  const campaign = ADVERTISING_CAMPAIGNS.find(c => c.id === id);
  if (!campaign) return;

  if (state.marketing.campaign && state.marketing.campaign.daysLeft > 0) {
    return toast(`Your ${state.marketing.campaign.name} campaign is still active.`);
  }

  if (!spend(campaign.cost)) return;

  state.marketing.exposure += campaign.exposure;
  state.reputation += campaign.reputation;
  state.marketing.campaign = {
    ...campaign,
    daysLeft: campaign.days
  };

  state.questStats.campaignsStarted += 1;
  generateCustomerLead(true);

  addLog(`Started advertising campaign "${campaign.name}" for ${money(campaign.cost)}.`);
  saveGame(false);
  renderAll();
  toast(`${campaign.name} is now running and generated a customer inquiry.`);
}

function processAdvertising() {
  const campaign = state.marketing.campaign;

  if (campaign && campaign.daysLeft > 0) {
    campaign.daysLeft -= 1;

    if (campaign.dailyIncome > 0) {
      earn(campaign.dailyIncome);
      addLog(`${campaign.name} generated ${money(campaign.dailyIncome)} in extra customer business.`);
    }

    if (Math.random() < .35) {
      state.marketing.exposure += 1;
    }

    if (campaign.daysLeft <= 0) {
      addLog(`${campaign.name} advertising campaign ended.`);
      state.marketing.campaign = null;
    }
  } else if (state.marketing.exposure > 0 && Math.random() < .6) {
    state.marketing.exposure = Math.max(0, state.marketing.exposure - 1);
  }
}

function competitionScore(horse, competition) {
  let score = 0;

  Object.entries(competition.weights).forEach(([stat, weight]) => {
    score += Number(horse[stat] || 0) * weight;
  });

  score += state.playerSkills.riding * .30;
  score += state.playerSkills.handling * .12;
  score += Number(horse.fitness || 0) * .10;
  score -= Number(horse.stress || 0) * .08;

  if (horse.specialization === competition.specialty) score += 8;
  if (horse.trait === "Natural Racer" && competition.category.includes("Race")) score += 5;
  if (horse.trait === "High Endurance" && competition.id === "meadow-endurance") score += 5;
  if (horse.trait === "Strong Build" && ["ranch-trial", "heavy-pull"].includes(competition.id)) score += 5;
  if (horse.trait === "Sure-Footed" && ["cloverleaf", "ranch-trial"].includes(competition.id)) score += 4;

  const weather = state.world?.weather?.name || "Clear";
  if (["Rain", "Snow"].includes(weather) && !estateBuildingCount("indoorArena")) score -= 2;
  if (["Storm", "Thunderstorm"].includes(weather)) score -= 5;

  score += rand(0, 22);
  return score;
}

function renderRacing() {
  const activeCampaign = state.marketing.campaign;

  el("racingView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">CEDAR VALLEY EQUESTRIAN GROUNDS</div>
        <h2>Events, Races & Challenges</h2>
        <p>Practice specific skills, enter different competitions, build a record and promote your stable.</p>
      </div>
      <div class="actions">
        <span class="pill gold">${state.raceRecord.wins} wins</span>
        <span class="pill">${state.marketing.exposure} exposure</span>
      </div>
    </div>

    <div class="grid four">
      ${statCard("🏁 Entries", state.raceRecord.entries, "Official events")}
      ${statCard("🏆 Wins", state.raceRecord.wins, "First-place finishes")}
      ${statCard("🐎 Practice", state.raceRecord.practiceSessions, "Training sessions")}
      ${statCard("📣 Exposure", state.marketing.exposure, "Stable publicity")}
    </div>

    <div class="grid two" style="margin-top:1rem">
      <div class="card">
        <div class="row wrap">
          <div>
            <h3 style="margin-bottom:.2rem">Practice Grounds</h3>
            <div class="muted">Choose what you actually want your horse to work on.</div>
          </div>
          ${state.raceRecord.bestTime
            ? `<span class="pill">Best sprint: ${state.raceRecord.bestTime.toFixed(2)} sec</span>`
            : ""
          }
        </div>

        <label style="margin-top:.8rem">Horse
          <select id="practiceHorseSelect">
            ${state.horses.map(h => `<option value="${h.id}">${escapeHtml(h.name)} — Energy ${h.energy}</option>`).join("")}
          </select>
        </label>

        <label style="margin-top:.65rem">Practice Type
          <select id="practiceTypeSelect">
            ${PRACTICE_TYPES.map(p => `<option value="${p.id}">${p.icon} ${escapeHtml(p.name)}</option>`).join("")}
          </select>
        </label>

        <div id="practiceDescription" class="notice" style="margin-top:.75rem"></div>

        <button id="practiceBtn" style="margin-top:.8rem" ${state.horses.length ? "" : "disabled"}>
          Start Practice
        </button>
      </div>

      <div class="card">
        <h3>Stable Advertising</h3>
        <p>Promote ${escapeHtml(state.stableName)} around Cedar Valley. Advertising increases exposure and can bring in extra daily business while a campaign is active.</p>

        ${activeCampaign ? `
          <div class="notice">
            <strong>${escapeHtml(activeCampaign.name)}</strong><br>
            ${activeCampaign.daysLeft} day${activeCampaign.daysLeft === 1 ? "" : "s"} remaining
            ${activeCampaign.prizeBonus > 0 ? ` • +${Math.round(activeCampaign.prizeBonus * 100)}% event prize bonus` : ""}
          </div>
        ` : `<div class="muted">No advertising campaign is currently active.</div>`}

        <div class="advertising-grid">
          ${ADVERTISING_CAMPAIGNS.map(campaign => `
            <div class="advertising-option">
              <div class="row">
                <strong>${campaign.icon} ${escapeHtml(campaign.name)}</strong>
                <strong>${money(campaign.cost)}</strong>
              </div>
              <div class="muted">${escapeHtml(campaign.description)}</div>
              <small>${campaign.days} days • +${campaign.exposure} exposure • +${campaign.reputation} reputation</small>
              <button
                data-advertise="${campaign.id}"
                ${activeCampaign ? "disabled" : ""}
              >
                Advertise Stable
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:1rem">
      <div class="row wrap">
        <div>
          <h3 style="margin-bottom:.2rem">Official Competitions</h3>
          <div class="muted">Each event rewards different horse strengths. Specializing a horse in the matching discipline gives a scoring bonus.</div>
        </div>
      </div>

      <div class="competition-grid" style="margin-top:.9rem">
        ${COMPETITIONS.map(comp => {
          const eligible = state.horses.filter(h => h.training >= comp.minTraining && h.age >= 3 && !h.injury);
          return `
            <div class="competition-card">
              <div class="row wrap">
                <div>
                  <div class="competition-icon">${comp.icon}</div>
                  <strong>${escapeHtml(comp.name)}</strong>
                </div>
                <span class="pill">${escapeHtml(comp.category)}</span>
              </div>

              <p>${escapeHtml(comp.description)}</p>

              <div class="competition-meta">
                <span>Entry ${money(comp.fee)}</span>
                <span>Training ${comp.minTraining}+</span>
                <span>Prize ${money(comp.prizeMin)}–${money(comp.prizeMax)}</span>
              </div>

              <label>Horse
                <select data-competition-horse="${comp.id}">
                  ${eligible.length
                    ? eligible.map(h => `<option value="${h.id}">${escapeHtml(h.name)} — ${escapeHtml(h.specialization)}</option>`).join("")
                    : `<option value="">No eligible horse</option>`
                  }
                </select>
              </label>

              <button
                class="${comp.id === "county-sprint" ? "primary" : ""}"
                data-enter-competition="${comp.id}"
                ${eligible.length ? "" : "disabled"}
              >
                Enter ${escapeHtml(comp.name)}
              </button>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <div class="grid two" style="margin-top:1rem">
      <div class="card">
        <h3>Event Challenges</h3>
        <div class="challenge-list">
          ${EVENT_CHALLENGES.map(challenge => {
            const status = challengeStatus(challenge);
            const pct = Math.round((status.progress / challenge.target) * 100);
            return `
              <div class="challenge-card">
                <div class="row wrap">
                  <div>
                    <strong>${escapeHtml(challenge.title)}</strong>
                    <div class="muted">${escapeHtml(challenge.description)}</div>
                  </div>
                  <span class="pill ${status.claimed ? "green" : status.complete ? "gold" : ""}">
                    ${status.claimed ? "Claimed" : `${status.progress}/${challenge.target}`}
                  </span>
                </div>

                <div class="progress" style="margin:.6rem 0">
                  <span style="width:${pct}%"></span>
                </div>

                <div class="row wrap">
                  <small class="muted">Reward: ${money(challenge.reward)} + ${challenge.reputation} reputation</small>
                  <button
                    data-claim-challenge="${challenge.id}"
                    ${!status.complete || status.claimed ? "disabled" : ""}
                  >
                    ${status.claimed ? "Claimed" : "Claim Reward"}
                  </button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <div class="card">
        <h3>Recent Results</h3>
        <div class="event-log">
          ${state.raceRecord.recentResults.length
            ? state.raceRecord.recentResults.map(result => `
                <div>
                  <strong>${escapeHtml(result.horse)}</strong> — ${escapeHtml(result.event)}
                  <br>
                  <span class="${result.won ? "good" : "muted"}">${result.won ? "1st Place" : "Completed"}</span>
                  ${result.prize ? ` • ${money(result.prize)}` : ""}
                </div>
              `).join("")
            : `<div>No official competition results yet.</div>`
          }
        </div>
      </div>
    </div>
  `;

  const practiceType = el("practiceTypeSelect");
  const practiceDescription = el("practiceDescription");

  const refreshPracticeDescription = () => {
    if (!practiceType || !practiceDescription) return;
    const practice = PRACTICE_TYPES.find(p => p.id === practiceType.value) || PRACTICE_TYPES[0];
    practiceDescription.textContent = `${practice.icon} ${practice.description} Costs 12 player energy and 15 horse energy.`;
  };

  if (practiceType) {
    practiceType.addEventListener("change", refreshPracticeDescription);
    refreshPracticeDescription();
  }

  if (state.horses.length) {
    el("practiceBtn").addEventListener("click", runPractice);
  }

  document.querySelectorAll("[data-enter-competition]").forEach(button => {
    button.addEventListener("click", () => enterCompetition(button.dataset.enterCompetition));
  });

  document.querySelectorAll("[data-claim-challenge]").forEach(button => {
    button.addEventListener("click", () => claimEventChallenge(button.dataset.claimChallenge));
  });

  document.querySelectorAll("[data-advertise]").forEach(button => {
    button.addEventListener("click", () => startAdvertisingCampaign(button.dataset.advertise));
  });
}

function runPractice() {
  const horse = state.horses.find(x => x.id === el("practiceHorseSelect")?.value);
  const practice = PRACTICE_TYPES.find(p => p.id === el("practiceTypeSelect")?.value) || PRACTICE_TYPES[0];

  if (!horse) return;
  if (horse.age < 2) return toast(`${horse.name} is too young for formal practice.`);
  if (horse.injury) return toast(`${horse.name} must recover from ${horse.injury.name.toLowerCase()} first.`);
  if (horse.stress >= 85) return toast(`${horse.name} is too stressed for hard practice.`);

  const extraEnergy = weatherExtraEnergy();
  if (!useEnergy(12 + extraEnergy)) return;
  if (horse.energy < 15 + extraEnergy) return toast(`${horse.name} needs rest.`);

  horse.energy = clamp(horse.energy - (15 + extraEnergy), 0, 100);
  const weatherMod = weatherPracticeModifier();
  const facilityBonus = estateBuildingCount("privateTrack") ? 1 : 0;

  const primaryGain = Math.max(1, Math.round(rand(1, 2) * weatherMod) + facilityBonus);
  applyHorseStatGain(horse, practice.primary, primaryGain);

  if (Math.random() < .45 * weatherMod) {
    applyHorseStatGain(horse, practice.secondary, 1);
  }

  horse.training = clamp(horse.training + rand(1, 3), 0, 100);
  horse.bond = clamp(horse.bond + 1, 0, 100);
  horse.fitness = clamp(horse.fitness + rand(2, 4) + facilityBonus, 0, 100);
  horse.stress = clamp(horse.stress + rand(5, 10), 0, 100);

  if (state.playerSkills[practice.playerSkill] !== undefined && Math.random() < .35) {
    state.playerSkills[practice.playerSkill] += 1;
  }

  state.raceRecord.practiceSessions += 1;
  maybeInjureHorse(horse, 1.25);

  if (practice.id === "sprint") {
    const time =
      92 -
      (horse.speed * .35 + horse.stamina * .18 + horse.handling * .12 + horse.training * .08 + horse.fitness * .08) +
      Math.random() * 8;

    if (state.raceRecord.bestTime === null || time < state.raceRecord.bestTime) {
      state.raceRecord.bestTime = time;
    }

    addLog(`${horse.name} completed sprint practice in ${time.toFixed(2)} seconds.`);
  } else {
    addLog(`${horse.name} completed ${practice.name}.`);
  }

  checkContracts("practice");
  recalcHorseValues();
  saveGame(false);
  renderAll();
}

function enterCompetition(competitionId) {
  const competition = COMPETITIONS.find(c => c.id === competitionId);
  if (!competition) return;

  const selector = document.querySelector(`[data-competition-horse="${competition.id}"]`);
  const horse = state.horses.find(h => h.id === selector?.value);

  if (!horse) return toast("Choose an eligible horse.");
  if (horse.age < 3) return toast(`${horse.name} must be age 3+ for official competition.`);
  if (horse.injury) return toast(`${horse.name} cannot compete while injured.`);
  if (horse.stress >= 90) return toast(`${horse.name} is too stressed to compete safely.`);
  if (horse.training < competition.minTraining) {
    return toast(`${horse.name} needs at least ${competition.minTraining} training.`);
  }
  if (horse.energy < competition.horseEnergy) {
    return toast(`${horse.name} needs more rest before this event.`);
  }
  if (state.energy < competition.playerEnergy) {
    return toast("You are too tired to compete. End the day to recover.");
  }
  if (!spend(competition.fee)) return;
  if (!useEnergy(competition.playerEnergy)) {
    state.money += competition.fee;
    return;
  }

  horse.energy = clamp(horse.energy - (competition.horseEnergy + weatherExtraEnergy()), 0, 100);
  horse.stress = clamp(horse.stress + rand(8, 14), 0, 100);
  horse.fitness = clamp(horse.fitness + 1, 0, 100);
  maybeInjureHorse(horse, 1.5);
  state.raceRecord.entries += 1;
  state.raceRecord.entriesByType[competition.id] =
    (state.raceRecord.entriesByType[competition.id] || 0) + 1;

  checkContracts("raceEntry");

  const score = competitionScore(horse, competition);
  const opponent = rand(competition.difficultyMin, competition.difficultyMax);
  const won = score >= opponent;

  let prize = 0;

  if (won) {
    const basePrize = rand(competition.prizeMin, competition.prizeMax);
    prize = Math.round(basePrize * (1 + activeMarketingBonus()));

    earn(prize);
    state.raceRecord.wins += 1;
    state.raceRecord.winsByType[competition.id] =
      (state.raceRecord.winsByType[competition.id] || 0) + 1;

    state.reputation += competition.reputation + (estateBuildingCount("trophyHall") ? 1 : 0);
    state.marketing.exposure += 2;
    horse.value += Math.round(prize * .18);

    addLog(`${horse.name} won ${competition.name}! Prize: ${money(prize)}.`);
    checkContracts("raceWin");
    toast(`${horse.name} won ${competition.name}! ${money(prize)} prize.`);
  } else {
    state.reputation += 1;
    state.marketing.exposure += 1;
    addLog(`${horse.name} competed in ${competition.name} and completed the event.`);
    toast(`${horse.name} completed ${competition.name}.`);
  }

  state.raceRecord.recentResults.unshift({
    horse: horse.name,
    event: competition.name,
    won,
    prize
  });
  state.raceRecord.recentResults = state.raceRecord.recentResults.slice(0, 8);

  recalcHorseValues();
  saveGame(false);
  renderAll();
}

function renderContracts() {
  const activeContracts = state.contracts.filter(c => c.accepted && !c.completed && !c.failed);
  const availableContracts = state.contracts.filter(c => !c.accepted && !c.completed && !c.failed);
  const completedContracts = state.contracts.filter(c => c.completed).slice(-3).reverse();

  const contractCard = (c, mode) => `
    <div class="card">
      <div class="row wrap">
        <span class="pill ${mode === "active" ? "gold" : mode === "completed" ? "green" : ""}">
          ${mode === "active" ? "Active" : mode === "completed" ? "Completed" : "Available"}
        </span>
        <span class="pill">${escapeHtml(c.category || "Contract")}</span>
      </div>

      <h3 style="margin-top:.7rem">${escapeHtml(c.title)}</h3>
      <p>${escapeHtml(c.desc)}</p>

      <div class="row"><span>Reward</span><strong>${money(c.reward)}</strong></div>

      ${mode === "active"
        ? `<div class="row"><span>Time Remaining</span><strong>${c.daysLeft} day${c.daysLeft === 1 ? "" : "s"}</strong></div>`
        : mode === "available"
          ? `<div class="row"><span>Time Limit</span><strong>${c.durationDays || c.days} days</strong></div>`
          : `<div class="row"><span>Status</span><strong class="good">Paid</strong></div>`
      }

      ${mode === "available"
        ? `<button data-contract="${c.id}" style="margin-top:.8rem">Accept Contract</button>`
        : ""
      }
    </div>
  `;

  el("contractsView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">WORK & CUSTOMERS</div>
        <h2>Contracts</h2>
        <p>Accepted contracts stay active across days until completed or their deadline expires.</p>
      </div>
      <span class="pill gold">${activeContracts.length} active</span>
    </div>

    <div class="card customer-inquiries" style="margin-bottom:1rem">
      <div class="row wrap">
        <div>
          <h3 style="margin-bottom:.2rem">💌 Customer Inquiries</h3>
          <div class="muted">Advertising, reputation and word of mouth generate named customer work.</div>
        </div>
        <span class="pill gold">${state.customers.leads.length} waiting</span>
      </div>
      <div class="grid three" style="margin-top:.8rem">
        ${state.customers.leads.length ? state.customers.leads.map(lead => `
          <div class="list-item">
            <div class="row wrap">
              <strong>${escapeHtml(lead.customer)}</strong>
              <span class="pill">${lead.daysLeft}d</span>
            </div>
            <div style="margin-top:.35rem"><strong>${escapeHtml(lead.title)}</strong></div>
            <p class="muted">${escapeHtml(lead.desc)}</p>
            <div class="row"><span>Payment</span><strong>${money(lead.reward)}</strong></div>
            <button data-accept-customer="${lead.id}" style="margin-top:.65rem">Accept Customer</button>
          </div>
        `).join("") : `<div class="notice">No customer inquiries right now. Advertising increases the chance of new leads.</div>`}
      </div>
    </div>

    <div class="card" style="margin-bottom:1rem">
      <div class="row wrap">
        <div>
          <h3 style="margin-bottom:.2rem">Active Contracts</h3>
          <div class="muted">These jobs will remain active when you end the day.</div>
        </div>
      </div>
      <div class="grid three" style="margin-top:.8rem">
        ${activeContracts.length
          ? activeContracts.map(c => contractCard(c, "active")).join("")
          : `<div class="notice">You have no active contracts. Accept one from the board below.</div>`
        }
      </div>
    </div>

    <div class="card" style="margin-bottom:1rem">
      <div class="row wrap">
        <div>
          <h3 style="margin-bottom:.2rem">Available Work</h3>
          <div class="muted">The notice board refreshes periodically without removing your accepted jobs.</div>
        </div>
        <button id="contractBoardRefreshBtn">Refresh Board — $15</button>
      </div>
      <div class="grid three" style="margin-top:.8rem">
        ${availableContracts.length
          ? availableContracts.map(c => contractCard(c, "available")).join("")
          : `<div class="notice">No new jobs are currently posted.</div>`
        }
      </div>
    </div>

    ${completedContracts.length ? `
      <div class="card">
        <h3>Recently Completed</h3>
        <div class="grid three" style="margin-top:.8rem">
          ${completedContracts.map(c => contractCard(c, "completed")).join("")}
        </div>
      </div>
    ` : ""}
  `;

  document.querySelectorAll("[data-contract]").forEach(btn => {
    btn.addEventListener("click", () => acceptContract(btn.dataset.contract));
  });

  document.querySelectorAll("[data-accept-customer]").forEach(button => {
    button.addEventListener("click", () => acceptCustomerLead(button.dataset.acceptCustomer));
  });

  const refreshButton = el("contractBoardRefreshBtn");
  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      if (!spend(15)) return;
      generateContracts();
      addLog("Refreshed the Cedar Valley contract board.");
      saveGame(false);
      renderAll();
    });
  }
}

function acceptContract(id) {
  const c = state.contracts.find(x => x.id === id);
  if (!c || c.completed || c.failed) return;

  c.accepted = true;
  c.failed = false;
  c.durationDays = Number(c.durationDays || c.days || 5);
  c.daysLeft = Number(c.daysLeft || c.durationDays);

  addLog(`Accepted contract "${c.title}". You have ${c.daysLeft} days to complete it.`);
  saveGame(false);
  renderAll();
}

const STAFF_POOL = [
  { role: "Stablehand", name: "Emily Parker", wage: 45, skill: 3, desc: "Feeds horses automatically each morning." },
  { role: "Trainer", name: "Thomas Reed", wage: 85, skill: 4, desc: "Adds a small amount of training to one horse each day." },
  { role: "Farrier", name: "Arthur Cole", wage: 70, skill: 4, desc: "Reduces daily hoof wear." },
  { role: "Manager", name: "Clara Bennett", wage: 120, skill: 5, desc: "Improves daily business income and reputation." }
];

function renderStaff() {
  el("staffView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">EMPLOYEES</div>
        <h2>Stable Staff</h2>
        <p>Hire people to automate routine work as your operation grows.</p>
      </div>
    </div>

    <div class="grid two">
      <div class="card">
        <h3>Current Staff</h3>
        <div class="list">
          ${state.staff.map(s=>`
            <div class="list-item">
              <div class="row">
                <div><strong>${escapeHtml(s.name)}</strong><div class="muted">${escapeHtml(s.role)} • Skill ${s.skill}/5</div></div>
                <strong>${money(s.wage)}/day</strong>
              </div>
              <div class="muted" style="margin-top:.4rem">${escapeHtml(s.desc)}</div>
              <button data-fire="${s.id}" class="danger" style="margin-top:.6rem">Dismiss</button>
            </div>
          `).join("") || `<div class="muted">You are currently running the stable alone.</div>`}
        </div>
      </div>

      <div class="card">
        <h3>Hiring Board</h3>
        <div class="list">
          ${STAFF_POOL.filter(p=>!state.staff.some(s=>s.role===p.role)).map(p=>`
            <div class="list-item">
              <div class="row">
                <div><strong>${p.name}</strong><div class="muted">${p.role} • Skill ${p.skill}/5</div></div>
                <strong>${money(p.wage)}/day</strong>
              </div>
              <div class="muted" style="margin-top:.4rem">${p.desc}</div>
              <button data-hire="${p.role}" style="margin-top:.6rem">Hire</button>
            </div>
          `).join("") || `<div class="muted">All available staff roles are currently filled.</div>`}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll("[data-hire]").forEach(btn=>btn.addEventListener("click",()=>hireStaff(btn.dataset.hire)));
  document.querySelectorAll("[data-fire]").forEach(btn=>btn.addEventListener("click",()=>fireStaff(btn.dataset.fire)));
}

function hireStaff(role) {
  const p = STAFF_POOL.find(x=>x.role===role);
  if (!p) return;
  const hiringFee = p.wage * 2;
  if (!spend(hiringFee)) return;
  state.staff.push({ ...p, id: `${Date.now()}-${Math.random()}` });
  addLog(`Hired ${p.name} as ${p.role}.`);
  state.questStats.staffHired += 1;
  checkContracts("hireStaff");
  saveGame(false); renderAll();
}

function fireStaff(id) {
  const s = state.staff.find(x=>x.id===id);
  if (!s) return;
  if (!confirm(`Dismiss ${s.name}?`)) return;
  state.staff = state.staff.filter(x=>x.id!==id);
  addLog(`Dismissed ${s.name}.`);
  saveGame(false); renderAll();
}

function processStaff() {
  const wages = state.staff.reduce((sum,s)=>sum+s.wage,0);
  if (wages > 0) {
    if (state.money >= wages) {
      state.money -= wages;
      addLog(`Paid ${money(wages)} in staff wages.`);
    } else {
      state.reputation = Math.max(0, state.reputation - 3);
      addLog(`Could not fully cover staff wages. Reputation suffered.`);
    }
  }

  if (state.staff.some(s=>s.role==="Stablehand") && state.inventory.feed >= state.horses.length) {
    state.horses.forEach(h => {
      if (!h.fed) {
        state.inventory.feed--;
        h.fed = true;
        h.health = clamp(h.health + 2,0,100);
      }
    });
    if (state.horses.length) addLog("Stablehand handled morning feeding.");
  }

  if (state.staff.some(s=>s.role==="Trainer") && state.horses.length) {
    const target = [...state.horses].sort((a,b)=>a.training-b.training)[0];
    target.training = clamp(target.training + 2,0,100);
    addLog(`Trainer worked with ${target.name}.`);
  }

  if (estateBuildingCount("feedWarehouse") && Math.random() < .28) {
    state.inventory.feed += 2;
    addLog("Feed Warehouse bulk stock saved two bags of feed.");
  }

  if (state.staff.some(s=>s.role==="Manager")) {
    const income = 25 + state.stableLevel*5;
    earn(income);
    if (Math.random() < .25) state.reputation += 1;
    addLog(`Manager generated ${money(income)} in stable service income.`);
  }
}

function processRandomEvent() {
  if (state.day - state.lastRandomEventDay < 2 || Math.random() > .35) return;
  state.lastRandomEventDay = state.day;
  const events = [
    () => {
      const amount = rand(35,90);
      state.money = Math.max(0,state.money-amount);
      addLog(`A storm damaged supplies. Repairs and replacements cost ${money(amount)}.`);
    },
    () => {
      if (!state.horses.length) return;
      const h = choice(state.horses);
      h.health = clamp(h.health-rand(4,10),0,100);
      addLog(`${h.name} developed a minor illness and lost some health.`);
    },
    () => {
      const tip = rand(40,120);
      earn(tip);
      addLog(`A satisfied customer left an unexpected ${money(tip)} bonus.`);
    },
    () => {
      state.reputation += 2;
      addLog(`Word of your stable spread around Cedar Valley. Reputation increased.`);
    },
    () => {
      state.inventory.feed += 4;
      addLog(`A neighboring rancher traded you four bags of feed for helping with a loose horse.`);
    }
  ];
  choice(events)();
}

function advanceDay() {
  state.day += 1;
  state.questStats.totalDays += 1;
  state.energy = 100;

  if (state.day > 30) {
    state.day = 1;
    state.seasonIndex += 1;
    if (state.seasonIndex > 3) {
      state.seasonIndex = 0;
      state.year += 1;
      state.horses.forEach(h => h.age += 1);
    }
  }

  const paddockBonus = estateBuildingCount("paddock") * 2;
  const vetRecoveryBonus = estateBuildingCount("vetWing") ? 1 : 0;

  state.horses.forEach(h => {
    h = normalizeHorseData(h);
    h.fed = false;
    h.groomed = false;
    h.energy = clamp(h.energy + rand(18,28), 0, 100);
    h.stress = clamp(h.stress - rand(7, 12) - paddockBonus, 0, 100);
    h.health = clamp(h.health - (Math.random() < .20 ? rand(0,2) : 0), 0, 100);
    h.hoofCare = clamp(h.hoofCare - rand(1,4), 0, 100);

    if (h.injury) {
      h.injury.daysLeft = Math.max(0, Number(h.injury.daysLeft || 1) - 1 - vetRecoveryBonus);
      h.fitness = clamp(h.fitness - 1, 0, 100);

      if (h.injury.daysLeft <= 0) {
        h.healthRecords.push(`Y${state.year} ${seasons()[state.seasonIndex]} ${state.day}: Recovered from ${h.injury.name}`);
        addLog(`${h.name} recovered from ${h.injury.name.toLowerCase()}.`);
        h.injury = null;
      }
    } else if (h.fitness > 20 && Math.random() < .35) {
      h.fitness = clamp(h.fitness - 1, 0, 100);
    }

    if (state.inventory.feed <= 0) h.health = clamp(h.health - 3, 0, 100);
  });

  processPregnancies();

  Object.keys(state.condition).forEach(key => {
    const wear = Math.random() < .4 ? rand(0,2) : 0;
    state.condition[key] = clamp(state.condition[key] - wear, 0, 100);
  });

  processStaff();
  processAdvertising();
  processCustomerLeads();
  processRivals();
  processAuctionDay();
  processRandomEvent();

  if (state.loanBalance && state.loanBalance > 0) {
    const payment = Math.min(50, state.loanBalance, state.money);
    state.loanBalance -= payment;
    state.money -= payment;
    if (payment > 0) addLog(`Bank collected ${money(payment)} toward your loan.`);
    if (state.loanBalance <= 0) addLog("Your stable loan has been repaid.");
  }

  state.contracts.forEach(c => {
    if (c.accepted && !c.completed && !c.failed) {
      c.daysLeft = Math.max(0, Number(c.daysLeft ?? c.durationDays ?? c.days ?? 1) - 1);

      if (c.daysLeft <= 0) {
        c.failed = true;
        c.accepted = false;
        state.reputation = Math.max(0, state.reputation - (c.source === "customer" ? 3 : 2));
        addLog(`${c.source === "customer" ? "Customer job" : "Contract"} "${c.title}" expired before it was completed.`);
      }
    }
  });

  if ((state.day - 1) % 3 === 0) refreshMarket();
  if ((state.day - 1) % 4 === 0) generateContracts();

  advanceWorldWeather();
  recalcHorseValues();
  addLog(`A new day begins in ${seasons()[state.seasonIndex]} — ${state.world.weather.name}.`);
  saveGame(false);
  renderAll();
  toast("A new day has begun.");
}

function renderAll() {
  renderHeader();
  renderDashboard();
  renderHorses();
  renderBreeding();
  renderStable();
  renderTown();
  renderRacing();
  renderContracts();
  renderStory();
  renderStaff();
  switchView(activeView);
  updateSaveSafetyStatus();
  updateBackupButton();
}

function switchView(view) {
  activeView = view;
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("active", b.dataset.view===view));
  el(`${view}View`).classList.add("active");
}



function loadAudioPreferences() {
  const defaults = {
    enabled: false,
    volume: 0.35,
    currentTrack: 0
  };

  try {
    const saved = JSON.parse(localStorage.getItem(AUDIO_PREF_KEY) || "null");
    if (!saved || typeof saved !== "object") return defaults;

    const parsedVolume = Number(saved.volume);
    const parsedTrack = Number(saved.currentTrack);

    return {
      enabled: Boolean(saved.enabled),
      volume: Number.isFinite(parsedVolume) ? clamp(parsedVolume, 0, 1) : defaults.volume,
      currentTrack: Number.isInteger(parsedTrack)
        ? clamp(parsedTrack, 0, Math.max(0, GAME_PLAYLIST.length - 1))
        : defaults.currentTrack
    };
  } catch {
    return defaults;
  }
}

let audioPrefs = loadAudioPreferences();
let musicHistory = [];
let historyPosition = -1;

function saveAudioPreferences() {
  localStorage.setItem(AUDIO_PREF_KEY, JSON.stringify(audioPrefs));
}

function currentTrack() {
  return GAME_PLAYLIST[audioPrefs.currentTrack] || GAME_PLAYLIST[0];
}

function setTrackSource(index) {
  const audio = el("bgMusic");
  if (!audio || GAME_PLAYLIST.length === 0) return;

  const safeIndex = clamp(Number(index) || 0, 0, GAME_PLAYLIST.length - 1);
  audioPrefs.currentTrack = safeIndex;

  const track = GAME_PLAYLIST[safeIndex];
  const newSrc = new URL(track.file, window.location.href).href;

  if (audio.src !== newSrc) {
    audio.src = track.file;
    audio.load();
  }

  saveAudioPreferences();
  updateMusicControls();
}

function rememberTrack(index) {
  if (musicHistory[historyPosition] === index) return;
  musicHistory = musicHistory.slice(0, historyPosition + 1);
  musicHistory.push(index);
  if (musicHistory.length > 30) musicHistory.shift();
  historyPosition = musicHistory.length - 1;
}

function randomNextTrackIndex() {
  if (GAME_PLAYLIST.length <= 1) return 0;

  const candidates = GAME_PLAYLIST
    .map((_, index) => index)
    .filter(index => index !== audioPrefs.currentTrack);

  return candidates[Math.floor(Math.random() * candidates.length)];
}

async function playCurrentTrack({ remember = true } = {}) {
  const audio = el("bgMusic");
  if (!audio || GAME_PLAYLIST.length === 0) return;

  if (!audio.src) setTrackSource(audioPrefs.currentTrack);

  audioPrefs.enabled = true;
  audio.volume = audioPrefs.volume;
  if (remember) rememberTrack(audioPrefs.currentTrack);
  saveAudioPreferences();

  try {
    await audio.play();
  } catch {
    toast("Your browser needs you to press Play once before music can start.");
  }

  updateMusicControls();
}

function pauseMusic() {
  const audio = el("bgMusic");
  if (!audio) return;
  audio.pause();
  audioPrefs.enabled = false;
  saveAudioPreferences();
  updateMusicControls();
}

function toggleMusic() {
  const audio = el("bgMusic");
  if (!audio) return;

  if (audio.paused) {
    playCurrentTrack();
  } else {
    pauseMusic();
  }
}

async function playTrack(index, { remember = true } = {}) {
  const audio = el("bgMusic");
  if (!audio || GAME_PLAYLIST.length === 0) return;

  setTrackSource(index);
  audio.currentTime = 0;

  if (remember) rememberTrack(index);

  audioPrefs.enabled = true;
  saveAudioPreferences();

  try {
    await audio.play();
  } catch {
    toast("Press Play to start the selected song.");
  }

  updateMusicControls();
}

function nextTrack({ automatic = false } = {}) {
  if (GAME_PLAYLIST.length === 0) return;
  const nextIndex = randomNextTrackIndex();

  if (automatic || audioPrefs.enabled) {
    playTrack(nextIndex);
  } else {
    setTrackSource(nextIndex);
  }
}

function previousTrack() {
  if (GAME_PLAYLIST.length === 0) return;

  if (historyPosition > 0) {
    historyPosition -= 1;
    const previousIndex = musicHistory[historyPosition];
    playTrack(previousIndex, { remember: false });
    return;
  }

  // If there is no history yet, wrap to the track immediately before this one.
  const previousIndex =
    (audioPrefs.currentTrack - 1 + GAME_PLAYLIST.length) % GAME_PLAYLIST.length;
  playTrack(previousIndex);
}

function setMusicVolume(rawValue) {
  const audio = el("bgMusic");
  const numeric = clamp(Number(rawValue), 0, 100);

  audioPrefs.volume = numeric / 100;
  if (audio) audio.volume = audioPrefs.volume;

  saveAudioPreferences();
  updateMusicControls();
}

function updateMusicControls() {
  const audio = el("bgMusic");
  const toggle = el("musicToggleBtn");
  const playPause = el("musicPlayPauseBtn");
  const slider = el("musicVolume");
  const status = el("musicStatus");
  const value = el("volumeValue");
  const title = el("currentTrackTitle");
  const number = el("currentTrackNumber");

  if (!audio || !toggle || !playPause || !slider || !status || !value || !title || !number) return;

  const percent = Math.round(audioPrefs.volume * 100);
  const track = currentTrack();

  slider.value = percent;
  value.textContent = `${percent}%`;
  audio.volume = audioPrefs.volume;

  title.textContent = track ? track.title : "No music";
  number.textContent = GAME_PLAYLIST.length
    ? `Track ${audioPrefs.currentTrack + 1} of ${GAME_PLAYLIST.length} • Shuffle`
    : "Playlist empty";

  const playing = !audio.paused && !audio.ended;

  toggle.textContent = playing ? "Pause" : "Play";
  toggle.classList.toggle("playing", playing);
  toggle.setAttribute("aria-pressed", String(playing));

  playPause.textContent = playing ? "⏸" : "▶";
  playPause.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  playPause.title = playing ? "Pause" : "Play";

  if (playing) status.textContent = audioPrefs.volume === 0 ? "Playing • Muted" : "Playing • Shuffle";
  else if (audioPrefs.enabled) status.textContent = "Ready";
  else status.textContent = "Paused";
}

function setupMusic() {
  const audio = el("bgMusic");
  const toggle = el("musicToggleBtn");
  const playPause = el("musicPlayPauseBtn");
  const previous = el("previousTrackBtn");
  const next = el("nextTrackBtn");
  const slider = el("musicVolume");

  if (!audio || !toggle || !playPause || !previous || !next || !slider) return;

  setTrackSource(audioPrefs.currentTrack);
  audio.volume = audioPrefs.volume;

  toggle.addEventListener("click", toggleMusic);
  playPause.addEventListener("click", toggleMusic);
  previous.addEventListener("click", previousTrack);
  next.addEventListener("click", () => nextTrack());
  slider.addEventListener("input", event => setMusicVolume(event.target.value));

  audio.addEventListener("play", updateMusicControls);
  audio.addEventListener("pause", updateMusicControls);

  // Every completed song automatically shuffles to another official game track.
  audio.addEventListener("ended", () => nextTrack({ automatic: true }));

  audio.addEventListener("error", () => {
    const status = el("musicStatus");
    if (status) status.textContent = "Track unavailable";
  });

  updateMusicControls();
}

function exportSave() {
  saveGame(false);

  const blob = new Blob([JSON.stringify(state, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  const safeStableName = String(state.stableName || "stable-empire")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "stable-empire";

  const stamp = new Date().toISOString().slice(0, 10);

  a.href = URL.createObjectURL(blob);
  a.download = `${safeStableName}-save-${stamp}.json`;
  a.click();

  setTimeout(() => URL.revokeObjectURL(a.href), 0);
  toast("Save backup downloaded.");
}

function importSave(file) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);

      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Save data is not an object.");
      }

      // A Stable Empire save should contain at least some recognizable career fields.
      const looksLikeStableEmpire =
        "ownerName" in parsed ||
        "stableName" in parsed ||
        "horses" in parsed ||
        "money" in parsed ||
        "saveSchemaVersion" in parsed;

      if (!looksLikeStableEmpire) {
        throw new Error("This does not appear to be a Stable Empire save.");
      }

      const existingRaw = localStorage.getItem(STORAGE_KEY);

      if (existingRaw) {
        const currentName = state?.stableName || "your current stable";
        const loadedName = parsed.stableName || "this saved game";

        if (!confirm(
          `Load "${loadedName}"?\n\n` +
          `Your current browser career (${currentName}) will be backed up automatically before the loaded save replaces it.`
        )) {
          return;
        }

        createPreUpdateBackup(
          existingRaw,
          Number(state?.saveSchemaVersion || state?.version || 1)
        );
      }

      const raw = JSON.stringify(parsed);
      state = migrateSaveData(parsed, raw);

      recalcHorseValues();
      if (!state.auction.horse) refreshAuction(false);
      if (!state.world?.weather?.name) initializeWorldWeather();

      activeView = "dashboard";
      saveGame(false);

      const newGameModal = el("newGameModal");
      if (newGameModal) newGameModal.classList.add("hidden");

      renderAll();
      toast(`Loaded ${state.stableName}.`);
    } catch (error) {
      console.error("Stable Empire save load failed:", error);
      toast("That file could not be loaded as a Stable Empire save.");
    }
  };

  reader.onerror = () => {
    toast("The save file could not be read.");
  };

  reader.readAsText(file);
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[ch]);
}
function escapeAttr(value) { return escapeHtml(value); }

function setupEvents() {
  setupMusic();

  el("cutsceneContinueBtn").addEventListener("click", nextCutsceneLine);
  el("cutsceneSkipBtn").addEventListener("click", () => closeCutscene({ skipped: true }));
  el("cutsceneVoiceBtn").addEventListener("click", toggleCutsceneVoice);

  el("cutsceneOverlay").addEventListener("click", event => {
    if (event.target === el("cutsceneOverlay")) {
      // Clicking outside never closes a cinematic accidentally.
      event.preventDefault();
    }
  });
  document.querySelectorAll("#nav button").forEach(btn=>btn.addEventListener("click",()=>switchView(btn.dataset.view)));
  el("advanceDayBtn").addEventListener("click", advanceDay);
  el("saveBtn").addEventListener("click", ()=>saveGame(true));
  el("restoreBackupBtn").addEventListener("click", restorePreUpdateBackup);
  el("exportBtn").addEventListener("click", exportSave);
  el("importInput").addEventListener("change", e => {
    const file = e.target.files?.[0];
    if (file) importSave(file);
    e.target.value = "";
  });
  el("resetBtn").addEventListener("click", () => {
    if (!confirm("Delete your current Stable Empire save and start over?")) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });
  el("startGameBtn").addEventListener("click", startNewGame);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && localStorage.getItem(STORAGE_KEY)) {
      saveGame(false);
    }
  });

  window.addEventListener("pagehide", () => {
    if (localStorage.getItem(STORAGE_KEY)) saveGame(false);
  });

  document.addEventListener("keydown", event => {
    if (!activeCutscene) return;
    if (event.key === "Escape") {
      closeCutscene({ skipped: true });
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && !el("cutsceneContinueBtn").classList.contains("hidden")) {
      event.preventDefault();
      nextCutsceneLine();
    }
  });
}

function boot() {
  setupEvents();
  const loaded = loadGame();

  if (!loaded) {
    el("newGameModal").classList.remove("hidden");
    state = DEFAULT_STATE();
    initializeWorldWeather();
    refreshMarket();
    refreshAuction(false);
    generateContracts();
  } else {
    el("newGameModal").classList.add("hidden");
  }

  renderAll();
}

boot();
