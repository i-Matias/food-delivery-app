import { images, restaurants, sides, toppings } from "@/constans";
import { useCartStore } from "@/store/cartStore";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FoodItemDetail() {
  const { id, restaurantId } = useLocalSearchParams<{
    id: string;
    restaurantId: string;
  }>();

  const restaurant = restaurants.find((r) => r.id === restaurantId);
  const menuItem = restaurant?.menuItems.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    menuItem?.sizes?.[0]?.name || ""
  );
  const [selectedToppings, setSelectedToppings] = useState<
    Array<{ name: string; price: number }>
  >([]);
  const [selectedSides, setSelectedSides] = useState<
    Array<{ name: string; price: number }>
  >([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  if (!menuItem || !restaurant) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl" style={{ fontFamily: "Quicksand-Bold" }}>
            Item not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const toggleTopping = (topping: { name: string; price: number }) => {
    const exists = selectedToppings.find((t) => t.name === topping.name);
    if (exists) {
      setSelectedToppings(selectedToppings.filter((t) => t.name !== topping.name));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const toggleSide = (side: { name: string; price: number }) => {
    const exists = selectedSides.find((s) => s.name === side.name);
    if (exists) {
      setSelectedSides(selectedSides.filter((s) => s.name !== side.name));
    } else {
      setSelectedSides([...selectedSides, side]);
    }
  };

  const calculateTotal = () => {
    const sizePrice =
      menuItem.sizes?.find((s) => s.name === selectedSize)?.price || 0;
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    const sidesPrice = selectedSides.reduce((sum, s) => sum + s.price, 0);
    return (menuItem.price + sizePrice + toppingsPrice + sidesPrice) * quantity;
  };

  const handleAddToCart = () => {
    addItem({
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price + (menuItem.sizes?.find((s) => s.name === selectedSize)?.price || 0),
      quantity,
      image: menuItem.image,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      selectedToppings,
      selectedSides,
      specialInstructions,
      size: selectedSize || undefined,
    });

    Alert.alert("Success", "Item added to cart!", [
      {
        text: "View Cart",
        onPress: () => router.push("/(tabs)/cart"),
      },
      {
        text: "Continue Shopping",
        onPress: () => router.back(),
        style: "cancel",
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header Image */}
        <View className="relative">
          <Image
            source={menuItem.image}
            className="w-full h-80"
            resizeMode="cover"
          />
          <TouchableOpacity
            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg"
            onPress={() => router.back()}
          >
            <Image source={images.arrowBack} className="w-6 h-6" />
          </TouchableOpacity>
        </View>

        {/* Item Info */}
        <View className="px-4 py-6">
          <View className="flex-row justify-between items-start mb-3">
            <View className="flex-1">
              <Text
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: "Quicksand-Bold" }}
              >
                {menuItem.name}
              </Text>
              <Text
                className="text-gray-600 text-base mb-3"
                style={{ fontFamily: "Quicksand-Regular" }}
              >
                {menuItem.description}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center space-x-6 mb-6">
            <View className="flex-row items-center">
              <Image source={images.star} className="w-5 h-5 mr-2" />
              <Text
                className="text-lg font-semibold"
                style={{ fontFamily: "Quicksand-SemiBold" }}
              >
                {menuItem.rating}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Image source={images.clock} className="w-5 h-5 mr-2" />
              <Text
                className="text-gray-600"
                style={{ fontFamily: "Quicksand-Medium" }}
              >
                {menuItem.preparationTime}
              </Text>
            </View>
          </View>

          {/* Size Selection */}
          {menuItem.sizes && menuItem.sizes.length > 0 && (
            <View className="mb-6">
              <Text
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "Quicksand-Bold" }}
              >
                Select Size
              </Text>
              <View className="flex-row flex-wrap gap-3">
                {menuItem.sizes.map((size) => (
                  <TouchableOpacity
                    key={size.name}
                    className={`px-6 py-3 rounded-xl border-2 ${
                      selectedSize === size.name
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 bg-white"
                    }`}
                    onPress={() => setSelectedSize(size.name)}
                  >
                    <Text
                      className={`font-semibold ${
                        selectedSize === size.name
                          ? "text-orange-500"
                          : "text-gray-700"
                      }`}
                      style={{ fontFamily: "Quicksand-SemiBold" }}
                    >
                      {size.name}
                      {size.price > 0 && ` (+$${size.price.toFixed(2)})`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Toppings Selection */}
          <View className="mb-6">
            <Text
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              Add Toppings
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {toppings.map((topping) => {
                const isSelected = selectedToppings.some(
                  (t) => t.name === topping.name
                );
                return (
                  <TouchableOpacity
                    key={topping.name}
                    className={`flex-row items-center px-4 py-3 rounded-xl border-2 ${
                      isSelected
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 bg-white"
                    }`}
                    onPress={() => toggleTopping(topping)}
                  >
                    <Image source={topping.image} className="w-8 h-8 mr-2" />
                    <View>
                      <Text
                        className={`font-semibold ${
                          isSelected ? "text-orange-500" : "text-gray-700"
                        }`}
                        style={{ fontFamily: "Quicksand-SemiBold" }}
                      >
                        {topping.name}
                      </Text>
                      <Text
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "Quicksand-Regular" }}
                      >
                        +${topping.price.toFixed(2)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Sides Selection */}
          <View className="mb-6">
            <Text
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              Add Sides
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {sides.map((side) => {
                const isSelected = selectedSides.some((s) => s.name === side.name);
                return (
                  <TouchableOpacity
                    key={side.name}
                    className={`flex-row items-center px-4 py-3 rounded-xl border-2 ${
                      isSelected
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 bg-white"
                    }`}
                    onPress={() => toggleSide(side)}
                  >
                    <Image source={side.image} className="w-8 h-8 mr-2" />
                    <View>
                      <Text
                        className={`font-semibold ${
                          isSelected ? "text-orange-500" : "text-gray-700"
                        }`}
                        style={{ fontFamily: "Quicksand-SemiBold" }}
                      >
                        {side.name}
                      </Text>
                      <Text
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "Quicksand-Regular" }}
                      >
                        +${side.price.toFixed(2)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Special Instructions */}
          <View className="mb-6">
            <Text
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              Special Instructions
            </Text>
            <TextInput
              className="border-2 border-gray-200 rounded-xl p-4 text-base"
              style={{ fontFamily: "Quicksand-Regular" }}
              placeholder="Add any special requests..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
            />
          </View>

          {/* Quantity Selector */}
          <View className="mb-6">
            <Text
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              Quantity
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Image source={images.minus} className="w-6 h-6" />
              </TouchableOpacity>

              <Text
                className="text-2xl font-bold mx-8"
                style={{ fontFamily: "Quicksand-Bold" }}
              >
                {quantity}
              </Text>

              <TouchableOpacity
                className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center"
                onPress={() => setQuantity(quantity + 1)}
              >
                <Image source={images.plus} className="w-6 h-6" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
        <View className="flex-row items-center justify-between mb-3">
          <Text
            className="text-gray-600"
            style={{ fontFamily: "Quicksand-Medium" }}
          >
            Total
          </Text>
          <Text
            className="text-3xl font-bold text-orange-500"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            ${calculateTotal().toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-orange-500 rounded-xl py-4 items-center"
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text
            className="text-white text-lg font-bold"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
