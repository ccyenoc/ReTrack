import {
View,
Text,
ScrollView,
TouchableOpacity,
Linking,
} from "react-native";

import {
router,
useLocalSearchParams,
} from "expo-router";

export default function WorkPage() {

const {
title,
subtitle,
type,
summary,
} =
useLocalSearchParams();

const email =
String(
subtitle
);

const lower =
email
.toLowerCase();

const buildSummary = (
text:string
) => {

const cleaned =

text

.replace(
/Hi.*?,/i,
""
)

.replace(
/we are reaching out/gi,
""
)

.replace(
/thank you/gi,
""
)

.trim();

if (

cleaned
.includes(
"cv"
)

||

cleaned
.includes(
"resume"
)

) {

return
"Recruiter contacted you regarding your profile.";

}

if (

cleaned
.includes(
"interview"
)

) {

return
"Interview-related update received.";

}

if (

cleaned
.includes(
"application"
)

) {

return
"Application progress update received.";

}

if (

cleaned
.includes(
"career"
)

||

cleaned
.includes(
"job"
)

) {

return
"Career opportunity detected.";

}

return cleaned.substring(

0,

Math.min(
120,
cleaned.length
)

);

};

const shortSummary =

summary

?

String(
summary
)

:

buildSummary(
email
);

const hasInterview =

lower.includes(
"interview"
);

const hasApply =

lower.includes(
"apply"
)

||

lower.includes(
"application"
);

const hasEmail =

email.match(
/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
);

const emailAddress =
hasEmail
?.[0];

const action =

hasInterview

?

"Review interview details and prepare."

:

hasApply

?

"Review application requirements."

:

lower.includes(
"cv"
)

?

"Review recruiter details and consider replying."

:

"Review this opportunity.";

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
onPress={()=>
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

💼 {title}

</Text>

<View
style={{
backgroundColor:"#ECFDF5",
padding:22,
borderRadius:22,
marginBottom:16,
}}
>

<Text
style={{
fontWeight:"700",
marginBottom:10,
fontSize:18,
}}
>

Summary

</Text>

<Text
style={{
fontSize:17,
lineHeight:30,
}}
>

{shortSummary}

</Text>

</View>

<View
style={{
backgroundColor:"#fff",
padding:22,
borderRadius:22,
marginBottom:16,
}}
>

<Text
style={{
fontWeight:"700",
marginBottom:10,
fontSize:18,
}}
>

Category

</Text>

<Text
style={{
fontSize:16,
color:"#64748B",
}}
>

{type}

</Text>

</View>

<View
style={{
backgroundColor:"#fff",
padding:22,
borderRadius:22,
marginBottom:16,
}}
>

<Text
style={{
fontWeight:"700",
marginBottom:14,
fontSize:18,
}}
>

Full Email

</Text>

<ScrollView
style={{
maxHeight:320,
}}
>

<Text
style={{
fontSize:16,
lineHeight:30,
}}
>

{email}

</Text>

</ScrollView>

</View>

<View
style={{
backgroundColor:
hasInterview

?

"#DBEAFE"

:

"#FFF7ED",

padding:22,

borderRadius:22,

}}
>

<Text
style={{
fontWeight:"700",
fontSize:18,
marginBottom:12,
}}
>

Suggested Action

</Text>

<Text
style={{
fontSize:16,
lineHeight:26,
marginBottom:16,
}}
>

{action}

</Text>

{

emailAddress

&&

(

<TouchableOpacity

style={{
backgroundColor:"#2563EB",
padding:14,
borderRadius:14,
}}

onPress={()=>

Linking.openURL(

`mailto:${emailAddress}`

)

}

>

<Text
style={{
color:"#fff",
fontWeight:"700",
textAlign:"center",
}}
>

Reply via Email

</Text>

</TouchableOpacity>

)

}

</View>

</View>

</ScrollView>

);

}