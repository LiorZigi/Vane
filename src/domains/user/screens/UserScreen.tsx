import { useCurrentUserId } from "@/hooks/useCurrentUseId";
import { useFetchUser } from "@/hooks/useFetchUser";
import { VnText, VnView } from "@vane-ui";
import { useLocalSearchParams } from "expo-router";

export default function UserScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const currentUserId = useCurrentUserId();
  const isOwnProfile = currentUserId === userId;
  const { data: user, isLoading, error } = useFetchUser(userId);

  if (isLoading) return <VnView><VnText>Loading...</VnText></VnView>
  if (error) return <VnView><VnText>Error: {error.message}</VnText></VnView>

  return (
    <VnView>
      <VnText>UserScreen</VnText>
    </VnView>
  )
}