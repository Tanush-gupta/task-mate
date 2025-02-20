import React, { FC } from "react";
import NavBar from "@/components/NavBar";
import TasksContainer from "@/components/TasksContainer";
interface DashBoardProps {
  user: any;
}

const DashBoard: React.FC<DashBoardProps> = ({ user }) => {
  return (
    <div className="flex flex-col gap-4 h-[100vh] bg-[#393E46]">
      <NavBar user={user} />
      <TasksContainer />
    </div>
  );
};

export default DashBoard;
