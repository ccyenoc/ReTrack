import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function Parcel() {

  const {
    trackingNumber,
    status,
    history,
  } =
    useLocalSearchParams();

  const trackingHistory =
    history
      ? JSON.parse(
          history as string
        )
      : [];

  return (
    <ScrollView
      style={{
        flex: 1,

        backgroundColor:
          "#F8FAFC",
      }}
    >
      <View
  style={{
    padding: 24,
  }}
>

  {/* HEADER */}

  <View
    style={{
      flexDirection: "row",

      alignItems: "center",

      marginBottom: 25,
    }}
  >

    <TouchableOpacity
      onPress={() =>
        router.back()
      }

      style={{
        position:
          "absolute",

        left: 0,

        zIndex: 1,
      }}
    >
      <Ionicons
        name="arrow-back"
        size={28}
        color="#111827"
      />
    </TouchableOpacity>

    <Text
      style={{
        flex: 1,

        textAlign:
          "center",

        fontSize:
          30,

        fontWeight:
          "700",
      }}
    >
      Parcel Tracking
    </Text>

  </View>

        {/* CARD */}

        <View
          style={{
            backgroundColor:
              "#fff",

            borderRadius:
              24,

            padding: 22,
          }}
        >
          <Text
            style={{
              color:
                "#64748B",
            }}
          >
            Tracking Number
          </Text>

          <Text
            style={{
              fontSize:
                30,

              fontWeight:
                "700",

              marginTop:
                10,
            }}
          >
            {trackingNumber}
          </Text>

          <Text
            style={{
              marginTop:
                20,

              color:
                "#64748B",
            }}
          >
            Current Status
          </Text>

          <View
            style={{
              marginTop:
                10,

              alignSelf:
                "flex-start",

              backgroundColor:
                status ===
                "Delivered"
                  ? "#DCFCE7"
                  : "#DBEAFE",

              paddingHorizontal:
                16,

              paddingVertical:
                8,

              borderRadius:
                999,
            }}
          >
            <Text
              style={{
                color:
                  status ===
                  "Delivered"
                    ? "#16A34A"
                    : "#2563EB",

                fontWeight:
                  "700",
              }}
            >
              {status}
            </Text>
          </View>
        </View>

        {/* HISTORY */}

        <Text
          style={{
            marginTop:
              30,

            fontSize:
              22,

            fontWeight:
              "700",
          }}
        >
          Tracking History
        </Text>

        {trackingHistory.length ===
        0 ? (

          <View
            style={{
              backgroundColor:
                "#fff",

              marginTop:
                15,

              borderRadius:
                20,

              padding:
                20,
            }}
          >
            <Text>
              No tracking updates
            </Text>
          </View>

        ) : (

          trackingHistory.map(
            (
              step: any, index
            ) => (
              <View
                key={index}

                style={{
                  marginTop:
                    15,

                  backgroundColor:
                    "#fff",

                  padding:
                    20,

                  borderRadius:
                    20,
                }}
              >

                <Text
                  style={{
                    fontWeight:
                      "700",
                  }}
                >
                  {step.status}
                </Text>

                <Text>
                  {step.time}
                </Text>

                <Text>
                  {step.desc}
                </Text>

              </View>
            )
          )

        )}

      </View>
    </ScrollView>
  );
}