import { 
  View, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import COMPONENTS from '../../components'
import IMAGES from  '../../assets/images'
import { WIDTH, HEIGHTLOGIN } from '../../assets/styles'
import ICONS from '../../assets/icons'
import { EMAILREGEX, PASSWORDREGEX, NUMBERREGEX } from '../../utils/regex'
import { encryptAES } from '../../utils/crypto'
import satellite from '../../services/satellite'

export default function RegisterScreen({navigation, route}) {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConPassword, setIsShowConPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEnable, setIsEnable] = useState(false)
  const [dataRegister, setDataRegister] = useState({
    name:'', 
    email:'', 
    phone:'', 
    nik:'', 
    password:'',
    conPassword:'',
  })
  const [messageError, setMessageError] = useState({
    name:'', 
    email:'', 
    phone:'', 
    nik:'', 
    password:'',
    conPassword:'',
  })

  const handleForm = (type, text) => {
    if (type === 'conPassword') {
      if (text === '') {
        setMessageError({ ...messageError, [type]:'confirmation password must be filled in'})
        return
      } else if (!PASSWORDREGEX.test(text)){
        setMessageError({...messageError, [type]:'invalid confirmation password format'})
        return
      }
    }
    
    if (text === '') {
      setMessageError({ ...messageError, [type]:`${type} must be filled in`})
      return
    }
    
    if (type === 'email') {
      if (!EMAILREGEX.test(text)) {
        setMessageError({ ...messageError, [type]:`invalid ${type} format`})
        return
      }
    } else if (type === 'nik' || type === 'phone') {
      if (!NUMBERREGEX.test(text)) {
        setMessageError({ ...messageError, [type]:`invalid ${type} format`})
        return
      } else if (type === 'nik' && text.length !== 16) {
        setMessageError({ ...messageError, [type]:'nik must be 16 digits'})
        return
      }
    } else if (type === 'password') {
      if (!PASSWORDREGEX.test(text)){
        setMessageError({...messageError, [type]:`invalid ${type} format`})
        return
      }
    }

    // if not error
    setMessageError({ ...messageError, [type]:''})
  }

  useEffect(() => {
    if (
      dataRegister.name && dataRegister.email && dataRegister.phone && 
      dataRegister.nik && dataRegister.password && dataRegister.conPassword && 
      messageError.name === '' && messageError.email === '' && messageError.phone === '' &&
      messageError.nik === '' && messageError.password === '' && messageError.conPassword === ''
    ) {
      setIsEnable(true)
    } else {
      setIsEnable(false)
    }
  }, [dataRegister])

  const onSubmit = () => {
    if (dataRegister.password !== dataRegister.conPassword) {
      setDataRegister({ ...dataRegister, conPassword:''})
      setMessageError({ 
        ...messageError,
        conPassword:'confirmation password is not match with password'
      })
      return
    }
    
    setIsLoading(true)
    const register = {
      doSendRegister: {
        name: encryptAES(dataRegister.name),
        email: encryptAES(dataRegister.email),
        nik: encryptAES(dataRegister.nik),
        phoneNumber: encryptAES(dataRegister.phone),
        password: encryptAES(dataRegister.password)
      }
    }

    console.log('SEND REQUEST REGISTER')
    satellite.post('/rest/v1/auth/register', register)
      .then(res => {
        console.log(JSON.stringify(res.data, null, 2))
        navigation.navigate('login')
      })
      .catch(err => console.log(JSON.stringify(err.response.data, null, 2)))
      .finally(() => {
        console.log('REQUEST REGISTER SELESAI')
        setIsLoading(false)
      })
  }

  return (
    <ImageBackground source={IMAGES.bgScreen1} style={{ width:WIDTH, height:HEIGHTLOGIN }}>
      <View style={{ marginTop:50, marginStart:20, marginBottom:20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Image source={ICONS.arrowLeft} style={{ width:25, height:25 }} resizeMode='contain'/>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ flex: 1, paddingTop:27, paddingBottom:350, marginHorizontal:16 }}>
          <COMPONENTS.InputText 
            title='Name' 
            placeholder='Enter Your Name'
            value={dataRegister.name}
            error={messageError.name}
            onChangeText={text => {
              setDataRegister({ ...dataRegister, name: text })
              handleForm('name', text)
            }}
          />
          <COMPONENTS.InputText 
            title='Email' 
            keyboardType='email-address'
            placeholder='Enter Your Email'
            value={dataRegister.email}
            error={messageError.email}
            onChangeText={text => {
              setDataRegister({ ...dataRegister, email: text })
              handleForm('email', text)
            }}
          />
          <COMPONENTS.InputText 
            title='Phone' 
            keyboardType= 'phone-pad'
            placeholder='Enter Your Phone'
            value={dataRegister.phone}
            error={messageError.phone}
            onChangeText={text => {
              setDataRegister({ ...dataRegister, phone: text })
              handleForm('phone', text)
            }}
          />
          <COMPONENTS.InputText 
            title='NIK' 
            keyboardType= 'numeric'
            placeholder='Enter Your NIK Number'
            value={dataRegister.nik}
            error={messageError.nik}
            onChangeText={text => {
              setDataRegister({ ...dataRegister, nik: text })
              handleForm('nik', text)
            }}
          />
          <COMPONENTS.InputText 
            title='Password' 
            placeholder='Password'
            secureTextEntry={!isShowPassword}
            value={dataRegister.password}
            error={messageError.password}
            onChangeText={text => {
              setDataRegister({ ...dataRegister, password: text })
              handleForm('password', text)
            }}
            rightIcon={
              <TouchableOpacity 
                onPress={() => setIsShowPassword(!isShowPassword)}
                style={{ backgroundColor:'#273C75', zIndex:1000 }}
              >
                <Image 
                  source={isShowPassword ? ICONS.eyeSlash : ICONS.eye} 
                  style={{ width:20, height:20, marginTop:5, marginStart:-20, position:'absolute' }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            }
          />
          <COMPONENTS.InputText 
            title='Confirm Password' 
            placeholder='Confirm Password'
            secureTextEntry={!isShowConPassword}
            value={dataRegister.conPassword}
            error={messageError.conPassword}
            onChangeText={text => {
              setDataRegister({ ...dataRegister, conPassword: text })
              handleForm('conPassword', text)
            }}
            rightIcon={
              <TouchableOpacity 
                onPress={() => setIsShowConPassword(!isShowConPassword)}
                style={{ backgroundColor:'#273C75', zIndex:1000 }}
              >
                <Image 
                  source={isShowConPassword ? ICONS.eyeSlash : ICONS.eye} 
                  style={{ width:20, height:20, marginTop:5, marginStart:-20, position:'absolute' }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            }
          />
          <COMPONENTS.Button 
            title={isLoading ? 'Loading...' : 'Register'} 
            styles={{ marginTop:20 }}
            disabled={(!isEnable) || isLoading}
            onPress={() => onSubmit()}
          />
          <View style={{ flex:1, flexDirection:'row', justifyContent:'center', marginTop:15 }}>
            <COMPONENTS.Text fontSize={14} color='#fff'>
              Already Have an Account? 
            </COMPONENTS.Text>
            <TouchableOpacity style={{ marginStart:5 }} onPress={() => navigation.navigate('login')}>
              <COMPONENTS.Text fontSize={14} color={'#F6E58D'}>
                Login
              </COMPONENTS.Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
    </ImageBackground>
  )
}