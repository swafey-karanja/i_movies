import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Movie } from '@/interfaces/interfaces';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Placeholder for search query state

  const {
    data: movies = [],
    isLoading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  console.log(searchQuery);

  return (
    <View className="flex-1 bg-primary py-5">
      <Image source={images.bg} className="absolute z-0 w-full flex-1" resizeMode="cover" />
      <FlatList
        className="px-5"
        data={movies as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="mt-20 w-full flex-row items-center justify-center">
              <Image source={icons.logo} className="h-10 w-12" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />}

            {moviesError && (
              <Text className="my-3 px-5 text-red-500">Error: {moviesError.message}</Text>
            )}

            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl font-bold text-white">
                Search Results for <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? 'No movies found' : 'Start typing to search for movies'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};
export default Search;
