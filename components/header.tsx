import { images } from "@/constans";
import { useLocation } from "@/hooks/useLocation";
import { useCartStore } from "@/store/cartStore";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function Header() {
  const { address, errorMsg, isLoading } = useLocation();
  const cartItemCount = useCartStore((state) => state.getCartItemCount());

  return (
    <View className="flex-row items-center justify-between p-4">
      <View>
        <Text className="color-primary base-bol">DELIVER TO</Text>
        <Text className="h3-bold">{address}</Text>
      </View>
      <TouchableOpacity
        className="w-14 h-14 bg-dark-100 rounded-full items-center justify-center relative"
        onPress={() => router.push("/(tabs)/cart")}
        activeOpacity={0.7}
      >
        <Image source={images.cartWhite} className="w-6 h-6" />
        {cartItemCount > 0 && (
          <View className="absolute -top-1 -right-1 bg-orange-500 rounded-full w-6 h-6 items-center justify-center">
            <Text
              className="text-white text-xs font-bold"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              {cartItemCount > 9 ? "9+" : cartItemCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
