import { cn } from "@/lib/utils";

import { useState } from "react";
import { Status, useTaskStore } from "../../lib/store";

const DropArea = ({pos, status} : {pos:number, status: Status}) => {
    // The Drop Area shows up only when the Tasks is being dragged Over
    const [showDrop, setShowDrop] = useState<boolean>(false);
    const updateTask = useTaskStore(state => state.updateTask);
    const ActiveTaskId = useTaskStore(state => state.activeTask)
    const handleOnDrop = () => {
        //Updates the Status and the position of the Task
      updateTask(ActiveTaskId,pos,status)
      setShowDrop(false);
    }
    return (
        <div
            className={cn(showDrop ? 'w-full h-16 border text-blue-500 border-blue-500 text-sm flex justify-center my-1 rounded-lg items-center p-4 opacity-100 transition-all ease-in-out delay-75': "opacity-0")}
            onDragEnter={() => { setShowDrop(true); }}
            onDragLeave={() => { setShowDrop(false); }}
            onDrop={handleOnDrop}
            onDragOver={e => e.preventDefault()}
        >
             Drop Here 
        </div>
    );
};

export default DropArea;