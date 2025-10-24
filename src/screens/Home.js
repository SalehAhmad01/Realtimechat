import { View, Text, TouchableOpacity , Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// Importing Screens
import Friends from './Friends';
import Requests from './Requests';
import Profile from './Profile';
import useGlobal from '../core/global';




const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {

  const socketConnect = useGlobal((state) => state.socketConnect);
  const socketClose = useGlobal((state) => state.socketClose);




  useEffect(() => {
    socketConnect();
    return () => {
      socketClose();
    }
  }, []);

   useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
   } );
}, []);


 return (
  <Tab.Navigator
    screenOptions={({ route }) => ({
     headerLeft: () => (
      <View>
        <Image
      source={require('../assets/default.jpg')}   // ✅ fixed path
      style={{ width: 30, height: 30, marginLeft: 16 , borderRadius: 50 ,
         backgroundColor:'#0E0E0E' }}
    />
      </View>
      )
,
     headerRight: () => (
        <TouchableOpacity>
          <FontAwesomeIcon icon='magnifying-glass' size={22} color='#404040' style={{marginRight:16}}/>
        </TouchableOpacity> 
     )
,


      tabBarIcon: ({ focused, color, size }) => {
        const icons = {
          Profile: 'user',
          Friends: 'inbox',
          Requests: 'bell',
        };
        const icon = icons[route.name]; // ✅ fixed: use a different variable
        return (
          <FontAwesomeIcon icon={icon} size={28} color={color} />
        );
      },
      tabBarActiveTintColor: '#202020',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Friends" component={Friends} />
    <Tab.Screen name="Requests" component={Requests} />
  </Tab.Navigator>
)
}

export default Home