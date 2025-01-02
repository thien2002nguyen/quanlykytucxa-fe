import { IncidentStatus } from "@/store/incidents/incidents.type";

export const filterIncidentStatusOptions = [
  { label: "Chưa giải quyết", value: IncidentStatus.PENDING },
  { label: "Đang giải quyết", value: IncidentStatus.IN_PROGRESS },
  { label: "Đã giải quyết", value: IncidentStatus.RESOLVED },
];

export const getIncidentStatusLabel = (status: IncidentStatus): string => {
  const foundOption = filterIncidentStatusOptions.find(
    (option) => option.value === status
  );
  return foundOption ? foundOption.label : "";
};
