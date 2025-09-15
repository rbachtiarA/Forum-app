import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function CommentInput({
  handleSubmit,
}: {
  handleSubmit: (content: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePost = async () => {
    if (textareaRef.current) {
      const comment = textareaRef.current.value.trim();
      if (comment) {
        try {
          const res = await handleSubmit(comment);
          textareaRef.current.value = ""; // clear after post
          console.log("success");
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full items-start mt-2">
      <Textarea
        placeholder="Write a comment..."
        className="flex-1 min-h-[50px] md:min-h-[40px] resize-none rounded-xl"
        ref={textareaRef}
      />
      <div className="flex justify-end md:justify-center w-full md:w-auto h-full">
        <Button
          onClick={handlePost}
          className="h-10 md:h-full rounded-xl px-4 w-full md:w-auto"
        >
          Post
        </Button>
      </div>
    </div>
  );
}
