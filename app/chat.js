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
  TextInput,
} from "react-native";
import mainstylesheet from "./stylestheams";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

SplashScreen.preventAutoHideAsync();

export default function chat() {
  const item = useLocalSearchParams();

  const [getChatArray, setChatArray] = useState([]);
  const [getChatText, setChatText] = useState("");
  const [getImage, setImage] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [pressedMsgId, setPressedMsgId] = useState(false);

  const [loaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
  });

  useEffect(() => {
    async function fetchChatArray() {
      let userJson = await AsyncStorage.getItem("user");
      let user = JSON.parse(userJson);

      let response = await fetch("http://192.168.8.186:8080/Web22/LoadChat?logged_user_id=" +
          user.id +
          "&other_user_id=" +
          item.other_user_id
      );
      if (response.ok) {
        let chatArray = await response.json();
        console.log(chatArray);
        setChatArray(chatArray);
      }
    }
    fetchChatArray();
    setInterval(() => {
      fetchChatArray();
    }, 5000);
  }, []);

  const renderChatItem = ({ item }) => {
    if (item.dateLabel) {
      return <Text style={stylesheet.dateText}>{item.dateLabel}</Text>;
    }

    return (




      <Pressable
        style={
          item.side == "right" ? stylesheet.leftView : stylesheet.rightView
        }
        onPress={() => {
          setPressedMsgId(pressedMsgId === item.id ? null : item.id);
        }}
      >
        {item.action != "unsend" && item.side == "right" && pressedMsgId === item.id && (
          <Pressable
            style={stylesheet.deleteIconView}
            onPress={async () => {
              let chatId = item.id;

              let response = await fetch("http://192.168.8.186:8080/Web22/DeleteChat?id=" + chatId
              );
              if (response.ok) {
                let json = await response.json();

                if (json.success) {
                  console.log("Message set");
                } else {
                  console.log("Message not set");
                }
              }
            }}
          >
            <FontAwesome6 color={"white"} name={"trash-can"} size={16} />
          </Pressable>
        )}




        {item.action == "unsend" ? (
          <Text style={item.side == "right" ? stylesheet.text3_deleted : stylesheet.text3_1_deteled}>
          {item.side == "right" ? (
            <>
              <FontAwesome6 color={"rgb(138,140,136)"} name={"circle-question"} size={14} /> 
              {" You deleted this message"} 
            </>
          ) : (
            <>
              <FontAwesome6 color={"rgb(176,178,175)"} name={"circle-question"} size={14} /> 
              {" This message was deleted"} 
            </>
          )}
        </Text>
        
        ) : (
          item.type == "text" ? (
            <Text style={item.side == "right" ? stylesheet.text3 : stylesheet.text3_1}>
              {item.message}
            </Text>
          ) : (
            <Image
              source={"http://192.168.8.186:8080/Web22/chatImages/" + item.imagePath}
              style={stylesheet.loadedImage}
              contentFit={"contain"}
            />
          )
        )}




        {item.side == "right" ? (
          <View style={stylesheet.leftStatusView}>
            <Text style={stylesheet.text4}>{item.chatTime}</Text>
            <FontAwesome6
              color={"rgba(156, 108, 254, 1)"}
              name={item.status == 2 ? "check" : "check-double"}
              size={12}
            />
          </View>
        ) : (
          <Text style={stylesheet.text5}>{item.chatTime}</Text>
        )}
      </Pressable>
    );
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={[stylesheet.view1, mainstylesheet.chatBackground]}>
      <View style={[stylesheet.view2, mainstylesheet.homeviews]}>

       

        <View style={stylesheet.profileimg}>
                  {item.avatar_image_found==true && item.item.dp_visibility !=2 ?
                  <Image source={"http://192.168.8.186:8080/Web22/UserImages/"+item.other_user_mobile+".png"} contentFit={"contain"} style={stylesheet.userImage} />
                  :
                  <Text style={[stylesheet.chatImageLetters,mainstylesheet.textColor]}>{item.other_user_avatar_letters}</Text>
                }
                    
                  </View>

        <View>
          <Text style={stylesheet.text1}>{item.other_user_name}</Text>
          <Text style={stylesheet.text2}>
            {item.online_visibility != 2 ? 
              (item.other_user_status_id == 1 ? "Offline" : "Online") 
              : 
              null
            }
          </Text>

        </View>

        <View style={stylesheet.viewIcon}>
          <FontAwesome6
            color={"rgba(156, 108, 254, 1)"}
            name={"ellipsis-vertical"}
            size={20}
          />
        </View>
      </View>

      <View style={[stylesheet.view3]}>
        <FlashList
          data={getChatArray}
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={50} 
          
        />

        {/* <Text style={stylesheet.dateText}>2026 March 12</Text>

        <View style={stylesheet.leftView}>
          <Text style={stylesheet.text3}>Hello Nishan Kohomada </Text>
          <View style={stylesheet.leftStatusView}>
            <Text style={stylesheet.text4}>12:29 AM</Text>
            <FontAwesome6
              color={"rgba(156, 108, 254, 1)"}
              name={"check"}
              size={12}
            />
          </View>
        </View>

        <View style={stylesheet.rightView}>
          <Text style={stylesheet.text3_1}>Font Awesome is the internet's icon</Text>
          <Text style={stylesheet.text5}>12:29 AM</Text>
            
        </View> */}

        <View style={pressed ? stylesheet.pressedImgView : stylesheet.imgView}>
          <Image
            source={getImage}
            style={stylesheet.sendImage}
            contentFit={"contain"}
          />
        </View>
      </View>

      <View style={[stylesheet.view4, mainstylesheet.homeviews]}>
        {pressed ? (
          <View style={stylesheet.removeEnput1}></View>
        ) : (
          <TextInput
            style={stylesheet.input1}
            value={getChatText}
            onChangeText={(text) => {
              setChatText(text);
            }}
          />
        )}

        {pressed ? (
          <Pressable
            style={stylesheet.pressable2}
            onPress={() => {
              setPressed(!pressed);
            }}
          >
            <FontAwesome6
              color={"rgba(156, 108, 254, 1)"}
              name={"arrow-left-long"}
              size={26}
            />
          </Pressable>
        ) : (
          <Pressable
            style={stylesheet.pressable2}
            onPress={async () => {
              let result = await ImagePicker.launchImageLibraryAsync();
              setPressed(!pressed);

              if (!result.canceled) {
                setImage(result.assets[0].uri);
              }
            }}
          >
            <FontAwesome6
              color={"rgba(156, 108, 254, 1)"}
              name={"camera"}
              size={26}
            />
          </Pressable>
        )}

        <Pressable
          style={stylesheet.pressable1}
          onPress={async () => {
            let userJson = await AsyncStorage.getItem("user");
            let user = JSON.parse(userJson);
            let userId = user.id;
            let otherUserId = item.other_user_id;

            if (pressed) {
              let formData = new FormData();
              formData.append("logged_user_id", userId);
              formData.append("other_user_id", otherUserId);

              if (getImage != null) {
                formData.append("chatImg", {
                  name: "chat.png",
                  type: "image/png", //type ekath Aniva denna oone
                  uri: getImage,
                });
              }

              let response = await fetch("http://192.168.8.186:8080/Web22/SendChatImage",
                {
                  method: "POST",
                  body: formData,
                }
              );

              if (response.ok) {
                let json = await response.json();
                if (json.success) {
                  setPressed(!pressed);
                } else {
                  console.log("not send img chat");
                }
              }
            } else {
              if (getChatText.length == 0) {
                alert("Empty text");
              } else {
                let response = await fetch("http://192.168.8.186:8080/Web22/SendChat?logged_user_id=" +
                    userId +
                    "&other_user_id=" +
                    otherUserId +
                    "&message=" +
                    getChatText
                );
                if (response.ok) {
                  let json = await response.json();

                  if (json.success) {
                    console.log("Message sent");
                    setChatText("");
                  } else {
                    console.log("not success - no sent msg");
                  }
                } else {
                  alert("send msg response not ok");
                }
              }
            }
          }}
        >
          <FontAwesome6 color={"white"} name={"paper-plane"} size={18} />
        </Pressable>
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
  },

  view2: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
  },
  profileimg: {
    width: 70,
    height: 70,
    backgroundColor: "rgba(230, 224, 255, 1)",
    borderRadius: 50,
    justifyContent:"center",
    alignItems:"center",
  },
  userImage:{
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  chatImageLetters:{
    fontFamily: "Quicksand-Bold",
    fontSize:26,
  },
  text1: {
    fontFamily: "Quicksand-Bold",
    fontSize: 19,
  },
  text2: {
    fontFamily: "Quicksand-Regular",
    color: "green",
  },
  viewIcon: {
    flex: 1,
    alignItems: "flex-end",
  },
  view3: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(230, 224, 255, 1)",
  },
  view4: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 15,
  },
  input1: {
    width: "70%",
    height: 40,
    borderRadius: 15,
    backgroundColor: "rgba(217, 217, 217, 1)",
    fontSize: 16,
    fontFamily: "Quicksand-Regular",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  removeEnput1: {
    width: "70%",
    height: 40,
    marginVertical: 10,
  },
  pressable1: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(156, 108, 254, 1)",
    borderRadius: 50,
    marginVertical: 10,
  },
  pressable2: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: {
    fontFamily: "Quicksand-Light",
    alignSelf: "center",
  },

  rightView: {
    justifyContent: "center",
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "rgba(156, 108, 254, 1)",
  },
  text5: {
    fontFamily: "Quicksand-Regular",
    fontSize: 10,
    alignSelf: "flex-end",
    color: "white",
  },

  leftView: {
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  leftStatusView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    columnGap: 7,
  },
  text3: {
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
  },
  text3_1: {
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
    color: "white",
    
  },
  text3_deleted: {
    
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
    color:"rgb(138,140,136)"
  },
  text3_1_deteled: {
    
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
    color: "rgb(176,178,175)",
  },
  text4: {
    fontFamily: "Quicksand-Regular",
    fontSize: 10,
  },

  imgView: {
    display: "none",
    width: "100%",
    height: 330,
    paddingVertical: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  pressedImgView: {
    width: "100%",
    height: 330,
    paddingVertical: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  sendImage: {
    width: "100%",
    height: 300,
  },
  loadedImage: {
    width: 250,
    height: 250,
    borderRadius: 15,
  },
  deleteIconView: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  deleteIconView2: {
    display: "none",
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});
