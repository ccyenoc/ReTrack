import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Button
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ActionCard from "../components/ActionCard";
import MiniCard from "../components/mini-card";
import { Action } from "../types/Action";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
  native: "com.yiuernnn.mobile:/oauth",
});

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
};

// 🎨 COLORS
const colors = {
  primary: "#2563EB",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  subtext: "#64748B",
};

// MOCK DATA
const mockDetectedData: Action[] = [
  { id: "p1", type: "parcel", title: "Parcel Detected", subtitle: "JT123456789MY", status: "In Transit" },
  { id: "p2", type: "parcel", title: "Parcel Delivered", subtitle: "JT987654321MY", status: "Delivered" },
  { id: "b1", type: "bill", title: "Bill Due", subtitle: "Electricity payment" },
  { id: "w1", type: "work", title: "Meeting Scheduled", subtitle: "Project discussion" },
  { id: "a1", type: "alert", title: "Security Alert", subtitle: "New login detected" },
];

const initialReminders: Action[] = [
  { id: "1", type: "reminder", title: "Buy groceries", subtitle: "Today | 6PM" },
];

export default function Home() {
  console.log("API URL:", process.env.EXPO_PUBLIC_API_URL);
  
  const [detectedData, setDetectedData] = useState<Action[]>([]);
  const [dismissedParcels,setDismissedParcels] =useState<string[]>([]);
  const [reminders, setReminders] = useState<Action[]>(initialReminders);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const isToday = (dateString: string) => {
  const today = new Date().toDateString();
  return dateString === today;
};

  const [search, setSearch] = useState("");

  // parcel modal
  const [parcelModal, setParcelModal] = useState(false);
  const [newTracking, setNewTracking] = useState("");
  const [newName, setNewName] = useState("");

  // reminder modal
  const [reminderModal, setReminderModal] = useState(false);
  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  // picker state
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

 const parcels =

detectedData

.filter(
i =>
i.type ===
"parcel"
)

.filter(
i =>

!dismissedParcels
.includes(
i.id
)

)

.filter(
i =>

i.subtitle
.toLowerCase()

.includes(
search.toLowerCase()
)

);

  const bills = detectedData.filter(i => i.type === "bill");
  const work = detectedData.filter(i => i.type === "work");
  const alerts = detectedData.filter(i => i.type === "alert");

  const [request, response, promptAsync] =
  AuthSession.useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,

      scopes: [
        "openid",
        "profile",
        "email",
        "https://www.googleapis.com/auth/gmail.readonly",
      ],

      redirectUri,

      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
    },
    discovery
  );

  console.log("REDIRECT URI:", redirectUri);

  useEffect(() => {
    if (response?.type === "success") {
     const code = response.params.code;

     console.log("AUTH CODE:", code);

     fetchEmails(code);
    }

    if (response?.type === "error") {
      console.error("❌ OAUTH ERROR:", response.error);
      console.error("Error Code:", response.errorCode);
      console.error("Error Description:", response.errorDescription);
      console.error("Full Response:", response);
    }
  }, [response]);

console.log("🔑 CLIENT ID:", process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID);
console.log("🔗 REDIRECT URI:", redirectUri);
console.log("📋 REQUEST:", request);
console.log("📬 RESPONSE:", response);

  {/*ngrok : */}
  const fetchEmails = async(code: string) => {
    try{
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/emails`,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          code: code
        }),
      });

        const data = await res.json();

        const mapped = data.map((item: any, index: number) => ({
            id: index.toString(),
            type: item.type,
            title: item.title,
            subtitle: item.subtitle,
        }));

        console.log("EMAILS : ",mapped);
       setDetectedData(mapped);

      }

    catch(err){
      console.log("ERROR : ",err);
    }
  }

  useEffect(() => {

    const updateParcelStatus =
        async () => {

            const updated =

                await Promise.all(

                    detectedData.map(

                        async (

                            item

                        ) => {

                            if (

                                item.type !==
                                "parcel"

                            ) {

                                return item;

                            }

                            try {

                                const res =

                                    await fetch(

`${process.env.EXPO_PUBLIC_API_URL}/api/track/${item.subtitle}`

                                    );

                                const data =
                                    await res.json();

                                const parcel =

                                    data
                                    ?.result
                                    ?.[0];

                                return {

                                    ...item,

                                    status:

                                        parcel
                                        ?.latest_status

                                        ||

                                        item.status

                                };

                            }

                            catch {

                                return item;

                            }

                        }

                    )

                );

            setDetectedData(
                updated
            );

        };

    if (

        detectedData.length

    ) {

        updateParcelStatus();

    }

}, [detectedData.length]);

  const addParcel = () => {
    if (!newTracking) return;

    const newItem: Action = {
      id: Math.random().toString(),
      type: "parcel",
      title: newName || "Manual Parcel",
      subtitle: newTracking,
      status: "Loading...",
    };

    setDetectedData(prev => [newItem, ...prev]);
    setNewTracking("");
    setNewName("");
    setParcelModal(false);
  };

  const addReminder = () => {
    if (!reminderTitle) return;

    const finalDate = reminderDate || date.toDateString();
const finalTime =
  reminderTime ||
  time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const newItem: Action = {
  id: Math.random().toString(),
  type: "reminder",
  title: reminderTitle,
  subtitle: `${finalDate} | ${finalTime}`,
};

    setReminders(prev => [newItem, ...prev]);
    setReminderTitle("");
    setReminderModal(false);
  };

  const cardStyle = {
    width: "48%" as const,
    height: 180,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  };

  const confirmDelivered = (

id: string

) => {

setDismissedParcels(

prev => [

...prev,

id

]

);

};

  return (
    <>
      <ScrollView 
       style={{ 
         flex: 1, 
         backgroundColor: colors.bg,
         paddingTop:70, }}>
        <View 
        style={{ 
          padding: 20 }}>

          {/* HEADER */}
          <View 
           style={{ 
             flexDirection: "row", 
             justifyContent: "space-between", 
             marginBottom: 20, 
             alignItems:"center",
            }}>
              <Text 
              style={{ 
                fontSize: 22, 
                fontWeight: "700" 
              }}>Smart Assistant</Text>
             
             <TouchableOpacity
              onPress={async () => {
                const result = await promptAsync();

                console.log("LOGIN RESULT:", result);
                }}
              style={{
                backgroundColor: "#DB4437", // Google red
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ 
                color: "#fff", 
                fontWeight: "600",
                fontSize:14, }}>
                Connect Gmail
              </Text>
            </TouchableOpacity>

             <TouchableOpacity onPress={() => router.push("/settings" as any)}>
               <Ionicons name="settings-outline" size={22} />
             </TouchableOpacity>

          </View>

          {/* REMINDERS */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={{ fontWeight: "600" }}>My Reminders</Text>
            <TouchableOpacity
              onPress={() => setReminderModal(true)}
              style={{ backgroundColor: colors.primary, borderRadius: 20, padding: 4 }}
            >
              <Ionicons name="add" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ height: "30%", backgroundColor: "#fff", borderRadius: 20, padding: 20 }}>
            {reminders.map(item => (
              <ActionCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* SMART */}
          <Text style={{ marginTop: 20, fontWeight: "600" }}>⚡ Smart Detected</Text>

          {/* GRID */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 10 }}>

            {/* PARCEL */}
            <View style={cardStyle}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontWeight: "600" }}>📦 Parcels</Text>
                <TouchableOpacity
                  onPress={() => setParcelModal(true)}
                  style={{ backgroundColor: colors.primary, borderRadius: 20, padding: 4 }}
                >
                  <Ionicons name="add" size={16} color="#fff" />
                </TouchableOpacity>
              </View>

              <Text>{parcels.length} items</Text>

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search parcel..."
                style={{ backgroundColor: "#eee", padding: 8, borderRadius: 8, marginTop: 5 }}
              />

              <ScrollView>
             {parcels.map((item) => (
                <View
                  key={item.id}
                  style={{
                    marginBottom: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/parcel",

                        params: {
                          trackingNumber: item.subtitle,

                          status:
                            item.status ??
                            "In Transit",

                          title:
                            item.title,

                          history: JSON.stringify(
                            item.history ?? []
                          ),
                        },
                      })
                    }
                  >
                    <MiniCard item={item} />
                  </TouchableOpacity>

                  {item.status === "Delivered" && (
                    <TouchableOpacity
                      onPress={() =>
                        confirmDelivered(
                          item.id
                        )
                      }
                      style={{
                        position: "absolute",
                        right: 8,
                        top: 12,
                        width: 22,
                        height: 22,
                        borderRadius: 16,
                        backgroundColor: "#22C55E",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999,
                      }}
                    >
                      <Ionicons
                        name="checkmark"
                        size={15}
                        color="white"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>
            </View>

            {/* BILL */}
            <View style={cardStyle}>
              <Text>💳 Billing</Text>
              <Text>{bills.length} items</Text>
              <ScrollView>
                {bills.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      router.push({
                        pathname: "/billing",

                        params: {
                          title:
                            item.title,

                          subtitle:
                            item.subtitle,
                        },
                      })
                    }
                  >
                    <MiniCard item={item} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* WORK */}
            <View style={cardStyle}>
              <Text>💼 Work</Text>
              <Text>{work.length} items</Text>
              <ScrollView>{work.map(i => <MiniCard key={i.id} item={i} />)}</ScrollView>
            </View>

            {/* ALERT */}
            <View style={cardStyle}>
              <Text>🔔 Alerts</Text>
              <Text>{alerts.length} items</Text>
              <ScrollView>{alerts.map(i => <MiniCard key={i.id} item={i} />)}</ScrollView>
            </View>

          </View>
        </View>
      </ScrollView>

      {/* REMINDER MODAL */}
      <Modal visible={reminderModal} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)", padding: 20 }}>
          <View style={{ width: "100%", backgroundColor: "#fff", padding: 20, borderRadius: 16 }}>

            <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 15, textAlign: "center" }}>
              Add Reminder
            </Text>

            <TextInput
              placeholder="Reminder Title"
              value={reminderTitle}
              onChangeText={setReminderTitle}
              style={{ backgroundColor: "#F1F5F9", padding: 12, borderRadius: 10, marginBottom: 10 }}
            />

            {/* DATE */}
            <TouchableOpacity
              onPress={() => setShowDatePicker(prev => !prev)}
              style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#F1F5F9", padding: 12, borderRadius: 10, marginBottom: 10 }}
            >
              <Ionicons name="calendar-outline" size={16} />
              <Text style={{ marginLeft: 8 }}>{date.toDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={(e, d) => {
                  if (d) {
                    setDate(d);
                    setReminderDate(d.toDateString());
                  }
                }}
              />
            )}

            {/* TIME */}
            <TouchableOpacity
              onPress={() => setShowTimePicker(prev => !prev)}
              style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#F1F5F9", padding: 12, borderRadius: 10, marginBottom: 10 }}
            >
              <Ionicons name="time-outline" size={16} />
              <Text style={{ marginLeft: 8 }}>
                {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="spinner"
                onChange={(e, t) => {
                  if (t) {
                    setTime(t);
                    setReminderTime(
                      t.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    );
                  }
                }}
              />
            )}

            <TouchableOpacity
              onPress={addReminder}
              style={{ backgroundColor: colors.primary, padding: 12, borderRadius: 10, alignItems: "center" }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Add Reminder</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setReminderModal(false)} style={{ marginTop: 10, alignItems: "center" }}>
              <Text style={{ color: "#EF4444" }}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <Modal visible={parcelModal} transparent animationType="fade">
  <View style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
  }}>
    <View style={{
      width: "100%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 16,
    }}>

      <Text style={{
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 15,
        textAlign: "center",
      }}>
        Add Parcel
      </Text>

      <TextInput
        placeholder="Tracking Number"
        value={newTracking}
        onChangeText={setNewTracking}
        style={{
          backgroundColor: "#F1F5F9",
          padding: 12,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Item Name (optional)"
        value={newName}
        onChangeText={setNewName}
        style={{
          backgroundColor: "#F1F5F9",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={addParcel}
        style={{
          backgroundColor: colors.primary,
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Add Parcel
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setParcelModal(false)}
        style={{ marginTop: 10, alignItems: "center" }}
      >
        <Text style={{ color: "#EF4444" }}>
          Cancel
        </Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>
    </>
  );
}