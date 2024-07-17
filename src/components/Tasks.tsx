"use client"

import { Trash } from "lucide-react";
import { useTaskStore } from "../../lib/store";

const Tasks = ({id, title, description} : {id: string, title: string, description?: string}) => {

  // Stores the Active Task ID in the Global State
  const setActiveTask = useTaskStore(state => state.setActiveTask)
  // Deletes the Tasks based on the ID
  const deleteTask = useTaskStore(state => state.removeTask)
  const handleDragFunction = () => {
    setActiveTask(id);
  }

  return (
    <div draggable onDrag={handleDragFunction} onDragOver={e => e.preventDefault()} className="cursor-move block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow ">
      <div className="flex justify-between items-center">
        <h5 className="mb-2 text-base font-medium text-zinc-900 ">
          {title}
        </h5>
        <Trash onClick={() => {deleteTask(id)}} className="h-4 hover:text-red-300 cursor-default "/>
      </div>
      <p className="text-sm text-gray-700 ">
        {description}
      </p>
    </div>
  );
};

export default Tasks;
