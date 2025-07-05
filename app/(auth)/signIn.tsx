import SignForm from "@/components/signForm";
import { images } from "@/constans";
import { StatusBar, View } from "react-native";

export default function SingIn() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View className="flex-1 relative">
        <SignForm action="signIn" bgImage={images.loginGraphic} />
      </View>
    </View>
  );
}
