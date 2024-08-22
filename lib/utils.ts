import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000
  );

  const timeIntervals = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const interval of timeIntervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      if (interval.unit === "day" && count >= 7) {
        const months = Math.floor(diffInSeconds / timeIntervals[1].seconds);
        const years = Math.floor(diffInSeconds / timeIntervals[0].seconds);
        if (years >= 1) {
          return `${years} year${years > 1 ? "s" : ""} ago`;
        } else if (months >= 1) {
          return `${months} month${months > 1 ? "s" : ""} ago`;
        }
      }
      return `${count} ${interval.unit}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export const formatLargeNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}m`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}k`;
  } else {
    return num.toString();
  }
};
