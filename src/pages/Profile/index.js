import { 
  View, 
  StyleSheet, 
  ImageBackground, 
  Image ,
  ScrollView
} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

import COMPONENTS from '../../components'
import IMAGES from '../../assets/images'
import ICONS from '../../assets/icons'
import { WIDTH, SHADOW } from '../../assets/styles'
import { ProfileID, People, Options } from './data'
import { decryptAES } from '../../utils/crypto'

export default function ProfileScreen() {
  const dataLogin = useSelector(state => state.dataLogin)

  // const avatarParts = dataLogin.loginAuth?.pfp.split("/")
  // const avatarFilename = avatarParts.pop()
  // const avatar = require('../../assets/images/' + avatarFilename)
  
  const userData = {
    uuid: dataLogin.loginAuth?.uuid,
    name: dataLogin.loginAuth?.nameUser === 'Admin  Mobile ' 
    ? 'Admin  Mobile ' 
    : decryptAES(dataLogin.loginAuth?.nameUser),
    email: decryptAES(dataLogin.loginAuth?.email),
    nik: decryptAES(dataLogin.loginAuth?.nationalId),
    phone: decryptAES(dataLogin.loginAuth?.phoneNumber),
  }

  return (
    <ScrollView style={{ backgroundColor:'white' }}>
      <ImageBackground source={IMAGES.bgProfile} style={styles.imageBg}>
        <View style={styles.avatarContainer}>
          <Image source={IMAGES.person2} style={styles.avatar} />
        </View>
        <View style={{ alignItems:'center' }}>
          <COMPONENTS.Text semiBold fontSize={20} style={{ marginTop:16 }}>{userData.name}</COMPONENTS.Text>
          <COMPONENTS.Text semiBold fontSize={14} color='#909090' style={{ marginTop:5 }}>React Native Developer</COMPONENTS.Text>
        </View>
      </ImageBackground>
      <View style={styles.dataContainer}>
        <View style={[styles.profileContainer, SHADOW]}>
          {ProfileID.map((item, index) => (
            <View key={index} style={styles.profileFlex}>
              <COMPONENTS.Text  semiBold fontSize={12} >
                {item.name}
              </COMPONENTS.Text>
              <COMPONENTS.Text regular color='#A7A7A7' fontSize={12} >
              {item.name == "ID" 
                ? userData.uuid 
                : item.name == "Email" 
                  ? userData.email 
                  : item.name == "NIK" 
                    ? userData.nik 
                    : item.name == "Phone"
                      ? userData.phone 
                      : item.value
              }
              </COMPONENTS.Text>
            </View>
          ))}
        </View>
        <View style={[styles.profileContainer, SHADOW, {marginTop:20}]}>
          <View style={styles.profileFlex}>
            <View style={{ alignItems:'left', marginTop:7 }}>
              <COMPONENTS.Text semiBold fontSize={12}>Team</COMPONENTS.Text>
              <COMPONENTS.Text regular color='#A7A7A7' fontSize={12}>React Native</COMPONENTS.Text>
            </View>
            <View style={{ alignItems:'right' }}>
              <View style={{flexDirection: 'row'}}>
                {People.map((item, index) => (
                  <Image key={index} source={item.avatar} style={styles.avatarTeam}/>
                ))}
                <View style={styles.othersTeam}>
                  <COMPONENTS.Text fontSize={14} style={{ marginTop:-3 }} color='#ffffff'>+6</COMPONENTS.Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.profileContainer, SHADOW, {marginTop:20}]}>
          {Options.map((item, index) => (
            <View key={index} style={styles.profileFlex}>
              <View style={styles.optionRow}>
                  <View style={[styles.optionIcons, {backgroundColor: item.color}]}>
                      <Image source={item.icon}/>
                  </View>
                  <COMPONENTS.Text fontSize={14} semiBold>{item.name}</COMPONENTS.Text>
              </View>
              <Image source={ICONS.detail}/>
            </View>
          ))}
        </View>
        <View style={styles.version}>
          <COMPONENTS.Text fontSize={14}>v0.0.1</COMPONENTS.Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageBg: {
    width: WIDTH,
    height: 495,
    alignItems:'center',
  },
  avatarContainer: {
    borderWidth:1, 
    width:124, 
    height:124, 
    borderColor:'#FBD2A5',
    borderRadius:90,
    marginTop:90,
  },
  avatar: {
    width:120, 
    height:120,
    borderRadius:90,
  },
  dataContainer: { 
    marginTop:-200,
    paddingHorizontal:16,
    paddingVertical:10,
  },
  profileContainer: {
    borderRadius:12,
    backgroundColor:'white',
  },
  profileFlex: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:18,
    paddingVertical:10,
    borderBottomWidth:1,
    borderBottomColor:'#D3D3D3'
  },
  avatarTeam: {
    width: 35,
    height: 35,
    borderRadius: 90,
    marginStart: -15,
    borderWidth: 2,
    borderColor: '#fff'
  },
  othersTeam: {
    width: 35, 
    height: 35, 
    backgroundColor: '#C16262', 
    borderRadius: 90,
    marginStart: -15,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 5
  },
  optionIcons: {
    padding: 5, 
    borderRadius: 8
  },
  version: {
    marginVertical: 16, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})