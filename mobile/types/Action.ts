export type ActionType =
| "parcel"
| "bill"
| "work"
| "alert"
| "reminder";

export type Action = {

id:string;

type:ActionType;

title:string;

subtitle:string;

summary?:string;

status?:string;

history?:string[];

};