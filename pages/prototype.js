import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import GlanceCard from "../components/cards/GlanceCard";
import DotRunningCoach from "../components/cards/DotRunningCoach";
import PageShell from "../components/layout/PageShell";
import MlpTile from "../components/prototype/MlpTile";
import { mlpTiles, prototypeCards } from "../lib/datasets/prototypeData";

export default function PrototypePage() {
  const [viewMode, setViewMode] = useState("normal"); // "normal" | "dot"
  const [activeDot, setActiveDot] = useState(null);

  const handleTileClick = (title) => {
    if (viewMode === "normal") {
      if (typeof window !== "undefined" && window.pipelineGenerate) {
        window.pipelineGenerate(title);
      }
    } else {
      setActiveDot(title);
    }
  };

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
        {/* Toggle Buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={() => setViewMode("normal")}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              background: viewMode === "normal" ? "#007AFF" : "#E5E5EA",
              color: viewMode === "normal" ? "#FFF" : "#000",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Normal
          </button>
          <button
            onClick={() => setViewMode("dot")}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              background: viewMode === "dot" ? "#007AFF" : "#E5E5EA",
              color: viewMode === "dot" ? "#FFF" : "#000",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Dot
          </button>
        </div>

        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", height: "calc(100vh - 180px)", overflowY: "hidden" }}>
          {viewMode === "normal" ? (
            <>
              {/* Left Column: React Components (Normal Mode) */}
              <div style={{ flex: 1, minWidth: 0, overflowY: "auto", paddingRight: "20px", height: "100%", paddingBottom: "40px" }}>
                <section className="section-card">
                  <h2>MLP Gallery</h2>
                  <p>
                    기존 갤러리를 별도 컴포넌트로 분리한 상태이니, 이후에는 디자인 실제 프로토타입 화면이나 상세 시나리오에 결합도 가능할 것입니다.
                  </p>
                </section>

                <section className="mlp-tile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "16px", marginBottom: "40px" }}>
                  {mlpTiles.map((tile) => (
                    <div key={tile.id} onClick={() => handleTileClick(tile.title)} style={{ cursor: "pointer" }}>
                      <MlpTile {...tile} />
                    </div>
                  ))}
                </section>

                <section className="section-card">
                  <h2>Core Glance Cards</h2>
                  <p>
                    전체 카드 사진의 느낌을 보여주고, 현재 제품에서 주요한 카드 유형을 최소 구조의 React 컴포넌트로 분리했습니다.
                  </p>
                </section>

                <section className="glance-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                  {prototypeCards.map((card) => (
                    <div key={card.eyebrow + card.title} onClick={() => handleTileClick(card.title)} style={{ cursor: "pointer" }}>
                      <GlanceCard {...card} />
                    </div>
                  ))}
                </section>
              </div>

              {/* Right Column: Phone Frame (Normal Mode) */}
              <div style={{ width: "400px", flexShrink: 0, position: "sticky", top: "20px" }}>
                <div className="canvas-wrap" id="canvasWrap" style={{ background: "transparent", padding: 0, margin: 0, display: "flex", justifyContent: "center" }}>
                  <div style={{ position: "relative" }}>
                    <div className="canvas-frame" id="canvasFrame">
                      <div className="canvas-notch"></div>
                      <div className="canvas-inner" id="canvas"></div>
                      {/* Before/After comparison overlay */}
                      <div className="refine-compare" id="refineCompare">
                        <button className="refine-close-compare" onClick={() => window.hideRefineComparison && window.hideRefineComparison()}>&times;</button>
                        <div className="refine-compare-side">
                          <div className="refine-compare-label before">Before</div>
                          <div className="refine-compare-canvas" id="refineBeforeCanvas"></div>
                        </div>
                        <div className="refine-compare-side">
                          <div className="refine-compare-label after">After</div>
                          <div className="refine-compare-canvas" id="refineAfterCanvas"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hidden output element required by pipelineGenerate */}
                <div id="pipelineOutput" style={{ display: "none" }}></div>
              </div>
            </>
          ) : (
            <>
              {/* Left Column: Phone Frame (Dot Mode) */}
              <div style={{ width: "400px", flexShrink: 0, position: "sticky", top: "20px" }}>
                <div className="canvas-wrap" style={{ background: "transparent", padding: 0, margin: 0, display: "flex", justifyContent: "center" }}>
                  <div style={{ position: "relative" }}>
                    <div className="canvas-frame">
                      <div className="canvas-notch"></div>
                      <div className="canvas-inner" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F2F2F7" }}>
                        {activeDot === "dot-running" && <DotRunningCoach />}
                        {!activeDot && <div style={{ color: "#999" }}>우측에서 컴포넌트를 선택해주세요.</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: React Components (Dot Mode) */}
              <div style={{ flex: 1, minWidth: 0, overflowY: "auto", paddingLeft: "20px", height: "100%", paddingBottom: "40px" }}>
                <section className="section-card">
                  <h2>Dot Components</h2>
                  <p>
                    Dot 에셋을 CSS로 구현한 컴포넌트들입니다. 클릭하여 좌측 모달(디바이스)에서 상세 확인이 가능합니다.
                  </p>
                </section>

                <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div onClick={() => handleTileClick("dot-running")} style={{ cursor: "pointer", display: "inline-block" }}>
                    <DotRunningCoach />
                  </div>
                  {/* Add more dot components here later */}
                </section>
              </div>
            </>
          )}
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
      <Script src="/app/surface-layout.js" strategy="beforeInteractive" />
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
