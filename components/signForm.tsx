import { images, ImageValue } from "@/constans";
import { SignFormPayload, useAuthStore } from "@/store/authStore";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SignFormProps {
  action: "signUp" | "signIn";
  bgImage: ImageValue;
}

export default function SignForm({ action, bgImage }: SignFormProps) {
  const [signForm, setSignForm] = useState<SignFormPayload>({
    email: "",
    password: "",
    fullName: "",
  });
  const insets = useSafeAreaInsets();

  const { signIn, signUp } = useAuthStore();

  const handleSignAction = async () => {
    console.log(
      "handleSignAction called with action:",
      action,
      "and form data:",
      signForm
    );

    if (action === "signUp") {
      await signUp({
        email: signForm.email,
        password: signForm.password,
        fullName: signForm.fullName,
      });
    } else {
      await signIn({
        email: signForm.email,
        password: signForm.password,
      });
    }
    router.replace("/(tabs)/home");
  };

  return (
    <>
      <ImageBackground
        source={bgImage}
        className="w-full absolute top-0 left-0 right-0"
        style={{ height: 393 + insets.top }}
        resizeMode="cover"
      />
      <View
        className="absolute left-0 right-0 bottom-0"
        style={{ top: insets.top + 65 }}
      >
        <View className="bg-white rounded-t-3xl px-6 pt-16 mt-72">
          {action === "signUp" && (
            <View className="mb-6">
              <Text className="label mb-2">Email address</Text>
              <TextInput
                value={signForm.fullName}
                onChangeText={(text) =>
                  setSignForm((prev) => ({ ...prev, fullName: text }))
                }
                className="input bg-white-100"
                placeholder="Enter your full name"
                autoCapitalize="none"
              />
            </View>
          )}
          <View className="mb-6">
            <Text className="label mb-2">Email address</Text>
            <TextInput
              value={signForm.email}
              onChangeText={(text) =>
                setSignForm((prev) => ({ ...prev, email: text }))
              }
              className="input bg-white-100"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-8">
            <Text className="label mb-2">Password</Text>
            <TextInput
              value={signForm.password}
              onChangeText={(text) =>
                setSignForm((prev) => ({ ...prev, password: text }))
              }
              className="input bg-white-100"
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="custom-btn mb-6"
            onPress={handleSignAction}
          >
            <Text className="text-white base-bold">
              {action === "signUp" ? "Sign Up" : "Sign In"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center justify-center mt-4">
            <Text className="body-regular text-gray-100">
              {action === "signUp"
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
            </Text>
            <Link
              href={action === "signUp" ? "/(auth)/signIn" : "/(auth)/signUp"}
              asChild
            >
              <Text className="body-regular text-primary font-quicksand-semibold">
                {action === "signUp" ? "Sign In" : "Sign Up"}
              </Text>
            </Link>
          </View>
        </View>

        <View className="absolute top-64 left-0 right-0 flex-center">
          <View className="w-20 h-20 bg-primary rounded-xl flex-center shadow-lg">
            <Image
              source={images.logo}
              className="w-[150px] h-[150px]"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </>
  );
}
