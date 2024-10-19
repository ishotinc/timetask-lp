"use client";

import React, { useState } from "react";
import { ChevronRight, Plus, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/atoms/Avatar";
import { Button } from "@/app/_components/atoms/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/atoms/DropdownMenu";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [currentProject, setCurrentProject] = useState("Current Project");

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b">
        <div className="flex items-center space-x-4">
          <svg
            className="text-red-600"
            fill="currentColor"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="font-semibold">
                {currentProject} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setCurrentProject("Project A")}>
                Project A
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCurrentProject("Project B")}>
                Project B
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCurrentProject("Project C")}>
                Project C
              </DropdownMenuItem>
              <DropdownMenuItem className="text-primary">
                <Plus className="mr-2 h-4 w-4" /> Add new project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage alt="User avatar" src="/placeholder-avatar.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>ログアウト</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-16 flex flex-col bg-gray-100 text-gray-700">
          {/* Sidebar is empty */}
        </aside>
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
