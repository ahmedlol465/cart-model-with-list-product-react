// Defining interface IProps to specify the props expected by the Image component
interface IProps {
    alt: string;         // Alt text for the image
    imageUrl: string;    // URL of the image
    className: string;   // CSS class name for styling the image
}

// Image component to render an image element
const Image = ({ alt, imageUrl, className }: IProps) => {
    // Rendering the image element with provided props
    return (
        <img src={imageUrl} alt={alt} className={className}></img>
    );
}

// Exporting the Image component as default
export default Image;
