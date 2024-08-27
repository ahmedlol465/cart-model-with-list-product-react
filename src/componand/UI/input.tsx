import { InputHTMLAttributes } from "react";

// Defining interface IProps which extends InputHTMLAttributes<HTMLInputElement> interface
interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

// Functional component Input which accepts props of type IProps
const Input = ({ ...rest }: IProps) => {
    return (
        // Rendering an <input> element with specified attributes and styles
        <input
            // Setting the id, name, and type attributes for the input element
            id=""
            name=""
            type="text"
            // Applying Tailwind CSS classes for styling
            className="border-2 border-gray-300 w-full p-1 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 text-md"
            // Spreading any additional HTML attributes onto the <input> element
            {...rest}
        />
    );
}

// Exporting the Input component as default
export default Input;
