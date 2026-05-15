export type ActionType = "parcel" | "bill" | "work" | "reminder";

export type Action = {
  id: string;
  type: ActionType;

  title: string;
  subtitle: string;
  status?: string;
};