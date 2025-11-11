import React from 'react';
import { Movie } from '@/interfaces/interfaces';
import { Link } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '@/constants/icons';

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild className="pb-2">
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://via.placeholder.co/600x400/1a1a1a/ffffff.png',
          }}
          className="h-52 w-full rounded-lg"
        />
        <Text className="mt-2 text-sm font-bold text-white">{title}</Text>
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
