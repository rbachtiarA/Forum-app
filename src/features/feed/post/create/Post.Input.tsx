import { InputBox } from "@/components/InputBox";

export default function PostPostInput({
  handleSubmit,
}: {
  handleSubmit: (val: string) => void;
}) {
  return (
    <InputBox.Provider
      placeholder="Share something"
      actionLabel="Create Post"
      labelId="InputPost"
      onSubmit={handleSubmit}
    >
      <InputBox.FocusWrapper footer={<InputBox.Footer />}>
        <InputBox.Body />
      </InputBox.FocusWrapper>
    </InputBox.Provider>
  );
}
