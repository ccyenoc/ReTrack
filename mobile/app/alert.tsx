import {
View,
Text,
ScrollView,
TouchableOpacity,
} from "react-native";

import {
router,
useLocalSearchParams,
} from "expo-router";

export default function AlertPage() {

const {
title,
subtitle,
type,
} =
useLocalSearchParams();

const email =
String(
subtitle
);

const summary =

email.length > 140

?

email.substring(
0,
140
) + "..."

:

email;

return (

<ScrollView
style={{
flex:1,
backgroundColor:"#F8FAFC",
}}
>

<View
style={{
padding:24,
paddingTop:70,
}}
>

<TouchableOpacity
onPress={() =>
router.back()
}
>

<Text
style={{
fontSize:18,
marginBottom:20,
}}
>

← Back

</Text>

</TouchableOpacity>

<Text
style={{
fontSize:36,
fontWeight:"700",
marginBottom:20,
}}
>

🔔 {title}

</Text>

<View
style={{
backgroundColor:"#FFF7ED",
padding:20,
borderRadius:20,
marginBottom:16,
}}
>

<Text
style={{
fontWeight:"700",
marginBottom:10,
}}
>

Summary

</Text>

<Text
style={{
lineHeight:24,
}}
>

{summary}

</Text>

</View>

<View
style={{
backgroundColor:"#fff",
padding:20,
borderRadius:20,
marginBottom:16,
}}
>

<Text
style={{
fontWeight:"700",
marginBottom:10,
}}
>

Category

</Text>

<Text>

{type}

</Text>

</View>

<View
style={{
backgroundColor:"#fff",
padding:20,
borderRadius:20,
}}
>

<Text
style={{
fontWeight:"700",
marginBottom:12,
}}
>

Full Email

</Text>

<ScrollView
style={{
maxHeight:350,
}}
>

<Text
style={{
fontSize:16,
lineHeight:28,
}}
>

{email}

</Text>

</ScrollView>

</View>

</View>

</ScrollView>

);

}