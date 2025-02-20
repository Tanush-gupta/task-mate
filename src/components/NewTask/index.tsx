import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { baseURL } from "@/constants/constants";
interface NewTaskProps {
  setShowNewTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTask: React.FC<NewTaskProps> = ({ setShowNewTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "TO DO",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

      const response = await axios.post(`${baseURL}/task/addTask`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setShowNewTask(false);
      }
      alert("Task Created");
    } catch (error: any) {
      alert(error.response.data.message);
      console.log("error", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div className="bg-white rounded-lg p-6 w-1/3 flex flex-col gap-4 shadow-md relative min-w-80">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 "
          onClick={() => setShowNewTask(false)}>
          <X size={24} color="red" />
        </button>

        <h2 className="text-lg font-semibold">Create a Task</h2>

        {/* Title Input */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter the title of the task"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter the description of the task"
            className="p-2 h-24 border border-gray-300 rounded-md resize-none"
          />
        </div>

        {/* Due Date Input */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-[#FFD369] text-white font-medium rounded-lg p-2 hover:bg-[#d8ad49] transition">
          Create Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
