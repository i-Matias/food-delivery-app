import SignForm from "@/components/SignForm";
import { images } from "@/constans";
import { useAuthStore } from "@/store/authStore";
import { StatusBar, View } from "react-native";
import Success from "../../components/Success";

export default function SignUp() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View
        className={`flex-1 relative ${isAuthenticated ? "opacity-50" : ""}`}
      >
        <SignForm action="signUp" bgImage={images.signInLogo} />
      </View>
      {isAuthenticated && <Success isSignUp={true} />}
    </View>
  );
}
