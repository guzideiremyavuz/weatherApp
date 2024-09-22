import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../theme'
import {MagnifyingGlassIcon, } from 'react-native-heroicons/outline'
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
        style={{position: 'absolute', width: '100%', height: '100%'}}
        source={require('../assets/background.png')}
        />
        <View className="flex flex-1">
          <View style={{height: '10%',marginTop: 20}} className="mx-4 relative z-50" >
            <View className="flex-row justify-end items-center rounded-full"
            style={{backgroundColor: showSearch? theme.bgWhite(0.5):'transparent', padding:5}}>
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
    </View>
  )
}