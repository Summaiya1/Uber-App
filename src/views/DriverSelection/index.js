import React, { useEffect, useState } from "react";
import {
  HStack,
  Heading,
  Spinner,
  Center,
  NativeBaseProvider,
  Text,
} from "native-base";
import { View,StyleSheet, Dimensions} from "react-native";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import MapView, { Marker } from "react-native-maps";
const db = getFirestore();

export default function DriverSelection({ navigation, route }) {
  const [status, setStatus] = useState();
  const [ride , setRide] = useState({});
  const [location, setLocation] = useState({});
  const id = route.params.id;
  const driverId = route.params.riderId;
  console.log(id);

  useEffect(() => {
    onSnapshot(
      doc(db, "Rides", id),
      { includeMetadataChanges: true },
      (doc) => {
        setStatus(doc.data().status);
        setRide(doc.data());
        console.log(doc.data());
      }
    );
    onSnapshot(
        doc(db, "Driver",driverId),
        { includeMetadataChanges: true },
        (doc) => {
          // setStatus(doc.data().status);
         setLocation({...doc.data()});
         console.log({...doc.data()})
  
        }
      )
  
  }, []);

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        {status === "pending" && (
          <HStack space={2} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" size="lg" color="black"/>
            <Heading color="black" fontSize="md">
              Confirming your ride
            </Heading>
          </HStack>
        )}

        {status === "accepted" && (
            <View style={styles.container}>
            <Text>ride started, Tracking your rider</Text>
            <MapView
              region={{
                latitude: location.latitude || 24.907636522606577,
                longitude: location.longitude || 67.11521435271561,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0021,
              }}
              style={styles.map}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude || 24.907636522606577,
                  longitude: location.longitude || 67.11521435271561,
                }}
                title={location.name}
              />
            </MapView>
    
        </View>
        )}
      </Center>
    </NativeBaseProvider>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height * 0.6,
    },
  });