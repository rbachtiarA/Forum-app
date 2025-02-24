import { FormHTMLAttributes, ReactNode } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement>  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (data: any) => void,
    className?: string,
    children: ReactNode
}

export default function Form({ onSubmit, className = "", children, ...props } : FormProps) {
  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`} {...props}>
        {children}
    </form>
  )
}
