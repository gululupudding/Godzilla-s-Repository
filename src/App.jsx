import CenterPanel from './components/CenterPanel.jsx';

export default function App() {
  return (
    <main className="h-screen overflow-hidden bg-slate-100 text-slate-800">
      <div className="grid h-full grid-cols-3 gap-4 overflow-hidden px-4 py-4">
        <aside
          className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white/60 shadow-sm"
          aria-label="左侧占位区域"
        />
        <div className="min-w-0 overflow-hidden">
          <CenterPanel />
        </div>
        <aside
          className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white/60 shadow-sm"
          aria-label="右侧占位区域"
        />
      </div>
    </main>
  );
}
