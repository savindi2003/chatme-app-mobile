import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import mainstylesheet from "./stylestheams";
import { router } from "expo-router";
import {  FontAwesome6 } from "@expo/vector-icons";


SplashScreen.preventAutoHideAsync();

export default function signUp() {
  const [getMobile, setMobile] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getPassword, setPassword] = useState("");

  const[getError,setError] = useState("");

  const [loaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  const img1 = require("../assets/images/background1.png");

  return (
    <View style={stylesheet.view1}>
      <ScrollView>
        <View style={stylesheet.view2}>
          <Image source={img1} style={stylesheet.img1} />

          <View style={stylesheet.view3}>
            <Text style={[stylesheet.text1, mainstylesheet.textColor]}>
              Register Your Account
            </Text>
            <Text style={stylesheet.text2}>
              Sign up now to join the conversation
            </Text>
          </View>

          

          <View style={stylesheet.view4}>
            <View style={stylesheet.view6}>
            {/* <FontAwesome6 color={"red"}  name={"circle-exclamation"} /> */}
            <Text style={stylesheet.text7}>{getError}</Text>
            </View>
            
            <Text style={stylesheet.text3}>Mobile</Text>
            <TextInput
              style={stylesheet.input1}
              maxLength={10}
              inputMode={"tel"}
              onChangeText={(text) => {
                setMobile(text);
                setError("");
              }}
            />
          </View>
          <View style={stylesheet.view4}>
            <Text style={stylesheet.text3}>First Name</Text>
            <TextInput
              style={stylesheet.input1}
              maxLength={10}
              inputMode={"text"}
              onChangeText={(text) => {
                setFirstName(text);
                setError("");
              }}
            />
          </View>
          <View style={stylesheet.view4}>
            <Text style={stylesheet.text3}>Last Name</Text>
            <TextInput
              style={stylesheet.input1}
              maxLength={10}
              inputMode={"text"}
              onChangeText={(text) => {
                setLastName(text);
                setError("");
              }}
            />
          </View>
          <View style={stylesheet.view4}>
            <Text style={stylesheet.text3}>Password</Text>
            <TextInput
              style={stylesheet.input1}
              maxLength={10}
              inputMode={"text"}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
                setError("");
              }}
            />
          </View>

          <View style={stylesheet.view5}>
            <Pressable
              style={[stylesheet.pressable1, mainstylesheet.buttonColor]}
              onPress={async () => {


                let response = await fetch("http://192.168.8.186:8080/Web22//SignUp", {
                  method: "POST",
                  body: JSON.stringify(
                    {
                    mobile:getMobile,
                    firstname:getFirstName,
                    lastname:getLastName,
                    password:getPassword,
                  }),
                  headers:{
                    "Content-Type":"application/json",
                  }
                });

                if(response.ok){
                  let json = await response.json();
                   if(json.success){
                       // user reg success
                      //  Alert.alert("Success",json.message);
                       
                       setMobile("");
                       setFirstName("");
                       setLastName("");
                       setPassword("");
                       setError("");

                       router.replace(
                        {
                          pathname:"/uploadProfilePic",
                          params:{mobile : getMobile}
      
                      });
                       
                   }else{
                   // Alert.alert("Error",json.message);
                    setError(json.message);
            
                   }
                }
                
              }}
            >
              <Text style={[stylesheet.text4, mainstylesheet.textColor2]}>
                Sign Up
              </Text>
            </Pressable>

            <Pressable
              style={stylesheet.pressable2}
              onPress={() => {
               router.replace("signIn");
              }}
            >
              <Text style={stylesheet.text5}>
                Already you are registrated ?{" "}
              </Text>
              <Text style={[stylesheet.text6, mainstylesheet.textColor]}>
                Sing In
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



const stylesheet = StyleSheet.create({
  safe: {
    flex: 1,
  },
  img1: {
    width: 200,
    height: 170,
  },
  input1: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(217, 217, 217, 1)",
    borderRadius: 15,
    paddingStart: 10,
    fontSize: 14,
    fontFamily: "Quicksand-Regular",
  },
  view1: {
    flex: 1,
    paddingTop: 20,
  },
  view2: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    rowGap: 20,
  },

  view3: {
    width: "100%",
    flexDirection: "column",
    marginBottom: 20,
  },
  view4: {
    width: "100%",
    flexDirection: "column",
    rowGap: 4,
  },
  view5: {
    marginTop: 40,
    width: "100%",
    justifyContent: "end",
    alignItems: "center",
  },
  view6:{
    flexDirection:"row",
    alignItems:"center",
    columnGap:5

  },

  pressable1: {
    width: "60%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  pressable2: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
  },
  text1: {
    fontFamily: "Quicksand-Bold",
    fontSize: 28,
  },
  text2: {
    fontFamily: "Quicksand-Regular",
  },
  text3: {
    fontFamily: "Quicksand-Medium",
  },
  text4: {
    fontFamily: "Quicksand-Regular",
    fontSize: 16,
  },
  text5: {
    fontFamily: "Quicksand-Regular",
  },
  text6: {
    fontFamily: "Quicksand-Bold",
  },
  text7:{
    fontFamily:"Quicksand-Regular",
    color:"red"
  }
});
