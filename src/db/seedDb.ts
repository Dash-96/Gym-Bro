import { db } from "./db";

// ── weight helpers (round to nearest 0.5) ───────────────────────────────────
const r = (n: number) => Math.round(n * 2) / 2;
const bench = (wk: number, b = 0) => r(77.5 + wk * 1.0  + b);
const squat = (wk: number, b = 0) => r(82.5 + wk * 1.5  + b);
const dl    = (wk: number, b = 0) => r(105  + wk * 2.0  + b);
const ohp   = (wk: number, b = 0) => r(52.5 + wk * 0.5  + b);
const row   = (wk: number, b = 0) => r(72.5 + wk * 1.0  + b);
const lpd   = (wk: number, b = 0) => r(60   + wk * 0.5  + b);
const incl  = (wk: number, b = 0) => r(65   + wk * 1.0  + b);
const lp    = (wk: number, b = 0) => r(120  + wk * 2.5  + b);
const rdl   = (wk: number, b = 0) => r(77.5 + wk * 1.5  + b);
const lc    = (wk: number, b = 0) => r(50   + wk * 0.5  + b);
const ht    = (wk: number, b = 0) => r(80   + wk * 2.0  + b);
const cr    = (wk: number, b = 0) => r(60   + wk * 0.5  + b);
const curl  = (wk: number, b = 0) => r(16   + wk * 0.25 + b);
const ham   = (wk: number, b = 0) => r(18   + wk * 0.25 + b);
const lat   = (wk: number, b = 0) => r(12.5 + wk * 0.25 + b);
const tpd   = (wk: number, b = 0) => r(35   + wk * 0.5  + b);
const skul  = (wk: number, b = 0) => r(37.5 + wk * 0.5  + b);
const fly   = (wk: number, b = 0) => r(15   + wk * 0.5  + b);
const fp    = (wk: number, b = 0) => r(25   + wk * 0.5  + b);

type S = { setNumber: number; reps: number; weight: number };
type ExDef = { key: string; name: string; orderIndex: number; sets: S[] };
type WDef = { type: string; alias: string | null; notes: string | null; start: string; end: string; exercises: ExDef[] };

const s = (sets: [number, number, number][]): S[] =>
  sets.map(([setNumber, reps, weight]) => ({ setNumber, reps, weight }));

// ── exercise builders ────────────────────────────────────────────────────────
const BENCH  = (wk: number, i = 0): ExDef => ({ key: "chest_bench_press_barbell",       name: "Barbell Bench Press",         orderIndex: i, sets: s([[1,8,bench(wk)],[2,7,bench(wk,2.5)],[3,6,bench(wk,5)]]) });
const BENCH4 = (wk: number, i = 0): ExDef => ({ key: "chest_bench_press_barbell",       name: "Barbell Bench Press",         orderIndex: i, sets: s([[1,10,bench(wk)],[2,8,bench(wk,2.5)],[3,7,bench(wk,5)],[4,6,bench(wk,5)]]) });
const INCL   = (wk: number, i = 0): ExDef => ({ key: "chest_incline_bench_press_barbell",name: "Incline Barbell Bench Press", orderIndex: i, sets: s([[1,10,incl(wk)],[2,9,incl(wk,2.5)],[3,8,incl(wk,2.5)]]) });
const FLY    = (wk: number, i = 0): ExDef => ({ key: "chest_fly_dumbbell",              name: "Dumbbell Fly",                orderIndex: i, sets: s([[1,12,fly(wk)],[2,11,fly(wk)],[3,10,fly(wk,2.5)]]) });
const OHP    = (wk: number, i = 0): ExDef => ({ key: "shoulders_overhead_press_barbell",name: "Overhead Press (OHP)",        orderIndex: i, sets: s([[1,8,ohp(wk)],[2,7,ohp(wk,2.5)],[3,6,ohp(wk,2.5)]]) });
const LAT    = (wk: number, i = 0): ExDef => ({ key: "shoulders_lateral_raise_dumbbell",name: "Dumbbell Lateral Raise",      orderIndex: i, sets: s([[1,15,lat(wk)],[2,13,lat(wk)],[3,12,lat(wk,2.5)]]) });
const TPD    = (wk: number, i = 0): ExDef => ({ key: "arms_extension_tricep_cable_pushdown",name: "Cable Tricep Pushdown",   orderIndex: i, sets: s([[1,12,tpd(wk)],[2,11,tpd(wk,2.5)],[3,10,tpd(wk,2.5)]]) });
const SKUL   = (wk: number, i = 0): ExDef => ({ key: "arms_skullcrusher",               name: "Skullcrusher",               orderIndex: i, sets: s([[1,10,skul(wk)],[2,9,skul(wk,2.5)],[3,8,skul(wk,2.5)]]) });
const DL     = (wk: number, i = 0): ExDef => ({ key: "back_deadlift_conventional",      name: "Conventional Deadlift",      orderIndex: i, sets: s([[1,5,dl(wk)],[2,4,dl(wk,5)],[3,3,dl(wk,10)]]) });
const DL4    = (wk: number, i = 0): ExDef => ({ key: "back_deadlift_conventional",      name: "Conventional Deadlift",      orderIndex: i, sets: s([[1,5,dl(wk)],[2,5,dl(wk,5)],[3,4,dl(wk,10)],[4,3,dl(wk,15)]]) });
const ROW    = (wk: number, i = 0): ExDef => ({ key: "back_row_barbell",                name: "Barbell Row",                orderIndex: i, sets: s([[1,10,row(wk)],[2,9,row(wk,2.5)],[3,8,row(wk,5)]]) });
const LPD    = (wk: number, i = 0): ExDef => ({ key: "back_lat_pulldown",               name: "Lat Pulldown",               orderIndex: i, sets: s([[1,12,lpd(wk)],[2,11,lpd(wk,2.5)],[3,10,lpd(wk,5)]]) });
const PU     = (_wk: number, i = 0): ExDef => ({ key: "back_pull_up",                    name: "Pull Up",                    orderIndex: i, sets: s([[1,8,0],[2,7,0],[3,6,0]]) });
const CURL   = (wk: number, i = 0): ExDef => ({ key: "arms_curl_dumbbell",              name: "Dumbbell Curl",              orderIndex: i, sets: s([[1,12,curl(wk)],[2,11,curl(wk)],[3,10,curl(wk,2)]]) });
const HAM    = (wk: number, i = 0): ExDef => ({ key: "arms_curl_hammer",                name: "Hammer Curl",                orderIndex: i, sets: s([[1,12,ham(wk)],[2,11,ham(wk)],[3,10,ham(wk,2)]]) });
const FP     = (wk: number, i = 0): ExDef => ({ key: "back_face_pull",                  name: "Face Pull",                  orderIndex: i, sets: s([[1,15,fp(wk)],[2,14,fp(wk)],[3,12,fp(wk,2.5)]]) });
const SQUAT  = (wk: number, i = 0): ExDef => ({ key: "legs_squat_barbell_back",         name: "Barbell Back Squat",         orderIndex: i, sets: s([[1,8,squat(wk)],[2,7,squat(wk,2.5)],[3,6,squat(wk,5)]]) });
const SQUAT4 = (wk: number, i = 0): ExDef => ({ key: "legs_squat_barbell_back",         name: "Barbell Back Squat",         orderIndex: i, sets: s([[1,10,squat(wk)],[2,8,squat(wk,2.5)],[3,7,squat(wk,5)],[4,6,squat(wk,5)]]) });
const LP     = (wk: number, i = 0): ExDef => ({ key: "legs_leg_press",                  name: "Leg Press",                  orderIndex: i, sets: s([[1,12,lp(wk)],[2,11,lp(wk,5)],[3,10,lp(wk,10)]]) });
const RDL    = (wk: number, i = 0): ExDef => ({ key: "legs_rdl_barbell",                name: "Romanian Deadlift (Barbell)",orderIndex: i, sets: s([[1,10,rdl(wk)],[2,9,rdl(wk,2.5)],[3,8,rdl(wk,5)]]) });
const LC     = (wk: number, i = 0): ExDef => ({ key: "legs_curl_machine_lying",         name: "Lying Leg Curl",             orderIndex: i, sets: s([[1,12,lc(wk)],[2,11,lc(wk,2.5)],[3,10,lc(wk,2.5)]]) });
const HT     = (wk: number, i = 0): ExDef => ({ key: "legs_hip_thrust_barbell",         name: "Barbell Hip Thrust",         orderIndex: i, sets: s([[1,10,ht(wk)],[2,9,ht(wk,5)],[3,8,ht(wk,10)]]) });
const CR     = (wk: number, i = 0): ExDef => ({ key: "legs_calf_raise_standing",        name: "Standing Calf Raise",        orderIndex: i, sets: s([[1,15,cr(wk)],[2,14,cr(wk,2.5)],[3,12,cr(wk,5)]]) });

// ── workout list ─────────────────────────────────────────────────────────────
const workouts: WDef[] = [
  // ── Batch 1 — Week 0 (Oct 1–5) ──────────────────────────────────────────
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2025-10-01T09:00:00.000Z", end:"2025-10-01T10:20:00.000Z",
    exercises:[BENCH(0,0),OHP(0,1),INCL(0,2),LAT(0,3)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-10-03T09:00:00.000Z", end:"2025-10-03T10:10:00.000Z",
    exercises:[DL(0,0),ROW(0,1),LPD(0,2)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-10-05T10:00:00.000Z", end:"2025-10-05T11:20:00.000Z",
    exercises:[SQUAT(0,0),LP(0,1),RDL(0,2)] },

  // ── Batch 2 — Week 1 (Oct 6–12) ─────────────────────────────────────────
  { type:"Push", alias:"Chest & Triceps", notes:null,
    start:"2025-10-06T09:00:00.000Z", end:"2025-10-06T10:25:00.000Z",
    exercises:[BENCH4(1,0),INCL(1,1),OHP(1,2),TPD(1,3)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-10-08T09:00:00.000Z", end:"2025-10-08T10:15:00.000Z",
    exercises:[DL4(1,0),ROW(1,1),PU(1,2)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-10-10T10:00:00.000Z", end:"2025-10-10T11:15:00.000Z",
    exercises:[SQUAT4(1,0),LC(1,1),CR(1,2)] },

  // ── Batch 3 — Week 1 cont + Week 2 ──────────────────────────────────────
  { type:"Push", alias:"Chest & Shoulders", notes:"Felt strong today",
    start:"2025-10-12T10:00:00.000Z", end:"2025-10-12T11:00:00.000Z",
    exercises:[BENCH(1,0),FLY(1,1),LAT(1,2)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-10-13T09:00:00.000Z", end:"2025-10-13T10:25:00.000Z",
    exercises:[DL4(2,0),LPD(2,1),ROW(2,2),CURL(2,3)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-10-15T10:00:00.000Z", end:"2025-10-15T11:30:00.000Z",
    exercises:[SQUAT4(2,0),LP(2,1),LC(2,2),CR(2,3)] },

  // ── Batch 4 — Week 2–3 ───────────────────────────────────────────────────
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2025-10-17T09:00:00.000Z", end:"2025-10-17T10:20:00.000Z",
    exercises:[BENCH4(2,0),OHP(2,1),INCL(2,2)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-10-20T09:00:00.000Z", end:"2025-10-20T10:30:00.000Z",
    exercises:[DL4(3,0),ROW(3,1),PU(3,2),HAM(3,3)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-10-22T10:00:00.000Z", end:"2025-10-22T11:15:00.000Z",
    exercises:[SQUAT(3,0),RDL(3,1),HT(3,2)] },

  // ── Batch 5 — Week 3 ─────────────────────────────────────────────────────
  { type:"Push", alias:"Chest & Triceps", notes:null,
    start:"2025-10-24T09:00:00.000Z", end:"2025-10-24T10:30:00.000Z",
    exercises:[BENCH4(3,0),INCL(3,1),LAT(3,2),SKUL(3,3)] },
  { type:"Upper", alias:"Upper Body", notes:null,
    start:"2025-10-26T10:00:00.000Z", end:"2025-10-26T11:10:00.000Z",
    exercises:[BENCH(3,0),ROW(3,1),OHP(3,2)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-10-27T09:00:00.000Z", end:"2025-10-27T10:15:00.000Z",
    exercises:[DL(4,0),LPD(4,1),ROW(4,2)] },

  // ── Batch 6 — Week 4–5 ───────────────────────────────────────────────────
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-10-29T10:00:00.000Z", end:"2025-10-29T11:20:00.000Z",
    exercises:[SQUAT4(4,0),LP(4,1),CR(4,2)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2025-11-01T09:00:00.000Z", end:"2025-11-01T10:20:00.000Z",
    exercises:[BENCH(4,0),OHP(4,1),INCL(4,2)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-11-03T09:00:00.000Z", end:"2025-11-03T10:30:00.000Z",
    exercises:[DL4(5,0),ROW(5,1),LPD(5,2),CURL(5,3)] },

  // ── Batch 7 — Week 5 ─────────────────────────────────────────────────────
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-11-05T10:00:00.000Z", end:"2025-11-05T11:30:00.000Z",
    exercises:[SQUAT4(5,0),LC(5,1),RDL(5,2),CR(5,3)] },
  { type:"Push", alias:"Chest & Shoulders", notes:"Good session",
    start:"2025-11-07T09:00:00.000Z", end:"2025-11-07T10:30:00.000Z",
    exercises:[BENCH4(5,0),OHP(5,1),FLY(5,2),LAT(5,3)] },
  { type:"Upper", alias:"Upper Body", notes:null,
    start:"2025-11-10T09:00:00.000Z", end:"2025-11-10T10:30:00.000Z",
    exercises:[BENCH4(6,0),ROW(6,1),OHP(6,2),LPD(6,3)] },

  // ── Batch 8 — Week 6 ─────────────────────────────────────────────────────
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-11-12T10:00:00.000Z", end:"2025-11-12T11:15:00.000Z",
    exercises:[SQUAT4(6,0),LP(6,1),LC(6,2)] },
  { type:"Push", alias:"Chest & Triceps", notes:null,
    start:"2025-11-14T09:00:00.000Z", end:"2025-11-14T10:15:00.000Z",
    exercises:[BENCH(6,0),INCL(6,1),TPD(6,2)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-11-16T09:00:00.000Z", end:"2025-11-16T10:20:00.000Z",
    exercises:[DL4(6,0),ROW(6,1),PU(6,2)] },

  // ── Batch 9 — Week 7 ─────────────────────────────────────────────────────
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-11-17T10:00:00.000Z", end:"2025-11-17T11:30:00.000Z",
    exercises:[SQUAT4(7,0),RDL(7,1),HT(7,2),CR(7,3)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2025-11-19T09:00:00.000Z", end:"2025-11-19T10:30:00.000Z",
    exercises:[BENCH4(7,0),OHP(7,1),INCL(7,2),LAT(7,3)] },
  { type:"Pull", alias:"Back & Biceps", notes:"PR on deadlift",
    start:"2025-11-21T09:00:00.000Z", end:"2025-11-21T10:30:00.000Z",
    exercises:[DL4(7,0),LPD(7,1),ROW(7,2),HAM(7,3)] },

  // ── Batch 10 — Week 8 ────────────────────────────────────────────────────
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-11-24T10:00:00.000Z", end:"2025-11-24T11:10:00.000Z",
    exercises:[SQUAT(8,0),LP(8,1),LC(8,2)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2025-11-26T09:00:00.000Z", end:"2025-11-26T10:10:00.000Z",
    exercises:[BENCH(8,0),OHP(8,1),FLY(8,2)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-11-28T09:00:00.000Z", end:"2025-11-28T10:30:00.000Z",
    exercises:[DL4(8,0),ROW(8,1),LPD(8,2),CURL(8,3)] },

  // ── Batch 11 — Week 9 ────────────────────────────────────────────────────
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-12-01T10:00:00.000Z", end:"2025-12-01T11:30:00.000Z",
    exercises:[SQUAT4(9,0),RDL(9,1),LC(9,2),CR(9,3)] },
  { type:"Push", alias:"Chest & Triceps", notes:null,
    start:"2025-12-03T09:00:00.000Z", end:"2025-12-03T10:30:00.000Z",
    exercises:[BENCH4(9,0),INCL(9,1),OHP(9,2),TPD(9,3)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-12-05T09:00:00.000Z", end:"2025-12-05T10:15:00.000Z",
    exercises:[DL4(9,0),ROW(9,1),PU(9,2)] },

  // ── Batch 12 — Week 10 ───────────────────────────────────────────────────
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-12-08T10:00:00.000Z", end:"2025-12-08T11:10:00.000Z",
    exercises:[SQUAT(10,0),LP(10,1),HT(10,2)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2025-12-10T09:00:00.000Z", end:"2025-12-10T10:30:00.000Z",
    exercises:[BENCH4(10,0),OHP(10,1),INCL(10,2),LAT(10,3)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-12-12T09:00:00.000Z", end:"2025-12-12T10:30:00.000Z",
    exercises:[DL(10,0),LPD(10,1),ROW(10,2),CURL(10,3)] },

  // ── Batch 13 — Week 11 ───────────────────────────────────────────────────
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-12-15T10:00:00.000Z", end:"2025-12-15T11:20:00.000Z",
    exercises:[SQUAT4(11,0),LP(11,1),RDL(11,2)] },
  { type:"Push", alias:"Chest & Triceps", notes:null,
    start:"2025-12-17T09:00:00.000Z", end:"2025-12-17T10:10:00.000Z",
    exercises:[BENCH(11,0),FLY(11,1),SKUL(11,2)] },
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-12-19T09:00:00.000Z", end:"2025-12-19T10:15:00.000Z",
    exercises:[ROW(11,0),PU(11,1),HAM(11,2)] },

  // ── Batch 14 — Week 11–12 ────────────────────────────────────────────────
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2025-12-21T10:00:00.000Z", end:"2025-12-21T11:00:00.000Z",
    exercises:[BENCH(11,0),OHP(11,1),LAT(11,2)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2025-12-22T10:00:00.000Z", end:"2025-12-22T11:10:00.000Z",
    exercises:[SQUAT(12,0),LC(12,1),CR(12,2)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2025-12-27T10:00:00.000Z", end:"2025-12-27T11:10:00.000Z",
    exercises:[BENCH4(12,0),INCL(12,1),OHP(12,2)] },

  // ── Batch 15 — Week 12–13 ────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2025-12-29T09:00:00.000Z", end:"2025-12-29T10:20:00.000Z",
    exercises:[DL4(12,0),ROW(12,1),LPD(12,2)] },
  { type:"Legs", alias:"Leg Day", notes:"First session of the new year",
    start:"2026-01-02T10:00:00.000Z", end:"2026-01-02T11:30:00.000Z",
    exercises:[SQUAT4(13,0),RDL(13,1),LP(13,2),CR(13,3)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2026-01-05T09:00:00.000Z", end:"2026-01-05T10:30:00.000Z",
    exercises:[BENCH4(14,0),OHP(14,1),INCL(14,2),LAT(14,3)] },

  // ── Batch 16 — Week 14 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-01-07T09:00:00.000Z", end:"2026-01-07T10:30:00.000Z",
    exercises:[DL4(14,0),ROW(14,1),PU(14,2),CURL(14,3)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-01-09T10:00:00.000Z", end:"2026-01-09T11:15:00.000Z",
    exercises:[SQUAT(14,0),LP(14,1),LC(14,2)] },
  { type:"Push", alias:"Chest & Triceps", notes:null,
    start:"2026-01-12T09:00:00.000Z", end:"2026-01-12T10:30:00.000Z",
    exercises:[BENCH4(15,0),INCL(15,1),OHP(15,2),TPD(15,3)] },

  // ── Batch 17 — Week 15 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-01-14T09:00:00.000Z", end:"2026-01-14T10:30:00.000Z",
    exercises:[DL(15,0),LPD(15,1),ROW(15,2),FP(15,3)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-01-16T10:00:00.000Z", end:"2026-01-16T11:20:00.000Z",
    exercises:[SQUAT4(15,0),RDL(15,1),HT(15,2)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2026-01-19T09:00:00.000Z", end:"2026-01-19T10:30:00.000Z",
    exercises:[BENCH4(16,0),OHP(16,1),INCL(16,2),LAT(16,3)] },

  // ── Batch 18 — Week 16 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:"Felt heavy on DL",
    start:"2026-01-21T09:00:00.000Z", end:"2026-01-21T10:30:00.000Z",
    exercises:[DL4(16,0),ROW(16,1),LPD(16,2),HAM(16,3)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-01-23T10:00:00.000Z", end:"2026-01-23T11:30:00.000Z",
    exercises:[SQUAT4(16,0),LP(16,1),LC(16,2),CR(16,3)] },
  { type:"Push", alias:"Chest & Triceps", notes:null,
    start:"2026-01-26T09:00:00.000Z", end:"2026-01-26T10:15:00.000Z",
    exercises:[BENCH(17,0),INCL(17,1),SKUL(17,2)] },

  // ── Batch 19 — Week 17 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-01-28T09:00:00.000Z", end:"2026-01-28T10:30:00.000Z",
    exercises:[ROW(17,0),PU(17,1),LPD(17,2),CURL(17,3)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-01-30T10:00:00.000Z", end:"2026-01-30T11:10:00.000Z",
    exercises:[SQUAT(17,0),RDL(17,1),CR(17,2)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2026-02-02T09:00:00.000Z", end:"2026-02-02T10:30:00.000Z",
    exercises:[BENCH4(18,0),OHP(18,1),INCL(18,2),LAT(18,3)] },

  // ── Batch 20 — Week 18 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-02-04T09:00:00.000Z", end:"2026-02-04T10:15:00.000Z",
    exercises:[DL4(18,0),ROW(18,1),LPD(18,2)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-02-06T10:00:00.000Z", end:"2026-02-06T11:30:00.000Z",
    exercises:[SQUAT4(18,0),LP(18,1),RDL(18,2),LC(18,3)] },
  { type:"Push", alias:"Chest & Triceps", notes:null,
    start:"2026-02-09T09:00:00.000Z", end:"2026-02-09T10:30:00.000Z",
    exercises:[BENCH4(19,0),INCL(19,1),TPD(19,2),LAT(19,3)] },

  // ── Batch 21 — Week 19 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-02-11T09:00:00.000Z", end:"2026-02-11T10:30:00.000Z",
    exercises:[DL4(19,0),ROW(19,1),PU(19,2),CURL(19,3)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-02-13T10:00:00.000Z", end:"2026-02-13T11:30:00.000Z",
    exercises:[SQUAT4(19,0),LP(19,1),LC(19,2),CR(19,3)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2026-02-16T09:00:00.000Z", end:"2026-02-16T10:30:00.000Z",
    exercises:[BENCH4(20,0),OHP(20,1),FLY(20,2),LAT(20,3)] },

  // ── Batch 22 — Week 20 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-02-18T09:00:00.000Z", end:"2026-02-18T10:30:00.000Z",
    exercises:[DL4(20,0),LPD(20,1),ROW(20,2),FP(20,3)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-02-20T10:00:00.000Z", end:"2026-02-20T11:30:00.000Z",
    exercises:[SQUAT4(20,0),RDL(20,1),HT(20,2),LC(20,3)] },
  { type:"Push", alias:"Chest & Triceps", notes:"New bench PR",
    start:"2026-02-23T09:00:00.000Z", end:"2026-02-23T10:30:00.000Z",
    exercises:[BENCH4(21,0),INCL(21,1),OHP(21,2),SKUL(21,3)] },

  // ── Batch 23 — Week 21 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-02-25T09:00:00.000Z", end:"2026-02-25T10:30:00.000Z",
    exercises:[ROW(21,0),PU(21,1),LPD(21,2),HAM(21,3)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-02-27T10:00:00.000Z", end:"2026-02-27T11:30:00.000Z",
    exercises:[SQUAT4(21,0),LP(21,1),LC(21,2),CR(21,3)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2026-03-02T09:00:00.000Z", end:"2026-03-02T10:30:00.000Z",
    exercises:[BENCH4(22,0),OHP(22,1),INCL(22,2),LAT(22,3)] },

  // ── Batch 24 — Week 22–23 ────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-03-04T09:00:00.000Z", end:"2026-03-04T10:15:00.000Z",
    exercises:[DL4(22,0),ROW(22,1),PU(22,2)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-03-06T10:00:00.000Z", end:"2026-03-06T11:30:00.000Z",
    exercises:[SQUAT4(22,0),LP(22,1),RDL(22,2),CR(22,3)] },
  { type:"Push", alias:"Chest & Triceps", notes:null,
    start:"2026-03-09T09:00:00.000Z", end:"2026-03-09T10:30:00.000Z",
    exercises:[BENCH4(23,0),INCL(23,1),OHP(23,2),TPD(23,3)] },

  // ── Batch 25 — Week 23 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-03-11T09:00:00.000Z", end:"2026-03-11T10:30:00.000Z",
    exercises:[DL4(23,0),LPD(23,1),ROW(23,2),CURL(23,3)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-03-13T10:00:00.000Z", end:"2026-03-13T11:30:00.000Z",
    exercises:[SQUAT4(23,0),LP(23,1),LC(23,2),CR(23,3)] },
  { type:"Push", alias:"Chest & Shoulders", notes:null,
    start:"2026-03-16T09:00:00.000Z", end:"2026-03-16T10:30:00.000Z",
    exercises:[BENCH4(24,0),OHP(24,1),FLY(24,2),LAT(24,3)] },

  // ── Batch 26 — Week 24 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-03-18T09:00:00.000Z", end:"2026-03-18T10:15:00.000Z",
    exercises:[DL4(24,0),ROW(24,1),PU(24,2)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-03-20T10:00:00.000Z", end:"2026-03-20T11:30:00.000Z",
    exercises:[SQUAT4(24,0),RDL(24,1),HT(24,2),LP(24,3)] },
  { type:"Push", alias:"Chest & Triceps", notes:null,
    start:"2026-03-23T09:00:00.000Z", end:"2026-03-23T10:30:00.000Z",
    exercises:[BENCH4(25,0),INCL(25,1),OHP(25,2),SKUL(25,3)] },

  // ── Batch 27 — Week 25 ───────────────────────────────────────────────────
  { type:"Pull", alias:"Back & Biceps", notes:null,
    start:"2026-03-25T09:00:00.000Z", end:"2026-03-25T10:20:00.000Z",
    exercises:[ROW(25,0),LPD(25,1),HAM(25,2)] },
  { type:"Legs", alias:"Leg Day", notes:null,
    start:"2026-03-27T10:00:00.000Z", end:"2026-03-27T11:30:00.000Z",
    exercises:[SQUAT4(25,0),LP(25,1),LC(25,2),CR(25,3)] },
];

// ── insert helpers ───────────────────────────────────────────────────────────
async function insertOne(w: WDef) {
  const session = await db;
  await session.withTransactionAsync(async () => {
    const res = await session.runAsync(
      `INSERT INTO workouts (user_id, workout_type, workout_alias, started_at, finished_at, notes, created_at, updated_at)
       VALUES (1, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [w.type, w.alias, w.start, w.end, w.notes]
    );
    const workoutId = res.lastInsertRowId;
    for (const ex of w.exercises) {
      const exRes = await session.runAsync(
        `INSERT INTO exercises (workout_id, exercise_key, excercise_name, order_index, created_at)
         VALUES (?, ?, ?, ?, ?)`,
        [workoutId, ex.key, ex.name, ex.orderIndex, w.start]
      );
      const exerciseId = exRes.lastInsertRowId;
      for (const set of ex.sets) {
        await session.runAsync(
          `INSERT INTO sets (exercise_id, set_number, reps, weight, created_at)
           VALUES (?, ?, ?, ?, ?)`,
          [exerciseId, set.setNumber, set.reps, set.weight, w.start]
        );
      }
    }
  });
}

// ── public entry point ───────────────────────────────────────────────────────
export async function seedWorkouts() {
  for (let i = 0; i < workouts.length; i += 3) {
    await Promise.all(workouts.slice(i, i + 3).map(insertOne));
  }
  console.log(`Seeded ${workouts.length} workouts across 6 months.`);
}
