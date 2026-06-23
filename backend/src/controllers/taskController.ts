import { Request, Response } from "express";
import pool from "../database/db";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar tarefas" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { tarefa, prioridade, data_vencimento, comentario } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks (tarefa, prioridade, data_vencimento, comentario)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [tarefa, prioridade ?? null, data_vencimento ?? null, comentario ?? null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tarefa, status, prioridade, data_vencimento, comentario } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET tarefa = $1,
           status = $2,
           prioridade = $3,
           data_vencimento = $4,
           comentario = $5,
           data_atualizacao = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [tarefa, status, prioridade ?? null, data_vencimento ?? null, comentario ?? null, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.status(200).json({ mensagem: "Tarefa removida com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao remover tarefa" });
  }
};