import ProfileScreen from "@/domains/profile/screens/ProfileScreen";

export default function Profile() {
  return <ProfileScreen name="John Doe" bio="I'm a software engineer" photosCount={10} followersCount={100} followingCount={50} isFollowing={false} onFollow={() => { }} onMessage={() => { }} />
}