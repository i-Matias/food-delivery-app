import { images } from "@/constans";
import { useOrderStore } from "@/store/orderStore";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderConfirmation() {
  const currentOrder = useOrderStore((state) => state.currentOrder);
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      2,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  if (!currentOrder) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-4">
          <Text
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            No order found
          </Text>
          <TouchableOpacity
            className="bg-orange-500 rounded-xl px-8 py-4"
            onPress={() => router.push("/(tabs)/home")}
          >
            <Text
              className="text-white text-lg font-bold"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              Go to Home
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const estimatedTime = currentOrder.estimatedDeliveryTime
    ? new Date(currentOrder.estimatedDeliveryTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "30-40 min";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Success Animation */}
        <View className="items-center justify-center py-12">
          <Animated.View style={animatedStyle}>
            <Image
              source={images.success}
              className="w-40 h-40"
              resizeMode="contain"
            />
          </Animated.View>

          <Text
            className="text-3xl font-bold mt-6 mb-2"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Order Confirmed!
          </Text>

          <Text
            className="text-gray-600 text-center px-8"
            style={{ fontFamily: "Quicksand-Regular" }}
          >
            Your order has been placed successfully
          </Text>
        </View>

        {/* Order Details Card */}
        <View className="mx-4 bg-orange-50 rounded-2xl p-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text
              className="text-gray-600"
              style={{ fontFamily: "Quicksand-Medium" }}
            >
              Order ID
            </Text>
            <Text
              className="font-bold"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              {currentOrder.id}
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-4">
            <Text
              className="text-gray-600"
              style={{ fontFamily: "Quicksand-Medium" }}
            >
              Status
            </Text>
            <View className="bg-orange-500 px-4 py-2 rounded-full">
              <Text
                className="text-white font-semibold capitalize"
                style={{ fontFamily: "Quicksand-SemiBold" }}
              >
                {currentOrder.status}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <Text
              className="text-gray-600"
              style={{ fontFamily: "Quicksand-Medium" }}
            >
              Estimated Delivery
            </Text>
            <View className="flex-row items-center">
              <Image source={images.clock} className="w-5 h-5 mr-2" />
              <Text
                className="font-bold text-orange-600"
                style={{ fontFamily: "Quicksand-Bold" }}
              >
                {estimatedTime}
              </Text>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View className="px-4 mb-6">
          <Text
            className="text-xl font-bold mb-3"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Delivery Address
          </Text>
          <View className="bg-gray-50 rounded-2xl p-4 flex-row items-start">
            <Image source={images.location} className="w-5 h-5 mr-3 mt-1" />
            <Text
              className="flex-1 text-gray-700"
              style={{ fontFamily: "Quicksand-Regular" }}
            >
              {currentOrder.deliveryAddress}
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View className="px-4 mb-6">
          <Text
            className="text-xl font-bold mb-3"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Payment Method
          </Text>
          <View className="bg-gray-50 rounded-2xl p-4 flex-row items-center">
            <Image source={images.dollar} className="w-5 h-5 mr-3" />
            <Text
              className="text-gray-700"
              style={{ fontFamily: "Quicksand-Regular" }}
            >
              {currentOrder.paymentMethod}
            </Text>
          </View>
        </View>

        {/* Order Items */}
        <View className="px-4 mb-6">
          <Text
            className="text-xl font-bold mb-3"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Order Items
          </Text>

          {currentOrder.items.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center bg-gray-50 rounded-2xl p-4 mb-3"
            >
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
                  {item.name}
                </Text>
                <Text
                  className="text-sm text-gray-500"
                  style={{ fontFamily: "Quicksand-Regular" }}
                >
                  Qty: {item.quantity}
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

        {/* Order Summary */}
        <View className="px-4 mb-6">
          <Text
            className="text-xl font-bold mb-3"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Order Summary
          </Text>

          <View className="bg-gray-50 rounded-2xl p-4">
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
                ${currentOrder.subtotal.toFixed(2)}
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
                ${currentOrder.deliveryFee.toFixed(2)}
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
                ${currentOrder.serviceFee.toFixed(2)}
              </Text>
            </View>

            <View className="border-t border-gray-300 pt-3 flex-row justify-between">
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
                ${currentOrder.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-6 shadow-lg">
        <TouchableOpacity
          className="bg-orange-500 rounded-xl py-4 items-center mb-3"
          onPress={() => router.push("/order-history")}
          activeOpacity={0.8}
        >
          <Text
            className="text-white text-lg font-bold"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            View Order History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-100 rounded-xl py-4 items-center"
          onPress={() => router.push("/(tabs)/home")}
          activeOpacity={0.8}
        >
          <Text
            className="text-gray-700 text-lg font-bold"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
