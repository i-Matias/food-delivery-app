import SignForm from "@/components/signForm";
import { images } from "@/constans";
import { StatusBar, View } from "react-native";

export default function SingUp() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View className="flex-1 relative">
        <SignForm action="signUp" bgImage={images.signInLogo} />
      </View>
    </View>
  );
}
