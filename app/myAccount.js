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
  Image,
} from "react-native";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

SplashScreen.preventAutoHideAsync();

export default function myAccount() {
  const [selectedOptionMobile, setSelectedOptionMobile] = useState(null);
  const [selectedOptionDp, setSelectedOptionDp] = useState(null);
  const [selectedOptionOnline, setSelectedOptionOnline] = useState(null);

  const [getName, setName] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getDate, setDate] = useState("");
  const [getImage, setImage] = useState(null);
  const [getLetters, setLetters] = useState("");
  const [getMV, setMV] = useState("");
  const [getDP, setDP] = useState("");
  const [getO, setO] = useState("");
  const [imageFound, setImageFound] = useState(false);

  const [editedM, setEditedM] = useState(false);
  const [editedO, setEditedO] = useState(false);
  const [editedD, setEditedD] = useState(false);

  const [loaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
  });

  useEffect(() => {
    async function fetchData() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);

      let response = await fetch(
        "http://192.168.8.186:8080/Web22/LoadAccount?id=" + user.id
      );

      if (response.ok) {
        let json = await response.json();
        if (json.success) {
          let userArray = json.jsonUserArray;
          console.log(userArray);

          setName(userArray.user_name);
          setMobile(userArray.user_mobile);
          setDate(userArray.user_date);

          setDP(userArray.user_dp_visibility);
          setMV(userArray.user_mobile_visibility);
          setO(userArray.user_online_visibility);

          

          if (userArray.user_image_found == true) {
            setImageFound(true);
            setImage(
              "http://192.168.8.186:8080/Web22/UserImages/" +
                userArray.user_mobile +
                ".png"
            );
          } else {
            setImageFound(false);
            setLetters(userArray.user_avatar_letters);
          }
        } else {
          console.log("not success");
        }
      } else {
        console.log("resp not okey");
      }
    }
    fetchData();

  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={stylesheet.view1}>
      <Text style={stylesheet.text1}>Account</Text>

      <ScrollView style={stylesheet.scrollView}>

      <Pressable style={stylesheet.signOutView} onPress={
        async()=>{
          try {
            await AsyncStorage.removeItem("user");
            router.replace("/signIn");
          } catch (e) {
            router.replace("/signIn");
          }

        }
      }>
        <Text style={stylesheet.text10}>Sign Out</Text>
        <FontAwesome6
            color={"rgba(156, 108, 254, 1)"}
            name={"arrow-right-from-bracket"}
            size={24}
           
          />
        </Pressable>

        <View style={stylesheet.view2}>
        

          <Pressable style={stylesheet.imageView} onPress={ () => {

             router.push("/updateProfilePic");
            }}>
            {imageFound && getImage ? (
              <Image
                source={{ uri: getImage }}
                contentFit={"contain"}
                style={stylesheet.userImage}
              />
            ) : (
              <Text style={stylesheet.userImageLetters}>{getLetters}</Text>
            )}
          </Pressable>
         
          <FontAwesome6
            color={"rgba(156, 108, 254, 1)"}
            name={"camera"}
            size={34}
            style={stylesheet.camera}
          />
          
          
        </View>
        
        

        <Text style={stylesheet.text3}>{getName}</Text>

        <View style={stylesheet.view4}>
          <Text style={stylesheet.text2}>
            <FontAwesome6
              color={"rgba(156, 108, 254, 1)"}
              name={"phone"}
              size={16}
            />
            &nbsp;&nbsp;{getMobile}
          </Text>

          <Text style={stylesheet.text2}>
            <FontAwesome6
              color={"rgba(156, 108, 254, 1)"}
              name={"calendar-days"}
              size={16}
            />
            &nbsp;&nbsp;{getDate}
          </Text>
        </View>

        <View style={stylesheet.view5}>
          <Text style={stylesheet.text4}>Account Settings</Text>

          <View style={stylesheet.view6}>
            <Text style={stylesheet.text5}>Who can see my mobile number ?</Text>

            {!editedM ? (
              <Text style={stylesheet.text8}>
                {getMV == "Everyone" ? 
                <FontAwesome6
                color={"rgba(156, 108, 254, 1)"}
                name={"users"}
                size={16}
              />
                :null
              }
              {getMV == "Friends" ? 
                <FontAwesome6
                color={"rgba(156, 108, 254, 1)"}
                name={"user-group"}
                size={16}
              />
                :null
              }
              {getMV == "Only me" ? 
                <FontAwesome6
                color={"rgba(156, 108, 254, 1)"}
                name={"user-lock"}
                size={16}
              />
                :null
              }
                &nbsp;&nbsp; {getMV}
              </Text>
            ) : null}

            <Pressable
              onPress={() => {
                setEditedM(!editedM);
              }}
            >
              <Text style={stylesheet.text9}>
                <FontAwesome6
                  color={"black"}
                  name={"pen-to-square"}
                  size={18}
                />
              </Text>
            </Pressable>

            {editedM ? 
            
            
            <View>
              <View style={stylesheet.section}>
                <Checkbox
                  style={stylesheet.checkbox}
                  value={selectedOptionMobile === "Everyone"}
                  onValueChange={() => setSelectedOptionMobile("Everyone")}
                  color={
                    selectedOptionMobile === "Everyone"
                      ? "rgba(156, 108, 254, 1)"
                      : undefined
                  }
                />
                <Text style={stylesheet.text6}>Everyone</Text>
              </View>

              <View style={stylesheet.section}>
                <Checkbox
                  style={stylesheet.checkbox}
                  value={selectedOptionMobile === "Friends"}
                  onValueChange={() => setSelectedOptionMobile("Friends")}
                  color={
                    selectedOptionMobile === "Friends"
                      ? "rgba(156, 108, 254, 1)"
                      : undefined
                  }
                />
                <Text style={stylesheet.text6}>Friends</Text>
              </View>

              <View style={stylesheet.section}>
                <Checkbox
                  style={stylesheet.checkbox}
                  value={selectedOptionMobile === "Only me"}
                  onValueChange={() => setSelectedOptionMobile("Only me")}
                  color={
                    selectedOptionMobile === "Only me"
                      ? "rgba(156, 108, 254, 1)"
                      : undefined
                  }
                />
                <Text style={stylesheet.text6}>Only me</Text>
              </View>
            </View>
            :null
          }
          </View>

          <View style={stylesheet.view6}>
            <Text style={stylesheet.text5}>Who can see I'm online ?</Text>

            {!editedO ?

            <Text style={stylesheet.text8}>
              {getO == "Everyone" ? 
                <FontAwesome6
                color={"rgba(156, 108, 254, 1)"}
                name={"users"}
                size={16}
              />
                :null
              }
              {getO == "Friends" ? 
                <FontAwesome6
                color={"rgba(156, 108, 254, 1)"}
                name={"user-group"}
                size={16}
              />
                :null
              }
              {getO == "Only me" ? 
                <FontAwesome6
                color={"rgba(156, 108, 254, 1)"}
                name={"user-lock"}
                size={16}
              />
                :null
              }
              &nbsp;&nbsp; {getO}
            </Text>
            :null
          }

            <Pressable
              onPress={() => {
                setEditedO(!editedO);
              }}
            >
              <Text style={stylesheet.text9}>
                <FontAwesome6
                  color={"black"}
                  name={"pen-to-square"}
                  size={18}
                />
              </Text>
            </Pressable>

           {editedO ?
           <View>
            <View style={stylesheet.section}>
              <Checkbox
                style={stylesheet.checkbox}
                value={selectedOptionOnline === "Everyone"}
                onValueChange={() => setSelectedOptionOnline("Everyone")}
                color={
                  selectedOptionOnline === "Everyone"
                    ? "rgba(156, 108, 254, 1)"
                    : undefined
                }
              />
              <Text style={stylesheet.text6}>Everyone</Text>
            </View>

            <View style={stylesheet.section}>
              <Checkbox
                style={stylesheet.checkbox}
                value={selectedOptionOnline === "Friends"}
                onValueChange={() => setSelectedOptionOnline("Friends")}
                color={
                  selectedOptionOnline === "Friends"
                    ? "rgba(156, 108, 254, 1)"
                    : undefined
                }
              />
              <Text style={stylesheet.text6}>Friends</Text>
            </View>

            <View style={stylesheet.section}>
              <Checkbox
                style={stylesheet.checkbox}
                value={selectedOptionOnline === "Only me"}
                onValueChange={() => setSelectedOptionOnline("Only me")}
                color={
                  selectedOptionOnline === "Only me"
                    ? "rgba(156, 108, 254, 1)"
                    : undefined
                }
              />
              <Text style={stylesheet.text6}>Only me</Text>
            </View>
            </View>
            :null}
          </View>

          <View style={stylesheet.view6}>
            <Text style={stylesheet.text5}>
              Who can see my Profile Picture ?
            </Text>

           {!editedD ?
           <Text style={stylesheet.text8}>
           {getDP == "Everyone" ? 
                <FontAwesome6
                color={"rgba(156, 108, 254, 1)"}
                name={"users"}
                size={16}
              />
                :null
              }
              {getDP == "Friends" ? 
                <FontAwesome6
                color={"rgba(156, 108, 254, 1)"}
                name={"user-group"}
                size={16}
              />
                :null
              }
              {getDP == "Only me" ? 
                <FontAwesome6
                color={"rgba(156, 108, 254, 1)"}
                name={"user-lock"}
                size={16}
              />
                :null
              }
           &nbsp;&nbsp; {getDP}
         </Text>
           :null
          }
            

            <Pressable
              onPress={() => {
                setEditedD(!editedD);
              }}
            >
              <Text style={stylesheet.text9}>
                <FontAwesome6
                  color={"black"}
                  name={"pen-to-square"}
                  size={18}
                />
              </Text>
            </Pressable>

            {editedD ? 
            
           

          <View>
            <View style={stylesheet.section}>
              <Checkbox
                style={stylesheet.checkbox}
                value={selectedOptionDp === "Everyone"}
                onValueChange={() => setSelectedOptionDp("Everyone")}
                color={
                  selectedOptionDp === "Everyone"
                    ? "rgba(156, 108, 254, 1)"
                    : undefined
                }
              />
              <Text style={stylesheet.text6}>Everyone</Text>
            </View>

            <View style={stylesheet.section}>
              <Checkbox
                style={stylesheet.checkbox}
                value={selectedOptionDp === "Friends"}
                onValueChange={() => setSelectedOptionDp("Friends")}
                color={
                  selectedOptionDp === "Friends"
                    ? "rgba(156, 108, 254, 1)"
                    : undefined
                }
              />
              <Text style={stylesheet.text6}>Friends</Text>
            </View>

            <View style={stylesheet.section}>
              <Checkbox
                style={stylesheet.checkbox}
                value={selectedOptionDp === "Only me"}
                onValueChange={() => setSelectedOptionDp("Only me")}
                color={
                  selectedOptionDp === "Only me"
                    ? "rgba(156, 108, 254, 1)"
                    : undefined
                }
              />
              <Text style={stylesheet.text6}>Only me</Text>
            </View>
            </View>
             :null
            }


          </View>

          <Pressable style={stylesheet.pressable1} onPress={
            async()=>{
              let mobile_value;
              let online_value;
              let dp_value;

              if(selectedOptionMobile === "Everyone"){
              mobile_value = 1;
              }else if(selectedOptionMobile === "Friends"){
                mobile_value = 2;
              }else if(selectedOptionMobile === "Only me"){
                mobile_value = 3;
              }else{
                mobile_value = 4;
              }

              if(selectedOptionOnline === "Everyone"){
              online_value = 1;
              }else if(selectedOptionOnline === "Friends"){
              online_value = 2;
              }else if(selectedOptionOnline === "Only me"){
              online_value = 3;
              }else{
                online_value = 4;
              }

              if(selectedOptionDp === "Everyone"){
              dp_value = 1;
              }else if(selectedOptionDp === "Friends"){
              dp_value = 2;
              }else if(selectedOptionDp === "Only me"){
              dp_value = 3;
              }else{
              dp_value = 4;
              }

              let userJson = await AsyncStorage.getItem("user");
              let user = JSON.parse(userJson);
              let userId = user.id;

              let response = await fetch("http://192.168.8.186:8080/Web22/UpdateAccount?user="+userId+"&mobile="+mobile_value+"&online="+online_value+"&dp="+dp_value);

              if(response.ok){
                let json = await response.json();

                if(json.success){
                    console.log("Updated");
                    setEditedD(!editedD);
              setEditedM(!editedM);
              setEditedO(!editedO);
                    
                    
                }else{
                    console.log("not success ");
                }
              }else{
                  alert("response not ok");
              }

              





            }}>
            <Text style={stylesheet.text7}>Save Changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    backgroundColor: "rgba(156, 108, 254, 1)",
  },

  scrollView: {
    backgroundColor: "white",
  },

  text1: {
    fontFamily: "Quicksand-Bold",
    fontSize: 28,
    marginVertical: 10,
    marginHorizontal: 20,
    color: "white",
  },
  view2: {
    width: "100%",

    marginTop: 50,
  },
  imageView: {
    width: 200,
    height: 200,
    alignSelf: "center",
    backgroundColor: "rgba(230, 224, 255, 1)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  userImageLetters: {
    fontFamily: "Quicksand-Bold",
    fontSize: 70,
    color: "rgba(156, 108, 254, 1)",
  },
  camera: {
    position: "absolute",
    marginTop: 150,
    marginLeft: 250,
  },
  view4: {
    marginHorizontal: 20,
    marginVertical: 50,
    rowGap: 10,
    backgroundColor: "rgba(230, 224, 255, 1)",
    padding: 20,
    borderRadius: 15,
  },
  text2: {
    fontFamily: "Quicksand-Bold",
    fontSize: 16,
  },
  text3: {
    fontFamily: "Quicksand-Bold",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 10,
  },

  view5: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  text4: {
    fontFamily: "Quicksand-Bold",
    fontSize: 20,
    color: "rgba(156, 108, 254, 1)",
  },
  text5: {
    fontFamily: "Quicksand-Bold",
    fontSize: 16,
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    margin: 8,
  },

  text6: {
    fontFamily: "Quicksand-Light",
    fontSize: 15,
  },
  text8: {
    fontFamily: "Quicksand-Light",
    fontSize: 15,
    marginLeft: 20,
    marginVertical: 10,
  },
  text9: {
    alignSelf: "flex-end",
  },

  view6: {
    backgroundColor: "rgba(230, 224, 255, 1)",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  pressable1: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(156, 108, 254, 1)",
    borderRadius: 15,
    marginVertical: 20,
    alignSelf: "flex-end",
  },
  text7: {
    color: "white",
    fontFamily: "Quicksand-Bold",
    fontSize: 16,
  },
  signOutView:{
    width:100,
    height:50,
    marginTop:10,
    alignSelf:"flex-end",
    justifyContent:"center",
    alignItems:"center"
  },
  text10:{
    fontFamily:"Quicksand-Regular",
    marginBottom:8

  }
});
