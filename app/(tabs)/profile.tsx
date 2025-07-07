import EditableProfileInfoField from "@/components/EditableProfileInfoField";
import { images } from "@/constans";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user, signOut, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata.full_name || "",
    phone: user?.user_metadata.phone || "",
    address1: user?.user_metadata.address1 || "",
    address2: user?.user_metadata.address2 || "",
  });

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/(auth)/signIn");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({
        full_name: user?.user_metadata.full_name || "",
        phone: user?.user_metadata.phone || "",
        address1: user?.user_metadata.address1 || "",
        address2: user?.user_metadata.address2 || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center justify-between py-4 px-6">
        <TouchableOpacity>
          <Image source={images.arrowBack} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900">Profile</Text>
        <TouchableOpacity>
          <Image source={images.search} className="w-6 h-6" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="items-center py-8">
          <View className="relative">
            <Image
              source={user?.user_metadata.profile ?? images.person}
              className="w-24 h-24 rounded-full"
            />
            <View className="absolute -bottom-1 -right-1 bg-orange-500 rounded-full p-2">
              <Image source={images.pencil} className="w-4 h-4 tint-white" />
            </View>
          </View>
        </View>

        <View className="px-2">
          <EditableProfileInfoField
            image={images.person}
            label="Full Name"
            value={
              isEditing
                ? formData.full_name
                : (user?.user_metadata.full_name ?? "-")
            }
            isEditing={isEditing}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, full_name: text }))
            }
          />

          <EditableProfileInfoField
            image={images.envelope}
            label="Email"
            value={user?.email ?? "-"}
            isEditing={false}
          />

          <EditableProfileInfoField
            image={images.phone}
            label="Phone Number"
            value={
              isEditing ? formData.phone : (user?.user_metadata.phone ?? "-")
            }
            isEditing={isEditing}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, phone: text }))
            }
            keyboardType="phone-pad"
          />

          <EditableProfileInfoField
            image={images.location}
            label="Address 1 - (Home)"
            value={
              isEditing
                ? formData.address1
                : (user?.user_metadata.address1 ?? "-")
            }
            isEditing={isEditing}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, address1: text }))
            }
          />

          <EditableProfileInfoField
            image={images.location}
            label="Address 2 - (Work)"
            value={
              isEditing
                ? formData.address2
                : (user?.user_metadata.address2 ?? "-")
            }
            isEditing={isEditing}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, address2: text }))
            }
          />
        </View>

        <View className="mt-8 space-y-4 gap-4">
          {isEditing ? (
            <>
              <TouchableOpacity
                className="bg-green-100 border border-green-500 py-4 px-6 rounded-2xl"
                onPress={handleSave}
                disabled={isLoading}
              >
                <Text className="text-green-700 text-center text-lg font-semibold">
                  {isLoading ? "Saving..." : "Save Changes"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-gray-100 border border-gray-500 py-4 px-6 rounded-2xl"
                onPress={handleEditToggle}
                disabled={isLoading}
              >
                <Text className="text-gray-700 text-center text-lg font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              className="bg-orange-100 border border-orange-500 py-4 px-6 rounded-2xl"
              onPress={handleEditToggle}
            >
              <Text className="color-primary text-center text-lg font-semibold">
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="border border-red-500 py-4 px-6 rounded-2xl flex-row items-center justify-center space-x-2"
            onPress={handleLogout}
            disabled={isEditing}
          >
            <Image source={images.logout} className="w-5 h-5 tint-red-500" />
            <Text className="color-white-200 text-lg font-semibold">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
