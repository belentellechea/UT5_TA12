import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon2 from 'react-native-vector-icons/Entypo'

export default function App(){
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const takePhoto = async () => {
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permiso para acceder a la cámara denegado');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); 
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <View style={styles.errorContainer}>
          <Icon2 name='warning' size={25} style={styles.warning}/>
          <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
      ) : (
        <>
          <Pressable onPress={takePhoto} style={styles.button}>
            <Text style={styles.text}>Toma una foto presionando aquí..</Text>
          </Pressable>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edf2fb',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 30,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#abc4ff',
    padding: 20,
    borderRadius: 25
  }, 
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }, 
  errorContainer: {
    backgroundColor: '#abc4ff',
    padding: 20,
    borderRadius: 30, 
    display: 'flex', 
    flexDirection: 'row',
    gap: 15
  }, 
  warning: {
    color: '#9e2a2b'
  },
});
