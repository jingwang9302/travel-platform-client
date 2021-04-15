import React, { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsUserIn } from "../../redux/actions/travelgroupAction";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { USER_SERVICE, GROUP_SERVICE, GROUP_BASE_URL } from "../../config/urls";
import Loader from "../../components/Loader";
import { Icon, Input, Image, Button } from "react-native-elements";
import { set } from "react-native-reanimated";
import LoginAlertScreen from "../user/LoginAlertScreen";
import { Item } from "react-navigation-header-buttons";

const EditGroupScreen = ({ navigation, route }) => {
  const { groupName, groupImage, _id } = route.params;
  const [selectedImage, setSelectedImage] = useState({
    localUri: `${GROUP_BASE_URL}/uploads/${groupImage}`,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userProfile = useSelector((state) => state.user);
  const [newGroupName, setNewGroupName] = useState(groupName);
  const [newGroupNameInputError, setNewGroupNameInputError] = useState("");

  const groupNameInputRef = createRef();
  const oldUri = `${GROUP_BASE_URL}/uploads/${groupImage}`;

  if (!userProfile.isLogin) {
    return <LoginAlertScreen />;
  }

  const createNewGroup = () => {
    //for test
    // navigation.navigate("GroupDetail", {
    //   groupId: 10,
    //   //groupName: ,
    // });
    setNewGroupNameInputError("");

    if (!newGroupName) {
      //setErrorMessage("please add a group name");
      setNewGroupNameInputError("please add a group name");
      //console.log(errorMessage);
      return;
    }

    setLoading(true);
    axios({
      method: "PUT",
      url: GROUP_SERVICE + `updateinfo/${userProfile.id}/${_id}`,
      data: {
        groupName: newGroupName,
      },
    })
      .then(function (res) {
        // getGroupsUserIn(userProfile.id);
        const { success } = res.data;
        console.log(success);
        if (
          selectedImage.localUri &&
          selectedImage.localUri !== "" &&
          selectedImage.localUri !== oldUri
        ) {
          console.log("before upload image, groupId is:");
          console.log(_id);
          upLoadImage(selectedImage.localUri, _id);
        }
        setLoading(false);
        navigation.goBack();

        // navigation.navigate("GroupDetail", {
        //   groupId: res.data.data._id,
        // });
      })
      .catch(function (error) {
        setLoading(false);
        setErrorMessage(error.response.data.error);
        Alert.alert("Edition Failed", error.response.data.error, {
          onPress: () => setErrorMessage(""),
        });

        console.log(error.response.data.error);
      });
  };

  const upLoadImage = (uri, groupId) => {
    //const uri = selectedImage.localUri;
    const uriParts = uri.split(".");
    console.log("uri:");
    console.log(uri);
    //console.log(uriParts);
    const fileType = uriParts[uriParts.length - 1];
    console.log(`file type: ${fileType}`);
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    });

    axios({
      method: "PUT",
      url: GROUP_SERVICE + "updateimage/" + `${userProfile.id}/${groupId}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        const { data } = res.data;
        console.log(`image name is ${data}`);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        // Alert.alert(`${errorMessage}`);
        console.log(error.response.data.error);
        Alert.alert("Edition Failed", error.response.data.error, {
          onPress: () => setErrorMessage(""),
        });
      });
  };

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access images is required");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log("uri is:");
    console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>Create Travelgroup</Text>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <Input
              style={styles.inputStyle}
              onChangeText={(input) => setNewGroupName(input)}
              underlineColorAndroid="#f000"
              placeholder="Input Travelgroup Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              ref={groupNameInputRef}
              errorMessage={newGroupNameInputError}
              blurOnSubmit={false}
              value={newGroupName}
              leftIcon={<Icon name="people" size={24} color="black" />}
              rightIcon={
                <Icon
                  name="close"
                  size={20}
                  onPress={() => {
                    groupNameInputRef.current.clear();
                    setNewGroupName("");
                    setNewGroupNameInputError("");
                    //setErrorMessage("");
                  }}
                />
              }
            />
          </View>

          {/* <View style={styles.SectionStyle}>
            {errorMessage !== "" ? (
              <Text style={styles.errorTextStyle}>{errorMessage}</Text>
            ) : null}
          </View> */}
          <View style={{ alignItems: "center", marginTop: 35 }}>
            <Image
              source={{ uri: selectedImage.localUri }}
              style={{ width: 400, height: 200 }}
              PlaceholderContent={
                <Icon
                  name="add-circle-outline"
                  type="ionicon"
                  size={100}
                  color="grey"
                />
              }
              onPress={openImagePickerAsync}
            />
          </View>
          <Button
            buttonStyle={{ marginHorizontal: 10, borderRadius: 10 }}
            title="submit"
            style={{ marginVertical: 20 }}
            onPress={createNewGroup}
          />
          {/* <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={createNewGroup}
          >
            <Text style={styles.buttonTextStyle}>Submit</Text>
          </TouchableOpacity> */}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    fontSize: 25,
    paddingTop: 15,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,

    marginHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: "#307016",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307016",
    height: 40,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 30,
    marginLeft: 35,
    marginRight: 35,

    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
});

export default EditGroupScreen;