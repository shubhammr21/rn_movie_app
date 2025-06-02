import React from "react"

import MaskedView from "@react-native-masked-view/masked-view"
import { Link } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { images } from "@/constants/images"

interface Props {
  movie: TrendingMovie
  index: number
}

const TrendingCard = ({
  movie: { title, movie_id, poster_url },
  index,
}: Props) => {
  return (
    <Link href={{ pathname: "/movie/[id]", params: { id: movie_id } }}>
      <TouchableOpacity className="relative w-32 pl-5">
        <Image
          source={{ uri: poster_url }}
          className="h-48 w-32 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute -left-3.5 bottom-9 rounded-full px-2 py-1">
          <MaskedView
            maskElement={
              <Text className="text-6xl font-bold text-white">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          className="mt-2 text-sm font-bold text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard
