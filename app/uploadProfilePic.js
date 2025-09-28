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
  import { router,useLocalSearchParams } from "expo-router";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import * as ImagePicker from "expo-image-picker";
  
  SplashScreen.preventAutoHideAsync();
  
  export default function signIn() {
    const item = useLocalSearchParams();
    const userMob = item.mobile;
    alert(userMob);
  
  const[getBtnColor,setBtnColor] = useState(mainstylesheet.buttonColor.backgroundColor);
  
  
    
    const [getError, setError] = useState("");
    const[getImage,setImage] = useState(null);

    
  
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
    const prifileImg = require("../assets/images/image-upload.png");


    
  
    return (
      <View style={stylesheet.view1}>
        <ScrollView>
          <View style={stylesheet.view2}>
            <Image source={img1} style={stylesheet.img1} />
  
            <View style={stylesheet.view3}>
              <Text style={[stylesheet.text1, mainstylesheet.textColor]}>
              Upload Profile Picture
              </Text>
              <Text style={stylesheet.text2}>
              You can upload Picture from gallerary or skip this step
              </Text>
            </View>
  
            
  
            <Pressable style={stylesheet.view4} onPress={
                async()=>{
                    let result = await ImagePicker.launchImageLibraryAsync({});
 
                    if(!result.canceled){
                      setImage(result.assets[0].uri);
                    }
                }
            }>
                {getImage==null?
                <Image source={prifileImg} style={stylesheet.profileImg} />
                :
                <Image source={{uri:getImage}} style={stylesheet.profileImg2} />
                }
                
              
            </Pressable>
            <Text style={stylesheet.text5}>Select Profile Picture From Gallery </Text>
  
            <View style={stylesheet.view5}>
              <Pressable
                style={[stylesheet.pressable1, mainstylesheet.buttonColor,{backgroundColor:getBtnColor}]}
                onPress={async () => {

                    let formData = new FormData();
                    formData.append("userMob",userMob);

                  
                    if(getImage != null){
                      formData.append("profileImg",{
                        name:"profileimg.png",
                        type:"image/png",
                        uri:getImage,
                      });
                    }else{
                        setError("Select Profile Picture or Skip this step");
                    }
  
                  let response = await fetch("http://192.168.8.186:8080/Web22/UploadImage",
                    {
                        method:"POST",
                        body:formData
                    });
  
                  if (response.ok) {
                    let json = await response.json();
                    if (json.success) {
  
                     router.replace("/signIn");
  
                      
                    } else {
                        setError("Oooops Something went wrong");
                      
                    }
                  }else{
                    // console.log("error");
                    setError("Oooops Something went wrong");
                  }
                }}
              >
                <Text style={[stylesheet.text4, mainstylesheet.textColor2]}>
                  Save
                </Text>
              </Pressable>
  
              <Pressable
                style={stylesheet.pressable2}
                onPress={() => {
                  //setBtnColor('black');
                  router.replace("/signIn");
                }}
              >
                <Text style={stylesheet.text5}>Don't want to upload ? </Text>
                <Text style={[stylesheet.text6, mainstylesheet.textColor]}>
                  Skip 
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
      paddingTop: 40,
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
      marginBottom: 60,
    },
    view4: {
      width:200,
      height:200,
      borderRadius:100,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"rgba(217, 217, 217, 1)"
    },
    view5: {
      marginTop: 80,
      width: "100%",
      justifyContent: "end",
      alignItems: "center",
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
    text7: {
      fontFamily: "Quicksand-Regular",
      color: "red",
    },
    view6: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 5,
    },
    profileImg:{
        width:60,
        height:60
    },
    profileImg2:{
        width:200,
        height:200,
        borderRadius:100
    }
  });
  