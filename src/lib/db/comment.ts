import prisma from "../prisma";

export async function postComment({
  postId,
  content,
  userId,
}: {
  postId: number;
  content: string;
  userId: string;
}) {
  const comment = await prisma.comment.create({
    data: {
      postId: Number(postId),
      profileId: userId,
      content: content,
    },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          picture: true,
        },
      },
    },
    omit: {
      profileId: true,
    },
  });

  return comment;
}

export async function postReply({
  commentId,
  content,
  userId,
  postId,
}: {
  commentId: number;
  content: string;
  userId: string;
  postId: number;
}) {
  const reply = await prisma.comment.create({
    data: {
      parentId: commentId,
      content,
      profileId: userId,
      postId,
    },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          picture: true,
        },
      },
    },
  });
}

export async function getCommentById(commentId: number) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  return comment;
}
