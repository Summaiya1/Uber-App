import React ,  { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';

export default function Camera()
{
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
   

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
  
return(
    <view></view>
//     <View  style={{
//     flex: 1,
//     backgroundColor: 'transparent',
//     justifyContent: 'flex-end',
//     alignItems:'center'
//   }}>
    
//   <TouchableOpacity 
//   onPress={ async() => {
//       if(!recording){
//       setRecording(true)
//       let video = await cameraRef.recordAsync();
//       console.log('video', video);
//       } else {
//       setRecording(false)
//       cameraRef.stopRecording()}
//       }}>
//     <View style={{ 
//        borderWidth: 2,
//        borderRadius:25,
//        borderColor:  recording ? "red":'blue',
//        height: 70,
//        width:70,
//        display: 'flex',
//        justifyContent: 'center',
//        alignItems: 'center'}} >
//       <View style={{
//          borderWidth: 2,
//          borderRadius:25,
//          borderColor:'red',
//          height: 60,
//          width:60,
//          backgroundColor: 'red'}} >
//       </View>
//     </View>
//   </TouchableOpacity>
//   </View>
 
  
  
    );


}