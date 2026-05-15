import { View, Text } from "react-native";
import { Action } from "../types/Action";

export default function MiniCard({ item }: { item: Action }) {
  return (
    <View
      style={{
        marginTop: 6,
        padding: 8,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        width: "100%",
      }}
    >
      {/* 🔥 ITEM NAME */}
      {item.title && (
        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            fontWeight: "600",
          }}
        >
          {item.title}
        </Text>
      )}

      {/* 🔥 TRACKING NUMBER */}
      <Text
        numberOfLines={1}
        style={{
          fontSize: 12,
          color: "#64748B",
          marginTop: 2,
        }}
      >
        {item.subtitle}
      </Text>

      {/* 🔥 STATUS */}
      {"status" in item && item.status && (
        <Text
          style={{
            fontSize: 12,
            marginTop: 2,
            color:
              item.status === "Delivered"
                ? "green"
                : "orange",
          }}
        >
          {item.status}
        </Text>
      )}
    </View>
  );
}