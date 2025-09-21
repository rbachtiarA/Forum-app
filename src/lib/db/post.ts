import type { Post, Prisma } from "@prisma/client";

export async function updatePostScores(
  tx: Prisma.TransactionClient,
  data: { post: Post; commentCount: number; scoreValue: number }
) {
  const diffHours = Math.ceil(
    (Date.now() - new Date(data.post.createdAt).getTime()) / (24 * 3600 * 1000)
  );
  await tx.post.update({
    where: {
      id: data.post.id,
    },
    data: {
      voteScores: { increment: data.scoreValue },
      trendScores:
        (data.post.voteScores + data.scoreValue + data.commentCount * 3 + 1) /
        Math.pow(diffHours + 2, 1.5),
    },
  });

  console.log(
    (data.post.voteScores + data.scoreValue + data.commentCount * 3 + 1) /
      Math.pow(diffHours + 2, 1.5)
  );
}
