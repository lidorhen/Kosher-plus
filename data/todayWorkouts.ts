export type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export type PlanExercise = {
  exerciseId?: string;
  nameHe: string;
  sets: number;
  reps: string;
};

export type DayPlan = {
  dayKey: DayKey;
  titleHe: string;
  minutes?: number;
  tags: string[];
  exercises: PlanExercise[];
  isRest: boolean;
  /** Greeting / Mind copy on rest days */
  restNote?: string;
  optional?: boolean;
  ctaHe?: string;
};

/** Week-1 dashboard cards — static, no Supabase. Source: docs/content/TODAY_WORKOUT_CARDS.md */
export const TODAY_WORKOUTS: DayPlan[] = [
  {
    dayKey: 'sun',
    titleHe: 'דחיפה + ליבה',
    minutes: 30,
    tags: ['דחיפה', 'ליבה', 'מתחילים'],
    exercises: [
      { exerciseId: 'ex_knee_pushup', nameHe: 'שכיבות סמיכה על הברכיים', sets: 3, reps: '8–12' },
      { exerciseId: 'ex_bench_dip', nameHe: 'מקבילים על ספסל', sets: 3, reps: '6–10' },
      { exerciseId: 'ex_planche_lean', nameHe: 'לין לפלאנש', sets: 3, reps: '15–20 שנ׳' },
      { exerciseId: 'ex_plank', nameHe: 'פלאנק', sets: 3, reps: '20–40 שנ׳' },
      { exerciseId: 'ex_hollow_hold', nameHe: 'הולו באודי', sets: 3, reps: '15–25 שנ׳' },
    ],
    isRest: false,
    ctaHe: 'התחל אימון',
  },
  {
    dayKey: 'mon',
    titleHe: 'יום מנוחה',
    minutes: 2,
    tags: ['מנוחה', 'נשימה'],
    exercises: [{ nameHe: 'נשימת קופסה', sets: 1, reps: '2 דק׳' }],
    isRest: true,
    restNote: 'בוקר טוב — היום לנוח. גוף חזק נבנה גם בין האימונים.',
    ctaHe: 'התחל נשימה',
  },
  {
    dayKey: 'tue',
    titleHe: 'משיכה + ליבה',
    minutes: 30,
    tags: ['משיכה', 'ליבה', 'אחיזה'],
    exercises: [
      { exerciseId: 'ex_dead_hang', nameHe: 'תלייה מתה', sets: 3, reps: '20–40 שנ׳' },
      { exerciseId: 'ex_scapular_pullup', nameHe: 'משיכות שכמות', sets: 3, reps: '8–12' },
      { exerciseId: 'ex_australian_row', nameHe: 'חתירה אוסטרלית', sets: 3, reps: '6–10' },
      { exerciseId: 'ex_hanging_knee_raise', nameHe: 'הרמות ברכיים בתלייה', sets: 3, reps: '8–12' },
      { exerciseId: 'ex_side_plank', nameHe: 'פלאנק צד', sets: 2, reps: '15–25 שנ׳ לכל צד' },
    ],
    isRest: false,
    ctaHe: 'התחל אימון',
  },
  {
    dayKey: 'wed',
    titleHe: 'יום מנוחה',
    minutes: 2,
    tags: ['מנוחה', 'נשימה'],
    exercises: [{ nameHe: 'נשימת קופסה', sets: 1, reps: '2 דק׳' }],
    isRest: true,
    restNote: 'יום רגוע. תנו לכתפיים ולגב להתאושש — מחר חוזרים חזקים.',
    ctaHe: 'התחל נשימה',
  },
  {
    dayKey: 'thu',
    titleHe: 'רגליים + ליבה',
    minutes: 32,
    tags: ['רגליים', 'ליבה', 'יציבות'],
    exercises: [
      { exerciseId: 'ex_air_squat', nameHe: 'סקוואט משקל גוף', sets: 3, reps: '12–15' },
      { exerciseId: 'ex_lunges', nameHe: 'לאנג׳ים', sets: 3, reps: '8–10 לכל רגל' },
      { exerciseId: 'ex_glute_bridge', nameHe: 'גשר ישבן', sets: 3, reps: '12–15' },
      { exerciseId: 'ex_calf_raise', nameHe: 'עליות עקבים', sets: 3, reps: '12–15' },
      { exerciseId: 'ex_plank', nameHe: 'פלאנק', sets: 2, reps: '30–45 שנ׳' },
      { exerciseId: 'ex_hollow_hold', nameHe: 'הולו באודי', sets: 2, reps: '20–30 שנ׳' },
    ],
    isRest: false,
    ctaHe: 'התחל אימון',
  },
  {
    dayKey: 'fri',
    titleHe: 'מיומנות קלה',
    minutes: 22,
    tags: ['מיומנות', 'נפח נמוך', 'אופציונלי'],
    exercises: [
      { exerciseId: 'ex_frog_stand', nameHe: 'עמידת צפרדע', sets: 4, reps: '10–20 שנ׳' },
      { exerciseId: 'ex_pushup', nameHe: 'שכיבות סמיכה', sets: 2, reps: '8–10' },
      { exerciseId: 'ex_australian_row', nameHe: 'חתירה אוסטרלית', sets: 2, reps: '6–8' },
      { exerciseId: 'ex_l_sit_floor', nameHe: 'L-sit על הרצפה', sets: 3, reps: '5–15 שנ׳' },
    ],
    isRest: false,
    optional: true,
    ctaHe: 'התחל אימון',
  },
  {
    dayKey: 'sat',
    titleHe: 'מנוחה מלאה',
    minutes: 2,
    tags: ['מנוחה', 'נשימה'],
    exercises: [{ nameHe: 'נשימת קופסה', sets: 1, reps: '2 דק׳' }],
    isRest: true,
    restNote: 'שבת שלום — שבוע מאחוריכם. נשימה קצרה, ואז מנוחה אמיתית.',
    ctaHe: 'התחל נשימה',
  },
];

export const DAY_KEY_BY_JS_GET_DAY: DayKey[] = [
  'sun', // 0
  'mon', // 1
  'tue', // 2
  'wed', // 3
  'thu', // 4
  'fri', // 5
  'sat', // 6
];
