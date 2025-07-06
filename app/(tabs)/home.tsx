import FoodCategoryCard from "@/components/FoodCategoryCard";
import { Header } from "@/components/header";
import { images } from "@/constans";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <FoodCategoryCard
          title="SUMMER COMBO"
          price="$10.88"
          imageSource={images.burgerOne}
          imageStyle="w-80 h-72"
          imagePosition="right"
          backgroundColor="#D33B0D"
          showArrow={false}
        />

        <FoodCategoryCard
          title="BURGERS"
          imageSource={images.burgerTwo}
          imagePosition="left"
          textPosition="right"
          backgroundColor="#EB920C"
        />

        <FoodCategoryCard
          title="PIZZA"
          imageSource={images.pizzaOne}
          imageStyle="w-[256px] h-[256px]"
          imagePosition="right"
          textPosition="left"
          backgroundColor="#084137"
        />

        <FoodCategoryCard
          title="BURITTO"
          imageSource={images.buritto}
          imagePosition="left"
          textPosition="right"
          backgroundColor="#EB920C"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
