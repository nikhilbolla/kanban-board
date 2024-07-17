import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware";

export type Status = "TODO" | "IN_PROGRESS" | "PEER_REVIEW" | "DONE";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

export type State = {
  tasks: Task[];
  activeTask: string | null;
  searchQuery: string | null;
};

export type Actions = {
  addTask: (title: string, description: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string | null, newIndex: number, status: Status) => void;
  setActiveTask: (id: string | null) => void;
  setSearchQuery: (searchQuery: string | null) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist((set) => ({
    tasks: [],
    activeTask: null,
    searchQuery: null,
    addTask: (title: string, description: string) =>
      set((state) => ({
        tasks: [
          ...state.tasks,
          { id: uuid(), title, description, status: "TODO" },
        ],
      })),
    removeTask: (id: string) =>
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
      
      updateTask: (id: string | null, newIndex: number, status: Status) =>
        set((state) => {
          // Algorithm of updating the Task based on the Drop Position 
          const taskIndex = state.tasks.findIndex((task) => task.id === id);

          // if task not found or id is null, return the same state
          if (taskIndex === -1 || id === null) return { tasks: state.tasks };
          // Extract the task to update
          const taskToUpdate = { ...state.tasks[taskIndex], status };
      
          // Remove the task from its current position
          const updatedTasks = state.tasks.filter((_, idx) => idx !== taskIndex);
      
          // Insert the task at its new position
          updatedTasks.splice(newIndex, 0, taskToUpdate);
          // Return the Updated Array
          return { tasks: updatedTasks };
        }),      
    setActiveTask: (id: string | null) => set(() => ({ activeTask: id })),
    setSearchQuery: (searchQuery: string | null) =>
      set(() => ({ searchQuery })),
  }),
  {name: "tasks-store"}
)
);
