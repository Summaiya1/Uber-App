import React from "react";
import {View,Text,Button} from "react-native";

export default function TripDetails({navigation})
{
   return(
     <View>
     <Button title="Back" onPress={() => navigation.goBack()} />
        <Text>Trip Details</Text>
     </View>);
}