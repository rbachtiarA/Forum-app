import { Textarea } from "@/components/ui/textarea";
import { useUserProfile } from "@/hooks/useUserProfile";
import { createContext, ReactNode, useContext, useRef, useState } from "react";
import AvatarProfile from "./AvatarProfile";
import { Button } from "./ui/button";
import { SmileIcon } from "lucide-react";

type InputContextType = {
  labelId: string;
  value: string;
  setValue: (val: string) => void;
  onSubmit: (val: string) => void;
  show: boolean;
  onToggle: () => void;
  onFocus: () => void;
  actionLabel: string;
  placeholder: string;
};

const InputContext = createContext<InputContextType | null>(null);

function useInputContext() {
  const ctx = useContext(InputContext);
  if (!ctx)
    throw new Error("InputBox.* must be used within <InputBox.Provider>");
  return ctx;
}

function InputBoxProvider({
  children,
  actionLabel,
  labelId,
  onSubmit,
  placeholder,
}: {
  children: ReactNode;
  onSubmit: (val: string) => void;
  actionLabel: string;
  labelId: string;
  placeholder: string;
}) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  return (
    <InputContext.Provider
      value={{
        labelId,
        onSubmit,
        actionLabel,
        placeholder,
        setValue,
        value,
        show,
        onToggle: () => setShow(!show),
        onFocus: () => setShow(true),
      }}
    >
      {children}
    </InputContext.Provider>
  );
}

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-background">
      {children}
    </div>
  );
}

function Body() {
  const { value, setValue, placeholder, labelId } = useInputContext();
  const { data } = useUserProfile();
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.currentTarget.value);
  return (
    <div className="flex gap-1 items-center justify-around px-2 py-1 space-x-1 rounded-xl shadow-sm bg-white/80 dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-ring transition">
      <div>
        <AvatarProfile
          height={12}
          width={12}
          src={data?.picture}
          username={data?.username}
          alt="user picture"
        />
      </div>
      <label htmlFor={labelId} className="sr-only">
        {labelId}
      </label>
      <Textarea
        id={labelId}
        className="resize-none px-2 break-all align-middle min-h-0 border-0 focus:border-0 focus:outline-0 field-sizing-content"
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
      <div className="">
        <SmileIcon />
      </div>
    </div>
  );
}

function Footer({ children }: { children?: ReactNode }) {
  const { value, setValue, onSubmit, actionLabel, show, onToggle } =
    useInputContext();
  const handleOnClick = () => {
    onSubmit(value);
    setValue("");
  };
  const onCancel = () => {
    if (show && value) {
      alert("cancel when there is content");
      onToggle();
    } else {
      onToggle();
    }
  };
  return (
    <div className="flex w-full mt-2">
      <div className="flex items-center space-x-2">{children}</div>
      <div className="flex w-full gap-2 justify-end">
        <Button onClick={onCancel} variant={"secondary"}>
          Cancel
        </Button>
        <Button
          className="px-3 py-1 rounded-lg"
          onClick={handleOnClick}
          disabled={value.trim() === ""}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

function ToggleWrapper({
  children,
  actionLabel,
}: {
  children: ReactNode;
  actionLabel: string;
}) {
  const { show, onToggle } = useInputContext();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onWrapperToggle = () => {
    if (!show) setMounted(true);
    onToggle();
  };

  const onTrasistionEnd = () => {
    if (!show) setMounted(false);
  };

  return (
    <>
      <div className="p-4">
        <Button onClick={onWrapperToggle}>{actionLabel}</Button>
      </div>
      {mounted && (
        <div
          ref={ref}
          onTransitionEnd={onTrasistionEnd}
          style={{
            maxHeight: show ? ref.current?.scrollHeight : 0,
          }}
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${
              show
                ? "max-h-40 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2"
            }
          `}
        >
          {children}
        </div>
      )}
    </>
  );
}

function FocusWrapper({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const { onFocus, show } = useInputContext();

  return (
    <div className={`group border rounded-md p-4`}>
      <div onFocus={onFocus}>{children}</div>

      {/* Footer hidden by default, show on focus-within */}
      {show && <div className="mt-2">{footer}</div>}
    </div>
  );
}

export const InputBox = {
  Provider: InputBoxProvider,
  ToggleWrapper,
  FocusWrapper,
  Wrapper,
  Body,
  Footer,
};
