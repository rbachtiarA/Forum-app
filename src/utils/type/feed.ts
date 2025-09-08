export type FeedPost = {
  id: number;
  createdAt: Date;
  user: FeedUserDetail;
  updatedAt: Date;
  title: string;
  content: string;
  totalVote: number;
  totalComment: number;
  isVoted: "upvoted" | "downvoted" | null;
};

export type FeedUserDetail = {
  username: string;
  name: string | null;
  picture: string | null;
};

export type FeedPostsData = {
  posts: FeedPost[];
  cursor: string;
};
