# Architecture — כושר פלוס / Kosher Plus (**M1α**)

## עברית

### מה זה M1α?
שכבת scaffold חופשית (free-path): מעטפת טאבים, ספריית תרגילים לקריאה בלבד, גלגלי משקל/גובה, ואונבורדינג מינימלי רב־שלבי. **לא** M1 מלא (אין 14 שלבי אונבורדינג, אין SQL/migrations, אין WorkoutSession מלא).

### תיקיות עיקריות
| נתיב | תפקיד |
|------|--------|
| `app/(tabs)/` | 5 טאבים: אימונים, חבילות תרגילים, צ׳אט, תזונה, פרופיל |
| `app/onboarding/` | אונבורדינג M1α (מגדר, מטרה, סוג גוף, משקל, גובה, ימי אימון) |
| `app/auth/` | מסכי sign-in / sign-up (placeholder בלי env) |
| `components/` | `NumberWheel`, stubs, themed helpers |
| `constants/` | מותג + צבעי lime `#22C55E` |
| `data/exercises.ts` | Seed תרגילים RO + aliases + חיפוש |
| `lib/` | Supabase client stub, RTL (`forceRtl`) |

### מה נדחה (deferred)
- אונבורדינג מלא ~14 שלבים (גיל, פעילות, ניסיון, משקל יעד, מיקום, פלאנק, סיכום…)
- `supabase/migrations` / seed SQL ל־`profiles` / `exercises`
- Persist פרופיל ל־Supabase
- WorkoutSession (timer / sets / complete)
- Auth gate אוטומטי למשתמש חדש → onboarding
- OAuth stubs (Apple/Google)
- צ׳אט AI חי / יומן תזונה

---

## English

### What is M1α?
Free-path scaffold: tab shell, read-only exercise library, weight/height wheels (+ unit toggles), and a **minimal** multi-step onboarding. **Not** full M1 (no full 14-step onboarding, no SQL migrations, no full WorkoutSession).

### Key folders
| Path | Role |
|------|------|
| `app/(tabs)/` | Five tabs: Workouts, Exercise packs, Chat, Nutrition, Profile |
| `app/onboarding/` | M1α onboarding (gender, goal, body type, weight, height, training days) |
| `app/auth/` | Sign-in / sign-up placeholders |
| `components/` | `NumberWheel`, stubs, themed helpers |
| `constants/` | Brand + lime `#22C55E` |
| `data/exercises.ts` | RO exercise seed + aliases + search |
| `lib/` | Supabase stub, RTL helper |

### Deferred
- Full ~14-step onboarding
- SQL migrations / profile persist
- WorkoutSession core loop
- Auth gate + OAuth stubs
- Live AI chat / nutrition diary

Canonical units: **kg** and **cm** (UI may toggle lb / ft).
