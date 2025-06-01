import { useEffect, useState } from "react"

import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"

import MovieCard from "@/components/movie-card"
import SearchBar from "@/components/search-bar"
import { icons } from "@/constants/icons"
import { images } from "@/constants/images"
import { useFetch } from "@/hooks/use-fetch"
import { fetchMovies } from "@/services/api"

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("")

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset,
  } = useFetch<DiscoverMovie>(() => fetchMovies({ query: searchQuery }), false)

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch()
      } else {
        reset()
      }
    }, 1000)

    return () => clearTimeout(timeout)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  return (
    <View className="flex-1 bg-primary">
      <Image className="absolute z-0 w-full flex-1" source={images.bg} />

      <FlatList
        data={movies?.results}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        columnWrapperClassName="justify-center gap-4 my-4"
        className="gap px-5"
        ListHeaderComponent={
          <>
            <View className="mt-20 w-full flex-row justify-center">
              <Image className="h-10 w-12" source={icons.logo} />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                // onPress={() => router.push("/(tabs)/search")}
                onChangeText={text => setSearchQuery(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000FF"
                className="mt-10 self-center"
              />
            )}
            {moviesError && <Text>Error : {moviesError?.message}</Text>}
            {!moviesLoading && !moviesError && searchQuery.trim() && (
              // (movies?.results?.length ?? 0) > 0 &&
              <Text className="text-xl font-bold text-white">
                {" "}
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        // showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[100]"
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}
