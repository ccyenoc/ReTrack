import { View, Text } from "react-native";
import { Action } from "../types/Action";

export default function ActionCard({ item }: { item: Action }) {
  
  const [datePart, timePart] = item.subtitle.split(" | ");

  const isToday = (dateStr: string) => {
    return dateStr === new Date().toDateString();
  };

  const displayDate = isToday(datePart) ? "Today" : datePart;

  return (
    <View
      style={{
        marginBottom: 10,
        padding: 12,
        backgroundColor: "#F9FAFB",
        borderRadius: 10,
      }}
    >
      {/* TITLE */}
      <Text style={{ fontWeight: "600" }}>
        {item.title}
      </Text>

      {/* DATE + TIME */}
      <Text
        style={{
          marginTop: 4,
          color: isToday(datePart) ? "red" : "#64748B",
        }}
      >
        {displayDate} | {timePart}
      </Text>
    </View>
  );
}