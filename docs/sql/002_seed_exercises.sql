-- Seed public.exercises from data/exercises.ts (38). Idempotent upsert.
-- Run after 001_profiles_exercises.ready.sql. Generated 2026-09-09.

insert into public.exercises (id, name_he, name_en, category, level, aliases, cue_he)
values
  ('ex_pushup', 'שכיבות סמיכה', 'Push-Up', 'push', 'beginner', ARRAY['שכיבות', 'pushup', 'push-up', 'push ups']::text[], 'גוף ישר כמו קרש. רדו לאט ודחפו למעלה.'),
  ('ex_knee_pushup', 'שכיבות סמיכה על הברכיים', 'Knee Push-Up', 'push', 'beginner', ARRAY['ברכיים', 'knee pushup']::text[], null),
  ('ex_diamond_pushup', 'שכיבות סמיכה יהלום', 'Diamond Push-Up', 'push', 'intermediate', ARRAY['יהלום', 'diamond', 'triceps pushup']::text[], null),
  ('ex_parallel_dip', 'מקבילים', 'Parallel Dip', 'push', 'intermediate', ARRAY['דיפים', 'dips', 'dip', 'מקבילים', 'parallel dips', 'מקביל', 'parallel bars', 'bars']::text[], 'רדו עד שהכתפיים מתחת למרפקים ודחפו חזק למעלה.'),
  ('ex_bench_dip', 'מקבילים על ספסל', 'Bench Dip', 'push', 'beginner', ARRAY['דיפים ספסל', 'bench dips', 'dips', 'דיפים']::text[], null),
  ('ex_negative_dip', 'דיפ שלילי', 'Negative Dip', 'push', 'beginner', ARRAY['דיפ שלילי', 'שלילי דיפ', 'negative dip', 'negative dips', 'eccentric dip', 'דיפים שליליים']::text[], 'עלו למעלה בעזרה ורדו לאט ומבוקר במקבילים.'),
  ('ex_pullup', 'מתח', 'Pull-Up', 'pull', 'intermediate', ARRAY['מתח', 'pullup', 'pull-up', 'pull ups']::text[], null),
  ('ex_chinup', 'מתח באחיזה הפוכה', 'Chin-Up', 'pull', 'intermediate', ARRAY['צ׳ין אפ', 'chinup', 'chin-up']::text[], null),
  ('ex_australian_row', 'חתירה אוסטרלית', 'Australian Row', 'pull', 'beginner', ARRAY['חתירה', 'row', 'inverted row', 'אוסטרלית']::text[], null),
  ('ex_dead_hang', 'תלייה מתה', 'Dead Hang', 'pull', 'beginner', ARRAY['תלייה', 'hang', 'dead hang']::text[], null),
  ('ex_negative_pullup', 'מתח שלילי', 'Negative Pull-Up', 'pull', 'beginner', ARRAY['שלילי', 'negative', 'eccentric']::text[], null),
  ('ex_air_squat', 'סקוואט משקל גוף', 'Air Squat', 'legs', 'beginner', ARRAY['סקוואט', 'squat', 'air squat']::text[], null),
  ('ex_lunges', 'לאנג׳ים', 'Walking Lunges', 'legs', 'beginner', ARRAY['לאנג׳', 'lunge', 'lunges']::text[], null),
  ('ex_bulgarian_split', 'סקוואט בולגרי', 'Bulgarian Split Squat', 'legs', 'intermediate', ARRAY['בולגרי', 'bulgarian', 'split squat']::text[], null),
  ('ex_pistol_squat', 'סקוואט פיסטול', 'Pistol Squat', 'legs', 'advanced', ARRAY['פיסטול', 'pistol']::text[], null),
  ('ex_glute_bridge', 'גשר ישבן', 'Glute Bridge', 'legs', 'beginner', ARRAY['גשר', 'bridge', 'glute']::text[], null),
  ('ex_calf_raise', 'עליות עקבים', 'Calf Raise', 'legs', 'beginner', ARRAY['שוקיים', 'calf', 'calves']::text[], null),
  ('ex_plank', 'פלאנק', 'Plank', 'core', 'beginner', ARRAY['פלאנק', 'plank']::text[], null),
  ('ex_hollow_hold', 'הולו באודי', 'Hollow Body Hold', 'core', 'beginner', ARRAY['הולו', 'hollow', 'hollow body', 'הולו באודי']::text[], null),
  ('ex_hanging_knee_raise', 'הרמות ברכיים בתלייה', 'Hanging Knee Raise', 'core', 'beginner', ARRAY['ברכיים', 'knee raise', 'hanging']::text[], null),
  ('ex_l_sit_floor', 'L-sit על הרצפה', 'Floor L-Sit', 'core', 'intermediate', ARRAY['אל סיט', 'l-sit', 'lsit', 'L sit']::text[], null),
  ('ex_toes_to_bar', 'בהונות למתח', 'Toes-to-Bar', 'core', 'advanced', ARRAY['טי טי בי', 'toes to bar', 'ttb']::text[], null),
  ('ex_muscle_up', 'מאסל-אפ', 'Muscle-Up', 'skills', 'advanced', ARRAY['מאסל אפ', 'muscle up', 'muscle-up']::text[], null),
  ('ex_chest_wall_hs', 'עמידת ידיים חזה לקיר', 'Chest-to-Wall Handstand', 'skills', 'intermediate', ARRAY['עמידת ידיים', 'handstand', 'hs']::text[], null),
  ('ex_pike_pushup', 'שכיבות סמיכה פַּיק', 'Pike Push-Up', 'push', 'intermediate', ARRAY['פייק', 'pike', 'pike pushup']::text[], null),
  ('ex_planche_lean', 'לין לפלאנש', 'Planche Lean', 'skills', 'beginner', ARRAY['פלאנש', 'planche', 'lean']::text[], null),
  ('ex_tuck_planche_lean', 'לין טאק פלאנש', 'Tuck Planche Lean', 'skills', 'intermediate', ARRAY['טאק פלאנש', 'tuck planche', 'tuck planche lean', 'פלאנש טאק']::text[], 'ברכיים לכיוון החזה, כתפיים קדימה מעל כפות הידיים.'),
  ('ex_wall_handstand', 'עמידת ידיים לקיר', 'Wall Handstand', 'skills', 'intermediate', ARRAY['עמידת ידיים קיר', 'wall handstand', 'wall hs', 'הנדסטנד קיר']::text[], 'יד על יד אל הקיר, ליבה חזקה ומבט בין הידיים.'),
  ('ex_scapular_pullup', 'משיכות שכמות', 'Scapular Pull-Up', 'pull', 'beginner', ARRAY['סקפולר', 'scapular', 'scapular pullup', 'scap pull', 'שכמות מתח']::text[], 'ידיים ישרות — רק מורידים ומעלים את השכמות.'),
  ('ex_active_hang', 'תלייה פעילה', 'Active Hang', 'pull', 'beginner', ARRAY['תלייה פעילה', 'active hang', 'engaged hang']::text[], 'משכו שכמות למטה ולמעלה תוך שמירה על ידיים ישרות.'),
  ('ex_dip_support', 'תמיכה במקבילים', 'Dip Support Hold', 'push', 'beginner', ARRAY['תמיכה', 'support hold', 'dip support', 'lockout מקבילים']::text[], 'נעלו מרפקים, כתפיים רחוק מהאוזניים, ליבה מכווצת.'),
  ('ex_pseudo_planche_pushup', 'שכיבות פסאודו-פלאנש', 'Pseudo Planche Push-Up', 'push', 'intermediate', ARRAY['פסאודו פלאנש', 'pseudo planche', 'pppu']::text[], 'ידיים נמוכות יותר לכיוון המותן, כתפיים קדימה.'),
  ('ex_archer_pushup', 'שכיבות קשת', 'Archer Push-Up', 'push', 'advanced', ARRAY['ארצ׳ר', 'archer', 'archer pushup']::text[], null),
  ('ex_frog_stand', 'עמידת צפרדע', 'Frog Stand', 'skills', 'beginner', ARRAY['צפרדע', 'frog stand', 'crow prep', 'crow']::text[], 'ברכיים על הזרועות, העבירו משקל קדימה לאט.'),
  ('ex_side_plank', 'פלאנק צד', 'Side Plank', 'core', 'beginner', ARRAY['פלאנק צדדי', 'side plank', 'lateral plank']::text[], null),
  ('ex_reverse_crunch', 'כפיפות בטן הפוכות', 'Reverse Crunch', 'core', 'beginner', ARRAY['כפיפות הפוכות', 'reverse crunch', 'lower abs']::text[], null),
  ('ex_jump_squat', 'סקוואט קפיצה', 'Jump Squat', 'legs', 'intermediate', ARRAY['סקוואט ג׳אמפ', 'jump squat', 'squat jump']::text[], null),
  ('ex_skin_the_cat', 'סקין דה קאט', 'Skin the Cat', 'skills', 'intermediate', ARRAY['סקין דה קט', 'skin the cat', 'german hang prep']::text[], 'ממתח — הברכיים עוברות בין הידיים לאחור באיטיות.')
on conflict (id) do update set
  name_he = excluded.name_he,
  name_en = excluded.name_en,
  category = excluded.category,
  level = excluded.level,
  aliases = excluded.aliases,
  cue_he = excluded.cue_he;

-- expected rows: 38