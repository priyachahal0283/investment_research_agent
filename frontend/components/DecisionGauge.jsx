import { motion } from "framer-motion";
const COLORS = {
  INVEST: {
    main: "#00F5A0",
    glow: "rgba(0,245,160,0.55)",
  },
  PASS: {
    main: "#FF3B5C",
    glow: "rgba(255,59,92,0.55)",
  },
  WATCH: {
    main: "#FFC400",
    glow: "rgba(255,196,0,0.55)",
  },
};
export default function DecisionGauge({ verdict, confidence }) {
  const color = COLORS[verdict];
  const radius = 80;
  const circumference = Math.PI * radius; // half circle
  const dash = (confidence / 100) * circumference;

  // needle angle: 0 -> -90deg (left), 100 -> 90deg (right)
  const angle = -90 + (confidence / 100) * 180;
  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="220" height="130" viewBox="0 0 220 130">
        {/* track */}
        <path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* progress arc */}
        <motion.path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke={color.main}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: circumference - dash,
          }}
          transition={{
            duration: 1.1,
            ease: "easeOut",
          }}
          style={{
            filter: `drop-shadow(0 0 10px ${color.glow})`,
          }}
        />
        {/* needle */}
        <motion.g
          initial={{
            rotate: -90,
          }}
          animate={{
            rotate: angle,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          style={{
            transformOrigin: "110px 110px",
          }}
        >
          <line
            x1="110"
            y1="110"
            x2="110"
            y2="38"
            stroke="#E7ECF5"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="110" cy="110" r="6" fill="#E7ECF5" />
        </motion.g>
      </svg>

      <motion.div
        initial={{
          opacity: 0,
          y: 6,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.8,
          duration: 0.5,
        }}
        className="text-center -mt-2"
      >
        <div
          className="font-display text-4xl font-bold tracking-tight"
          style={{
            color: color.main,
            textShadow: `0 0 24px ${color.glow}`,
          }}
        >
          {confidence}%
        </div>
        <div className="text-xs font-mono text-ink-faint tracking-widest mt-1">
          CONFIDENCE
        </div>
      </motion.div>
    </div>
  );
}
