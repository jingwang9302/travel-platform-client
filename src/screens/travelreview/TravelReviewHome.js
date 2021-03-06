import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native';
import {useSelector} from 'react-redux';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Alert } from 'react-native';
import { ListItem, Avatar } from "react-native-elements";
import {GET_FINISHED_TRAVEL_PLANS_BY_USER_ID, GCS_URL, USER_BASIC_PROFILE_BY_USERID_URL} from '../../config/urls';
import axios from "axios";

const TravelReviewHome = ({navigation}) => {
    const userProfile = useSelector(state => state.user);
    const [travelRecords, updateTravelRecords] = useState([]);
    // const [travelMembers, updateTravelMembers] = useState([]);
    
    useEffect(() => {
        fetchTravelRecords();
    }, []);


    /** send request to Service */
    async function fetchTravelRecords(){
        axios({
            method: 'get',
            url: GET_FINISHED_TRAVEL_PLANS_BY_USER_ID + userProfile.id,
            headers: {
                'Authorization': 'Bearer '+ userProfile.token
            }
          })
            .then(function (response) {
                updateTravelRecords(response.data.data);
                // response.data.data[0].travelMembers.forEach(userId => {
                //     fetchTravelMembersInfo(userId);
                // });
            })
            .catch((error) => {
                // console.log();
                Alert.alert(error.response.data.error);
            }
        );
    }


    async function fetchTravelMembersInfo(userId){
        axios({
            method: 'get',
            url: USER_BASIC_PROFILE_BY_USERID_URL + userId,
            headers: {
                'Authorization': 'Bearer '+ userProfile.token
            }
          })
            .then(function (response) {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                Alert.alert("Failed to fetching user profile.");
      });
    }

    return (
        <View style={{flex:1}}>
            <ScrollView>
                <Text style={styles.greetingText}> Hello {userProfile.firstName},</Text>
                <Text style={styles.greetingText}> You have completed {travelRecords.length} trip(s)</Text>
                <View style={styles.tripItem}>
                    {
                        travelRecords.map((item, i) => (
                            <ListItem key={i} bottomDivider onPress={()=>navigation.navigate("PlanDetail", {planId: item._id})}>
                                <Avatar source={{uri: GCS_URL + item.image}} />
                                <ListItem.Content>
                                    <ListItem.Title>{item.planName}</ListItem.Title>
                                    <ListItem.Subtitle>{item.planDescription}</ListItem.Subtitle>
                                    <ListItem.Subtitle>{item.startDate}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    greetingText:{
      fontWeight:'bold',
      marginTop:10,
      marginBottom:10,
    },
    tripTitleText:{
      color:'red',
      paddingBottom:5,
    },
    tripItem:{
      paddingTop:10,
      paddingBottom:10,
      marginBottom:0
    }
});

export default TravelReviewHome;