// Importing necessary functions and components
import { txtSlicer } from "../utils/function";
import CircleColors from "./UI/CircleColors";
import Button from "./UI/button";
import Image from "./image";
import { IProdact } from "./interfaces/index";

// Defining interface IProps to specify the props expected by the ProductCard component
interface IProps {
    product: IProdact;                              // Product data
    setProductEdit: (product: IProdact) => void;    // Function to set the product being edited
    openEdit: () => void;                           // Function to open the edit form
    setProductEditInd: (value: number) => void;     // Function to set the index of the product being edited
    ind: number;                                    // Index of the product
    openConfirmModel: () => void;                   // Function to open the confirmation modal
}

// ProductCard component to render a product card
const ProductCard = ({ product, setProductEdit, openEdit, setProductEditInd, ind, openConfirmModel }: IProps) => {

    // Destructuring product data
    const { description } = product;

    // Rendering list of color circles
    const renderColorList = product.colors.map(Color => (
        <CircleColors key={Color} color={Color} />
    ));

    // Function to handle edit action
    const onEdit = () => {
        setProductEdit(product);
        openEdit();             // Open the edit form
        setProductEditInd(ind); // Set the index of the product being edited
    };

    // Function to handle remove action
    const onRemove = () => {
        setProductEdit(product);
        openConfirmModel();     // Open the confirmation modal
    };

    // Rendering the product card
    return (
        <div className="mx-w-sm md:mx-w-lg mx-auto md:mx-0 border rounded-md text-sm p-3 flex flex-col">

            {/* Displaying product image */}
            <Image imageUrl={product.imageURL} alt={product.title} className="rounded-md" />

            {/* Displaying product title */}
            <h3 className="text-lg font-bold font-sams">{product.title}</h3>

            {/* Displaying truncated product description */}
            <p>{txtSlicer(description)}</p>

            {/* Displaying color circles */}
            <div className="flex space-x-1 item-center flex-wrap mb-1 ">
                {renderColorList.length ? renderColorList : <span>No Color</span>}
            </div>

            {/* Displaying product price and category */}
            <div className="flex items-center justify-between">
                <span>{"$" + product.price}</span>
                <Image imageUrl={product.catagory.imageURl} alt={product.catagory.name} className="w-10 h-10 rounded-full object-cover" />
            </div>

            {/* Displaying buttons for actions */}
            <div className="flex items-center justify-between space-x-2 mt-2">
                <Button className="bg-indigo-600 " onClick={onEdit}>Edit</Button>
                <Button className="bg-red-600" onClick={onRemove}>Remove</Button>
            </div>
        </div>
    );
}

// Exporting the ProductCard component as default
export default ProductCard;
