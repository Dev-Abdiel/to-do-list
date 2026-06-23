import { useState } from "react";
import { Pencil, ChevronDown, ChevronUp, Trash2, MessageSquare, Calendar } from "lucide-react";

const today = new Date().toISOString().slice(0, 10);

function fmtDate(d) {
  if (!d) return null;
  const [, m, day] = d.slice(0, 10).split("-");
  return `${day}/${m}`;
}

function isOverdue(d) {
  if (!d) return false;
  return d.slice(0, 10) < today;
}

function PrioChip({ prio }) {
  const map = {
    alta:  { bg: "#FCEBEB", color: "#A32D2D", label: "Alta" },
    media: { bg: "#FAEEDA", color: "#633806", label: "M\u00e9dia" },
    baixa: { bg: "#EAF3DE", color: "#27500A", label: "Baixa" },
  };
  if (!prio || !map[prio]) return null;
  const s = map[prio];
  return (
    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500, background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

export default function TaskCard({ task, onUpdate, onDelete, theme }) {
  const [open, setOpen] = useState(false);
  const [comentario, setComentario] = useState(task.comentario || "");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.tarefa);

  function handleToggle() {
    onUpdate(task.id, {
      tarefa: task.tarefa, status: !task.status,
      prioridade: task.prioridade, data_vencimento: task.data_vencimento, comentario: task.comentario,
    });
  }

  function handleSaveComment() {
    onUpdate(task.id, {
      tarefa: task.tarefa, status: task.status,
      prioridade: task.prioridade, data_vencimento: task.data_vencimento, comentario,
    });
    setOpen(false);
  }

  function handleSaveEdit() {
    if (!editText.trim()) return;
    onUpdate(task.id, {
      tarefa: editText, status: task.status,
      prioridade: task.prioridade, data_vencimento: task.data_vencimento, comentario: task.comentario,
    });
    setEditing(false);
  }

  const overdue = isOverdue(task.data_vencimento);

  const iconBtn = {
    background: "none", border: "none", cursor: "pointer",
    color: theme.textMuted, padding: 4, borderRadius: 6,
    display: "flex", alignItems: "center", justifyContent: "center",
  };

  return (
    <div style={{ border: `0.5px solid ${theme.border}`, borderRadius: 12, marginBottom: 6, overflow: "hidden", background: theme.surface }}>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px" }}>

        {/* Checkbox */}
        <div
          onClick={handleToggle}
          style={{
            width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1, cursor: "pointer",
            border: task.status ? "none" : `1.5px solid ${theme.textMuted}`,
            background: task.status ? theme.accent : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {task.status && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Texto */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {editing ? (
            <input
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSaveEdit(); if (e.key === "Escape") setEditing(false); }}
              onBlur={handleSaveEdit}
              maxLength={255}
              style={{ width: "100%", fontSize: 14, padding: "2px 6px", border: `0.5px solid ${theme.accent}`, borderRadius: 6, outline: "none", fontFamily: "inherit", background: theme.surface, color: theme.text }}
            />
          ) : (
            <div style={{ fontSize: 14, color: task.status ? theme.textMuted : theme.text, textDecoration: task.status ? "line-through" : "none", lineHeight: 1.4 }}>
              {task.tarefa}
            </div>
          )}

          <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap", alignItems: "center" }}>
            <PrioChip prio={task.prioridade} />

            {task.data_vencimento && (
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500, display: "flex", alignItems: "center", gap: 3, background: overdue ? "#FCEBEB" : theme.chipBg, color: overdue ? "#A32D2D" : theme.chipText }}>
                <Calendar size={10} /> {fmtDate(task.data_vencimento)}{overdue ? " · atrasada" : ""}
              </span>
            )}

            <span
              onClick={() => setOpen(!open)}
              style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500, background: theme.chipBg, color: theme.chipText, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}
            >
              <MessageSquare size={10} />
              {task.comentario ? task.comentario.slice(0, 18) + (task.comentario.length > 18 ? "…" : "") : "Nota"}
            </span>
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: "flex", gap: 2, flexShrink: 0, marginTop: 1 }}>
          <button onClick={() => setEditing(true)} title="Editar" style={iconBtn}>
            <Pencil size={15} />
          </button>
          <button onClick={() => setOpen(!open)} title="Coment\u00e1rio" style={iconBtn}>
            {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <button
            onClick={() => onDelete(task.id)} title="Remover"
            style={iconBtn}
            onMouseEnter={e => e.currentTarget.style.color = "#c0392b"}
            onMouseLeave={e => e.currentTarget.style.color = theme.textMuted}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Painel de comentário */}
      {open && (
        <div style={{ borderTop: `0.5px solid ${theme.borderLight}`, padding: "12px 14px", background: theme.panelBg }}>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Adicione uma nota ou contexto para esta tarefa…"
            style={{ width: "100%", minHeight: 72, padding: "8px 10px", fontSize: 13, border: `0.5px solid ${theme.border}`, borderRadius: 8, resize: "vertical", fontFamily: "inherit", outline: "none", background: theme.surface, color: theme.text }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
            <button
              onClick={handleSaveComment}
              style={{ height: 28, padding: "0 14px", fontSize: 12, fontWeight: 500, background: theme.accent, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}