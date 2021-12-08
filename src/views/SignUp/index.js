import  React,{useState} from "react"
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Spinner,
  Icon,
  NativeBaseProvider,
} from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import { useDispatch} from 'react-redux'
import {registerUser} from '../../config/firebase'
import {updateUser} from "../../store/actions/userAction"

export default function SignUp({navigation}) {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [contact,setContact] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [hidePass, setHidePass] = useState(true)
  const dispatch = useDispatch()

  const signUp = async () =>{
    setLoading(true);
        
      
    try{
  
      const userObj =await registerUser({name,email,contact,password});
      console.log(userObj);
      dispatch(updateUser(userObj));
      //navigation.goBack();
      // console.log(user);
      // dispatch(updateUser(user));
     
      
    }
    catch(e)
   {  if (e.code === 'auth/email-already-in-use') {
         alert('That email address is already in use!');
       }
   
       else if (e.code === 'auth/invalid-email') {
         alert('That email address is invalid!');
       }
        console.log(e)
    }
    
  setLoading(false);
  
  }

  return (
    <NativeBaseProvider>
    <Center flex={1} px="3">
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <Heading
        size="lg"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
        fontWeight="semibold"
      >
        Welcome
      </Heading>
      <Heading
        mt="1"
        color="coolGray.600"
        _dark={{
          color: "warmGray.200",
        }}
        fontWeight="medium"
        size="xs"
      >
        Sign up to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input value={name} onChangeText={(text) => setName(text)}/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Contact No</FormControl.Label>
          <Input keyboardType="numeric" maxLength={11} value={contact} onChangeText={(text) => setContact(text)}/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input keyboardType="email-address" value={email} onChangeText={(text) => setEmail(text)}/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input  type={hidePass ? 'password' : 'text'} value={password}
          onChangeText={(text) => setPassword(text)} 
        InputRightElement={
          <Icon
            as={<MaterialIcons name={hidePass ? "visibility-off" : "visibility" }  color="black"
            onPress={() => setHidePass(!hidePass)}/>}
            size={5}
            mr="2"
            color="black"
          />
        }
       
      />
    
        </FormControl>
        {loading? <Spinner color="muted.900" size="lg"/>:
        <Button mt="2" bg="black" onPress={signUp}>
          Sign up
        </Button>}
      </VStack>
    </Box>
    </Center>
    </NativeBaseProvider>
  )
}
