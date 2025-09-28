import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  FlatList,
  
} from "react-native";
import mainstylesheet from "./stylestheams";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";

SplashScreen.preventAutoHideAsync();

export default function home() {
  const [getUserArray, setUserArray] = useState([]);
  

  const [loaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
  });

  const image1 = require("../assets/images/wave-hand.png");

    useEffect(() => {
      async function fetchData() {
        try{
        let userJson = await AsyncStorage.getItem("user");
        let user = JSON.parse(userJson);
        let userId = user.id;
        console.log(userId);

        let response = await fetch(
          "http://192.168.8.186:8080/Web22/LoadOtherUsers?id=" +
            user.id
        );

        if (response.ok) {
          let json = await response.json();
          if (json.success) {
            let chatArray = json.jsonOtherUsersArray;
            console.log(chatArray);
            setUserArray(chatArray);
          } else {
            console.log("not success");
          }
        } else {
          console.log("resp not okey");
        }
      }catch(e){
        console.log(e);
      }
      }
      fetchData();
      
      [];
    });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={[stylesheet.view1]}>
      <View style={[stylesheet.view2, mainstylesheet.homeviews]}>
        <View style={[stylesheet.view2_1]}>
          <Text style={[stylesheet.text1, mainstylesheet.textColor]}>
            ChatMe
          </Text>
        </View>
        <View style={[stylesheet.view2_2]}>
        <Pressable onPress={
            ()=>{
              
                router.push("/myAccount");
              
             
            }
          }>
          <FontAwesome6
            size={30}
            name={"circle-user"}
            style={[stylesheet.icon1, mainstylesheet.textColor]}
          />
           </Pressable>
        </View>
      </View>

      <View style={[stylesheet.view4]}>
        <FlashList
            data={getUserArray}
            renderItem={({ item }) => 
              

        <Pressable
          style={[stylesheet.chatItem, mainstylesheet.homeviews]}
          onPress={
            ()=>{

              router.push(
                {
                  pathname:"/chat",
                  params:item
                }
              )
            }
           
          }
        >
          <View style={stylesheet.chatItemImageView}>
            {item.other_user_status==1 ? (
              <View
                style={[
                  stylesheet.chatimageonline,
                  mainstylesheet.imageOnlineCircle,
                ]}
              ></View>
            ) : null}

            <View style={stylesheet.imageview1}>
            {item.avatar_image_found==true ?
                  <Image source={"https://dd8f-2402-4000-2130-79b-1d16-50c0-fc26-63f9.ngrok-free.app/Web22/UserImages/"+item.other_user_mobile+".png"} contentFit={"contain"} style={stylesheet.userImage} />
                  :
                  <Text style={[stylesheet.chatImageLetters,mainstylesheet.textColor]}>{item.other_user_avatar_letters}</Text>
                }
             
            </View>
          </View>

          <View style={[stylesheet.view4_4]}>
            <Text style={[stylesheet.text3]}>{item.other_user_name}</Text>

            <Text numberOfLines={1} style={[stylesheet.text4]}>
             Say Hi
            </Text>
          </View>

          <View style={[stylesheet.view4_5]}>
          <Image source={image1} style={stylesheet.image1} />
          </View>
        </Pressable>

        }
             estimatedItemSize={200}
           /> 

      </View>

      <View style={[stylesheet.view5, mainstylesheet.homeviews]}>
        <Pressable onPress={
          ()=>{
            router.replace("/home");
          }
        }>
          <FontAwesome6
            color={"rgba(156, 108, 254, 1)"}
            name={"comment-dots"}
            size={25}
          />
        </Pressable>

        <Pressable style={[stylesheet.pressable1]}>
        <FontAwesome6
          color={"rgba(156, 108, 254, 1)"}
          name={"user-plus"}
          size={20}
        />
        </Pressable>

        
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    backgroundColor:"rgba(230, 224, 255, 1)"
  },

  view2: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  view2_1: {
    flex: 1,
    marginHorizontal: 10,
  },
  view2_2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    columnGap: 20,
  },
  text1: {
    fontFamily: "Quicksand-Bold",
    fontSize: 30,
  },
  view3: {
    width: "100%",
    height: 100,
    marginVertical: 5,
  },

  view3_3: {
    marginVertical: 10,
  },
  imageview1: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgba(230, 224, 255, 1)",
    marginHorizontal: 5,
  },
  userImage:{
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  imageonline: {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: "green",
    position: "absolute",
    borderStyle: "solid",

    borderWidth: 2,
    zIndex: 1,
  },
  text2: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
    alignSelf: "center",
  },

  view4: {
    width: "100%",
    height: "88%",
    paddingHorizontal: 10,
    paddingVertical:20
  },

  chatItem: {
    width: "100%",
    height: 100,
    borderRadius: 20,
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },

  chatItemImageView: {
    marginStart: 8,
  },
  chatimageview1: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(230, 224, 255, 1)",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  chatimageonline: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: "green",
    position: "absolute",
    borderStyle: "solid",

    borderWidth: 2,
    zIndex: 1,
  },

  chatImageLetters: {
    fontFamily: "Quicksand-Bold",
    fontSize: 26,
  },

  view4_4: {
    flex: 3,
    paddingStart: 5,
  },
  view4_5: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  text3: {
    fontFamily: "Quicksand-Bold",
    fontSize: 16,
  },
  text4: {
    fontFamily: "Quicksand-Medium",
    fontSize: 12,
  },

  text5: {
    fontFamily: "Quicksand-Bold",
    fontSize: 12,
  },
  text6: {
    fontFamily: "Quicksand-Bold",
    fontSize: 10,
  },
  msgCountView: {
    width: 22,
    height: 22,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  msgCount: {
    fontFamily: "Quicksand-Bold",
    fontSize: 11,
  },

  view5: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 80,
    borderTopWidth: 5,
    borderTopColor: "rgba(156, 108, 254, 1)",
  },

  pressable1: {
    backgroundColor: "rgba(230, 224, 255, 1)",
    padding: 5,
    borderRadius: 10,
  },
  image1:{
    width:40,
    height:40
  }
});
