import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "../ui/input";

interface FormFieldProps {
    name: string,
    label: string,
    type?: string,
    register: UseFormRegisterReturn,
    error?: FieldError
}

export default function FormField({label, name, register, type, error} : FormFieldProps) {

    return (
        <div className={`flex flex-col w-full space-y-1`}>
            <label htmlFor={name} className="font-semibold">
                {label}
            </label>
            <Input 
                id={name}
                type={type}
                {...register}
            />
            {error && <p className={`${error? 'text-destructive': ''}`}>{error.message}</p>}
        </div>
    )
}