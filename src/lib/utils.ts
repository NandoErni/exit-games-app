import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export 	const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  let timeoutTimer: ReturnType<typeof setTimeout>;
 
  return (...args: T) => {
    clearTimeout(timeoutTimer);
 
    timeoutTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};