export type Exercise = {
  id: string;
  nameHe: string;
  nameEn: string;
  category: 'push' | 'pull' | 'legs' | 'core' | 'skills';
  level: 'beginner' | 'intermediate' | 'advanced';
  aliases: string[];
  cueHe?: string;
};

/** Read-only Hebrew calisthenics library (~25) with search aliases. */
export const EXERCISES: Exercise[] = [
  {
    id: 'ex_pushup',
    nameHe: 'שכיבות סמיכה',
    nameEn: 'Push-Up',
    category: 'push',
    level: 'beginner',
    aliases: ['שכיבות', 'pushup', 'push-up', 'push ups'],
    cueHe: 'גוף ישר כמו קרש. רדו לאט ודחפו למעלה.',
  },
  {
    id: 'ex_knee_pushup',
    nameHe: 'שכיבות סמיכה על הברכיים',
    nameEn: 'Knee Push-Up',
    category: 'push',
    level: 'beginner',
    aliases: ['ברכיים', 'knee pushup'],
  },
  {
    id: 'ex_diamond_pushup',
    nameHe: 'שכיבות סמיכה יהלום',
    nameEn: 'Diamond Push-Up',
    category: 'push',
    level: 'intermediate',
    aliases: ['יהלום', 'diamond', 'triceps pushup'],
  },
  {
    id: 'ex_parallel_dip',
    nameHe: 'מקבילים',
    nameEn: 'Parallel Dip',
    category: 'push',
    level: 'intermediate',
    aliases: ['דיפים', 'dips', 'dip', 'מקבילים', 'parallel dips', 'מקביל'],
    cueHe: 'רדו עד שהכתפיים מתחת למרפקים ודחפו חזק למעלה.',
  },
  {
    id: 'ex_bench_dip',
    nameHe: 'מקבילים על ספסל',
    nameEn: 'Bench Dip',
    category: 'push',
    level: 'beginner',
    aliases: ['דיפים ספסל', 'bench dips', 'dips', 'דיפים'],
  },
  {
    id: 'ex_negative_dip',
    nameHe: 'דיפ שלילי',
    nameEn: 'Negative Dip',
    category: 'push',
    level: 'beginner',
    aliases: ['דיפ שלילי', 'שלילי דיפ', 'negative dip', 'negative dips', 'eccentric dip', 'דיפים שליליים'],
    cueHe: 'עלו למעלה בעזרה ורדו לאט ומבוקר במקבילים.',
  },
  {
    id: 'ex_pullup',
    nameHe: 'מתח',
    nameEn: 'Pull-Up',
    category: 'pull',
    level: 'intermediate',
    aliases: ['מתח', 'pullup', 'pull-up', 'pull ups'],
  },
  {
    id: 'ex_chinup',
    nameHe: 'מתח באחיזה הפוכה',
    nameEn: 'Chin-Up',
    category: 'pull',
    level: 'intermediate',
    aliases: ['צ׳ין אפ', 'chinup', 'chin-up'],
  },
  {
    id: 'ex_australian_row',
    nameHe: 'חתירה אוסטרלית',
    nameEn: 'Australian Row',
    category: 'pull',
    level: 'beginner',
    aliases: ['חתירה', 'row', 'inverted row', 'אוסטרלית'],
  },
  {
    id: 'ex_dead_hang',
    nameHe: 'תלייה מתה',
    nameEn: 'Dead Hang',
    category: 'pull',
    level: 'beginner',
    aliases: ['תלייה', 'hang', 'dead hang'],
  },
  {
    id: 'ex_negative_pullup',
    nameHe: 'מתח שלילי',
    nameEn: 'Negative Pull-Up',
    category: 'pull',
    level: 'beginner',
    aliases: ['שלילי', 'negative', 'eccentric'],
  },
  {
    id: 'ex_air_squat',
    nameHe: 'סקוואט משקל גוף',
    nameEn: 'Air Squat',
    category: 'legs',
    level: 'beginner',
    aliases: ['סקוואט', 'squat', 'air squat'],
  },
  {
    id: 'ex_lunges',
    nameHe: 'לאנג׳ים',
    nameEn: 'Walking Lunges',
    category: 'legs',
    level: 'beginner',
    aliases: ['לאנג׳', 'lunge', 'lunges'],
  },
  {
    id: 'ex_bulgarian_split',
    nameHe: 'סקוואט בולגרי',
    nameEn: 'Bulgarian Split Squat',
    category: 'legs',
    level: 'intermediate',
    aliases: ['בולגרי', 'bulgarian', 'split squat'],
  },
  {
    id: 'ex_pistol_squat',
    nameHe: 'סקוואט פיסטול',
    nameEn: 'Pistol Squat',
    category: 'legs',
    level: 'advanced',
    aliases: ['פיסטול', 'pistol'],
  },
  {
    id: 'ex_glute_bridge',
    nameHe: 'גשר ישבן',
    nameEn: 'Glute Bridge',
    category: 'legs',
    level: 'beginner',
    aliases: ['גשר', 'bridge', 'glute'],
  },
  {
    id: 'ex_calf_raise',
    nameHe: 'עליות עקבים',
    nameEn: 'Calf Raise',
    category: 'legs',
    level: 'beginner',
    aliases: ['שוקיים', 'calf', 'calves'],
  },
  {
    id: 'ex_plank',
    nameHe: 'פלאנק',
    nameEn: 'Plank',
    category: 'core',
    level: 'beginner',
    aliases: ['פלאנק', 'plank'],
  },
  {
    id: 'ex_hollow_hold',
    nameHe: 'הולו באודי',
    nameEn: 'Hollow Body Hold',
    category: 'core',
    level: 'beginner',
    aliases: ['הולו', 'hollow'],
  },
  {
    id: 'ex_hanging_knee_raise',
    nameHe: 'הרמות ברכיים בתלייה',
    nameEn: 'Hanging Knee Raise',
    category: 'core',
    level: 'beginner',
    aliases: ['ברכיים', 'knee raise', 'hanging'],
  },
  {
    id: 'ex_l_sit_floor',
    nameHe: 'L-sit על הרצפה',
    nameEn: 'Floor L-Sit',
    category: 'core',
    level: 'intermediate',
    aliases: ['אל סיט', 'l-sit', 'lsit', 'L sit'],
  },
  {
    id: 'ex_toes_to_bar',
    nameHe: 'בהונות למתח',
    nameEn: 'Toes-to-Bar',
    category: 'core',
    level: 'advanced',
    aliases: ['טי טי בי', 'toes to bar', 'ttb'],
  },
  {
    id: 'ex_muscle_up',
    nameHe: 'מאסל-אפ',
    nameEn: 'Muscle-Up',
    category: 'skills',
    level: 'advanced',
    aliases: ['מאסל אפ', 'muscle up', 'muscle-up'],
  },
  {
    id: 'ex_chest_wall_hs',
    nameHe: 'עמידת ידיים חזה לקיר',
    nameEn: 'Chest-to-Wall Handstand',
    category: 'skills',
    level: 'intermediate',
    aliases: ['עמידת ידיים', 'handstand', 'hs'],
  },
  {
    id: 'ex_pike_pushup',
    nameHe: 'שכיבות סמיכה פַּיק',
    nameEn: 'Pike Push-Up',
    category: 'push',
    level: 'intermediate',
    aliases: ['פייק', 'pike', 'pike pushup'],
  },
  {
    id: 'ex_planche_lean',
    nameHe: 'לין לפלאנש',
    nameEn: 'Planche Lean',
    category: 'skills',
    level: 'beginner',
    aliases: ['פלאנש', 'planche', 'lean'],
  },
];

export function searchExercises(query: string): Exercise[] {
  const q = query.trim().toLowerCase();
  if (!q) return EXERCISES;
  return EXERCISES.filter((ex) => {
    const hay = [ex.nameHe, ex.nameEn, ...ex.aliases].join(' ').toLowerCase();
    return hay.includes(q);
  });
}
