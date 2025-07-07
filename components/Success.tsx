import { images } from "@/constans";
import { useAuthStore } from "@/store/authStore";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

interface SuccessProps {
  isSignUp?: boolean;
}

export default function Success({ isSignUp = false }: SuccessProps) {
  const [screenHeight] = useState(() => Dimensions.get("window").height);
  const slideAnim = useRef(new Animated.Value(screenHeight * 0.5)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuthStore();
  const animationStarted = useRef(false);

  const startEnterAnimation = useCallback(() => {
    if (animationStarted.current) return;
    animationStarted.current = true;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    const timer = setTimeout(startEnterAnimation, 50);
    return () => clearTimeout(timer);
  }, [startEnterAnimation]);

  const handleGoToHomepage = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: screenHeight * 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace("/(tabs)/home");
    });
  }, [fadeAnim, slideAnim, screenHeight]);

  const successContent = useMemo(() => {
    const title = isSignUp
      ? "Account Created Successfully!"
      : "Login Successful";
    const message = isSignUp
      ? `Welcome ${user?.user_metadata?.full_name || "aboard"}! Your account has been created and you're ready to start ordering.`
      : "You're all set to continue where you left off.";

    return { title, message };
  }, [isSignUp, user?.user_metadata?.full_name]);

  return (
    <View className="flex-1">
      <BlurView intensity={20} tint="dark" className="absolute inset-0">
        <Animated.View
          className="absolute inset-0 bg-black/30"
          style={{ opacity: fadeAnim }}
        />
      </BlurView>

      <View className="flex-1 justify-end">
        <Animated.View
          className="bg-white rounded-t-3xl"
          style={{
            height: screenHeight * 0.5,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View className="items-center pt-4 pb-6">
            <View className="w-12 h-1.5 bg-gray-200 rounded-full" />
          </View>

          <View className="px-6 flex-1 justify-center pb-8">
            <View className="mb-6 items-center">
              <Image
                source={images.success}
                className="w-24 h-24 mb-2"
                resizeMode="contain"
              />
            </View>

            <View className="mb-8">
              <Text className="text-2xl font-quicksand-bold text-gray-900 mb-2 text-center">
                {successContent.title}
              </Text>
              <Text className="text-base font-quicksand-regular text-gray-600 text-center leading-6 px-2">
                {successContent.message}
              </Text>
            </View>

            <View className="px-4">
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
