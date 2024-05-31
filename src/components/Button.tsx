import { VariantProps, cva } from "class-variance-authority"
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(['transition-colors'], {
    variants: {
            size: {
                default: ['rounded', 'p-2'],
                icon: ['rounded-full', 'w-10', 'h-10', 'flex', 'items-center', 'justify-center', 'p-2.5']
            },
            variant: {
                default: ["bg-secondary", "hover:bg-secondary-hover", "text-gray-700"],
                ghost: ["hover:bg-gray-100"],
                dark: ["bg-secondary-dark", "hover:bg-secondary-dark-hover", "text-white/90"]
            },
            default: {
                variant: "default",
                size: "default"
            }
    }
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<'button'>

const Button = ({variant, size, className, ...props}: ButtonProps) => {
  return (
    <button className={twMerge(buttonStyles({variant, size}), className)} {...props} />
  )
}

export default Button