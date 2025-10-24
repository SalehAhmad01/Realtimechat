import { View, Text , Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import useGlobal from '../core/global'
import * as ImagePicker from 'expo-image-picker';
import  { useState } from 'react';
import { faPencil, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';




function ProfileImage() {
  const [image, setImage] = useState(require('../assets/default.jpg'));

  const pickImage = async () => {
    // ✅ Ask for permission first
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow photo access to choose a profile picture.');
      return;
    }

    // ✅ Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      quality: 1,
    });

    // ✅ Log response for debugging
    log('launchImageLibrary', result);

    if (!result.canceled) {
      const file = result.assets[0];
      setImage({ uri: file.uri }); // show the selected image
      // uploadThumbnail(file) // optional — can call upload or save function
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={{ marginBottom: 20 }}>
      <Image
        source={image}
        style={{
          width: 180,
          height: 180,
          marginLeft: 16,
          borderRadius: 90,
          backgroundColor: '#0E0E0E',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 16,
          backgroundColor: '#202020',
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: 'white',
        }}
      >
        <FontAwesomeIcon icon={faPencil} size={20} color="#d0d0d0" />
      </View>
    </TouchableOpacity>
  );
}
// function ProfileImage(){
//   return(
//     <TouchableOpacity 
//     onPress={()=>
//       launch
//     }
//     style={{marginBottom:20}}
//     >
//     <Image
//                 source={require('../assets/default.jpg')}   // ✅ fixed path
//                 style={{ width: 180, height: 180, marginLeft: 16 , borderRadius: 90 ,
//                    backgroundColor:'#0E0E0E' , }}
//               />
//               <View
//               style={{
//                 position:'absolute',
//                 bottom:0,
//                 right:16,
//                 backgroundColor:'#202020',
//                 width:40,
//                 height:40,
//                 borderRadius:20,
//                 alignItems:'center',
//                 justifyContent:'center',
//                 borderWidth:2,
//                 borderColor:'white'
//               }}
//                 >
//                 <FontAwesomeIcon
//                  icon='pencil'
//                  size = {20}
//                  color='#d0d0d0'
//                 />
//               </View>
//     </TouchableOpacity>
//   )
// }

function ProfileLogout(){
  const logout = useGlobal(state => state.logout);
  return(
    <TouchableOpacity onPress={logout}
    style={{
      flexDirection: 'row',
      height:  52,
      borderRadius:26,
      alignItems:'center',
      paddingHorizontal:12,
      backgroundColor:'#202020',
      marginTop:40
    }}>
      <FontAwesomeIcon
      icon='right-from-bracket'
      size={20}
      color='#d0d0d0'
      style={{
        marginRight:12
      }}
/>
      <Text 
      style={{
        fontWeight:'bold',
        color: '#d0d0d0'
      }}>
        logout
      </Text>

    </TouchableOpacity>
  )
}
const Profile = () => {
  const user = useGlobal(state => state.user )
  const logout = useGlobal(state => state.logout )
  return (
    <View   style={{
      flex: 1,
      alignItems:'center',
      padding:100
    }}>
    <ProfileImage/>
      <Text
          style={{
              alignItems: 'center',
              color:'#030303',
              fontWeight:'bold',
              margin: 6

          }}
          >@{user.username}
          </Text>
          <Text
          style={{

          }}
          >{user.name}
          </Text>
          <ProfileLogout/>
    </View>
  )
}

export default Profile