import FoodCategoryCard from "@/components/FoodCategoryCard";
import { Header } from "@/components/Header";
import { images, restaurants } from "@/constans";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Featured Offers Section */}
        <View className="mb-6">
          <FoodCategoryCard
            title="SUMMER COMBO"
            price="$10.88"
            imageSource={images.burgerOne}
            imageStyle="w-80 h-72"
            imagePosition="right"
            backgroundColor="#D33B0D"
            showArrow={false}
          />

          <FoodCategoryCard
            title="BURGERS"
            imageSource={images.burgerTwo}
            imagePosition="left"
            textPosition="right"
            backgroundColor="#EB920C"
            onPress={() => router.push("/restaurant/1")}
          />

          <FoodCategoryCard
            title="PIZZA"
            imageSource={images.pizzaOne}
            imageStyle="w-[256px] h-[256px]"
            imagePosition="right"
            textPosition="left"
            backgroundColor="#084137"
            onPress={() => router.push("/restaurant/2")}
          />

          <FoodCategoryCard
            title="BURITTO"
            imageSource={images.buritto}
            imagePosition="left"
            textPosition="right"
            backgroundColor="#EB920C"
            onPress={() => router.push("/restaurant/3")}
          />
        </View>

        {/* Restaurants Section */}
        <View className="px-4 mb-6">
          <Text className="text-2xl font-bold mb-4" style={{ fontFamily: "Quicksand-Bold" }}>
            Popular Restaurants
          </Text>

          {restaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100"
              onPress={() => router.push(`/restaurant/${restaurant.id}`)}
              activeOpacity={0.7}
            >
              <Image
                source={restaurant.image}
                className="w-full h-48 rounded-t-2xl"
                resizeMode="cover"
              />
              <View className="p-4">
                <View className="flex-row justify-between items-start mb-2">
                  <Text
                    className="text-xl font-bold flex-1"
                    style={{ fontFamily: "Quicksand-Bold" }}
                  >
                    {restaurant.name}
                  </Text>
                  <View className="flex-row items-center bg-orange-50 px-2 py-1 rounded-lg">
                    <Image source={images.star} className="w-4 h-4 mr-1" />
                    <Text
                      className="text-orange-600 font-semibold"
                      style={{ fontFamily: "Quicksand-SemiBold" }}
                    >
                      {restaurant.rating}
                    </Text>
                  </View>
                </View>

                <Text
                  className="text-gray-600 mb-3"
                  style={{ fontFamily: "Quicksand-Regular" }}
                  numberOfLines={2}
                >
                  {restaurant.description}
                </Text>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Image source={images.clock} className="w-4 h-4 mr-1" />
                    <Text
                      className="text-gray-500 text-sm"
                      style={{ fontFamily: "Quicksand-Medium" }}
                    >
                      {restaurant.deliveryTime}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Image source={images.dollar} className="w-4 h-4 mr-1" />
                    <Text
                      className="text-gray-500 text-sm"
                      style={{ fontFamily: "Quicksand-Medium" }}
                    >
                      ${restaurant.deliveryFee.toFixed(2)} delivery
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
