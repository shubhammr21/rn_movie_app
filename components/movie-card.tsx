import React from "react"

import { Link } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { icons } from "@/constants/icons"

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={{ pathname: "/movie/[id]", params: { id } }} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          className="h-52 w-full rounded-lg"
          resizeMode="cover"
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png?text=No+Image",
          }}
        />
        <Text className="text-sm font-bold text-white" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-sm font-bold uppercase text-white">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="mt-1 text-xs font-medium text-light-300">
            {release_date}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard
