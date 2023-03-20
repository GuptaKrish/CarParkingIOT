import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'
const image = { uri: "https://img.freepik.com/free-vector/cerulean-blue-curve-frame-template_53876-99029.jpg?w=1060&t=st=1679318094~exp=1679318694~hmac=aecd06737981c70ec54e035fec4c2aece03be85fc9e06bbb431a90800078f22c" };
export default function Background({ children }) {
  return (
    <ImageBackground source={image} resizeMode='cover' style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
