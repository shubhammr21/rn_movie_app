import { Client, Databases, ID, Query } from "react-native-appwrite"

const getEnvVar = (value: string | undefined, name: string) => {
  if (!value)
    throw new Error(`Missing environment variable \`${name}\` in the .env file`)
  return value
}

const PROJECT_ID = getEnvVar(
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  "EXPO_PUBLIC_APPWRITE_PROJECT_ID",
)
const DATABASE_ID = getEnvVar(
  process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  "EXPO_PUBLIC_APPWRITE_DATABASE_ID",
)
const COLLECTION_ID = getEnvVar(
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
  "EXPO_PUBLIC_APPWRITE_COLLECTION_ID",
)

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ])
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0]
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        },
      )
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ])
    return result.documents as unknown as TrendingMovie[]
  } catch (error) {
    console.error(error)
    throw error
  }
}
