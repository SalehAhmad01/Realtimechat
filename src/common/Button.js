import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'


function Button({title , onPress}) {
  return (
    <TouchableOpacity style={{ backgroundColor: '#0e0e0e',
      borderRadius: 26,
      heigth: 52,
      justifyContent:'center',
      alignItems:'center',
      marginTop:24,
        width: 370,         
    }}
    onPress={onPress}
    >
       
      <Text style={{ color: 'white', fontSize: 18, paddingVertical:14, fontWeight:'bold'}}>
        {title}
        </Text>
    </TouchableOpacity>
)}

export default Button