import { Route, Switch } from "wouter";
import { Sidebar } from "./components/Sidebar";
import HomePage from "./pages/index";
import ChapterPage from "./pages/chapter";
import { RunableBadge } from "@runablehq/website-runtime";

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/read/:slug" component={ChapterPage} />
        </Switch>
      </main>
      <RunableBadge />
      <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
          background: var(--bg);
        }
        .app-main {
          flex: 1;
          min-width: 0;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .app-main {
            padding-top: 3.5rem;
          }
        }
      `}</style>
    </div>
  );
}
