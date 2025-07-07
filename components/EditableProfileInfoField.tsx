import { ImageValue } from "@/constans";
import { Image, Text, TextInput, View } from "react-native";

interface EditableProfileInfoFieldProps {
  image: ImageValue;
  label: string;
  value: string;
  isEditing: boolean;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
}

export default function EditableProfileInfoField({
  image,
  label,
  value,
  isEditing,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: EditableProfileInfoFieldProps) {
  return (
    <View className="flex-row items-center space-x-4 py-4 gap-4">
      <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center">
        <Image source={image} className="w-5 h-5 tint-orange-500" />
      </View>
      <View className="flex-1">
        <Text className="text-sm text-gray-500 mb-1">{label}</Text>
        {isEditing ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            className="text-lg font-medium text-gray-900 border-b border-gray-300 pb-1"
            keyboardType={keyboardType}
          />
        ) : (
          <Text className="text-lg font-medium text-gray-900">
            {value || "-"}
          </Text>
        )}
      </View>
    </View>
  );
}
