export type FeedPost = {
  id: number;
  createdAt: string;
  user: FeedUserDetail;
  updatedAt: string;
  title: string;
  content: string;
  totalVote: number;
  totalComment: number;
  isVoted: "upvoted" | "downvoted" | null;
};

export type FeedUserDetail = {
  username: string;
  name: string;
  picture: string;
};

export type FeedPostsData = {
  posts: FeedPost[];
  cursor: string;
};
