import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
export default function TotalSlot({ navigation }) {
  return (
    <Background>
      {/* <Logo /> */}
      <BackButton goBack={navigation.goBack} />
      <Header>Total Slots </Header>

      
      



    </Background>
  )
}
