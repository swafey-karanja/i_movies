import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Image, ScrollView, View } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';

export default function Home() {
  const router = useRouter();

  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
        className="flex-1 px-5">
        <Image source={icons.logo} className="mx-auto mt-20 h-10 w-12" />

        <View className="mt-5 flex-1">
          <SearchBar onPress={() => router.push('/search')} placeholder="Search for a movie" />
        </View>
      </ScrollView>
    </View>
  );
}
