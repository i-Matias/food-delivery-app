import { images } from "@/constans";
import { useOrderStore } from "@/store/orderStore";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderHistory() {
  const orders = useOrderStore((state) => state.orders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500";
      case "preparing":
        return "bg-yellow-500";
      case "on-the-way":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (orders.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-4 py-6 border-b border-gray-100 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Image source={images.arrowBack} className="w-6 h-6" />
          </TouchableOpacity>
          <Text
            className="text-3xl font-bold"
            style={{ fontFamily: "Quicksand-Bold" }}
          >
            Order History
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
            No orders yet
          </Text>
          <Text
            className="text-gray-600 text-center mb-6"
            style={{ fontFamily: "Quicksand-Regular" }}
          >
            Start ordering to see your order history here
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
      <View className="px-4 py-6 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Image source={images.arrowBack} className="w-6 h-6" />
        </TouchableOpacity>
        <Text
          className="text-3xl font-bold"
          style={{ fontFamily: "Quicksand-Bold" }}
        >
          Order History
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 py-4">
          {orders.map((order) => (
            <TouchableOpacity
              key={order.id}
              className="bg-white rounded-2xl mb-4 border border-gray-100 p-4"
              activeOpacity={0.7}
            >
              {/* Order Header */}
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <Text
                    className="font-bold text-lg mb-1"
                    style={{ fontFamily: "Quicksand-Bold" }}
                  >
                    {order.id}
                  </Text>
                  <View className="flex-row items-center">
                    <Image source={images.clock} className="w-4 h-4 mr-1" />
                    <Text
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Quicksand-Regular" }}
                    >
                      {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                    </Text>
                  </View>
                </View>

                <View className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  <Text
                    className="text-white font-semibold text-sm capitalize"
                    style={{ fontFamily: "Quicksand-SemiBold" }}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>

              {/* Order Items Preview */}
              <View className="border-t border-gray-100 pt-3 mb-3">
                {order.items.slice(0, 2).map((item) => (
                  <View key={item.id} className="flex-row items-center mb-2">
                    <Image
                      source={item.image}
                      className="w-12 h-12 rounded-lg"
                      resizeMode="cover"
                    />
                    <View className="flex-1 ml-3">
                      <Text
                        className="font-semibold"
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
                  </View>
                ))}

                {order.items.length > 2 && (
                  <Text
                    className="text-sm text-gray-500 mt-1"
                    style={{ fontFamily: "Quicksand-Regular" }}
                  >
                    +{order.items.length - 2} more item{order.items.length - 2 > 1 ? "s" : ""}
                  </Text>
                )}
              </View>

              {/* Order Footer */}
              <View className="border-t border-gray-100 pt-3 flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Image source={images.bag} className="w-5 h-5 mr-2" />
                  <Text
                    className="text-gray-600"
                    style={{ fontFamily: "Quicksand-Medium" }}
                  >
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </Text>
                </View>

                <Text
                  className="text-xl font-bold text-orange-500"
                  style={{ fontFamily: "Quicksand-Bold" }}
                >
                  ${order.total.toFixed(2)}
                </Text>
              </View>

              {/* Reorder Button */}
              {order.status === "delivered" && (
                <TouchableOpacity
                  className="mt-3 bg-orange-500 rounded-xl py-3 items-center"
                  onPress={() => {
                    // In a real app, this would add all items back to cart
                    router.push("/(tabs)/home");
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    className="text-white font-bold"
                    style={{ fontFamily: "Quicksand-Bold" }}
                  >
                    Reorder
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
