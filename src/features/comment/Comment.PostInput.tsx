import { InputBox } from "@/components/InputBox";

export default function CommentInput({
  handleSubmit,
}: {
  handleSubmit: (val: string) => void;
}) {
  return (
    <InputBox.Provider
      placeholder="Write a comment..."
      actionLabel="Post"
      onSubmit={handleSubmit}
      labelId="commentInput"
    >
      <InputBox.ToggleWrapper actionLabel="New Comment">
        <InputBox.Wrapper>
          <InputBox.Body />
          <InputBox.Footer />
        </InputBox.Wrapper>
      </InputBox.ToggleWrapper>
    </InputBox.Provider>
  );
}
