export const CONTACT = {
  email: "rob.benard@outlook.com",
  linkedin: "https://www.linkedin.com/in/robertbenard/",
  site: "https://robbenard.com",
  oversight: "https://oversightreports.com",
  facilityExample: "https://oversightreports.com/facility/525165",
};

export const TODOS = {
  email:
    "Confirm rob.benard@outlook.com is still the preferred public address.",
  linkedin:
    "Confirm https://www.linkedin.com/in/robertbenard/ is the public profile to list.",
};

export const PERSON = {
  name: "Robert Benard",
  role: "Nurse practitioner + builder",
  city: "Oakland / Bay Area",
  credentials: "ICU · Critical care · Addiction medicine",
};

export const CHAPTERS = [
  { id: "hook", label: "Hook", num: "01" },
  { id: "thesis", label: "Thesis", num: "02" },
  { id: "bedside", label: "Bedside", num: "03" },
  { id: "build", label: "Build", num: "04" },
  { id: "oversight", label: "Oversight", num: "05" },
  { id: "experiments", label: "Labs", num: "06" },
  { id: "life", label: "Signal", num: "07" },
] as const;

export const FACILITY = {
  name: "Samaritan Nursing and Rehab",
  city: "West Bend, WI",
  ccn: "525165",
  beds: 131,
  stars: 1,
  composite: 46.9,
  deficiencies: 65,
  jeopardy: 4,
  fines: "$210K",
  rnHprd: "1.28",
  staffing: "4.95",
};

export const BEDSIDE = [
  {
    id: "icu",
    stamp: "02:14",
    kicker: "ICU / critical care",
    title: "Vent alarm.\nThe room is already a decision.",
    body: "Night shift at Sutter / CPMC. Numbers move faster than the note. The job is judgment under noise — then leaving a trail someone else can trust at 07:00.",
    tag: "NIGHTS",
  },
  {
    id: "sud",
    stamp: "PAGER",
    kicker: "Addiction medicine consult",
    title: "The person,\nnot the stigma.",
    body: "Highland / Alameda Health. Withdrawal, induction, the 24-hour window after the ED. Consults are conversations that have to survive the discharge.",
    tag: "CONSULT",
  },
  {
    id: "habit",
    stamp: "OAK",
    kicker: "Two hospitals, one habit",
    title: "Notice the gap.\nThen ship the fix.",
    body: "If the workflow lives in one person’s head, it dies on their day off. I build the smallest tool that holds the protocol — and I test it with the person who would actually click it.",
    tag: "HABIT",
  },
];
