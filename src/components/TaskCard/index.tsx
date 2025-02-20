import React, { useState } from "react";
import { Task } from "@/types/task.type";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import { baseURL } from "@/constants/constants";

interface TaskCardProps {
  task: Task;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, setTrigger }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${baseURL}/task/${task._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTrigger((prev) => !prev);
      alert("Task Deleted");
    } catch (error) {
      console.log("Error in Deleting the Task", error);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    try {
      const response = axios.patch(
        `${baseURL}/task/${task._id}/updateStatus`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Task Status Updated");
      setTrigger((prev) => !prev);
    } catch (error) {
      console.log("Error in Updating the Task Status", error);
      alert("Error in Updating the Task Status");
    }
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="bg-[#393E46] rounded-lg p-4 flex flex-col gap-4 shadow-md col-span-12 sm:col-span-12  md:col-span-6 lg:col-span-4 xl:col-span-3 text-[#EEEEEE]">
      <p className="font-bold text-2xl">{task.title}</p>
      <p className="text-md font-semibold h-24">{task.description}</p>

      <div className="flex items-center gap-4 text-md font-semibold text-gray-200">
        <p>Due Date :</p>
        <p>
          {new Date(task.dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`relative flex items-center rounded-xl p-2 ${
              task.status === "TO DO"
                ? "bg-[#3498DB]"
                : task.status === "IN PROGRESS"
                ? "bg-[#F39C12]"
                : "bg-[#4CAF50]"
            }`}>
            <p className="text-white font-semibold text-sm">{task.status} </p>

            {dropdownVisible && (
              <div className="absolute top-10 left-0 bg-white shadow-md rounded-lg w-32">
                <a
                  href="#"
                  onClick={() => handleStatusChange("TO DO")}
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                  TO DO
                </a>
                <a
                  href="#"
                  onClick={() => handleStatusChange("IN PROGRESS")}
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                  IN PROGRESS
                </a>
                <a
                  href="#"
                  onClick={() => handleStatusChange("COMPLETED")}
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                  COMPLETED
                </a>
              </div>
            )}
          </div>
          <button
            className="text-xs font-semibold hover:opacity-70 text-gray-200"
            onClick={toggleDropdown}>
            <Edit size={24} />
          </button>
        </div>

        <Trash2
          size={24}
          className="text-red-500 hover:cursor-pointer hover:opacity-70"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default TaskCard;
