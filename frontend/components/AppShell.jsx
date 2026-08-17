import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSplash from "./BootSplash";

/**
 * Module-scope flag — intentionally NOT React state.
 *
 * Why: this file is evaluated once per JS module load. A full browser
 * refresh re-evaluates the module (flag resets to false, splash shows
 * again — matching the spec). Anything short of a full refresh —
 * client-side navigation between routes, a parent re-render, React
 * Fast Refresh in dev, this component remounting for any reason —
 * does NOT re-evaluate the module, so the flag stays true and the splash
 * never comes back. This is what makes it a true "once per app load"
 * gate instead of a per-page/per-component one.
 */
let hasBootedThisSession = false;
export default function AppShell({ children }) {
  const [showBoot, setShowBoot] = useState(!hasBootedThisSession);

  // Stable identity via useCallback (empty deps) — this is the actual fix
  // for the original bug: an inline `() => setStage(...)` gets a new
  // reference every render, and BootSplash's effect depends on `onDone`,
  // so every re-render of the parent restarted the boot timer from zero.
  const handleBootDone = useCallback(() => {
    hasBootedThisSession = true;
    setShowBoot(false);
  }, []);
  return (
    <>
      {/* Real page content mounts immediately underneath. The splash is a
          fixed overlay on top of it, not a mutually-exclusive page state —
          so there's no flash of blank page once it fades. */}
      {children}

      <AnimatePresence>
        {showBoot && (
          <motion.div
            key="boot-overlay"
            className="fixed inset-0 z-[100] bg-void"
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <BootSplash onDone={handleBootDone} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
