import { images } from "@/constans";
import { useCartStore } from "@/store/cartStore";
import { router } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, getCartTotal } =
    useCartStore();

  const deliveryFee = 2.99;
  const serviceFee = 1.99;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee + serviceFee;

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert("Cart Empty", "Please add items to your cart first.");
      return;
    }
    router.push("/checkout");
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => clearCart(),
        },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-4 py-6 border-b border-gray-100">
          <Text
            className="text-3xl font-bold"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Cart
          </Text>
        </View>

        <View className="flex-1 items-center justify-center px-4">
          <Image
            source={images.emptyState}
            className="w-64 h-64 mb-6"
            resizeMode="contain"
          />
          <Text
            className="text-2xl font-bold mb-2 text-center"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Your cart is empty
          </Text>
          <Text
            className="text-gray-600 text-center mb-6"
            style={{ fontFamily: "Quicksand-Regular" }}
          >
            Add items from a restaurant to start your order
          </Text>
          <TouchableOpacity
            className="bg-orange-500 rounded-xl px-8 py-4"
            onPress={() => router.push("/(tabs)/home")}
          >
            <Text
              className="text-white text-lg font-bold"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              Browse Restaurants
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-6 border-b border-gray-100 flex-row justify-between items-center">
        <Text
          className="text-3xl font-bold"
          style={{ fontFamily: "Quicksand-Bold" }}
        >
          Cart
        </Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text
            className="text-red-500 font-semibold"
            style={{ fontFamily: "Quicksand-SemiBold" }}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 300 }}
      >
        <View className="px-4 py-4">
          {items.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-2xl mb-4 border border-gray-100 p-4"
            >
              <View className="flex-row">
                <Image
                  source={item.image}
                  className="w-24 h-24 rounded-xl"
                  resizeMode="cover"
                />

                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                      <Text
                        className="text-lg font-bold"
                        style={{ fontFamily: "Quicksand-Bold" }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "Quicksand-Regular" }}
                      >
                        {item.restaurantName}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => removeItem(item.id)}
                      className="p-2"
                    >
                      <Image source={images.trash} className="w-5 h-5" />
                    </TouchableOpacity>
                  </View>

                  {item.size && (
                    <Text
                      className="text-sm text-gray-600 mb-1"
                      style={{ fontFamily: "Quicksand-Regular" }}
                    >
                      Size: {item.size}
                    </Text>
                  )}

                  {item.selectedToppings && item.selectedToppings.length > 0 && (
                    <Text
                      className="text-sm text-gray-600 mb-1"
                      style={{ fontFamily: "Quicksand-Regular" }}
                    >
                      Toppings: {item.selectedToppings.map((t) => t.name).join(", ")}
                    </Text>
                  )}

                  {item.selectedSides && item.selectedSides.length > 0 && (
                    <Text
                      className="text-sm text-gray-600 mb-1"
                      style={{ fontFamily: "Quicksand-Regular" }}
                    >
                      Sides: {item.selectedSides.map((s) => s.name).join(", ")}
                    </Text>
                  )}

                  {item.specialInstructions && (
                    <Text
                      className="text-sm text-gray-600 italic mb-2"
                      style={{ fontFamily: "Quicksand-Regular" }}
                    >
                      Note: {item.specialInstructions}
                    </Text>
                  )}

                  <View className="flex-row justify-between items-center mt-2">
                    <View className="flex-row items-center bg-gray-100 rounded-xl">
                      <TouchableOpacity
                        className="w-10 h-10 items-center justify-center"
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Image source={images.minus} className="w-5 h-5" />
                      </TouchableOpacity>

                      <Text
                        className="text-lg font-bold px-4"
                        style={{ fontFamily: "Quicksand-Bold" }}
                      >
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        className="w-10 h-10 items-center justify-center"
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Image source={images.plus} className="w-5 h-5" />
                      </TouchableOpacity>
                    </View>

                    <Text
                      className="text-xl font-bold text-orange-500"
                      style={{ fontFamily: "Quicksand-Bold" }}
                    >
                      $
                      {(
                        (item.price +
                          (item.selectedToppings?.reduce(
                            (sum, t) => sum + t.price,
                            0
                          ) || 0) +
                          (item.selectedSides?.reduce((sum, s) => sum + s.price, 0) ||
                            0)) *
                        item.quantity
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Summary */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-6 shadow-lg">
        <View className="mb-4">
          <View className="flex-row justify-between mb-2">
            <Text
              className="text-gray-600"
              style={{ fontFamily: "Quicksand-Regular" }}
            >
              Subtotal
            </Text>
            <Text
              className="font-semibold"
              style={{ fontFamily: "Quicksand-SemiBold" }}
            >
              ${subtotal.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text
              className="text-gray-600"
              style={{ fontFamily: "Quicksand-Regular" }}
            >
              Delivery Fee
            </Text>
            <Text
              className="font-semibold"
              style={{ fontFamily: "Quicksand-SemiBold" }}
            >
              ${deliveryFee.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between mb-3">
            <Text
              className="text-gray-600"
              style={{ fontFamily: "Quicksand-Regular" }}
            >
              Service Fee
            </Text>
            <Text
              className="font-semibold"
              style={{ fontFamily: "Quicksand-SemiBold" }}
            >
              ${serviceFee.toFixed(2)}
            </Text>
          </View>

          <View className="border-t border-gray-200 pt-3 flex-row justify-between">
            <Text
              className="text-lg font-bold"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              Total
            </Text>
            <Text
              className="text-2xl font-bold text-orange-500"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-orange-500 rounded-xl py-4 items-center"
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text
            className="text-white text-lg font-bold"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
