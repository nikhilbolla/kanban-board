"use client";

import React, { useMemo } from "react";
import { Status, useTaskStore } from "../lib/store";
import Tasks from "./Tasks";
import DropArea from "./DropArea";

// Defined colors for each status type
const statusColors: { [key in Status]: string } = {
  TODO: "bg-blue-500",
  IN_PROGRESS: "bg-yellow-500",
  PEER_REVIEW: "bg-purple-500",
  DONE: "bg-green-500"
};

const Columns = ({ title, status }: { title: string; status: Status }) => {
  const searchQuery = useTaskStore((state) => state.searchQuery);
  const tasks = useTaskStore((state) => state.tasks);

  // Filters out the tasks based on the search string
  const searchFilteredTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          !searchQuery ||
          task.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      ),
    [tasks, searchQuery]
  );

  // Retrives the color for the current status
  const statusColor = statusColors[status];

  return (
    <div className="bg-gray-100 lg:min-h-screen p-4 rounded-lg pt-5">
      <div className="flex items-center mb-3">
        <div className={`w-4 h-4 rounded-full mr-2 ${statusColor}`}></div>
        <h2 className="text-lg font-bold tracking-tight text-zinc-600 ml-1 uppercase">
          {title}
        </h2>
      </div>
      {/*Drop Area for position top*/}
      <DropArea pos={0} status={status} />
      {searchFilteredTasks.map((task, index) => (
        // Filters the task based on the current status of the column ("TODO" | "IN_PROGRESS" | "PEER_REVIEW" | "DONE")
        task.status === status ? (
          <React.Fragment key={task.id}>
            <Tasks {...task} />
            {/*Drop Area for position next to a task*/}
            <DropArea pos={index + 1} status={status} />
          </React.Fragment>
        ) : null
      ))}
    </div>
  );
};

export default Columns;
