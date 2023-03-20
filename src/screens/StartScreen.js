import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

const image = {uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fbackground&psig=AOvVaw0Y5B1Z3J1xo7zyP_FY3V_m&ust=1679403060122000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPigncnG6v0CFQAAAAAdAAAAABAE'};

const App = () => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Inside</Text>
    </ImageBackground>
  </View>
);

export default function StartScreen({ navigation }) {
  return (
    
    <Background>
      <Logo />
      
      <Header>Car Parking IOT</Header>
      <Paragraph>
        Here you can easily find Car Parking Space
      </Paragraph>
      <h3> Sign up Now!</h3>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
