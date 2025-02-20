"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../TaskCard";
import { PlusIcon } from "lucide-react";
import NewTask from "../NewTask";
import { options } from "./tabOptions";
import { baseURL } from "@/constants/constants";

interface Task {
  id: string;
  title: string;
  status: "TO DO" | "IN PROGRESS" | "COMPLETED";
  dueDate: Date;
}

const TasksContainer: React.FC = () => {
  const [tab, setTab] = React.useState(0);
  const [showNewTask, setShowNewTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [triggerApiCall, setTriggerApiCall] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const { data } = await axios.get(`${baseURL}/task/getTasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, [showNewTask, triggerApiCall]);

  const filteredTasks = tasks.filter((task) => {
    if (tab === 0) return true;
    if (tab === 1) return task.status === "TO DO";
    if (tab === 2) return task.status === "IN PROGRESS";
    return task.status === "COMPLETED";
  });

  return (
    <div className="bg-[#222831] rounded-lg gap-8 flex flex-col overflow-x-scroll m-4 p-2 lg:p-8 h-full">
      {showNewTask && <NewTask setShowNewTask={setShowNewTask} />}

      <div className="flex gap-2 flex-wrap sm:gap-4 md:gap-6">
        {options.map((item) => (
          <div
            onClick={() => setTab(item.id)}
            className={`flex gap-2 cursor-pointer p-2 rounded-lg text-sm font-semibold ${
              tab === item.id
                ? "bg-[#FFD369] text-gray-900"
                : "bg-[#fff6e2] border-s-gray-100 text-gray-600"
            }`}
            key={item.id}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <p className="font-bold text-xl text-[#EEEEEE]">
        {
          [
            "All Tasks",
            "Pending Tasks",
            "In Progress Tasks",
            "Completed Tasks",
          ][tab]
        }
      </p>

      <div className="gap-4 grid grid-cols-12">
        {filteredTasks.map((task: any, index) => (
          <TaskCard task={task} key={index} setTrigger={setTriggerApiCall} />
        ))}

        <div
          className="bg-[#72757b] gap-4 cursor-pointer rounded-lg justify-center items-center p-4 flex flex-col shadow-md col-span-12 sm:col-span-12  md:col-span-6 lg:col-span-4 xl:col-span-3 min-h-[256px] text-gray-300 font-semibold"
          onClick={() => setShowNewTask(true)}>
          <PlusIcon size={32} />
          <p>Create a new Task</p>
        </div>
      </div>

      <button
        className="absolute bottom-16 right-16 bg-[#FFD369] hover:bg-[#ffd981] text-white font-bold rounded-full p-3"
        onClick={() => setShowNewTask(true)}>
        <PlusIcon size={32} />
      </button>
    </div>
  );
};

export default TasksContainer;
