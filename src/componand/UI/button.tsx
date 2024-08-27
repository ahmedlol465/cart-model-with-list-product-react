import { ButtonHTMLAttributes, ReactNode } from "react"

// Define a TypeScript interface for the props that the Button component will accept.
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode // ReactNode is a type that represents any valid JSX (React) node.
    className?: string // Optional prop for additional CSS classes.
}

// Define the Button component which takes in props of type IProps.
const Button = ({children, className, ...rest}: IProps) => {
    return (
        // Render a button element with provided children and additional CSS classes if any.
        <button className={`${className}=text-white px-3 py-1 w-full rounded-lg hover:bg-gray-600`} {...rest}>
            {children} {/* Render the children passed to the Button component. */}
        </button>
    )
}

// Export the Button component as the default export of this module.
export default Button
