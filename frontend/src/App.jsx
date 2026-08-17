import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "../components/LandingPage";
import CompanyInput from "../components/CompanyInput";
import ResearchPipeline from "../components/ResearchPipeline";
import ResultsDashboard from "../components/ResultsDashboard";

export default function App() {
  const [stage, setStage] = useState("landing");
  const [company, setCompany] = useState("");
  const [result, setResult] = useState(null);

  function handleSubmit(name) {
    setCompany(name);
    setStage("researching");
  }

  function handlePipelineComplete(realResult) {
    setResult(realResult);
    setStage("results");
  }

  function handleReset() {
    setStage("input");
    setCompany("");
    setResult(null);
  }

  function handleGoToLanding() {
    setStage("landing");
    setCompany("");
    setResult(null);
  }

  return (
    <main>
      <AnimatePresence mode="wait">
        {stage === "landing" && (
          <motion.div
            key="landing"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <LandingPage onLaunch={() => setStage("input")} />
          </motion.div>
        )}

        {stage === "input" && (
          <motion.div
            key="input"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <CompanyInput
              onSubmit={handleSubmit}
              onBackToLanding={handleGoToLanding}
            />
          </motion.div>
        )}

        {stage === "researching" && (
          <motion.div
            key="researching"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <ResearchPipeline
              company={company}
              onComplete={handlePipelineComplete}
              onBack={handleReset}
            />
          </motion.div>
        )}

        {stage === "results" && result && (
          <motion.div
            key="results"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <ResultsDashboard result={result} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
