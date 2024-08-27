import { HTMLAttributes } from "react";

// Defining interface IProps which extends HTMLAttributes<HTMLSpanElement> interface
interface IProps extends HTMLAttributes<HTMLSpanElement> {
    // Declaring a required property 'color' of type string
    color: string;
}

// Functional component CircleColors which accepts props of type IProps
const CircleColors = ({ color, ...rest }: IProps) => {
    return (
        // Rendering a <span> element with specified styles and attributes
        <span
            // Applying Tailwind CSS classes for basic styling
            className={`block w-5 h-5 rounded-full cursor-pointer `}
            // Setting inline style to dynamically change background color based on the 'color' prop
            style={{ backgroundColor: color }}
            // Spreading any additional HTML attributes onto the <span> element
            {...rest}
        />
    );
}

// Exporting the CircleColors component as default
export default CircleColors;
