import MovieCard from '@/components/MovieCard';
import TrendingMovieCard from '@/components/TrendingMovieCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { fetchTrendingMovies } from '@/services/appWrite';
import useFetch from '@/services/useFetch';
// import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';

export default function Home() {
  // const router = useRouter();

  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    error: trendingError,
  } = useFetch(fetchTrendingMovies);

  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary py-5">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
        className="flex-1 px-5">
        <Image source={icons.logo} className="mx-auto mt-20 h-10 w-12" />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="mt-5 flex-1">
            {/* <SearchBar onPress={() => router.push('/search')} placeholder="Search for a movie" /> */}

            {trendingMovies && (
              <View className="mt-10">
                <Text className="mb-3 text-lg font-bold text-white">Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 15,
                  }}
                  renderItem={({ item, index }) => <TrendingMovieCard movie={item} index={index} />}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}
            <>
              <Text className="mb-3 mt-5 text-lg font-bold text-white">Latest Movies</Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
