import React from "react"

import { Link } from "expo-router"
import { Text } from "react-native"

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={{ pathname: "/movie/[id]", params: { id } }}>
      <Text className="text-sm text-white">{title}</Text>
    </Link>
  )
}

export default MovieCard
