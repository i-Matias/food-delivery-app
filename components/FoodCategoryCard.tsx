import { ImageValue, images } from "@/constans";
import { Image, Text, View } from "react-native";

interface FoodCategoryCardProps {
  title: string;
  price?: string;
  imageSource: ImageValue;
  imageStyle?: string;
  imagePosition?: "left" | "right";
  textPosition?: "left" | "right";
  showArrow?: boolean;
  backgroundColor: string;
}

export default function FoodCategoryCard({
  title,
  price,
  imageSource,
  imageStyle = "w-64 h-52",
  imagePosition = "left",
  textPosition = "right",
  showArrow = true,
  backgroundColor,
}: FoodCategoryCardProps) {
  const getImagePositionStyles = () => {
    if (imagePosition === "left") {
      return "absolute -left-4 top-1/2 -translate-y-1/2";
    }
    return "absolute -right-2 -bottom-6";
  };

  const getTextPositionStyles = () => {
    if (textPosition === "left") {
      return "absolute left-6 top-1/2 -translate-y-1/2 z-10";
    }
    return "absolute right-6 top-1/2 -translate-y-1/2 z-10";
  };

  return (
    <View
      className="mx-4 my-3 h-[213px] rounded-2xl shadow-lg overflow-hidden relative"
      style={{ backgroundColor, elevation: 8 }}
    >
      {!price && (
        <View
          className={`items-start justify-center ${getTextPositionStyles()}`}
        >
          <Text className="text-white font-quicksand-bold text-4xl leading-tight mb-3">
            {title.replace(" ", "\n")}
          </Text>
          {showArrow && (
            <Image source={images.arrowRight} className="w-[33px] h-[16px]" />
          )}
        </View>
      )}

      {price && (
        <>
          <View className="absolute top-6 left-6 z-10">
            <Text className="text-white font-quicksand-bold text-4xl leading-tight">
              {title.replace(" ", "\n")}
            </Text>
          </View>
          <View className="absolute bottom-6 left-6 z-10">
            <Text className="text-white text-3xl font-quicksand-bold">
              {price}
            </Text>
          </View>
        </>
      )}

      <View className={getImagePositionStyles()}>
        <Image
          source={imageSource}
          className={imageStyle}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
