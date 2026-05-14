import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import DotRunningCoach from "../components/cards/DotRunningCoach";
import PageShell from "../components/layout/PageShell";
import { mlpTiles, prototypeCards } from "../lib/datasets/prototypeData";

export default function PrototypePage() {
  const [viewMode, setViewMode] = useState("normal"); // "normal" | "dot"
  const [activeDot, setActiveDot] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [scenario, setScenario] = useState("home"); // "lock" | "home"

  const LOCK_BG = "https://www.figma.com/api/mcp/asset/5f199753-bacf-4a91-acb7-8eb4910dbbe2";
  const HOME_BG = "https://www.figma.com/api/mcp/asset/fc376bb6-8550-447e-ad03-a9a04a2ff412";

  const handleTileClick = (title) => {
    if (viewMode === "normal") {
      if (typeof window !== "undefined" && window.pipelineGenerate) {
        window.pipelineGenerate(title);
      }
    } else {
      setActiveDot(title);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Ensure the phone has a base screen on load.
    let tries = 0;
    const t = setInterval(() => {
      tries++;
      if (typeof window.generateSurfaceScenario === "function") {
        window.generateSurfaceScenario("tab-root");
        clearInterval(t);
      }
      if (tries > 40) clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, []);

  const generateFromPrompt = () => {
    const v = String(prompt || "").trim();
    if (!v) return;
    if (typeof window !== "undefined" && window.pipelineGenerate) {
      window.pipelineGenerate(v);
    }
  };

  const goLock = () => {
    setScenario("lock");
    if (typeof window !== "undefined" && typeof window.generateSurfaceScenario === "function") {
      window.generateSurfaceScenario("lockscreen");
    }
  };

  const goHome = () => {
    setScenario("home");
    if (typeof window !== "undefined" && typeof window.generateSurfaceScenario === "function") {
      window.generateSurfaceScenario("tab-root");
    }
  };

  const goHealth = () => {
    setScenario("health");
    if (typeof window !== "undefined" && typeof window.generateSurfaceScenario === "function") {
      window.generateSurfaceScenario("health-mlp");
    }
  };

  const leftButtons =
    viewMode === "normal"
      ? [
          ...mlpTiles.map((t) => ({ key: "mlp-" + t.id, label: t.title, value: t.title })),
          ...prototypeCards.map((c, idx) => ({ key: "card-" + idx, label: c.title, value: c.title })),
        ]
      : [
          { key: "dot-running", label: "Running coach", value: "dot-running" },
          { key: "dot-time-matrix", label: "Time Matrix", value: "dot-time-matrix" },
          { key: "dot-music-1x1", label: "Music 1x1", value: "dot-music-1x1" },
          { key: "dot-music-1x2", label: "Music 1x2", value: "dot-music-1x2-actions" },
          { key: "dot-weather-2x1", label: "Weather 2x1", value: "dot-weather-2x1-v1-1" },
          { key: "dot-temp-1x1", label: "Temp 1x1", value: "dot-temperature-1x1" },
          { key: "dot-date-1x1", label: "Date 1x1", value: "dot-date-1x1-v1-1" },
          { key: "dot-schedule-2x2", label: "Schedule 2x2", value: "dot-schedule-2x2" },
        ];

  return (
    <>
      <Head>
        <title>GenUI - Samsung One UI 8.5 Design Builder</title>
      </Head>

      <PageShell
        title="MLP Prototype"
        description="MLP 결과 및 핵심 glance 카드들을 독립 컴포넌트로 분리하여 관리하는 프로토타입 페이지입니다."
        backHref="/"
      >
        <div className="mlp-workspace">
          {/* Left: tiny buttons + generate */}
          <aside className="mlp-left">
            <div className="mlp-mode-toggle" role="tablist" aria-label="MLP mode">
              <button type="button" className={viewMode === "normal" ? "is-active" : ""} onClick={() => setViewMode("normal")}>
                Normal
              </button>
              <button type="button" className={viewMode === "dot" ? "is-active" : ""} onClick={() => setViewMode("dot")}>
                Dot
              </button>
            </div>

            <div className="mlp-btn-list" aria-label="MLP buttons">
              {leftButtons.map((b) => (
                <button
                  key={b.key}
                  type="button"
                  className={"mlp-mini-btn" + (viewMode === "dot" && activeDot === b.value ? " is-active" : "")}
                  onClick={() => handleTileClick(b.value)}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <div className="mlp-generate">
              <div className="mlp-generate__title">AI UI Generate</div>
              <textarea
                className="mlp-generate__input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="예) lock screen / notification / quick settings / list / detail ..."
              />
              <div className="mlp-generate__row">
                <button type="button" className="mlp-generate__btn" onClick={generateFromPrompt}>
                  Generate
                </button>
              </div>
            </div>
          </aside>

          {/* Right: mobile interface focused */}
          <section className="mlp-right">
            <div className="mlp-phone-controls">
              <button type="button" onClick={goLock}>
                Lock
              </button>
              <button type="button" onClick={goHome}>
                Home
              </button>
              <button type="button" onClick={goHealth}>
                Health
              </button>
            </div>

            {viewMode === "normal" ? (
              <div className="canvas-wrap" id="canvasWrap" style={{ background: "transparent", padding: 0, margin: 0, display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative" }}>
                  <div className="canvas-frame mlp-phone" id="canvasFrame">
                    <div
                      className="canvas-inner"
                      id="canvas"
                      style={{
                        backgroundImage: scenario === "health" ? "none" : `url(${scenario === "lock" ? LOCK_BG : HOME_BG})`,
                        backgroundColor: scenario === "health" ? "#f1f1f3" : "transparent",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </div>
                </div>
                {/* Hidden output element required by pipelineGenerate */}
                <div id="pipelineOutput" style={{ display: "none" }}></div>
              </div>
            ) : (
              <div className="canvas-wrap" style={{ background: "transparent", padding: 0, margin: 0, display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative" }}>
                  <div className="canvas-frame mlp-phone">
                    <div className="canvas-inner" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F2F2F7", overflow: "hidden" }}>
                      {activeDot === "dot-running" && <DotRunningCoach />}
                      {activeDot && activeDot !== "dot-running" && (
                        <div
                          id="dot-detail-preview"
                          style={{ zoom: 0.8 }}
                          dangerouslySetInnerHTML={{
                            __html:
                              typeof window !== "undefined" && typeof window.renderAtomicForRole === "function"
                                ? window.renderAtomicForRole({ role: activeDot }, { w: 310, h: 165 })
                                : "",
                          }}
                        />
                      )}
                      {!activeDot && <div style={{ color: "#999" }}>좌측에서 컴포넌트를 선택해주세요.</div>}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </PageShell>

      {/* Load all required scripts for the prototype */}
      <Script src="https://cdn.jsdelivr.net/npm/html-to-image@1.11.13/dist/html-to-image.js" strategy="beforeInteractive" />
      <Script src="/ui-state.js" strategy="beforeInteractive" />
      <Script src="/figma-refs/icon_library.js" strategy="beforeInteractive" />
      <Script src="/typography-rules.js" strategy="beforeInteractive" />
      <Script src="/generator.js" strategy="beforeInteractive" />
      <Script src="/design_memory.js" strategy="beforeInteractive" />
      <Script src="/app/state.js" strategy="beforeInteractive" />
      <Script src="/app/agent.js" strategy="beforeInteractive" />
      <Script src="/app/templates.js" strategy="beforeInteractive" />
      <Script src="/app/atomics.js" strategy="beforeInteractive" />
      <Script src="/app/design-doc.js" strategy="beforeInteractive" />
      <Script src="/app/interaction-state.js" strategy="beforeInteractive" />
      <Script src="/app/surface-layout.js?v=runpanel-dot-level-1" strategy="beforeInteractive" />
      <Script src="/app/settings.js" strategy="beforeInteractive" />
      <Script src="/app/canvas.js" strategy="beforeInteractive" />
      <Script src="/app/rules-renderer.js" strategy="beforeInteractive" />
      <Script src="/app/scenes.js" strategy="beforeInteractive" />
      <Script src="/app/scene-inspector.js" strategy="beforeInteractive" />
      <Script src="/app/cached-screens.js" strategy="beforeInteractive" />
      <Script src="/app/ui-panels.js" strategy="beforeInteractive" />
      <Script src="/app/main.js" strategy="beforeInteractive" />
      <Script src="/prototype-logic.js" strategy="lazyOnload" />
    </>
  );
}
