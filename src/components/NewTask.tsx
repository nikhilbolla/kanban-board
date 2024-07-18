"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react";
import { useTaskStore } from "../lib/store";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


const NewTask = () => {

  const addTask = useTaskStore(state => state.addTask)

  const handleAddButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("I'm getting Clicked")
    const form = e.currentTarget
    const formData = new FormData(form)
    const {title, description} = Object.fromEntries(formData)
    console.log("title", title)

    if(typeof title != 'string' || typeof description !== 'string') return

    addTask(title,description)
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
        <Button variant="outline" className="text-zinc-900 border-zinc-900">
          Add Task<CirclePlus className="h-4 ms-1 "/>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <form id="add_task_form" className="grid gap-4 px-4" onSubmit={handleAddButton}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input id="title" name="title" placeholder="Title" className="col-span-4"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Textarea id="description" name="description" placeholder="Description" className="col-span-4"/>
            </div>
          </form>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type="submit" form="add_task_form">Add Task</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewTask;
