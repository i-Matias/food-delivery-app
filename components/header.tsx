import { images } from "@/constans";
import { useLocation } from "@/hooks/useLocation";
import { Image, Text, View } from "react-native";

export function Header() {
  const { address, errorMsg, isLoading } = useLocation();

  return (
    <View className="flex-row items-center justify-between p-4">
      <View>
        <Text className="color-primary base-bol">DEVELIVER TO</Text>
        <Text className="h3-bold">{address}</Text>
      </View>
      <View className="w-14 h-14 bg-dark-100 rounded-full items-center justify-center">
        <Image source={images.cartWhite} className="w-6 h-6" />
      </View>
    </View>
  );
}
