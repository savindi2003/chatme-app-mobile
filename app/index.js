import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import mainstylesheet from './stylestheams';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function index() {
  const [loaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
  });

//   useEffect(
//     () => {
//     async function checkUser() {
//       try {
//         let userJson = await AsyncStorage.getItem("user");
//         if (userJson != null) {
//           router.replace("/home");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     checkUser();
//   },[]
// );

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  const logo = require("../assets/images/logo1.png");

  return (
    <View style={stylesheet.view1}>
      <Image source={logo} style={stylesheet.image1} />

      <View style={stylesheet.view2}>
        
        <Text style={[stylesheet.text1,mainstylesheet.textColor]}>ChatMe</Text>
        
        
        <Pressable onPress={()=>{
          router.push("/signIn");
        }}>
<Text style={stylesheet.text2}>Seamless Chats , Limitless Connection</Text>
        </Pressable>

        
      </View>

      

      <Pressable style={[stylesheet.pressable1,mainstylesheet.buttonColor]} onPress={
        ()=>{
          router.push("/signIn");
        }
      } >
        <Text style={[stylesheet.text3,mainstylesheet.textColor2]}>Get Start</Text>
      </Pressable>
      
    </View>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    alignItems:"center",
    paddingVertical:50,
    rowGap:180,
    paddingHorizontal:30
  },
  view2:{
  justifyContent:"center",
  alignItems:"center",
  
  },
  image1: {
    width:350,
    height: 230,
  },
  text1:{
    fontSize:50,
    fontFamily:"Quicksand-Bold",
    
  },
  text2:{
    fontFamily:"Quicksand-Light"
  },
  pressable1:{
    width:"60%",
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
  },
  text3:{
    fontFamily:"Quicksand-Regular",
    fontSize:16
  }
});
