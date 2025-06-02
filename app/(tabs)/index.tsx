import { useRouter } from "expo-router"
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"

import MovieCard from "@/components/movie-card"
import SearchBar from "@/components/search-bar"
import TrendingCard from "@/components/trending-card"
import { icons } from "@/constants/icons"
import { images } from "@/constants/images"
import { useFetch } from "@/hooks/use-fetch"
import { fetchMovies } from "@/services/api"
import { getTrendingMovies } from "@/services/appwrite"

export default function Index() {
  const router = useRouter()

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch<DiscoverMovie>(() => fetchMovies({ query: "" }))
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMovies())

  return (
    <View className="flex-1 bg-primary">
      <Image className="absolute z-0 w-full" source={images.bg} />
      <Image source={icons.logo} className="mx-auto mb-5 mt-20 h-10 w-12" />
      {moviesLoading || trendingLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000FF"
          className="mt-10 self-center"
        />
      ) : moviesError || trendingError ? (
        <Text>Error : {moviesError?.message}</Text>
      ) : (
        <FlatList
          data={movies?.results}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          columnWrapperClassName="justify-start gap-5 pr-[5] mb-[10]"
          className="mb-2 flex-1 px-5 pb-32"
          ListHeaderComponent={
            <View className="mt-5 flex-1">
              <SearchBar
                placeholder="Search for a movie"
                onPress={() => router.push("/(tabs)/search")}
              />
              <View className="mt-5">
                <Text className="mb-3 text-lg font-bold text-white">
                  Trending movies
                </Text>
              </View>
              <FlatList
                className="mb-t mt-3"
                data={trendingMovies}
                horizontal
                ItemSeparatorComponent={() => <View className="w-4" />}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item, idx) =>
                  item.movie_id
                    ? item.movie_id.toString() + "-" + idx
                    : idx.toString()
                }
              />
              <Text className="mb-3 mt-5 text-lg font-bold text-white">
                Latest Movies
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerClassName="min-h-full pb-[10]"
        />
      )}
    </View>
  )
}
