import { InputBox } from "@/components/InputBox";

export default function CommentPostInput({
  handleSubmit,
}: {
  handleSubmit: (val: string) => void;
}) {
  return (
    <InputBox.Provider
      placeholder="Write a comment..."
      actionLabel="Post"
      onSubmit={handleSubmit}
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
