import { ScheduleItem } from "@/store/services/services.type";
import { dayOfWeekOptions } from "./contants";

export const formatSchedule = (schedule: ScheduleItem[]): string => {
  const dayOfWeekMap = Object.fromEntries(
    dayOfWeekOptions.map((item) => [item.value, item.label])
  );

  return schedule
    .map((item) => {
      const dayLabel = dayOfWeekMap[item.dayOfWeek] || item.dayOfWeek;
      return `${dayLabel} lúc ${item.time}`;
    })
    .join(", ");
};
