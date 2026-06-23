import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";
import ProgressBar from "./components/ProgressBar";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [dark, setDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  const theme = {
    bg:         dark ? "#1a1a1a" : "#ffffff",
    surface:    dark ? "#242424" : "#ffffff",
    border:     dark ? "#333333" : "#e0e0e0",
    borderLight:dark ? "#2a2a2a" : "#f0f0f0",
    text:       dark ? "#e8e8e8" : "#1a1a1a",
    textMuted:  dark ? "#888888" : "#aaaaaa",
    textSub:    dark ? "#666666" : "#888888",
    inputBg:    dark ? "#2e2e2e" : "#f8f8f8",
    panelBg:    dark ? "#1e1e1e" : "#fafafa",
    chipBg:     dark ? "#2e2e2e" : "#f0f0f0",
    chipText:   dark ? "#aaaaaa" : "#666666",
    accent:     "#5C8A6E",
  };

  useEffect(() => {
    document.body.style.background = theme.bg;
  }, [theme.bg]);

  useEffect(() => {
    getTasks().then((res) => setTasks(res.data));
  }, []);

  async function handleCreate(data) {
    const res = await createTask(data);
    setTasks((prev) => [res.data, ...prev]);
  }

  async function handleUpdate(id, data) {
    const res = await updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  }

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const done = tasks.filter((t) => t.status === true);

  const secLabel = {
    marginBottom: "0.5rem",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: theme.textMuted,
  };

  const iconBtn = {
    background: "none", border: "none", cursor: "pointer",
    color: theme.textMuted, padding: 4, borderRadius: 6,
    display: "flex", alignItems: "center", justifyContent: "center",
  };

  return (
    <div style={{ maxWidth: 580, margin: "0 auto", padding: "2rem 1rem", fontFamily: "inherit" }}>

      {/* Botão de tema */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button onClick={() => setDark(!dark)} style={iconBtn} title={dark ? "Modo claro" : "Modo escuro"}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <ProgressBar total={tasks.length} done={done.length} theme={theme} />

      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, letterSpacing: -0.4, color: theme.text }}>Hoje</h1>
        <p style={{ fontSize: 13, color: theme.textSub, marginTop: 4 }}>
          {tasks.length === 0
            ? "Nenhuma tarefa ainda"
            : done.length === tasks.length
            ? "Tudo conclu\u00eddo \u2014 \u00f3timo trabalho!"
            : `${done.length} de ${tasks.length} conclu\u00edda${done.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      <TaskForm onCreate={handleCreate} theme={theme} />

      <div style={secLabel}>Pendentes</div>
      {tasks.filter((t) => !t.status).map((t) => (
        <TaskCard key={t.id} task={t} onUpdate={handleUpdate} onDelete={handleDelete} theme={theme} />
      ))}

      {done.length > 0 && (
        <>
          <div style={{ ...secLabel, marginTop: "1.5rem" }}>Conclu\u00eddas</div>
          {done.map((t) => (
            <TaskCard key={t.id} task={t} onUpdate={handleUpdate} onDelete={handleDelete} theme={theme} />
          ))}
        </>
      )}
    </div>
  );
}