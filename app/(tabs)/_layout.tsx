import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { TabProps } from '@/interfaces/interfaces';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

const TabIcon = ({ title, source, focused }: TabProps) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="mt-5 flex min-h-16 w-full min-w-[112px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full">
        <Image source={source} tintColor="#151312" className="size-5" />
        <Text className="ml-2 text-base font-semibold text-secondary">{title}</Text>
      </ImageBackground>
    );
  } else {
    return (
      <View className="mt-4 size-full items-center justify-center rounded-full">
        <Image source={source} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  }
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0F0D23',
          borderRadius: 50,
          marginHorizontal: 15,
          marginBottom: 20,
          height: 55,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0F0D23',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Home" source={icons.home} />
            </>
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Search" source={icons.search} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Saved" source={icons.save} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} title="Profile" source={icons.person} />
            </>
          ),
        }}
      />
    </Tabs>
  );
};
export default _Layout;
