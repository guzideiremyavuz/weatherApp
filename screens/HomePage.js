import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../theme'
import {debounce} from 'lodash';/* arama kısmına yazı yazdığımızda yazının tamamlanlmasını beklemeye yarıyor, tamamlandıktan sonra api çağrısı yaptırıyor */
import { weatherImages } from '../theme';

import {CalendarDaysIcon, MagnifyingGlassIcon, } from 'react-native-heroicons/outline'
import { MapPinIcon} from 'react-native-heroicons/solid'
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc)=>{
    console.log('location: ',loc);
    setLocations([]);
    toggleSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data=>{
      setWeather(data);
      console.log('got forecast: ',data);
    })
  }

  const handleSearch= value=>{
    if(value.length>2){
      fetchLocations({cityName: value}).then(data=>{
      setLocations(data);
      })
    }
  }
  useEffect(()=>{
    fetchMyWeatherData();
  },[]);

  const fetchMyWeatherData = async ()=>{
    fetchWeatherForecast({
      cityName: 'Ankara',
      days: '7'
    }).then(data=>{
      setWeather(data);
    })
  }
  const handleTextDebounce = useCallback(debounce(handleSearch,1200),[])

  const {current, location} = weather;

  return (
    <View className="flex-1 relative">
        <StatusBar style="light"/>

        <Image blurRadius={15}
        style={{position: 'absolute', width: '100%', height: '100%', resizeMode:'cover'}}
        source={require('../assets/background.png')}
        />
        
        <SafeAreaView className="flex flex-1">
          <View style={{height: '10%',marginTop: 20}} className="mx-4 relative z-50" >
            <View className="flex-row justify-end items-center rounded-full"
            style={{backgroundColor: showSearch? theme.bgWhite(0.8):'transparent', 
            padding:5,
            }}
          >
              {
                showSearch? (
                  <TextInput 
                  onChangeText={handleTextDebounce}
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
                        <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country} </Text>
                      </TouchableOpacity>
                    )
                  })
                }
                </View>
            ):null
          }
        </SafeAreaView>
        
        <SafeAreaView className="m-2 justify-around flex-1 " >
          
        <View className="flex-1 justify-center items-center">
          <View className="mb-8">
           <Text 
           className="text-white text-center text-2xl font-bold ">
             {location?.name},  
           <Text className="text-lg font-semibold text-gray-300">
            {" "+location?.country}
           </Text>
          </Text>
          </View>

           <View className="items-center space-y-4">
             <Image 
             source={weatherImages[current?.condition?.text]||{uri: `https:${current?.condition?.icon}`}} 
             className="w-48 h-48"
             />
             <Text className="text-center font-bold text-white text-6xl ml-5 ">
              {current?.temp_c}&#176;
             </Text>
             <Text className="text-center font-bold text-white text-xl tracking-widest ">
              {current?.condition?.text}
             </Text>
           </View>
          </View>

           <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image source={require('../assets/windIcon.png')} className="h-6 w-6"/>
              <Text className="text-white font-semibold text-base">
                {current?.wind_kph}km
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image source={require('../assets/drop.png')} className="h-6 w-6"/>
              <Text className="text-white font-semibold text-base">
                {current?.humidity}%
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image source={require('../assets/sun2.png')} className="h-6 w-6"/>
              <Text className="text-white font-semibold text-base">
                6:05 AM
              </Text>
            </View>
           </View>
        </SafeAreaView>

        {/*diğer günler için hava*/}
        <SafeAreaView className="mb-6 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2 mt-5">
            <CalendarDaysIcon size={22} color="white"/>
            <Text className="text-white text-base">Daily forecast</Text>
          </View>
          <ScrollView
          horizontal
          contentContainerStyle={{paddingHorizontal:15}}
          showsVerticalScrollIndicator={false}
          >
            {
              weather?.forecast?.forecastday?.map((item, index)=>{
                let date = new Date(item.date); /* gün ay yıl ın hangi gün adına denk geldiğini bulur bu nesne */
                let options = {weekday:'long'}; /* long tam gün adını döndürüyor */
                let dayName = date.toLocaleDateString('en-US', options);/*abd ingilizcesiyle döndürüyor gün adlarını */
                return(
                  <View
                  key={index}
                  className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                  style={{backgroundColor:theme.bgWhite(0.15)}}
                  >
                    <Image source={weatherImages[item?.day?.condition?.text]||{uri: `https:${current?.condition?.icon}`}} 
                    className="h-11 w-11"/>
                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                    {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                )
              })
            }



          </ScrollView>
        </SafeAreaView>
    </View>
  )
}