import { images, restaurants } from "@/constans";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RestaurantDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = restaurants.find((r) => r.id === id);
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (!restaurant) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl" style={{ fontFamily: "Quicksand-Bold" }}>
            Restaurant not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const filteredMenuItems =
    selectedCategory === "All"
      ? restaurant.menuItems
      : restaurant.menuItems.filter(
          (item) => item.category === selectedCategory
        );

  const categories = [
    "All",
    ...Array.from(new Set(restaurant.menuItems.map((item) => item.category))),
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Image */}
        <View className="relative">
          <Image
            source={restaurant.image}
            className="w-full h-64"
            resizeMode="cover"
          />
          <TouchableOpacity
            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg"
            onPress={() => router.back()}
          >
            <Image source={images.arrowBack} className="w-6 h-6" />
          </TouchableOpacity>
        </View>

        {/* Restaurant Info */}
        <View className="px-4 py-6 border-b border-gray-100">
          <View className="flex-row justify-between items-start mb-3">
            <View className="flex-1">
              <Text
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: "Quicksand-Bold" }}
              >
                {restaurant.name}
              </Text>
              <Text
                className="text-gray-600 text-base"
                style={{ fontFamily: "Quicksand-Regular" }}
              >
                {restaurant.description}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center space-x-6">
            <View className="flex-row items-center">
              <Image source={images.star} className="w-5 h-5 mr-2" />
              <Text
                className="text-lg font-semibold"
                style={{ fontFamily: "Quicksand-SemiBold" }}
              >
                {restaurant.rating}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Image source={images.clock} className="w-5 h-5 mr-2" />
              <Text
                className="text-gray-600"
                style={{ fontFamily: "Quicksand-Medium" }}
              >
                {restaurant.deliveryTime}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Image source={images.dollar} className="w-5 h-5 mr-2" />
              <Text
                className="text-gray-600"
                style={{ fontFamily: "Quicksand-Medium" }}
              >
                ${restaurant.deliveryFee.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-4 border-b border-gray-100"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`mr-3 px-6 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-orange-500"
                  : "bg-gray-100"
              }`}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                className={`font-semibold ${
                  selectedCategory === category ? "text-white" : "text-gray-700"
                }`}
                style={{ fontFamily: "Quicksand-SemiBold" }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Items */}
        <View className="px-4 py-4">
          <Text
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Menu
          </Text>

          {filteredMenuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row bg-white rounded-2xl mb-4 border border-gray-100 overflow-hidden"
              onPress={() =>
                router.push({
                  pathname: "/food-item/[id]",
                  params: { id: item.id, restaurantId: restaurant.id },
                })
              }
              activeOpacity={0.7}
            >
              <Image
                source={item.image}
                className="w-28 h-28"
                resizeMode="cover"
              />
              <View className="flex-1 p-4 justify-between">
                <View>
                  <Text
                    className="text-lg font-bold mb-1"
                    style={{ fontFamily: "Quicksand-Bold" }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    className="text-gray-600 text-sm"
                    style={{ fontFamily: "Quicksand-Regular" }}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center mt-2">
                  <Text
                    className="text-xl font-bold text-orange-500"
                    style={{ fontFamily: "Quicksand-Bold" }}
                  >
                    ${item.price.toFixed(2)}
                  </Text>

                  <View className="flex-row items-center">
                    <Image source={images.star} className="w-4 h-4 mr-1" />
                    <Text
                      className="text-gray-600 text-sm"
                      style={{ fontFamily: "Quicksand-Medium" }}
                    >
                      {item.rating}
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
