// import { StatusBar } from 'expo-status-bar';
// import { ScrollView, Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

// export default function App() {
//   const nama = 'galih'
//   return (
//     <ScrollView styles={{ padding: 100 }}>
//       <View style={{ borderWidth: 1, height: 1500, }}>
//         <Text style={{ color: '#000' }}>{nama}, Open up App.js to start working on your app!</Text>
//         <StatusBar style="auto" />
//         <TextInput styles={styles.textInput} placeholder='Masukkan Nama Anda'/>
//         <Button title='Press me!' onPress={() => alert('Hello World')}/>
//         <TouchableOpacity onPress={() => console.log("test touchable")}>
//           <Text>Touchable</Text>
//         </TouchableOpacity>
//         <Image source={require("./assets/favicon.png")}/>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//   },
//   textInput: {
//     color: '#fff',
//   },
//   button: {
//     color: '#000',
//   },
// });

// import React from 'react';
// import { View, Text } from 'react-native';

// const FunctionalComponent = (props) => {
//   return (
//     <View>
//       <Text>Halo, ini adalah contoh komponen fungsional?</Text>
//     </View>
//   );
// };

// export default FunctionalComponent;

// import React, { Component } from 'react';
// import { View, Text } from 'react-native';

// class ClassComponent extends Component {
//   render() {
//     return (
//       <View>
//         <Text>Halo, ini adalah contoh komponen kelassss.</Text>
//       </View>
//     );
//   }
// }

// export default ClassComponent;

// import React, { useState } from 'react';
// import { View, Text, Button, TouchableOpacity } from 'react-native';

// const BasicStateComponent = () => {
//   const [count, setCount1] = useState(0)

//   const incrementCount = () => {
//     setCount1(count - 1)
//   };

//   const setIncrement = () => {
//     setCount1(count + 1)
//   }

//   return (
//     <View style={{ 
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderWidth: 1,
//      }}>
//       <Text>Jumlah: {count}</Text>
//       <Button title="Tambah" onPress={incrementCount} />

//       <View style={{ marginTop: 20 }}>
//         <Text>Basic Props</Text>
//         <BasicProps message="Hello" count={count} setIncrement={setIncrement} />
//       </View>
//     </View>
//   );
// };

// const BasicProps = props1 => {
//   return(
//     <View style={{alignItems:'center', borderWidth: 1, padding: 20,}}>
//       <Text>{props1.message}</Text>
//       <Text>{props1.count}</Text>
//       <TouchableOpacity 
//       style={{ backgroundColor: "#ddd", }}
//       onPress={() => props1.setIncrement()}
//       >
//         <Text>Increment</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// export default BasicStateComponent;

import React from 'react';
import { View, Text } from 'react-native';

const FlexboxExample = () => {
  return (
    <View style={{ 
      flex: 1, 
      flexDirection: 'col',
    }}>
      <View style={{ height:100 }}>

      </View>
      <View style={{ 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#aaa' 
      }}>
        <View style={{ width: 100, height: 50, backgroundColor: 'red', borderRadius: 20 }}>
          <Text style={{ color: '#fff' }}>Merah</Text>
        </View>
        <View style={{ width: 50, height: 100, backgroundColor: 'green', }}>
          <Text style={{ color: '#fff' }}>Hijau</Text>
        </View>
        <View style={{ width: 50, height: 50, backgroundColor: 'blue' }}>
          <Text style={{ color: '#fff' }}>Biru</Text>
        </View>
      </View>
    </View>
  );
};

export default FlexboxExample;

