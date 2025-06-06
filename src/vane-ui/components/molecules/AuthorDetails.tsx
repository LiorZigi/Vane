import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import VnText from "@/vane-ui/components/atoms/VnText";
import { useTimeSince } from "@/hooks/useTimeSince";

interface AuthorDetailsProps {
  author: string;
  createdAt: string;
}

export default function AuthorDetails({ author, createdAt }: AuthorDetailsProps) {
  const { colors } = useTheme() as any;
  const timeSince = useTimeSince(createdAt);

  return (
    <View style={styles.container}>
      <VnText style={styles.author}>{author}</VnText>
      <VnText style={{ color: colors.textInfo, fontSize: 16 }}>
        {timeSince}
      </VnText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  author: {
    fontSize: 16,
    alignSelf: 'flex-start',
  },
}); 