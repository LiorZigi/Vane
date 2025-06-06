import { useMemo } from "react";

export function useTimeSince(createdAt: string) {
  const timeSince = useMemo(() => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    const diffSeconds = Math.ceil(diffTime / 1000);
    if (diffDays > 365) {
      return `${Math.floor(diffDays / 365)}y`;
    } else if (diffDays > 30) {
      return `${Math.floor(diffDays / 30)}m`;
    } else if (diffDays > 7) {
      return `${Math.floor(diffDays / 7)}w`;
    } else if (diffDays > 1) {
      return `${diffDays}d`;
    } else if (diffHours > 1) {
      return `${diffHours}h`;
    } else if (diffMinutes > 1) {
      return `${diffMinutes}m`;
    } else {
      return `${diffSeconds}s`;
    }
  }, [createdAt]);

  return timeSince;
}