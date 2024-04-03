import { View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import COMPONENTS from '../../components'
import HomeScreen from '../Home'
import ProfileScreen from '../Profile'
import TaskScreen from '../Task'
import PerformanceScreen from '../Performance'
import AddTaskScreen from '../AddTask'
import ICONS from '../../assets/icons'

const Tab = createBottomTabNavigator()

export default function MainScreen({ navigation, route }) {
  const [page, setPage] = useState('home')

  return (
    <Tab.Navigator 
      screenOptions={({route}) => ({ 
        headerShown:false,
        tabBarInactiveTintColor:'#CED1D4',
        tabBarActiveTintColor:'#04325F',
        tabBarIcon: ({focused}) => {
          const iconTabActive = {
            home: ICONS.home, 
            profile: ICONS.profile,
            task: ICONS.task,
            performance: ICONS.perform 
          }
          const iconTabInactive = {
            home: ICONS.homeInactive, 
            profile: ICONS.profileInactive,
            task: ICONS.taskInactive,
            performance: ICONS.performInactive 
          }
          return (
            <View style={{ width: 24, height: 24 }}>
              {route.name === "addTask" ? (
                <Image
                  source={ICONS.addTask}
                  style={{ marginTop: -50, marginStart:-25 }}
                />
              ) : (
                <Image
                  source={focused ? iconTabActive[route.name] : iconTabInactive[route.name]}
                  style={{ width: 24, height: 24, resizeMode: "contain" }}
                />
              )}
            </View>
          )
        },
        tabBarStyle: {
          paddingTop:10,
          paddingBottom:10,
          height:70
        },
        tabBarLabel: ({focused, color}) => (
          route.name === "addTask" ? null :
          <COMPONENTS.Text bold={focused} fontSize={10} color={color}>{route.name}</COMPONENTS.Text>
        )
      })}
    >
      <Tab.Screen 
        name="home" 
        component={HomeScreen} 
        listeners={() => ({ tabPress: () => setPage('home') })}
      />
      <Tab.Screen 
        name="task"  
        component={TaskScreen} 
        listeners={() => ({ tabPress: () => setPage('task') })}
      />
      <Tab.Screen 
        name="addTask" 
        component={AddTaskScreen}                         
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('addTask', {page: page})
          }
        })}
        options={{
          tabBarStyle: { display: 'none' } 
        }} 
      />
      <Tab.Screen 
        name="performance" 
        component={PerformanceScreen} 
        listeners={() => ({ tabPress: () => setPage('performance') })}
      />
      <Tab.Screen 
        name="profile" 
        component={ProfileScreen}
        listeners={() => ({ tabPress: () => setPage('profile') })}
      />
    </Tab.Navigator>
  )
}