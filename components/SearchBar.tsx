import { icons } from '@/constants/icons';
import { SearchBarProps } from '@/interfaces/interfaces';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

const SearchBar = ({ onPress, placeholder, value, onChangeText }: SearchBarProps) => {
  return (
    <View className="flex-row items-center rounded-full bg-dark-200 px-5 py-4">
      <Image source={icons.search} className="h-5 w-5" resizeMode="contain" tintColor="#AB8BFF" />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="ml-2 flex-1 text-white"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};
export default SearchBar;
