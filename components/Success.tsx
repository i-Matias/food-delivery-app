import { images } from "@/constans";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const unstable_settings = {
  presentation: "modal",
  gestureEnabled: false,
};

const { height: screenHeight } = Dimensions.get("window");

interface SuccessProps {
  isSignUp?: boolean;
}

function Success({ isSignUp = false }: SuccessProps) {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuthStore();

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleGoToHomepage = () => {
    // Animate out before navigating
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace("/(tabs)/home");
    });
  };

  const successTitle = isSignUp
    ? "Account Created Successfully!"
    : "Login Successful";
  const successMessage = isSignUp
    ? `Welcome ${user?.user_metadata?.full_name || "aboard"}! Your account has been created and you're ready to start ordering.`
    : "You're all set to continue where you left off.";

  return (
    <View className="flex-1">
      {/* Background Overlay */}
      <Animated.View
        className="absolute inset-0 bg-black/50 "
        style={{ opacity: fadeAnim }}
      />

      {/* Full Height Container */}
      <View className="flex-1">
        <Animated.View
          className="bg-white flex-1"
          style={{
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View className="items-center pt-4 pb-8">
            <View className="w-12 h-1.5 bg-gray-200 rounded-full" />
          </View>

          <View className="px-6 flex-1 justify-center pb-16">
            {/* Success Icon with enhanced styling */}
            <View className="mb-8 items-center">
              <Image
                source={images.success}
                className="w-32 h-32 mb-2"
                resizeMode="contain"
              />
            </View>

            {/* Success Text with improved typography */}
            <View className="mb-12">
              <Text className="text-3xl font-quicksand-bold text-gray-900 mb-3 text-center">
                {successTitle}
              </Text>
              <Text className="text-lg font-quicksand-regular text-gray-600 text-center leading-7 px-4">
                {successMessage}
              </Text>
            </View>

            {/* Enhanced Action Button */}
            <View className="px-4 mb-12">
              <TouchableOpacity
                className="bg-orange-500 py-4 px-8 rounded-2xl w-full shadow-lg"
                style={{
                  shadowColor: "#FF6B35",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
                onPress={handleGoToHomepage}
              >
                <Text className="text-white font-quicksand-bold text-lg text-center">
                  Go to Homepage
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

export default Success;
