import { useState } from "react";

export default function TaskForm({ onCreate, theme }) {
  const [tarefa, setTarefa] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [data_vencimento, setDataVencimento] = useState("");

  async function handleSubmit() {
    if (!tarefa.trim()) return;
    await onCreate({
      tarefa,
      prioridade: prioridade || null,
      data_vencimento: data_vencimento || null,
      status: false,
    });
    setTarefa("");
    setPrioridade("");
    setDataVencimento("");
  }

  const inputStyle = {
    height: 36, padding: "0 12px", border: `0.5px solid ${theme.border}`,
    borderRadius: 8, fontSize: 14, outline: "none",
    fontFamily: "inherit", background: theme.surface, color: theme.text,
  };

  const metaStyle = {
    height: 30, padding: "0 8px", fontSize: 12, fontFamily: "inherit",
    border: `0.5px solid ${theme.border}`, borderRadius: 8,
    background: theme.inputBg, color: theme.chipText,
  };

  return (
    <div style={{ border: `0.5px solid ${theme.border}`, borderRadius: 12, padding: "1rem", marginBottom: "2rem", background: theme.surface }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Nova tarefa…"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          maxLength={255}
          style={{ ...inputStyle, flex: 1 }}
        />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)} style={metaStyle}>
          <option value="">Prioridade</option>
          <option value="alta">Alta</option>
          <option value="media">M&eacute;dia</option>
          <option value="baixa">Baixa</option>
        </select>
        <input
          type="date"
          value={data_vencimento}
          onChange={(e) => setDataVencimento(e.target.value)}
          style={metaStyle}
        />
        <div style={{ flex: 1 }} />
        <button
          onClick={handleSubmit}
          style={{ height: 36, padding: "0 16px", background: theme.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}