"use client";

import Columns from "../components/Columns";
import NewTask from "../components/NewTask";
import SearchBar from "../components/Search";

import { Status } from "../../lib/store";

type Column = {
  id: string;
  title: string;
  status: Status;
};

export default function Home() {
  const cols: Column[] = [
    { id: "1", title: "To do", status: "TODO" },
    { id: "2", title: "In Progress", status: "IN_PROGRESS" },
    { id: "3", title: "Peer Review", status: "PEER_REVIEW" },
    { id: "4", title: "Done", status: "DONE" },
  ];
  return (
    <section className="text-gray-400 body-font">
      <div className="container px-10 py-16 mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <NewTask />
          <SearchBar />
        </div>

        <div className="flex flex-wrap -m-4">
          {cols.map((col) => (
            <div key={col.id} className="p-3 md:w-1/2 lg:w-1/4 w-full">
              <Columns title={col.title} status={col.status} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
