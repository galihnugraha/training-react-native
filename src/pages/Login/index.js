import { 
  View, 
  Image, 
  ImageBackground, 
  TouchableOpacity 
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import COMPONENTS from '../../components'
import IMAGES from  '../../assets/images'
import { WIDTH, HEIGHTLOGIN } from '../../assets/styles'
import ICONS from '../../assets/icons'
import { EMAILREGEX, PASSWORDREGEX } from '../../utils/regex'
import { encryptAES } from '../../utils/crypto'
import satellite from '../../services/satellite'
import { setLogin } from '../../store/actions/actionLogin'

export default function LoginScreen({navigation, route}) {
  const hasLogin = useSelector(state => state.dataLogin)
  useEffect(() => {
    // Periksa apakah pengguna sudah login
    if (hasLogin.loginAuth) {
      navigation.navigate('main')
    }
  }, [hasLogin])

  dispatch = useDispatch()

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEnable, setIsEnable] = useState(false)
  const [dataLogin, setDataLogin] = useState({email:'', password:''})
  const [messageError, setMessageError] = useState({email:'', password:''})

  const handleForm = (type, text) => {
    if (text === '') {
      setMessageError({ ...messageError, [type]:`${type} must be filled in`})
      return
    }
    
    const invalid = `invalid ${type} format`

    if (type === 'email') {
      if (!EMAILREGEX.test(text)) {
        setMessageError({ ...messageError, [type]:invalid})
        return
      }
    } else if (type === 'password') {
      if (!PASSWORDREGEX.test(text)){
        setMessageError({...messageError, [type]:invalid})
        return
      }
    }

    // if not error
    setMessageError({ ...messageError, [type]:''})
  }

  useEffect(() => {
    if (
      dataLogin.email && dataLogin.password && 
      messageError.email === '' && messageError.password === ''
    ) {
      setIsEnable(true)
    } else {
      setIsEnable(false)
    }
  }, [dataLogin])

  const onSubmit = async () => {
    setIsLoading(true)
    const login = {
      email: encryptAES(dataLogin.email),
      password: encryptAES(dataLogin.password)
    }
    
    console.log('SEND REQUEST LOGIN')
    try {
      const response = await satellite.post('/rest/v1/auth/login', login) 
      console.log(JSON.stringify(response.data, null, 2))
      // storeData('auth', response.data.data)
      dispatch(setLogin(response.data.data[0]))

      navigation.navigate('main')
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index:1,
      //     routes:[ {name:'main'}]
      //   })
      // )
    } catch (error) {
      console.log(JSON.stringify(error.response.data, null, 2))
    } finally {
      console.log('REQUEST LOGIN SELESAI')
      setIsLoading(false)
    }
  }

  return (
    <ImageBackground source={IMAGES.bgScreen1} style={{ width:WIDTH, height:HEIGHTLOGIN }}>
      <View style={{ flex: 1, paddingTop:122, marginHorizontal:16 }}>
        <COMPONENTS.InputText 
          title='Email' 
          keyboardType='email-address'
          placeholder='Enter Your Email'
          value={dataLogin.email}
          error={messageError.email}
          onChangeText={text => {
            setDataLogin({ ...dataLogin, email: text })
            handleForm('email', text)
          }}
        />
        <COMPONENTS.InputText 
          title='Password' 
          placeholder='Password'
          secureTextEntry={!isShowPassword}
          value={dataLogin.password}
          additionalLink='Forgot Password?'
          navigationParams={navigation}
          additionalLinkNavigation='forgotpass'
          error={messageError.password}
          onChangeText={text => {
            setDataLogin({ ...dataLogin, password: text })
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
        <COMPONENTS.Button 
          title={isLoading ? 'Loading...' : 'Login'} 
          styles={{ marginTop:20 }}
          disabled={(!isEnable) || isLoading}
          onPress={() => onSubmit()}
        />
        <View style={{ flex:1, flexDirection:'row', justifyContent:'center', marginTop:15 }}>
          <COMPONENTS.Text fontSize={14} color='#fff'>
            Dont Have an Account? 
          </COMPONENTS.Text>
          <TouchableOpacity style={{ marginStart:5 }} onPress={() => navigation.navigate('register')}>
            <COMPONENTS.Text fontSize={14} color={'#F6E58D'}>
              Sign Up
            </COMPONENTS.Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}