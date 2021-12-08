import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useSelector } from 'react-redux';


// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    Dashboard,
    Destination,
    CarSelection,
    YourTrips,
    TripDetails,
    Login,
    SignUp,
    Logout,
    DriverSelection
  } from '../views';
  
  const Stack = createNativeStackNavigator()
  const Drawer = createDrawerNavigator()
//   const Tab = createMaterialTopTabNavigator()


export default function MainNavigator() {
    // const [user, setUser] = useState(true)
    
    const user = useSelector(state => state.userReducer.user)
    return (
      <NavigationContainer>
        {user ?
          <MainStack />
          :
          <AuthStack />
        }
      </NavigationContainer>
    );
  }
  
  function MainStack() {
    return <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardStack} />
      <Drawer.Screen name="Your Trips" component={TripStack} />
      <Drawer.Screen name="Logout" component={Logout}/>
    </Drawer.Navigator>
  }
  
  function AuthStack() {
    return <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  }
  
  function DashboardStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Dashboard" component={WhatsappTabs} /> */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Destination" component={Destination} />
        <Stack.Screen name="CarSelection" component={CarSelection} />
        <Stack.Screen name="DriverSelection" component={DriverSelection} />
      </Stack.Navigator>
    )
  }
  
  function TripStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="YourTrips" component={YourTrips} />
        <Stack.Screen name="TripDetails" component={TripDetails} />
      </Stack.Navigator>
    )
  }
  
  
  /*
    1. Stack Navigator
    2.
  
  */