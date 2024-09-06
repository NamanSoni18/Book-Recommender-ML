"use client";
import React from "react";
import { ModeToggle } from "@/components/magicui/mode-toggle";
import { GradualSpacingDemo } from "./gradual-spacing";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200 dark:bg-slate-800 dark:border-slate-800">
      <GradualSpacingDemo />
      <ModeToggle />
    </nav>
  );
}
