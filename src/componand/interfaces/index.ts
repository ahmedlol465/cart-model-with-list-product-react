/**
 * Represents a product.
 */
export interface IProdact {
    /** Optional property for the unique identifier of the product. */
    id?: string;
    /** Title of the product. */
    title: string;
    /** Description of the product. */
    description: string;
    /** URL of the product image. */
    imageURL: string;
    /** Price of the product. */
    price: string;
    /** Array of strings representing available colors for the product. */
    colors: string[];
    /** Object containing the name and image URL of the category to which the product belongs. */
    catagory: {
        /** Name of the category. */
        name: string;
        /** URL of the category image. */
        imageURl: string;
    };
}

/**
 * Represents a form input.
 */
export interface IFormInput {
    /** Identifier of the form input. */
    id: string;
    /** A string representing the name of the product property (title, description, imageURL, price). */
    name: ProductName;
    /** Label for the form input. */
    lable: string;
    /** Type of the form input. */
    type: string;
}

/** Represents possible names of product properties. */
export type ProductName = "title" | "description" | "imageURL" | "price";

/**
 * Represents a category.
 */
export interface ICategory {
    /** Identifier of the category. */
    id: string;
    /** Name of the category. */
    name: string;
    /** URL of the category image. */
    imageURl: string;
}
