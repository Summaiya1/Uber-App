import React from "react";
import {View,Text,Button} from "react-native";

export default function YourTrips({navigation})
{ return(
     <View>
        <Text>Your Trips</Text>
        <Button
        title="Go to Details"
        onPress={() => navigation.navigate('TripDetails')}
      />
     </View>
);
}