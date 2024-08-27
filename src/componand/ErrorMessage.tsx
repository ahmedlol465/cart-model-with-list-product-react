// Defining interface IProps to specify the props expected by the ErrorMessage component
interface IProps {
    msg: string; // Error message to be displayed
}

// ErrorMessage component to render an error message
const ErrorMessage = ({ msg }: IProps) => {
    // Rendering the error message if it exists, otherwise rendering nothing
    return msg ? <span className="block text-red-600 font-semibold text-sm">{msg}</span> : null;
}

// Exporting the ErrorMessage component as default
export default ErrorMessage;
