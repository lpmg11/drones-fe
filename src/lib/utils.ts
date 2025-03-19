import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId(): string {
  const random = Math.random().toString(32).substring(2);
  const number = Date.now().toString(32);

  return random + number;
}