/**
 * Skeleton pose illustrations for drill cards.
 * Each pose is a mini stick-figure SVG in the style of the landing page PhoneMockup.
 * Teal skeleton with joint dots, sized for 48x48 icon containers.
 */

interface DrillPoseIconProps {
  slug: string;
  className?: string;
}

const JOINT = "#fff";
const BONE = "rgba(255,255,255,0.9)";
const JOINT_R = 1.8;

/**
 * Render a pose silhouette based on the drill slug.
 * Falls back to a generic ready stance for unknown drills.
 */
export function DrillPoseIcon({ slug, className }: DrillPoseIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {getPose(slug)}
    </svg>
  );
}

function getPose(slug: string) {
  switch (slug) {
    // ── PADEL ──────────────────────────────────
    case "ready-position":
      return <ReadyPosition />;
    case "forehand-volley":
      return <ForehandVolley />;
    case "backhand-volley":
      return <BackhandVolley />;
    case "bandeja":
      return <Bandeja />;
    case "vibora":
      return <Vibora />;
    case "smash":
      return <Smash />;

    // ── WARM-UP ────────────────────────────────
    case "warmup-leg-swings":
      return <LegSwings />;
    case "warmup-arm-circles":
      return <ArmCircles />;
    case "warmup-lunges":
      return <Lunges />;
    case "warmup-torso-rotation":
      return <TorsoRotation />;

    // ── STRETCHING ─────────────────────────────
    case "stretch-hamstring":
      return <HamstringStretch />;
    case "stretch-shoulder":
      return <ShoulderStretch />;
    case "stretch-quad":
      return <QuadStretch />;
    case "stretch-hip-flexor":
      return <HipFlexorStretch />;

    default:
      return <ReadyPosition />;
  }
}

// ── Helper: bone line ──
function Bone({ x1, y1, x2, y2, w = 1.6 }: { x1: number; y1: number; x2: number; y2: number; w?: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BONE} strokeWidth={w} strokeLinecap="round" />;
}

// ── Helper: joint dot ──
function Joint({ x, y, r = JOINT_R }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill={JOINT} />;
}

// ── Helper: head ──
function Head({ cx, cy, r = 3.5 }: { cx: number; cy: number; r?: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} stroke={BONE} strokeWidth={1.4} fill="rgba(255,255,255,0.1)" />
      <circle cx={cx} cy={cy} r={1} fill={JOINT} />
    </>
  );
}

// ════════════════════════════════════════════
// PADEL POSES
// ════════════════════════════════════════════

/** Athletic ready stance — knees bent, arms in front */
function ReadyPosition() {
  return (
    <g>
      <Head cx={24} cy={9} />
      <Bone x1={24} y1={12.5} x2={24} y2={16} />{/* neck */}
      <Bone x1={17} y1={16} x2={31} y2={16} />{/* shoulders */}
      <Bone x1={24} y1={16} x2={24} y2={28} />{/* spine */}
      {/* arms bent in front */}
      <Bone x1={17} y1={16} x2={14} y2={22} />
      <Bone x1={14} y1={22} x2={18} y2={26} />
      <Bone x1={31} y1={16} x2={34} y2={22} />
      <Bone x1={34} y1={22} x2={30} y2={26} />
      {/* legs bent */}
      <Bone x1={20} y1={28} x2={28} y2={28} />{/* hips */}
      <Bone x1={20} y1={28} x2={16} y2={36} />
      <Bone x1={16} y1={36} x2={14} y2={44} />
      <Bone x1={28} y1={28} x2={32} y2={36} />
      <Bone x1={32} y1={36} x2={34} y2={44} />
      {/* joints */}
      <Joint x={17} y={16} /><Joint x={31} y={16} />
      <Joint x={14} y={22} /><Joint x={34} y={22} />
      <Joint x={20} y={28} /><Joint x={28} y={28} />
      <Joint x={16} y={36} /><Joint x={32} y={36} />
    </g>
  );
}

/** Forehand volley — racket arm extended forward-right */
function ForehandVolley() {
  return (
    <g>
      <Head cx={22} cy={9} />
      <Bone x1={22} y1={12.5} x2={22} y2={16} />
      <Bone x1={15} y1={16} x2={29} y2={16} />
      <Bone x1={22} y1={16} x2={22} y2={28} />
      {/* left arm down */}
      <Bone x1={15} y1={16} x2={12} y2={23} />
      <Bone x1={12} y1={23} x2={14} y2={28} />
      {/* right arm — punching forward */}
      <Bone x1={29} y1={16} x2={36} y2={14} />
      <Bone x1={36} y1={14} x2={42} y2={16} />
      {/* legs */}
      <Bone x1={18} y1={28} x2={26} y2={28} />
      <Bone x1={18} y1={28} x2={14} y2={36} />
      <Bone x1={14} y1={36} x2={12} y2={44} />
      <Bone x1={26} y1={28} x2={30} y2={36} />
      <Bone x1={30} y1={36} x2={32} y2={44} />
      <Joint x={15} y={16} /><Joint x={29} y={16} />
      <Joint x={12} y={23} /><Joint x={36} y={14} />
      <Joint x={18} y={28} /><Joint x={26} y={28} />
      <Joint x={14} y={36} /><Joint x={30} y={36} />
    </g>
  );
}

/** Backhand volley — racket arm across body */
function BackhandVolley() {
  return (
    <g>
      <Head cx={26} cy={9} />
      <Bone x1={26} y1={12.5} x2={26} y2={16} />
      <Bone x1={19} y1={16} x2={33} y2={16} />
      <Bone x1={26} y1={16} x2={26} y2={28} />
      {/* right arm across */}
      <Bone x1={33} y1={16} x2={28} y2={13} />
      <Bone x1={28} y1={13} x2={18} y2={12} />
      {/* left arm relaxed */}
      <Bone x1={19} y1={16} x2={16} y2={22} />
      <Bone x1={16} y1={22} x2={14} y2={27} />
      {/* legs */}
      <Bone x1={22} y1={28} x2={30} y2={28} />
      <Bone x1={22} y1={28} x2={18} y2={36} />
      <Bone x1={18} y1={36} x2={16} y2={44} />
      <Bone x1={30} y1={28} x2={34} y2={36} />
      <Bone x1={34} y1={36} x2={36} y2={44} />
      <Joint x={19} y={16} /><Joint x={33} y={16} />
      <Joint x={28} y={13} /><Joint x={16} y={22} />
      <Joint x={22} y={28} /><Joint x={30} y={28} />
      <Joint x={18} y={36} /><Joint x={34} y={36} />
    </g>
  );
}

/** Bandeja — overhead slice, arm raised high */
function Bandeja() {
  return (
    <g>
      <Head cx={24} cy={9} />
      <Bone x1={24} y1={12.5} x2={24} y2={16} />
      <Bone x1={17} y1={16} x2={31} y2={16} />
      <Bone x1={24} y1={16} x2={24} y2={28} />
      {/* left arm — tracking ball */}
      <Bone x1={17} y1={16} x2={10} y2={12} />
      <Bone x1={10} y1={12} x2={6} y2={8} />
      {/* right arm — overhead */}
      <Bone x1={31} y1={16} x2={35} y2={9} />
      <Bone x1={35} y1={9} x2={38} y2={3} />
      {/* legs */}
      <Bone x1={20} y1={28} x2={28} y2={28} />
      <Bone x1={20} y1={28} x2={16} y2={36} />
      <Bone x1={16} y1={36} x2={14} y2={44} />
      <Bone x1={28} y1={28} x2={32} y2={36} />
      <Bone x1={32} y1={36} x2={34} y2={44} />
      <Joint x={17} y={16} /><Joint x={31} y={16} />
      <Joint x={10} y={12} /><Joint x={35} y={9} />
      <Joint x={20} y={28} /><Joint x={28} y={28} />
      <Joint x={16} y={36} /><Joint x={32} y={36} />
    </g>
  );
}

/** Vibora — defensive shot, body low and coiled */
function Vibora() {
  return (
    <g>
      <Head cx={24} cy={10} />
      <Bone x1={24} y1={13.5} x2={24} y2={17} />
      <Bone x1={17} y1={17} x2={31} y2={17} />
      <Bone x1={24} y1={17} x2={23} y2={29} />{/* slight lean */}
      {/* left arm — shield */}
      <Bone x1={17} y1={17} x2={12} y2={14} />
      <Bone x1={12} y1={14} x2={8} y2={10} />
      {/* right arm — whip across */}
      <Bone x1={31} y1={17} x2={36} y2={12} />
      <Bone x1={36} y1={12} x2={40} y2={6} />
      {/* legs — wide bent stance */}
      <Bone x1={19} y1={29} x2={27} y2={29} />
      <Bone x1={19} y1={29} x2={13} y2={36} />
      <Bone x1={13} y1={36} x2={10} y2={44} />
      <Bone x1={27} y1={29} x2={33} y2={36} />
      <Bone x1={33} y1={36} x2={36} y2={44} />
      <Joint x={17} y={17} /><Joint x={31} y={17} />
      <Joint x={12} y={14} /><Joint x={36} y={12} />
      <Joint x={19} y={29} /><Joint x={27} y={29} />
      <Joint x={13} y={36} /><Joint x={33} y={36} />
    </g>
  );
}

/** Smash — explosive overhead, full extension */
function Smash() {
  return (
    <g>
      <Head cx={24} cy={8} />
      <Bone x1={24} y1={11.5} x2={24} y2={15} />
      <Bone x1={17} y1={15} x2={31} y2={15} />
      <Bone x1={24} y1={15} x2={24} y2={27} />
      {/* left arm — pointing at ball */}
      <Bone x1={17} y1={15} x2={11} y2={8} />
      <Bone x1={11} y1={8} x2={8} y2={4} />
      {/* right arm — full overhead reach */}
      <Bone x1={31} y1={15} x2={33} y2={7} />
      <Bone x1={33} y1={7} x2={34} y2={1} />
      {/* legs — launching */}
      <Bone x1={20} y1={27} x2={28} y2={27} />
      <Bone x1={20} y1={27} x2={15} y2={35} />
      <Bone x1={15} y1={35} x2={12} y2={44} />
      <Bone x1={28} y1={27} x2={33} y2={36} />
      <Bone x1={33} y1={36} x2={36} y2={44} />
      <Joint x={17} y={15} /><Joint x={31} y={15} />
      <Joint x={11} y={8} /><Joint x={33} y={7} />
      <Joint x={20} y={27} /><Joint x={28} y={27} />
      <Joint x={15} y={35} /><Joint x={33} y={36} />
    </g>
  );
}

// ════════════════════════════════════════════
// WARM-UP POSES
// ════════════════════════════════════════════

/** Leg swings — one leg forward, standing tall */
function LegSwings() {
  return (
    <g>
      <Head cx={24} cy={8} />
      <Bone x1={24} y1={11.5} x2={24} y2={15} />
      <Bone x1={17} y1={15} x2={31} y2={15} />
      <Bone x1={24} y1={15} x2={24} y2={27} />
      {/* arms at sides for balance */}
      <Bone x1={17} y1={15} x2={13} y2={22} />
      <Bone x1={13} y1={22} x2={11} y2={27} />
      <Bone x1={31} y1={15} x2={35} y2={22} />
      <Bone x1={35} y1={22} x2={37} y2={27} />
      {/* standing leg — straight */}
      <Bone x1={21} y1={27} x2={27} y2={27} />
      <Bone x1={27} y1={27} x2={28} y2={36} />
      <Bone x1={28} y1={36} x2={29} y2={44} />
      {/* swinging leg — forward kick */}
      <Bone x1={21} y1={27} x2={13} y2={32} />
      <Bone x1={13} y1={32} x2={8} y2={38} />
      <Joint x={17} y={15} /><Joint x={31} y={15} />
      <Joint x={13} y={22} /><Joint x={35} y={22} />
      <Joint x={21} y={27} /><Joint x={27} y={27} />
      <Joint x={28} y={36} /><Joint x={13} y={32} />
      {/* motion arc */}
      <path d="M 8 38 A 14 14 0 0 1 8 20" stroke="rgba(255,255,255,0.25)" strokeWidth={0.8} strokeDasharray="2 1.5" fill="none" />
    </g>
  );
}

/** Arm circles — arms extended, circular motion arcs */
function ArmCircles() {
  return (
    <g>
      <Head cx={24} cy={9} />
      <Bone x1={24} y1={12.5} x2={24} y2={16} />
      <Bone x1={17} y1={16} x2={31} y2={16} />
      <Bone x1={24} y1={16} x2={24} y2={28} />
      {/* left arm — up and out */}
      <Bone x1={17} y1={16} x2={9} y2={12} />
      <Bone x1={9} y1={12} x2={4} y2={16} />
      {/* right arm — up and out */}
      <Bone x1={31} y1={16} x2={39} y2={12} />
      <Bone x1={39} y1={12} x2={44} y2={16} />
      {/* legs — standing */}
      <Bone x1={20} y1={28} x2={28} y2={28} />
      <Bone x1={20} y1={28} x2={18} y2={36} />
      <Bone x1={18} y1={36} x2={17} y2={44} />
      <Bone x1={28} y1={28} x2={30} y2={36} />
      <Bone x1={30} y1={36} x2={31} y2={44} />
      <Joint x={17} y={16} /><Joint x={31} y={16} />
      <Joint x={9} y={12} /><Joint x={39} y={12} />
      <Joint x={20} y={28} /><Joint x={28} y={28} />
      <Joint x={18} y={36} /><Joint x={30} y={36} />
      {/* rotation arcs */}
      <circle cx={4} cy={12} r={6} stroke="rgba(255,255,255,0.2)" strokeWidth={0.7} strokeDasharray="2 1.5" fill="none" />
      <circle cx={44} cy={12} r={6} stroke="rgba(255,255,255,0.2)" strokeWidth={0.7} strokeDasharray="2 1.5" fill="none" />
    </g>
  );
}

/** Lunges — deep split stance */
function Lunges() {
  return (
    <g>
      <Head cx={24} cy={7} />
      <Bone x1={24} y1={10.5} x2={24} y2={14} />
      <Bone x1={17} y1={14} x2={31} y2={14} />
      <Bone x1={24} y1={14} x2={24} y2={26} />
      {/* arms on hips */}
      <Bone x1={17} y1={14} x2={16} y2={20} />
      <Bone x1={16} y1={20} x2={19} y2={24} />
      <Bone x1={31} y1={14} x2={32} y2={20} />
      <Bone x1={32} y1={20} x2={29} y2={24} />
      {/* front leg — bent 90deg */}
      <Bone x1={20} y1={26} x2={28} y2={26} />
      <Bone x1={20} y1={26} x2={12} y2={32} />
      <Bone x1={12} y1={32} x2={10} y2={40} />
      <Bone x1={10} y1={40} x2={8} y2={44} />
      {/* back leg — extended behind */}
      <Bone x1={28} y1={26} x2={35} y2={34} />
      <Bone x1={35} y1={34} x2={40} y2={42} />
      <Bone x1={40} y1={42} x2={43} y2={44} />
      <Joint x={17} y={14} /><Joint x={31} y={14} />
      <Joint x={16} y={20} /><Joint x={32} y={20} />
      <Joint x={20} y={26} /><Joint x={28} y={26} />
      <Joint x={12} y={32} /><Joint x={35} y={34} />
    </g>
  );
}

/** Torso rotation — arms extended, twist arrows */
function TorsoRotation() {
  return (
    <g>
      <Head cx={24} cy={9} />
      <Bone x1={24} y1={12.5} x2={24} y2={16} />
      <Bone x1={17} y1={16} x2={31} y2={16} />
      <Bone x1={24} y1={16} x2={24} y2={28} />
      {/* both arms extended forward, rotated */}
      <Bone x1={17} y1={16} x2={9} y2={17} />
      <Bone x1={9} y1={17} x2={4} y2={20} />
      <Bone x1={31} y1={16} x2={36} y2={14} />
      <Bone x1={36} y1={14} x2={42} y2={14} />
      {/* legs — stable */}
      <Bone x1={20} y1={28} x2={28} y2={28} />
      <Bone x1={20} y1={28} x2={18} y2={36} />
      <Bone x1={18} y1={36} x2={17} y2={44} />
      <Bone x1={28} y1={28} x2={30} y2={36} />
      <Bone x1={30} y1={36} x2={31} y2={44} />
      <Joint x={17} y={16} /><Joint x={31} y={16} />
      <Joint x={9} y={17} /><Joint x={36} y={14} />
      <Joint x={20} y={28} /><Joint x={28} y={28} />
      <Joint x={18} y={36} /><Joint x={30} y={36} />
      {/* rotation arrow */}
      <path d="M 18 22 A 8 8 0 0 1 30 22" stroke="rgba(255,255,255,0.25)" strokeWidth={0.8} strokeDasharray="2 1.5" fill="none" />
      <path d="M 29 21 L 31 22.5 L 28.5 23" stroke="rgba(255,255,255,0.25)" strokeWidth={0.7} fill="none" />
    </g>
  );
}

// ════════════════════════════════════════════
// STRETCHING POSES
// ════════════════════════════════════════════

/** Hamstring stretch — forward fold, reaching for toes */
function HamstringStretch() {
  return (
    <g>
      <Head cx={14} cy={18} />
      <Bone x1={16.5} y1={19.5} x2={19} y2={21} />{/* neck */}
      <Bone x1={19} y1={21} x2={22} y2={22.5} />{/* upper spine - bent forward */}
      <Bone x1={22} y1={22.5} x2={28} y2={26} />{/* lower spine */}
      {/* shoulders */}
      <Bone x1={17} y1={22} x2={22} y2={20} />
      {/* arms — reaching down */}
      <Bone x1={17} y1={22} x2={12} y2={26} />
      <Bone x1={12} y1={26} x2={10} y2={32} />
      <Bone x1={22} y1={20} x2={16} y2={24} />
      <Bone x1={16} y1={24} x2={12} y2={30} />
      {/* legs — straight */}
      <Bone x1={28} y1={26} x2={32} y2={26} />
      <Bone x1={28} y1={26} x2={28} y2={35} />
      <Bone x1={28} y1={35} x2={26} y2={44} />
      <Bone x1={32} y1={26} x2={34} y2={35} />
      <Bone x1={34} y1={35} x2={35} y2={44} />
      <Joint x={17} y={22} /><Joint x={22} y={20} />
      <Joint x={12} y={26} /><Joint x={16} y={24} />
      <Joint x={28} y={26} /><Joint x={32} y={26} />
      <Joint x={28} y={35} /><Joint x={34} y={35} />
    </g>
  );
}

/** Shoulder stretch — arm across chest with pull */
function ShoulderStretch() {
  return (
    <g>
      <Head cx={24} cy={9} />
      <Bone x1={24} y1={12.5} x2={24} y2={16} />
      <Bone x1={17} y1={16} x2={31} y2={16} />
      <Bone x1={24} y1={16} x2={24} y2={28} />
      {/* left arm — across chest (being stretched) */}
      <Bone x1={17} y1={16} x2={26} y2={17} />
      <Bone x1={26} y1={17} x2={35} y2={18} />
      {/* right arm — pulling left arm */}
      <Bone x1={31} y1={16} x2={28} y2={20} />
      <Bone x1={28} y1={20} x2={24} y2={18} />
      {/* legs — standing */}
      <Bone x1={20} y1={28} x2={28} y2={28} />
      <Bone x1={20} y1={28} x2={18} y2={36} />
      <Bone x1={18} y1={36} x2={17} y2={44} />
      <Bone x1={28} y1={28} x2={30} y2={36} />
      <Bone x1={30} y1={36} x2={31} y2={44} />
      <Joint x={17} y={16} /><Joint x={31} y={16} />
      <Joint x={26} y={17} /><Joint x={28} y={20} />
      <Joint x={20} y={28} /><Joint x={28} y={28} />
      <Joint x={18} y={36} /><Joint x={30} y={36} />
    </g>
  );
}

/** Quad stretch — standing, heel pulled to glute */
function QuadStretch() {
  return (
    <g>
      <Head cx={24} cy={8} />
      <Bone x1={24} y1={11.5} x2={24} y2={15} />
      <Bone x1={17} y1={15} x2={31} y2={15} />
      <Bone x1={24} y1={15} x2={24} y2={27} />
      {/* left arm — balance */}
      <Bone x1={17} y1={15} x2={12} y2={20} />
      <Bone x1={12} y1={20} x2={9} y2={16} />
      {/* right arm — reaching back to hold foot */}
      <Bone x1={31} y1={15} x2={34} y2={22} />
      <Bone x1={34} y1={22} x2={33} y2={28} />
      {/* standing leg — straight */}
      <Bone x1={20} y1={27} x2={28} y2={27} />
      <Bone x1={20} y1={27} x2={19} y2={36} />
      <Bone x1={19} y1={36} x2={18} y2={44} />
      {/* stretching leg — bent back, heel to glute */}
      <Bone x1={28} y1={27} x2={33} y2={32} />
      <Bone x1={33} y1={32} x2={33} y2={26} />
      <Joint x={17} y={15} /><Joint x={31} y={15} />
      <Joint x={12} y={20} /><Joint x={34} y={22} />
      <Joint x={20} y={27} /><Joint x={28} y={27} />
      <Joint x={19} y={36} /><Joint x={33} y={32} />
    </g>
  );
}

/** Hip flexor stretch — half-kneeling lunge */
function HipFlexorStretch() {
  return (
    <g>
      <Head cx={20} cy={7} />
      <Bone x1={20} y1={10.5} x2={20} y2={14} />
      <Bone x1={13} y1={14} x2={27} y2={14} />
      <Bone x1={20} y1={14} x2={20} y2={26} />
      {/* left arm — overhead for deeper stretch */}
      <Bone x1={13} y1={14} x2={11} y2={7} />
      <Bone x1={11} y1={7} x2={12} y2={2} />
      {/* right arm — on hip */}
      <Bone x1={27} y1={14} x2={28} y2={20} />
      <Bone x1={28} y1={20} x2={25} y2={24} />
      {/* front leg — 90deg */}
      <Bone x1={16} y1={26} x2={24} y2={26} />
      <Bone x1={16} y1={26} x2={10} y2={33} />
      <Bone x1={10} y1={33} x2={6} y2={40} />
      <Bone x1={6} y1={40} x2={4} y2={44} />
      {/* back leg — kneeling */}
      <Bone x1={24} y1={26} x2={32} y2={34} />
      <Bone x1={32} y1={34} x2={38} y2={40} />
      <Bone x1={38} y1={40} x2={42} y2={44} />
      <Joint x={13} y={14} /><Joint x={27} y={14} />
      <Joint x={11} y={7} /><Joint x={28} y={20} />
      <Joint x={16} y={26} /><Joint x={24} y={26} />
      <Joint x={10} y={33} /><Joint x={32} y={34} />
    </g>
  );
}
