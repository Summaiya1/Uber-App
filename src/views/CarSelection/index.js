import React, { useEffect, useState } from "react";
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Pressable,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base";
import {useSelector } from 'react-redux';
import { View } from "react-native";
import { getDrivers,requestRide} from "../../config/firebase";


export default function CarSelection({ route, navigation }) {
  // console.log("params", route.params);
  const [distance, setDistance] = useState();
  const user = useSelector(state => state.userReducer.user)

  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Rs " + distance * 100,
      recentText: "Auto",
      avatarUrl:
        "https://image.shutterstock.com/image-illustration/tuk-flat-cartoon-illustration-asian-260nw-1481300849.jpg",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb2def",
      fullName: "Rs " + distance * 150,
      recentText: "Mini",
      avatarUrl: "https://i.dawn.com/primary/2019/03/5ca059547eed6.jpg",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb2frg",
      fullName: "Rs " + distance * 200,
      recentText: "Uber Go",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTodsiuWLFCnoRMxWFv2yp0a33__QYxTwky-oCh_TFV7riNVBD7RO4ktLeKM_kua5hdeAQ&usqp=C",
    },
  ];
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }
  useEffect(() => {
    const { destination, pickup } = route.params;
   

    const result = calcCrow(
      destination.latitude,
      destination.longitude,
      pickup.latitude,
      pickup.longitude
    ).toFixed(1);
    console.log(result);
    setDistance(result);
  }, []);

  const carSelection = async (name,fare) => {
    const { destination, pickup } = route.params;
     console.log(name);
    const drivers = await getDrivers();
    const distance = [];
    const rides = [];
    console.log(drivers);
    for (let i = 0; i < drivers.length; i++) {
      const {latitude,longitude} = drivers[i];
      console.log(latitude,
        longitude,
        pickup.latitude,
        pickup.longitude)

      const result = calcCrow(
        latitude,
        longitude,
        pickup.latitude,
        pickup.longitude
      ).toFixed(1);
      distance.push(result);
      rides.push({distance:result,...drivers[i]});
    }
    console.log(distance);
    const min = Math.min(...distance);
    console.log(min);
    let rider = rides.find(item => item.distance == min);
    console.log("finally" , rider);

    const request = {
      driverId : rider.id,
      driverLocation :{
        latitude : rider.latitude,
        longitude : rider.longitude
      },
      user : user,
      userPickup : pickup,
      userDestination : destination,
      car : name ,
      status: 'pending',
      fare : fare
    }
    console.log(request);
    const riderId = rider.id;
    const id = await requestRide(request);
    navigation.navigate("DriverSelection",{id,riderId});

  };

  return (
    <NativeBaseProvider>
      <Heading fontSize="xl" p="4" pb="3">
        Car Selection , Distance : {distance} km
      </Heading>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              carSelection(item.recentText,item.fullName);
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
                  bg={isPressed ? "dark.600" : isHovered ? "dark.600" : "white"}
                >
                  <HStack space={3} justifyContent="space-between">
                    <Avatar
                      size="48px"
                      source={{
                        uri: item.avatarUrl,
                      }}
                    />
                    <VStack>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item.fullName}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {item.recentText}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              );
            }}
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </NativeBaseProvider>
  );
}

// alert(calcCrow(59.3293371,13.4877472,59.3225525,13.4619422).toFixed(1));

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
