import { icons } from '@/constants/icons';
import { Movie } from '@/interfaces/interfaces';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  original_language,
  adult,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild className="pb-2">
      <TouchableOpacity className="w-[30%]">
        {/* IMAGE WRAPPER */}
        <View className="relative">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : 'https://via.placeholder.com/600x400/1a1a1a/ffffff.png',
            }}
            className="h-52 w-full rounded-lg"
          />

          {/* AGE BADGE - top right */}
          <View
            className={`absolute right-1 top-1 rounded ${adult ? 'bg-red-500' : 'bg-green-500'} px-2 py-1`}>
            <Text className="text-[10px] font-semibold uppercase text-white">
              {adult ? '18+' : 'PG'}
            </Text>
          </View>

          {/* LANGUAGE BADGE - top left */}
          <View className="absolute left-1 top-1 rounded bg-black/60 px-2 py-1">
            <Text className="text-[10px] font-semibold uppercase text-white">
              {original_language}
            </Text>
          </View>
        </View>
        <Text className="mt-2 text-sm font-bold text-white" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          {[...Array(Math.round(vote_average / 2))].map((_, index) => (
            <Image key={index} source={icons.star} className="size-3" />
          ))}
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="mt-1 text-xs font-medium text-light-300">
            {release_date?.split('-')[0]}
          </Text>
          <Text className="text-xs font-medium uppercase text-light-300">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default MovieCard;
