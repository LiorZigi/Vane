import { useCurrentUserId } from "@/hooks/useCurrentUseId";
import { useFetchUser } from "@/hooks/useFetchUser";
import { VnText, VnView } from "@vane-ui";
import { useLocalSearchParams } from "expo-router";
import ProfileScreen from "@/domains/profile/screens/ProfileScreen";

export default function UserScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const currentUserId = useCurrentUserId();
  const isOwnProfile = currentUserId === userId;
  const { data: user, isLoading, error } = useFetchUser(userId);

  if (isLoading) return <VnView><VnText>Loading...</VnText></VnView>
  if (error) return <VnView><VnText>Error: {error.message}</VnText></VnView>
  if (!user) return <VnView><VnText>User not found</VnText></VnView>

  const handleFollow = () => {
    // TODO: Implement follow logic
    console.log('Follow user:', userId);
  };

  const handleMessage = () => {
    // TODO: Implement message logic
    console.log('Message user:', userId);
  };

  return (
    <ProfileScreen
      isFollowing={false} // TODO: Add isFollowing logic or fetch from separate endpoint
      isOwnProfile={isOwnProfile}
      onFollow={handleFollow}
      onMessage={handleMessage}
    />
  )
}