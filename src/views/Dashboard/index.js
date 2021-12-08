import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  Input,
  Icon,
  Button,
  NativeBaseProvider,
  Center,
  FlatList,
  Box,
  VStack,
  Text,
  Pressable,
  AlertDialog
} from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import {useSelector } from 'react-redux';

import {updatelocation} from "../../config/firebase";

export default function Dashboard({ route,navigation }) {

   console.log('params' ,route.params);
  const [location, setLocation] = useState({});
  const [value, setValue] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [result, setResult] = useState();
  const [pickup, setPickup] = useState();
  const [isOpen, setIsOpen] = useState(false)
  const user = useSelector(state => state.userReducer.user)
  const onClose = () => setIsOpen(false)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); // get current location coordinates
      setLocation(location.coords);
   
      await updatelocation(user.id,location.coords.latitude,location.coords.longitude);
      
      

      const options = {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 100,
         distanceInterval: 1
      };

      Location.watchPositionAsync(options, async (location) => {
        setLocation(location.coords);
        // console.log(user.id,location.coords.latitude,location.coords.longitude);
        await updatelocation(user.id,location.coords.latitude,location.coords.longitude);
      });

    })();
  }, []);

 

  const { latitude, longitude,name} = location;
  
  const handle = (text) => {
    setValue(text);
    setResult();
  };
  const currentLocation = async () =>{
    let loc = await Location.getCurrentPositionAsync({}); // get current location coordinates
    setLocation(loc.coords);
    let {latitude,longitude} = loc.coords;
    let temp={};
    temp.latitude= latitude;
    temp.longitude= longitude;
    setPickup(temp);
    setIsOpen(true);
    // console.log(loc.coords);
  }

  const pickupSelection = (item) =>{
   const temp = {};
   temp.latitude = item["geocodes"]["main"]["latitude"]
   temp.longitude= item["geocodes"]["main"]["longitude"]
   temp.name=item["name"]
   temp.address = item["location"].address + ' ' + item["location"].locality
   setPickup(temp)
   setIsOpen(true)
   setLocation(item["geocodes"]["main"]);
   setResult();
   
  //  console.log(temp);
  }

  const searchLocation = async () => {
    const { latitude, longitude ,name} = location;
    const res = await fetch(
      `https://api.foursquare.com/v3/places/search?query=${value}&ll=${latitude},${longitude}&radius=600&limit=15`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "fsq3EJNEcyb9GmLWEC+izjE0RmlbJ2yZuuP/pOmFOhTdqFA=",
        },
      }
    );
    const response = await res.json();
    // console.log(response);
    setResult(response["results"]);
    const re = response["results"]; // this will be array
    console.log(
      re[0],
      re[0].location.address,
      re[0].location.locality,
      re[0].name,
      re[0].geocodes.main.latitude,
      re[0].geocodes.main.longitude
    );
  };


  return (
    <NativeBaseProvider>
      <Input
        size="xl"
        h="60px"
        InputLeftElement={
          <Icon
            as={<FontAwesome5 name="search-location" />}
            size={18}
            ml="3"
            color="dark.50"
          />
        }
        isFullWidth={true}
        placeholder="Search Pickup"
        InputRightElement={
          <Button
            size="md"
            rounded="none"
            w="1/4"
            h="full"
            bg="black"
            onPress={searchLocation}
          >
            search
          </Button> 
        }
        mb="6"
        onChangeText={handle}
      />
      {result && (
        <FlatList
          data={result}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                pickupSelection(item);
              }}
            >
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Box
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: "gray.600",
                    }}
                    borderColor="coolGray.200"
                    pl="4"
                    pr="5"
                    py="2"
                    bg={
                      isPressed ? "dark.600" : isHovered ? "dark.600" : "white"
                    }
                  >
                    <VStack>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item["name"]}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {item["location"].address} {item["location"].locality}
                      </Text>
                    </VStack>
                  </Box>
                );
              }}
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
          zIndex={2}
          position="absolute"
          mt="16"
          width="100%"
        />
      )}

      <MapView
        region={{
          latitude: latitude || 24.907636522606577,
          longitude: longitude || 67.11521435271561,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: latitude || 24.907636522606577,
            longitude: longitude || 67.11521435271561,
          }}
        />
      </MapView>
     

    <TouchableOpacity
    style={{alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
     margin:10}}
    onPress={currentLocation}
  >
    <Text>select current location as Pickup</Text>
  </TouchableOpacity>
    {pickup && <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Body>
            pickup selected :
            name : {pickup.name} , address : {pickup.address}
            </AlertDialog.Body>
          
          </AlertDialog.Content>
        </AlertDialog>}
   
     {pickup && <Button size="md" variant="white" bg="black" w="70%" h="12" marginLeft="16" marginTop="7"
     onPress={() => navigation.navigate('Destination',{pickup})}>
    choose destination
    </Button>}
    

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

   

// <TouchableOpacity>
// <Button size="sm" variant="white" bg="grey" w="70%" h="12" marginLeft="16" marginTop="5"
//  onPress={currentLocation}>
// select current location as Pickup
// </Button>
// </TouchableOpacity>

// {pickup && <Alert
//   w="100%"
//   variant="white"
//   colorScheme="success"
//   status="success"
// >
// <Text>name : {pickup.name} , address : {pickup.address} </Text>
// </Alert>}
