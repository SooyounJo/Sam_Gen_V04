import Link from "next/link";

export default function PageShell({ title, description, backHref, children }) {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <div className="app-brand">Samsung One UI Refactor</div>
          <h1>{title}</h1>
          {description ? <p className="app-description">{description}</p> : null}
        </div>

        <nav className="app-nav">
          {backHref ? <Link href={backHref}>Back</Link> : null}
          <Link href="/prototype">Prototype</Link>
          <Link href="/theme">Theme</Link>
        </nav>
      </header>

      {children}
    </main>
  );
}
