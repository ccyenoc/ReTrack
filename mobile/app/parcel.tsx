import React, {
  useEffect,
  useState,
} from "react";

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

  // -----------------
  // ROUTE PARAMS
  // -----------------

  const {
    trackingNumber,
  } = useLocalSearchParams();



  // -----------------
  // STATE
  // -----------------

  const [
    status,
    setStatus,
  ] = useState(
    "Loading..."
  );

  const [
    trackingHistory,
    setTrackingHistory,
  ] = useState<any[]>([]);



  // -----------------
  // FETCH TRACKING
  // -----------------

  useEffect(() => {

    const fetchTracking =
        async () => {

            try {

                const res =

                    await fetch(

                        `${process.env.EXPO_PUBLIC_API_URL}/api/track/${trackingNumber}`

                    );

                const data =
                    await res.json();

                console.log(
                    JSON.stringify(
                        data,
                        null,
                        2
                    )
                );

                const parcel =

                    data
                    ?.result
                    ?.[0];

                if (

                    !parcel

                ) {

                    setStatus(
                        "Not Found"
                    );

                    return;

                }

                setStatus(

                    parcel
                    .latest_status

                );

                const history =

                    Object
                        .values(

                            parcel
                            .status_list

                        )

                        .filter(

                            (
                                item: any
                            ) =>

                                typeof item ===
                                "object"

                                &&

                                item.event_date

                        )

                        .map(

                            (
                                item: any
                            ) => ({

                                status:
                                    item.status,

                                time:

                                    item.event_date
                                    +

                                    " "

                                    +

                                    item.event_time,

                                desc:
                                    item.location

                            })

                        );

                setTrackingHistory(
                    history
                );

            }

            catch (

                err

            ) {

                console.log(
                    "TRACK ERROR:",
                    err
                );

            }

        };

    fetchTracking();

}, []);




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
            flexDirection:
              "row",

            alignItems:
              "center",

            marginBottom:
              25,
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

              borderRadius:
                999,

              paddingHorizontal:
                16,

              paddingVertical:
                8,
            }}
          >

            <Text
              style={{
                fontWeight:
                  "700",

                color:
                  status ===
                  "Delivered"
                    ? "#16A34A"
                    : "#2563EB",
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


        {
          trackingHistory
            .length === 0

          ?

          (

            <View
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

              <Text>
                No tracking updates
              </Text>

            </View>

          )

          :

          (

            trackingHistory.map(
              (
                step,
                index
              ) => (

                <View
                  key={
                    index
                  }

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

          )

        }

      </View>

    </ScrollView>

  );

}