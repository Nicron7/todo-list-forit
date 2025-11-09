import { useState, useEffect, useCallback } from "react";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = "http://localhost:3010";

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/tasks`);
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error(error);
      setError("Error fetching tasks:" + error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(
    async (task: Omit<Task, "id" | "created_at" | "completed">) => {
      try {
        const res = await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });
        if (!res.ok) {
          throw new Error("Failed to create task");
        }
        const data = await res.json();
        console.log("Nueva tarea creada:", data);
        setTasks((prevTasks) => [...prevTasks, data]);
      } catch (error) {
        console.error(error);
        setError("Error creating task:" + error);
      }
    },
    []
  );

  const updateTask = useCallback(
    async (id: number, title: string, description: string) => {
      try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
        if (!res.ok) {
          throw new Error("Failed to update task");
        }
        const data = await res.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? data : task))
        );
      } catch (error) {
        console.error(error);
        setError("Error updating task:" + error);
      }
    },
    []
  );

  const switchCompleteTask = useCallback(
    async (id: number, completed: boolean) => {
      try {
        const res = await fetch(`${API_URL}/tasks/${id}/complete`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed }),
        });
        if (!res.ok) {
          throw new Error("Failed to update task");
        }
        const data = await res.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? data : task))
        );
      } catch (error) {
        console.error(error);
        setError("Error updating task:" + error);
      }
    },
    []
  );

  const deleteTask = useCallback(async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
      setError("Error deleting task:" + error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    createNote,
    updateTask,
    deleteTask,
    switchCompleteTask,
  };
}
