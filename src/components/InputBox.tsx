import { Textarea } from "@/components/ui/textarea";
import { useUserProfile } from "@/hooks/useUserProfile";
import { createContext, ReactNode, useContext, useRef, useState } from "react";
import AvatarProfile from "./AvatarProfile";
import { Button } from "./ui/button";
import { SmileIcon } from "lucide-react";

type InputContextType = {
  value: string;
  setValue: (val: string) => void;
  onSubmit: (val: string) => void;
  show: boolean;
  onToggle: () => void;
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

function Provider({
  children,
  actionLabel,
  onSubmit,
  placeholder,
}: {
  children: ReactNode;
  onSubmit: (val: string) => void;
  actionLabel: string;
  placeholder: string;
}) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  return (
    <InputContext.Provider
      value={{
        onSubmit,
        actionLabel,
        placeholder,
        setValue,
        value,
        show,
        onToggle: () => setShow(!show),
      }}
    >
      {children}
    </InputContext.Provider>
  );
}

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="border rounded-md p-4 w-full shadow-sm bg-background">
      {children}
    </div>
  );
}

function Body() {
  const { value, setValue, placeholder } = useInputContext();
  const { data } = useUserProfile();
  return (
    <div className="flex justify-around px-2 py-1 items-center bg-white/80 dark:bg-neutral-900 rounded-4xl shadow-sm border w-full space-x-1 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary transition">
      <div>
        <AvatarProfile
          height={12}
          width={12}
          src={data?.picture ?? null}
          username={data?.username ?? "Default"}
          alt="user picture"
        />
      </div>
      <Textarea
        className="resize-none px-2 align-middle min-h-0 border-0 focus:border-0 focus:outline-0 field-sizing-content"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={placeholder}
      />
      <div className="">
        <SmileIcon />
      </div>
    </div>
  );
}

function Footer({ children }: { children?: ReactNode }) {
  const { value, setValue, onSubmit, actionLabel } = useInputContext();
  return (
    <div className="flex w-full mt-2">
      <div className="flex items-center space-x-2">{children}</div>
      <div className="flex w-full justify-end">
        <Button
          className="px-3 py-1 bg-blue-500 text-white rounded-lg"
          onClick={() => {
            onSubmit(value);
            setValue("");
          }}
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
  return (
    <div
      className={`group border rounded-md p-4 focus-within:ring-2 focus-within:ring-blue-500`}
    >
      <div className="">{children}</div>

      {/* Footer hidden by default, show on focus-within */}
      <div className="hidden group-focus-within:block mt-2">{footer}</div>
    </div>
  );
}

export const InputBox = {
  Provider,
  ToggleWrapper,
  FocusWrapper,
  Wrapper,
  Body,
  Footer,
};
