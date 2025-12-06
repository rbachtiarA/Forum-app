export type UserDetail = {
  username: string;
  name: string | null;
  picture: string | null;
};

export type Post<TDate> = {
  id: number;
  createdAt: TDate;
  user: UserDetail;
  updatedAt: TDate;
  title: string;
  content: string;
  totalVote: number;
  totalComment: number;
  isVoted: "upvoted" | "downvoted" | null;
  comment?: Comment<TDate>[];
};

export type Comment<TDate> = {
  id: number;
  user: UserDetail;
  content: string;
  createdAt: TDate;
  other_Comment?: Comment<TDate>[];
};

export type PostGetResponse = {
  post: Post<string>;
};

export type FeedGetResponse = {
  posts: Post<Date>[];
  cursor: string;
};
