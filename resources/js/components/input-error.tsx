import { cn } from "@/lib/utils";

interface InputErrorProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

function InputError({ message, className, ...props }: InputErrorProps) {
    if (!message) return null;

    return (<p className={cn("text-red-500 text-sm mt-1", className)} {...props}>
        {message}
    </p>);
}

export { InputError };