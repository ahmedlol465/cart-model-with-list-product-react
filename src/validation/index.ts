// Interface defining the structure of a Product object
interface Product {
    title: string;
    description: string;
    price: string;
    imageURL: string;
}

// Interface defining the structure of an Errors object
interface Errors {
    title: string;
    description: string;
    price: string;
    imageURL: string;
}

// Function to validate a Product object and return an Errors object with validation error messages
export const productValidation = (product: Product): Errors => {
    // Initialize an empty Errors object
    const ERRORS: Errors = {
        title: "",
        description: "",
        price: "",
        imageURL: "",
    };

    // Regular expression to validate URL format
    const validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

    // Validate title
    if (!product.title.trim() || product.title.length < 3 || product.title.length > 80) {
        ERRORS.title = "NOT VALID TITLE";
    }

    // Validate description
    if (!product.description.trim() || product.description.length < 3 || product.description.length > 80) {
        ERRORS.description = "NOT VALID DESCRIPTION";
    }

    // Validate imageURL
    if (!product.imageURL.trim() || !validURL) {
        ERRORS.imageURL = "NOT VALID IMAGE URL";
    }

    // Validate price
    if (!product.price.trim() || isNaN(Number(product.price))) {
        ERRORS.price = "NOT VALID PRICE";
    }

    // Return the Errors object with validation error messages
    return ERRORS;
};
