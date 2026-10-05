// import BadgeCard from "@/components/cards/badge-card";
// import ResourcesDownload from "@/components/cards/downloaded-resources";
// import MyDiscussions from "@/components/cards/my-discussions";
// import { SurveyCard } from "@/components/cards/profile-survey";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { useAuth } from '@/lib/auth/AuthProvider';
// import { profileStyles } from "@/styles/profile/profile-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useMemo } from "react";
// import {
//   Image,
//   ScrollView,
//   TouchableOpacity
// } from "react-native";

// export default function Profile() {

//   const r = useResponsive();
        
//   const styles = useMemo(() => profileStyles(r), [r]);

//   const { clearSession } = useAuth();

// // const handleLogout = async () => {
// //   console.log("[LOGOUT] Logging out...");

// //   await clearSession();

// //   console.log("[LOGOUT] Session cleared");
// //   console.log("[LOGOUT] Navigating to login...");

// //   router.replace("/auth/login");
// // };

// const handleLogout = async () => {
//   console.log("[LOGOUT] Logging out...");

//   await clearSession();

//   console.log("[LOGOUT] Session cleared");
// };



  
//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <ThemedView>
//         <ThemedView style={styles.headerContainer}>
//           <TouchableOpacity onPress={() => router.push("/drawer/tabs/setting/settings")}>
//             <Feather
//             name="settings"
//             size={icon(20)}
//             color="#35408E"
//             style={styles.settings}
//           />
//           </TouchableOpacity>

//           <ThemedView style={styles.profileContainer}>
            
//             <ThemedView style={{alignItems: "center"}}>
//               <ThemedView style={styles.imageShadow}>
//                <Image
//                 source={require("@/assets/images/profile.jpg")}
//                 style={styles.profileImg}
//               />
//               </ThemedView>
//               <ThemedView style={styles.levelBadge}>
//                   <ThemedText style={styles.levelText}>
//                     Advocate
//                   </ThemedText>
//                 </ThemedView>
//             </ThemedView>

//             <ThemedView style={styles.profileInfo}>
//               <ThemedView style={styles.nameRow}>
//                 <ThemedText style={styles.userName}>
//                   First Name
//                 </ThemedText>
//               </ThemedView>

//               {/* Fix this when Organization is the Role, show the name of Org "(Name of Org)" */}
//               <ThemedText style={styles.role}>
//                 General Public
//               </ThemedText>

//               <ThemedView style={styles.infoRow}>
//                 <Ionicons
//                   name="location-outline"
//                   size={icon(15)}
//                   color="#6a6a6dd6"
//                 />
//                 <ThemedText style={styles.infoText}>
//                   Calamba, Laguna
//                 </ThemedText>
//               </ThemedView>

//               <ThemedView style={styles.infoRow}>
//                 <Ionicons
//                   name="calendar-clear-outline"
//                   size={icon(15)}
//                   color="#6a6a6dd6"
//                 />
//                 <ThemedText style={styles.infoText}>
//                   Member since May 25, 2026
//                 </ThemedText>
//               </ThemedView>
//             </ThemedView>
//           </ThemedView>
//         </ThemedView>


//         <ThemedView style={styles.moreContainer}>
//           <BadgeCard returnTo="/drawer/tabs/profiles/profile" />
//           <ResourcesDownload/>
//           <MyDiscussions/>
//           <SurveyCard/>

//           <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//             <Ionicons name="exit-outline" size={icon(25)} color="white"/>
//             <ThemedText style={styles.logoutTxt}>Log Out</ThemedText>
//           </TouchableOpacity>
//         </ThemedView>

//       </ThemedView>
//     </ScrollView>
//   );
// }

// import BadgeCard from "@/components/cards/badge-card";
// import ResourcesDownload from "@/components/cards/downloaded-resources";
// import MyDiscussions from "@/components/cards/my-discussions";
// import { SurveyCard } from "@/components/cards/profile-survey";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { useAuth } from "@/lib/auth/AuthProvider";
// import useFormMutation from "@/lib/hooks/useFormMutation";
// import useFormQuery from "@/lib/hooks/useFormQuery";
// import { UserByIdInterface } from "@/lib/interface/user/user.interface";
// import { profileStyles } from "@/styles/profile/profile-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useMemo } from "react";
// import { Image, ScrollView, TouchableOpacity } from "react-native";

// interface ActivityLogPayload {
//   type: string;
//   description?: string;
//   user_id: string;
// }

// const formatMemberSince = (date?: string) => {
//   if (!date) {
//     return "Member since —";
//   }

//   return `Member since ${new Date(date).toLocaleDateString(
//     "en-US",
//     {
//       month: "numeric",
//       day: "numeric",
//       year: "numeric",
//     }
//   )}`;
// };

// export default function Profile() {
//   const r = useResponsive();
//   const styles = useMemo(
//     () => profileStyles(r),
//     [r]
//   );

//   const {
//     user,
//     token,
//     isLoading: isAuthLoading,
//     clearSession,
//   } = useAuth();

//   const currentUserId = user?.user_id;

//   console.log(
//     "[PROFILE] Auth loading:",
//     isAuthLoading
//   );

//   console.log(
//     "[PROFILE] Auth user:",
//     user
//   );

//   console.log(
//     "[PROFILE] Current user ID:",
//     currentUserId
//   );

//   console.log(
//     "[PROFILE] Token exists:",
//     Boolean(token)
//   );

//   const {
//     data: userResponse,
//     isLoading: isUserLoading,
//     error: userError,
//   } = useFormQuery<UserByIdInterface>({
//     key: ["users", currentUserId],
//     url: "maintenance/users",
//     enabled: Boolean(
//       currentUserId && token
//     ),
//     headers: {
//       "x-api-key": "testing",
//       "x-api-version": "2026-02-26",
//       "Content-Type": "application/json",
//       ...(token
//         ? {
//             Authorization: `Bearer ${token}`,
//           }
//         : {}),
//     },
//   });

//   const userDetails =
//     userResponse?.data?.edges?.find(
//       (edge) =>
//         edge.node.user_id === currentUserId
//     )?.node;

//   console.log(
//     "[PROFILE] User response:",
//     userResponse
//   );

//   console.log(
//     "[PROFILE] User details:",
//     userDetails
//   );

//   console.log(
//     "[PROFILE] First name:",
//     userDetails?.Profile?.first_name
//   );

//   console.log(
//     "[PROFILE] Location:",
//     userDetails?.Profile?.location
//   );

//   console.log(
//     "[PROFILE] Role:",
//     userDetails?.role?.name
//   );

//   console.log(
//     "[PROFILE] Created at:",
//     userDetails?.created_at
//   );

//   const { mutateAsync: logActivity } =
//     useFormMutation<
//       ActivityLogPayload,
//       unknown
//     >({
//       key: [
//         "activity-log",
//         "logout",
//       ],
//       url: "maintenance/activity-logs",
//       method: "POST",
//       headers: {
//         "x-api-key": "testing",
//         "x-api-version": "2026-02-26",
//         "Content-Type": "application/json",
//         ...(token
//           ? {
//               Authorization: `Bearer ${token}`,
//             }
//           : {}),
//       },
//     });

//   const handleLogout = async () => {
//     console.log(
//       "[LOGOUT] Button pressed"
//     );

//     console.log(
//       "[LOGOUT] Current user ID:",
//       currentUserId
//     );

//     try {
//       if (currentUserId) {
//         await logActivity({
//           type: "LOGGED OUT",
//           description:
//             "User logged out of the application.",
//           user_id: currentUserId,
//         });

//         console.log(
//           "[LOGOUT] Activity log created"
//         );
//       } else {
//         console.warn(
//           "[LOGOUT] No user ID. Skipping activity log."
//         );
//       }
//     } catch (error) {
//       console.error(
//         "[LOGOUT] Activity log failed:",
//         error
//       );
//     } finally {
//       console.log(
//         "[LOGOUT] Clearing session..."
//       );

//       await clearSession();

//       console.log(
//         "[LOGOUT] Session cleared"
//       );

//       router.replace("/");
//     }
//   };

//   if (isAuthLoading) {
//     return (
//       <ThemedView
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <ThemedText>
//           Loading profile...
//         </ThemedText>
//       </ThemedView>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={
//         styles.scrollContent
//       }
//     >
//       <ThemedView>
//         <ThemedView
//           style={styles.headerContainer}
//         >
//           <TouchableOpacity
//             onPress={() =>
//               router.push(
//                 "/drawer/tabs/setting/settings"
//               )
//             }
//           >
//             <Feather
//               name="settings"
//               size={icon(20)}
//               color="#35408E"
//               style={styles.settings}
//             />
//           </TouchableOpacity>

//           <ThemedView
//             style={styles.profileContainer}
//           >
//             <ThemedView
//               style={{
//                 alignItems: "center",
//               }}
//             >
//               <ThemedView
//                 style={styles.imageShadow}
//               >
//                 <Image
//                   source={require("@/assets/images/profile.jpg")}
//                   style={styles.profileImg}
//                 />
//               </ThemedView>

//               <ThemedView
//                 style={styles.levelBadge}
//               >
//                 <ThemedText
//                   style={styles.levelText}
//                 >
//                   Advocate
//                 </ThemedText>
//               </ThemedView>
//             </ThemedView>

//             <ThemedView
//               style={styles.profileInfo}
//             >
//               <ThemedView
//                 style={styles.nameRow}
//               >
//                 <ThemedText
//                   style={styles.userName}
//                 >
//                   {isUserLoading
//                     ? "Loading..."
//                     : userDetails?.Profile
//                         ?.first_name ||
//                       "First Name"}
//                 </ThemedText>
//               </ThemedView>

//               <ThemedText
//                 style={styles.role}
//               >
//                 {userDetails?.role?.name ||
//                   "General Public"}
//               </ThemedText>

//               <ThemedView
//                 style={styles.infoRow}
//               >
//                 <Ionicons
//                   name="location-outline"
//                   size={icon(15)}
//                   color="#6a6a6dd6"
//                 />

//                 <ThemedText
//                   style={styles.infoText}
//                 >
//                   {userDetails?.Profile
//                     ?.location ||
//                     "No Location Set"}
//                 </ThemedText>
//               </ThemedView>

//               <ThemedView
//                 style={styles.infoRow}
//               >
//                 <Ionicons
//                   name="calendar-clear-outline"
//                   size={icon(15)}
//                   color="#6a6a6dd6"
//                 />

//                 <ThemedText
//                   style={styles.infoText}
//                 >
//                   {formatMemberSince(
//                     userDetails?.created_at
//                   )}
//                 </ThemedText>
//               </ThemedView>
//             </ThemedView>
//           </ThemedView>
//         </ThemedView>

//         <ThemedView
//           style={styles.moreContainer}
//         >
//           <BadgeCard
//             returnTo="/drawer/tabs/profiles/profile"
//           />

//           <ResourcesDownload />

//           <MyDiscussions />

//           <SurveyCard />

//           <TouchableOpacity
//             style={styles.logoutBtn}
//             onPress={handleLogout}
//           >
//             <Ionicons
//               name="exit-outline"
//               size={icon(25)}
//               color="white"
//             />

//             <ThemedText
//               style={styles.logoutTxt}
//             >
//               Log Out
//             </ThemedText>
//           </TouchableOpacity>
//         </ThemedView>
//       </ThemedView>
//     </ScrollView>
//   );
// }


import BadgeCard from "@/components/cards/badge-card";
import ResourcesDownload from "@/components/cards/downloaded-resources";
import MyDiscussions from "@/components/cards/my-discussions";
import { SurveyCard } from "@/components/cards/profile-survey";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { UserByIdInterface } from "@/lib/interface/user/user.interface";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";

interface ActivityLogPayload{
  type:string;
  description?:string;
  user_id:string;
}

const formatMemberSince=(date?:string)=>{
  if(!date)return"Member since —";
  return`Member since ${new Date(date).toLocaleDateString("en-US",{month:"numeric",day:"numeric",year:"numeric"})}`;
};

export default function Profile(){
  const r=useResponsive();
  const styles=useMemo(()=>profileStyles(r),[r]);
  const{user,token,clearSession,isLoading:authLoading}=useAuth();

  // Keep this as String() because your GET endpoint requires /maintenance/users/
  // The actual logged-in ID comes from user?.user_id.
  // const currentUserId=String();

  // const{data:userResponse,isLoading:isUserLoading}=useFormQuery<UserByIdInterface>({
  //   key:["user",currentUserId],
  //   url:"maintenance/users/",
  //   enabled:Boolean(token),
  //   headers:{
  //     "x-api-key":"testing",
  //     "x-api-version":"2026-02-26",
  //     "Content-Type":"application/json",
  //     ...(token?{Authorization:`Bearer ${token}`}:{})
  //   }
  // });

  // const userDetails=userResponse?.data?.edges?.find(
  //   edge=>edge.node.user_id===user?.user_id
  // )?.node;

  // console.log("[PROFILE] Auth user:",user);
  // console.log("[PROFILE] Current user ID:",user?.user_id);
  // console.log("[PROFILE] Token exists:",Boolean(token));
  // console.log("[PROFILE] User response:",userResponse);
  // console.log("[PROFILE] User details:",userDetails);


const currentUserId=user?.user_id;

const{data:userResponse,isLoading:isUserLoading}=useFormQuery<UserByIdInterface>({
  key:["users",currentUserId],
  url:"maintenance/users/",
  enabled:Boolean(currentUserId&&token),
  headers:{
    "x-api-key":"testing",
    "x-api-version":"2026-02-26",
    "Content-Type":"application/json",
    ...(token?{Authorization:`Bearer ${token}`}:{})
  }
});

const userDetails=userResponse?.data?.edges?.find(
  edge=>edge.node.user_id===currentUserId
)?.node;

  console.log("[PROFILE] Auth user:",user);
  console.log("[PROFILE] Current user ID:",currentUserId);
  console.log("[PROFILE] Token exists:",Boolean(token));
  console.log("[PROFILE] User response:",userResponse);
  console.log("[PROFILE] User details:",userDetails);
  console.log("[PROFILE] First name:",userDetails?.Profile?.first_name);
  console.log("[PROFILE] Role:",userDetails?.role?.name);
  console.log("[PROFILE] Created at:",userDetails?.created_at);


  const{mutateAsync:logActivity}=useFormMutation<ActivityLogPayload,unknown>({
  key:["activity-log","logout"],
  url:"maintenance/activity-logs",
  method:"POST",
  headers:{
    "x-api-key":"testing",
    "x-api-version":"2026-02-26",
    "Content-Type":"application/json",
    ...(token?{Authorization:`Bearer ${token}`}:{})
  }
});

const handleLogout=async()=>{
  try{
    if(currentUserId&&token){
      await logActivity({
        type:"LOGGED OUT",
        description:"User logged out of the application.",
        user_id:currentUserId,
      });
    }
  }catch(error){
    console.error("[LOGOUT] Activity log failed:",error);
  }finally{
    await clearSession();
    router.replace("/");
  }
};

  if(authLoading){
    return(
      <ThemedView style={styles.pageContainer}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return(
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <TouchableOpacity onPress={()=>router.push("/drawer/tabs/setting/settings")}>
            <Feather name="settings" size={icon(20)} color="#35408E" style={styles.settings}/>
          </TouchableOpacity>

          <ThemedView style={styles.profileContainer}>
            <ThemedView style={{alignItems:"center"}}>
              <ThemedView style={styles.imageShadow}>
                <Image source={require("@/assets/images/profile.jpg")} style={styles.profileImg}/>
              </ThemedView>
              <ThemedView style={styles.levelBadge}>
                <ThemedText style={styles.levelText}>Advocate</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.profileInfo}>
              <ThemedView style={styles.nameRow}>
                <ThemedText style={styles.userName}>
                  {isUserLoading
                    ? user?.Profile?.first_name||"Loading..."
                    : userDetails?.Profile?.first_name||user?.Profile?.first_name||"First Name"}
                </ThemedText>
              </ThemedView>

              <ThemedText style={styles.role}>
                {userDetails?.role?.name||user?.Role?.name||"General Public"}
              </ThemedText>

              <ThemedView style={styles.infoRow}>
                <Ionicons name="location-outline" size={icon(15)} color="#6a6a6dd6"/>
                <ThemedText style={styles.infoText}>
                  {userDetails?.Profile?.location||"No Location Set"}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.infoRow}>
                <Ionicons name="calendar-clear-outline" size={icon(15)} color="#6a6a6dd6"/>
                  <ThemedText style={styles.infoText}>
                    {formatMemberSince(userDetails?.created_at)}
                  </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.moreContainer}>
          <BadgeCard returnTo="/drawer/tabs/profiles/profile"/>
          <ResourcesDownload/>
          <MyDiscussions/>
          <SurveyCard/>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="exit-outline" size={icon(25)} color="white"/>
            <ThemedText style={styles.logoutTxt}>Log Out</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
