export interface VaneUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  followers: number;
  following: number;
  posts_count: number;
}

export interface Post {
  id: string;
  author_id: string;
  author_username: string;
  author_display_name: string;
  author_avatar_url: string;
  content: string;
  media_urls: string[];
  likes_count: number;
  liked_by_me: boolean;
  comments_count: number;
  repost_count: number;
  created_at: string;   // ISO timestamp
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Like {
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface Repost {
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface Follow {
  followerId: string;
  followeeId: string;
}
