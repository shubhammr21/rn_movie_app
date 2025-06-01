import { useLocalSearchParams } from "expo-router"
import React from "react"
import { Text, View } from "react-native"

const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>Movie MovieDetails {id}</Text>
    </View>
  )
}

export default MovieDetails
