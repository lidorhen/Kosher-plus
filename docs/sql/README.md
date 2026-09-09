# SQL seeds — כושר פלוס

Run after `001` profiles/exercises schema (see fitness-plus-infra).

| File | Use |
|------|-----|
| `002_seed_exercises.ascii.sql` | **Preferred for Supabase SQL Editor paste** — pure ASCII + `U&` Unicode escapes (avoids Hebrew corruption). Includes `DELETE` then upsert of 38 exercises. |
| `002_seed_exercises.sql` | UTF-8 source matching `data/exercises.ts` (upsert only). Prefer file upload / `psql`, not broken clipboard paste. |
| `002_seed_exercises.reseed.sql` | UTF-8 reseed with leading `DELETE` — same paste risk as above. |

Always keep `ex_negative_dip`. Verify after run:

```sql
select count(*) from public.exercises;
select id, name_he from public.exercises where id in ('ex_pushup','ex_negative_dip');
```
