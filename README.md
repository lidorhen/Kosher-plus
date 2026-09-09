# כושר פלוס (Kosher Plus) — **M1α**

אפליקציית כושר עברית (calisthenics) בעברית - Expo Router, RTL, Supabase-ready.

**מותג צבע:** `#22C55E` (lime)

**GitHub:** https://github.com/lidorhen/Kosher-plus

**Status: M1α** — wheels+library+shell; full 14-step + SQL later. See ARCHITECTURE.md.

---

## איך להריץ

```bash
cd Kosher-plus
npm install
cp .env.example .env   # optional for M1α
npx expo start
```

סרקו QR ב-Expo Go, או `w` / `a` / `i`.

### Env (.env)

מתוך .env.example:

| Var | Purpose |
|-----|---------|
| EXPO_PUBLIC_SUPABASE_URL | Supabase project URL |
| EXPO_PUBLIC_SUPABASE_ANON_KEY | Supabase anon key |

**M1α:** רץ גם בלי env (auth/onboarding placeholders).

---

## M1α (מה כלול)

- 5 לשוניות: אימונים, חבילות תרגילים, צ׳אט, תזונה, פרופיל
- ספרייה RO + aliases (כולל דיפ שלילי נפרד; dips / מקבילים)
- אונבורדינג מינימלי: מגדר, מטרה, סוג גוף, משקל 30-200x0.1 (kg/lb), גובה 120-220 (cm/ft), ימי אימון
- Workouts empty-state + CTA עבור לספרייה
- Auth + Supabase stub, RTL, lime theme
- Chat/Nutrition stubs; full 14-step + SQL deferred (ARCHITECTURE.md)

## M2 (מתוכנן)

- Persist profile/onboarding in Supabase
- Workouts CRUD, chat, nutrition, history sync

---

# English

**כושר פלוס** - Hebrew-first calisthenics Expo app (Router tabs, RTL, brand lime `#22C55E`).

## Run

```bash
cd Kosher-plus
npm install
cp .env.example .env   # optional for M1α
npx expo start
```

### Env vars

From .env.example: EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY.
App runs without them in M1α.

## M1α scope

- Tabs: Workouts, Exercise library, Chat, Nutrition, Profile
- Exercise aliases (dips / מקבילים; separate negative dip)
- Minimal onboarding: gender, goal, body-type cards, weight/height wheels + unit toggles (metric canonical), training days
- Workouts CTA to library; Chat & Nutrition stubs; Supabase stub + RTL
- Full 14-step onboarding + SQL deferred — see ARCHITECTURE.md

## M2 (planned)

- Persist profile/onboarding, workouts CRUD, chat/nutrition, history sync

## Scripts

| Script | Command |
|--------|---------|
| Start | npm start / npx expo start |
| Typecheck | npm run typecheck |
| Doctor | npm run doctor |

## Repo

https://github.com/lidorhen/Kosher-plus

## License

See LICENSE.
