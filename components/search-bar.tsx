import React from "react"

import { Image, TextInput, View } from "react-native"

import { icons } from "@/constants/icons"

interface Props {
  placeholder: string
  onPress?: () => void
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="flex-row items-center rounded-full bg-dark-200 px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        className="ml-2 flex-1 text-white"
        placeholder={placeholder}
        placeholderTextColor="#A8B5DB"
        value=""
        onPress={onPress}
        onChangeText={() => {}}
      />
    </View>
  )
}

export default SearchBar
