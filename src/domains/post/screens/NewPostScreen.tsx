import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import VnView from "@/vane-ui/components/organisms/VnView";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserData } from "@/hooks/useUserData";
import isRTL from "@/logic/localization";
import { Image } from "expo-image";
import { useTheme } from "@react-navigation/native";
import VnButton from "@/vane-ui/components/atoms/VnButton";
import { useCreatePost } from "@/hooks/useCreatePost";
import { router } from "expo-router";

export default function NewPostScreen() {
  const { colors } = useTheme() as any;
  const scheme = useColorScheme();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const { data: userData, isLoading: userDataLoading, error: userDataError } = useUserData();
  const { mutate: createPost, isPending: isCreatingPost, isSuccess: isPostCreated, isError: isPostCreationError } = useCreatePost();
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<Blob[]>([]);

  const handlePost = () => {
    createPost({ content, mediaFiles });
    if (isPostCreated) {
      setContent('');
      setMediaFiles([]);
      router.back();
    }
  };
  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={headerHeight} style={{ flex: 1, backgroundColor: colors.topBackgroundColor }}>
        <VnView style={styles.container} transparent>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 15, padding: 16 }}>
            <View style={styles.avatar}>
              <Image source={{ uri: userData?.avatarUrl }} contentFit="cover" cachePolicy="memory-disk" transition={250} style={styles.avatar} />
            </View>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: 'bold' }}>{userData?.displayName}</Text>
              <TextInput
                style={{ textAlign: 'right', color: colors.text, paddingEnd: 60, fontSize: 16, minHeight: 500 }}
                multiline
                placeholder={isRTL ? 'מה חדש?' : 'What\'s new?'}
                placeholderTextColor={colors.textInfo}
                enterKeyHint="done"
                keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
                cursorColor={colors.text}
                selectionColor={colors.text}
                scrollEnabled={false}
                autoFocus
                value={content}
                onChangeText={setContent}
              />
            </View>
          </View>
          <VnButton title={isRTL ? 'פרסום' : 'Post'} textColor={colors.text} avoidKeyboard onPress={handlePost} />
        </VnView>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
