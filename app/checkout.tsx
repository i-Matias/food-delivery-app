import { images } from "@/constans";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { router } from "expo-router";
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

export default function Checkout() {
  const user = useAuthStore((state) => state.user);
  const { items, clearCart, getCartTotal } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);

  const [deliveryAddress, setDeliveryAddress] = useState(
    user?.user_metadata?.address1 || ""
  );
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const deliveryFee = 2.99;
  const serviceFee = 1.99;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee + serviceFee;

  const paymentMethods = [
    { id: "credit-card", name: "Credit Card", icon: images.dollar },
    { id: "cash", name: "Cash on Delivery", icon: images.dollar },
  ];

  const handlePlaceOrder = () => {
    if (!deliveryAddress) {
      Alert.alert("Error", "Please enter a delivery address");
      return;
    }

    if (items.length === 0) {
      Alert.alert("Error", "Your cart is empty");
      return;
    }

    addOrder({
      items,
      subtotal,
      deliveryFee,
      serviceFee,
      total,
      deliveryAddress,
      paymentMethod:
        paymentMethods.find((m) => m.id === paymentMethod)?.name ||
        "Credit Card",
    });

    clearCart();
    router.replace("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
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
          <TouchableOpacity
            className="bg-orange-500 rounded-xl px-8 py-4 mt-4"
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
      {/* Header */}
      <View className="px-4 py-6 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Image source={images.arrowBack} className="w-6 h-6" />
        </TouchableOpacity>
        <Text
          className="text-3xl font-bold"
          style={{ fontFamily: "Quicksand-Bold" }}
        >
          Checkout
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 250 }}
      >
        {/* Delivery Address */}
        <View className="px-4 py-6 border-b border-gray-100">
          <Text
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Delivery Address
          </Text>

          <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-3">
            <Image source={images.location} className="w-5 h-5 mr-3" />
            <TextInput
              className="flex-1 text-base"
              style={{ fontFamily: "Quicksand-Regular" }}
              placeholder="Enter delivery address..."
              placeholderTextColor="#9CA3AF"
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
              multiline
            />
          </View>

          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-base"
            style={{ fontFamily: "Quicksand-Regular" }}
            placeholder="Delivery notes (optional)..."
            placeholderTextColor="#9CA3AF"
            value={deliveryNotes}
            onChangeText={setDeliveryNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Payment Method */}
        <View className="px-4 py-6 border-b border-gray-100">
          <Text
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Payment Method
          </Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              className={`flex-row items-center justify-between p-4 rounded-xl mb-3 border-2 ${
                paymentMethod === method.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white"
              }`}
              onPress={() => setPaymentMethod(method.id)}
            >
              <View className="flex-row items-center">
                <Image source={method.icon} className="w-6 h-6 mr-3" />
                <Text
                  className={`text-base font-semibold ${
                    paymentMethod === method.id
                      ? "text-orange-500"
                      : "text-gray-700"
                  }`}
                  style={{ fontFamily: "Quicksand-SemiBold" }}
                >
                  {method.name}
                </Text>
              </View>

              {paymentMethod === method.id && (
                <Image source={images.check} className="w-6 h-6" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Summary */}
        <View className="px-4 py-6">
          <Text
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Order Summary
          </Text>

          {items.map((item) => (
            <View key={item.id} className="flex-row mb-4">
              <Image
                source={item.image}
                className="w-16 h-16 rounded-xl"
                resizeMode="cover"
              />
              <View className="flex-1 ml-3">
                <Text
                  className="font-semibold mb-1"
                  style={{ fontFamily: "Quicksand-SemiBold" }}
                >
                  {item.name} × {item.quantity}
                </Text>
                <Text
                  className="text-sm text-gray-500"
                  style={{ fontFamily: "Quicksand-Regular" }}
                >
                  {item.restaurantName}
                </Text>
              </View>
              <Text
                className="font-bold text-orange-500"
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

          <View className="border-t border-gray-200 pt-3 flex-row justify-between mb-4">
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
          onPress={handlePlaceOrder}
          activeOpacity={0.8}
        >
          <Text
            className="text-white text-lg font-bold"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
