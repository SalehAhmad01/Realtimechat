import { View, Text, TextInput } from 'react-native'




function Input({title, value, setValue, error, setError, secureTextEntry=false}) {
  return (
    <View>
      <Text style= {{color: error ? 'red' : '#70747a',   paddingLeft:16 , marginVertical: 6}}>
        {error ? error : title}
        </Text> 
      <TextInput
      secureTextEntry={secureTextEntry}
      style={{ backgroundColor: '#e1e2e4', 
        borderRadius: 26,
        borderWidth: 1,
        borderColor: error ? 'red' : '#transparent',
        paddingHorizontal:16,
        height:50,
        fontSize:16,
        width: 370,         
        height: 50,
        
      }}
      onChangeText={(text) => {
  setValue(text)
  if (error) {
    setError('')
  }
}}
 
      />
    </View>
  )
}


export default Input