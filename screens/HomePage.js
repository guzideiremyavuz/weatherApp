import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../theme'
import {CalendarDaysIcon, MagnifyingGlassIcon, } from 'react-native-heroicons/outline'
import { MapPinIcon} from 'react-native-heroicons/solid'


export default function HomePage() {
  const [showSearch, toggleSearch] = useState(false);
  const[locations, setLocations] = useState([1,2,3]);

  const handleLocation = (loc)=>{
    console.log('location: ',loc);
  }

  return (
    <View className="flex-1 relative">
        <StatusBar style="light"/>

        <Image blurRadius={15}
        style={{position: 'absolute', width: '100%', height: '100%', resizeMode:'cover'}}
        source={require('../assets/background.png')}
        />
        <View className="flex flex-1">
          <View style={{height: '10%',marginTop: 20}} className="mx-4 relative z-50" >
            <View className="flex-row justify-end items-center rounded-full"
            style={{backgroundColor: showSearch? theme.bgWhite(0.8):'transparent', 
            padding:5,
            }}
          >
              {
                showSearch? (
                  <TextInput 
                  placeholder='Search city' 
                  placeholderTextColor={'lightgray'}
                  style={{paddingHorizontal: 10, paddingVertical: 8, color: 'lightgray', flex: 1}}
                   />
                ):null
              }

               <TouchableOpacity 
               onPress={()=> toggleSearch(!showSearch)}
               style={{backgroundColor: theme.bgWhite(0.3)}}
               className="rounded-full p-3 m-1">
                <MagnifyingGlassIcon size="25" color="white"/>
               </TouchableOpacity>
            </View>
          </View>
          {
            locations.length>0 && showSearch? (
              <View className="absolute w-full bg-gray-300 top-20 rounded-3xl">
                {
                  locations.map((loc, index)=>{
                    let showBorder = index+1 != locations.length;
                    let borderClass = showBorder? 'border-b-2 border-b-gray-400': '';
                    return(
                      <TouchableOpacity
                      onPress={()=> handleLocation(loc)}
                      key={index}
                      className={"flex-row items-center border-0 p-3 px-4 mb-1" +borderClass}>
                        <MapPinIcon size="20" color="gray"/>
                        <Text className="text-black text-lg ml-2">Istanbul, Turkiye </Text>
                      </TouchableOpacity>
                    )
                  })
                }
                </View>
            ):null
          }
        </View>
        
        <View className="m-2 flex justify-around flex-1 mb-16" >
          <View className="items-center space-y-4">
          <Text 
          className="text-white text-center text-2xl font-bold ">
            Istanbul,
           <Text className="text-lg font-semibold text-gray-300">
            Turkiye
           </Text>
          </Text>

           <View className="flex-row justify-center mb-20">
             <Image 
             source={require('../assets/sun.png')}
             className="w-48 h-48"
             />
             </View>
           </View>


           <View className="space-y-2 mb-10 mt-8">
             <Text className="text-center font-bold text-white text-6xl ml-5 mt-20">
              23&#176;
             </Text>
             <Text className="text-center font-bold text-white text-xl tracking-widest mb-20">
              Sunny
             </Text>
           </View>

           <View className="flex-row justify-between mx-4 mb-10 mt-16">
            
            <View className="flex-row space-x-2 items-center">
              <Image source={require('../assets/windIcon.png')} className="h-6 w-6"/>
              <Text className="text-white font-semibold text-base">22km
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image source={require('../assets/drop.png')} className="h-6 w-6"/>
              <Text className="text-white font-semibold text-base">23%
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image source={require('../assets/sun2.png')} className="h-6 w-6"/>
              <Text className="text-white font-semibold text-base">
                6:05 AM
              </Text>
            </View>
           </View>
        </View>
        {/*diğer günler için hava*/}
        <View className="mb-6 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2 mt-5">
            <CalendarDaysIcon size={22} color="white"/>
            <Text className="text-white text-base">Daily forecast</Text>
          </View>
          <ScrollView
          horizontal
          contentContainerStyle={{paddingHorizontal:15}}
          showsVerticalScrollIndicator={false}
          >
          <View
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          style={{backgroundColor:theme.bgWhite(0.15)}}
          >
            <Image source={require('../assets/heavyRain.png')}
            className="h-11 w-11"/>
            <Text className="text-white">Monday</Text>
            <Text className="text-white text-xl font-semibold">
            13&#176;
            </Text>
          </View>
          <View
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          style={{backgroundColor:theme.bgWhite(0.15)}}
          >
            <Image source={require('../assets/heavyRain.png')}
            className="h-11 w-11"/>
            <Text className="text-white">Tuesday</Text>
            <Text className="text-white text-xl font-semibold">
            13&#176;
            </Text>
          </View>
          <View
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          style={{backgroundColor:theme.bgWhite(0.15)}}
          >
            <Image source={require('../assets/heavyRain.png')}
            className="h-11 w-11"/>
            <Text className="text-white">Wednesday</Text>
            <Text className="text-white text-xl font-semibold">
            13&#176;
            </Text>
          </View>
          <View
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          style={{backgroundColor:theme.bgWhite(0.15)}}
          >
            <Image source={require('../assets/heavyRain.png')}
            className="h-11 w-11"/>
            <Text className="text-white">Thursday</Text>
            <Text className="text-white text-xl font-semibold">
            13&#176;
            </Text>
          </View>
          <View
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          style={{backgroundColor:theme.bgWhite(0.15)}}
          >
            <Image source={require('../assets/heavyRain.png')}
            className="h-11 w-11"/>
            <Text className="text-white">Friday</Text>
            <Text className="text-white text-xl font-semibold">
            13&#176;
            </Text>
          </View>
          <View
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          style={{backgroundColor:theme.bgWhite(0.15)}}
          >
            <Image source={require('../assets/heavyRain.png')}
            className="h-11 w-11"/>
            <Text className="text-white">Saturday</Text>
            <Text className="text-white text-xl font-semibold">
            13&#176;
            </Text>
          </View>
          <View
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          style={{backgroundColor:theme.bgWhite(0.15)}}
          >
            <Image source={require('../assets/heavyRain.png')}
            className="h-11 w-11"/>
            <Text className="text-white">Sunday</Text>
            <Text className="text-white text-xl font-semibold">
            13&#176;
            </Text>
          </View>
          </ScrollView>
        </View>
    </View>
  )
}