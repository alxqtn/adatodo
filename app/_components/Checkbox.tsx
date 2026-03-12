"use client";
import { SetStateAction } from "react";

interface CheckboxProps {
  checked: boolean;
  toggle: () => void;
}

export default function Checkbox({ checked, toggle }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={toggle}
      className="peer w-4 h-4 cursor-pointer"
    />
  );
}
