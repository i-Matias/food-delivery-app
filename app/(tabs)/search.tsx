import { CATEGORIES, images, restaurants } from "@/constans";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      restaurant.categories.some(
        (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
      );

    return matchesSearch && matchesCategory;
  });

  const allMenuItems = restaurants.flatMap((restaurant) =>
    restaurant.menuItems.map((item) => ({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    }))
  );

  const filteredMenuItems = allMenuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-6 border-b border-gray-100">
        <Text
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: "Quicksand-Bold" }}
        >
          Search
        </Text>

        {/* Search Input */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Image source={images.search} className="w-5 h-5 mr-3" />
          <TextInput
            className="flex-1 text-base"
            style={{ fontFamily: "Quicksand-Regular" }}
            placeholder="Search for restaurants or dishes..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-4 border-b border-gray-100"
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            className={`mr-3 px-6 py-2 rounded-full ${
              selectedCategory === category.name
                ? "bg-orange-500"
                : "bg-gray-100"
            }`}
            onPress={() => setSelectedCategory(category.name)}
          >
            <Text
              className={`font-semibold ${
                selectedCategory === category.name
                  ? "text-white"
                  : "text-gray-700"
              }`}
              style={{ fontFamily: "Quicksand-SemiBold" }}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Restaurants Section */}
        {filteredRestaurants.length > 0 && (
          <View className="px-4 py-4">
            <Text
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              Restaurants ({filteredRestaurants.length})
            </Text>

            {filteredRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100"
                onPress={() => router.push(`/restaurant/${restaurant.id}`)}
                activeOpacity={0.7}
              >
                <Image
                  source={restaurant.image}
                  className="w-full h-40 rounded-t-2xl"
                  resizeMode="cover"
                />
                <View className="p-4">
                  <View className="flex-row justify-between items-start mb-2">
                    <Text
                      className="text-lg font-bold flex-1"
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
                    className="text-gray-600 mb-2"
                    style={{ fontFamily: "Quicksand-Regular" }}
                    numberOfLines={2}
                  >
                    {restaurant.description}
                  </Text>

                  <View className="flex-row items-center">
                    <Image source={images.clock} className="w-4 h-4 mr-1" />
                    <Text
                      className="text-gray-500 text-sm"
                      style={{ fontFamily: "Quicksand-Medium" }}
                    >
                      {restaurant.deliveryTime}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Menu Items Section */}
        {filteredMenuItems.length > 0 && (
          <View className="px-4 py-4">
            <Text
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              Menu Items ({filteredMenuItems.length})
            </Text>

            {filteredMenuItems.map((item) => (
              <TouchableOpacity
                key={`${item.restaurantId}-${item.id}`}
                className="flex-row bg-white rounded-2xl mb-4 border border-gray-100 overflow-hidden"
                onPress={() =>
                  router.push({
                    pathname: "/food-item/[id]",
                    params: { id: item.id, restaurantId: item.restaurantId },
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
                      className="text-sm text-gray-500 mb-1"
                      style={{ fontFamily: "Quicksand-Regular" }}
                    >
                      {item.restaurantName}
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
        )}

        {/* No Results */}
        {filteredRestaurants.length === 0 && filteredMenuItems.length === 0 && (
          <View className="flex-1 items-center justify-center px-4 py-20">
            <Image
              source={images.emptyState}
              className="w-48 h-48 mb-6"
              resizeMode="contain"
            />
            <Text
              className="text-2xl font-bold mb-2 text-center"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              No results found
            </Text>
            <Text
              className="text-gray-600 text-center"
              style={{ fontFamily: "Quicksand-Regular" }}
            >
              Try searching for something else
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
