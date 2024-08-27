import { ChangeEvent, FormEvent, useState } from "react"; // Imports essential React hooks for handling events and managing state
import Model from "./componand/UI/Model"; // Imports the custom modal component
import { Colors, category, formInputsList, productList } from "./componand/data"; // Imports data for colors, categories, form inputs, and initial products
import ProductCard from "./componand/product"; // Imports the custom product card component
import Button  from "./componand/UI/button"; // Imports the custom button component
import Input from "./componand/UI/input"; // Imports the custom input component
import { IProdact, ProductName } from "./componand/interfaces"; // Imports interfaces for product data types
import { productValidation } from "./validation"; // Imports the product validation function
import ErrorMeassage from "./componand/ErrorMessage"; // Imports the error message component
import CircleColors from "./componand/UI/CircleColors"; // Imports the color circle component
import { v4 as uuid} from "uuid"; // Imports the uuid library for generating unique IDs
import Select from "./componand/UI/SelectMenu"; // Imports the custom select menu component
import toast, { Toaster } from 'react-hot-toast'; // Imports the react-hot-toast library for showing toast notifications

const App = () => {
  // Define the default product structure
  const defaultProduct = {
    title: "", // Title of the product (empty initially)
    description: "", // Description of the product (empty initially)
    imageURL: "", // Image URL for the product (empty initially)
    price: "", // Price of the product (empty initially)
    colors: [], // Array to store the selected colors (empty initially)
    catagory: { // Category object for the product
      name: "", // Name of the category (empty initially)
      imageURl: "" // Image URL for the category (empty initially)
    }
  }

  // State variables:
  const [errors, setErrors] = useState({ // State to store validation errors for each input field
    title: "",
    description: "",
    imageURL: "",
    price: "" 
  });

  const [products, setProducts] = useState<IProdact[]>(productList); // State to store the list of products (initialized with productList)
  const [openConfirmModel, setOpenConfirmModel] = useState(false); // State to control the delete confirmation modal
  const [product, setProduct] = useState<IProdact>(defaultProduct); // State to store data for the new product being added 
  const [productEdit, setProductEdit] = useState<IProdact>(defaultProduct); // State to store data for the product being edited
  const [productEditInd, setProductEditInd] = useState<number>(0); // State to store the index of the product being edited in the 'products' array
  const [select, setSelected] = useState(category[0]); // State to store the selected category
  const [color, setColor] = useState<string[]>([]); // State to store the selected colors for a product
  const [isOpen, setIsOpen] = useState(false); // State to control the add product modal
  const [isEditOpen, setIsEditOpen] = useState(false); // State to control the edit product modal

  // Functions to control modal visibility:
  function open() {
    setIsOpen(true); // Opens the add product modal
  }
  function close() {
    setIsOpen(false); // Closes the add product modal
  }
  function openEdit() {
    setIsEditOpen(true); // Opens the edit product modal
  }
  function closeEdit() {
    setIsEditOpen(false); // Closes the edit product modal
  }
  function openConfirmMpdel() {
    setOpenConfirmModel(true); // Opens the delete confirmation modal
  }
  function closeConfirmModel() {
    setOpenConfirmModel(false); // Closes the delete confirmation modal
  }

  // Updates the product state when a form input changes
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // Extracts name and value of the changed input field

    setProduct({
      ...product, // Spreads the existing product state
      [name]: value // Updates the specified property (title, description, etc.) with the new value
    });

    setErrors({ // Updates the errors state, clearing the error for the updated field
      ...errors,
      [name]: ''
    });
  };

  // Updates the productEdit state when a form input changes during editing
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setProductEdit({ // Spreads the existing productEdit state
      ...productEdit,
      [name]: value // Updates the specified property with the new value
    });

    setErrors({ // Updates the errors state, clearing the error for the updated field
      ...errors,
      [name]: ''
    });
  };

  // Submit handler for adding a new product
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents default form submission behavior

    // Performs validation using productValidation
    const errors = productValidation({
      title: product.title,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL
    });

    // Checks if there are any validation errors
    const hsErrorMsg = Object.values(errors).some(value => value === "") &&  Object.values(errors).every(value => value === "")
    if (!hsErrorMsg) { // If there are errors
      setErrors(errors); // Update the errors state
      return; // Exit the function, preventing further execution
    }

    // After successful validation, add the new product:
    setProducts(prev => [
      { ...product, id: uuid(), colors: color, catagory: select }, // Creates a new product object with a unique ID, selected colors, and category
      ...prev // Spreads the existing product array
    ]);

    // Reset the product state, clear the selected colors, and close the modal
    setProduct(defaultProduct);
    setColor([]);
    close();

    // Show a success toast notification
    toast("product added successfully", {
      icon: "✅",
      style: {
        background: "black",
        color: "white"
      }
    });
  };

  // Submit handler for editing a product
  const submitEditHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Performs validation using productValidation
    const errors = productValidation({
      title: productEdit.title,
      description: productEdit.description,
      price: productEdit.price,
      imageURL: productEdit.imageURL
    });

    // Checks for errors 
    const hsErrorMsg = Object.values(errors).some(value => value === "") &&  Object.values(errors).every(value => value === "")
    if (!hsErrorMsg) { // If there are errors
      setErrors(errors);
      return; // Exit the function, preventing further execution
    }

    // After successful validation, update the product at the correct index:
    const updatedProducts = [...products]; // Creates a copy of the products array
    updatedProducts[productEditInd] = { ...productEdit, colors: color.concat(productEdit.colors) }; // Updates the product at the specified index
    setProducts(updatedProducts); // Updates the products state

    // Reset the productEdit state, clear the selected colors, and close the modal
    setProductEdit(defaultProduct);
    setColor([]);
    closeEdit();

    // Show a success toast notification
    toast("product updated successfully", {
      icon: "✅",
      style: {
        background: "black",
        color: "white"
      }
    });
  };

  // Cancels adding/editing a product
  const onCancel = () => {
    // console.log("cancel"); // Logging for debugging
    setProduct(defaultProduct); // Resets the product state to its default
    close(); // Closes the add product modal
    closeEdit(); // Closes the edit product modal
  };

  // Handles deleting a product
  const removeProductHandler = () => {
    const filterd = products.filter(product => product.id != productEdit.id); // Filters the products array to remove the product being edited
    setProducts(filterd); // Updates the products state with the filtered array
    closeConfirmModel(); // Closes the delete confirmation modal

    // Show a success toast notification
    toast("product deleted successfully", {
      icon: "🗑️",
      style: {
        background: "black",
        color: "white"
      }
    });
  };

  // Renders the list of products using the ProductCard component
  const renderProductList = products.map((product, ind) => (
    <ProductCard key={product.id} product={product} setProductEdit={setProductEdit} openEdit={openEdit} ind={ind} setProductEditInd={setProductEditInd} openConfirmModel={openConfirmMpdel} />
  ));

  // Renders the form input fields for adding/editing products
  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor="input.id" className="md-[2px] text-sm font-medium text-gray-700">{input.lable}</label> 
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} /> 
      <ErrorMeassage msg={errors[input.name]} />
    </div>
  ));

  // Renders the color circles for selecting colors
  const renderColorList = Colors.map(Color => (<CircleColors key={Color} color={Color}
    onClick={() => { 
      // Check if the color is already selected, if so remove it
      if (color.includes(Color)) {
        setColor(prev => prev.filter(item => item != Color));
        return; // Exit the function to prevent further execution
      }

      // Check if the color is already selected for the product being edited, if so remove it
      if (productEdit.colors.includes(Color)) {
        setColor(prev => prev.filter(item => item != Color));
        return; // Exit the function to prevent further execution
      }

      // Add the color to the selection
      setColor((prev) => [...prev, Color]);
    }}
  />));

  // Renders a form input with an error message for editing a product
  const renderProductEditWithErrorMsg = (id: string, label: string, name: ProductName) => {
    return (
      <div className="flex flex-col">   
        <label htmlFor={id} className="md-[2px] text-sm font-medium text-gray-700">
          {label} 
        </label> 
        <Input type="text" id={id} name={name} value={productEdit[name]} onChange={onChangeEditHandler} /> 
        <ErrorMeassage msg={errors[name]} /> 
      </div>
    );
  };

  return (
    <main className="container">
      <Button className="bg-red-600 hover:bg-red-800" onClick={open}>Add new Product</Button>
      <div className="border-2 border-gray-400 m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md"> 
        {renderProductList} 
      </div>

      {/* Add product modal */}
      <Model isOpen={isOpen} onClose={close} title={"add new Product"}> 
        <form className="space-y-3" onSubmit={submitHandler}> 
          {renderFormInputList}
          <Select selected={select} setSelected={setSelected} /> 
          <div className="flex space-x-1 item-center flex-wrap mb-1 ">
            {renderColorList} 
          </div>

          <div className="flex space-x-1 item-center flex-wrap mb-1 "> 
            {color.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 rounded-md "
                style={{ backgroundColor: color }}
              >{color}</span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-600 ">Submit</Button> 
            <Button className="bg-gray-800" onClick={onCancel}>Cancel</Button> 
          </div>
        </form>
      </Model>

      {/* Edit product modal */}
      <Model isOpen={isEditOpen} onClose={closeEdit} title={"Edit Product"}> 
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg('title', 'product title', 'title')} 
          {renderProductEditWithErrorMsg('description', 'product description', 'description')}
          {renderProductEditWithErrorMsg('imageURL', 'product imageURL', 'imageURL')}
          {renderProductEditWithErrorMsg('price', 'product price', 'price')}
          <Select selected={productEdit.catagory} setSelected={(value) => setProductEdit({ ...productEdit, catagory: value })} /> 
          
          <div className="flex space-x-1 item-center flex-wrap mb-1 ">
            {renderColorList}
          </div>

          <div className="flex space-x-1 item-center flex-wrap mb-1 "> 
            {color.concat(productEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 rounded-md "
                style={{ backgroundColor: color }}
              >{color}</span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-600 ">Submit</Button> 
            <Button className="bg-gray-800" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </Model>

      {/* Delete confirmation modal */}
      <Model isOpen={openConfirmModel}
        onClose={closeConfirmModel} 
        title="confirm Delete" // Model component for the delete confirmation modal
        description="Are you sure you want to delete this product This action cannot be undone." // Message displayed in the modal
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-red-600 " onClick={removeProductHandler}>remove</Button> 
          <Button className="bg-white hover:bg-gray-800" onClick={closeConfirmModel}>Cancel</Button> 
        </div>
      </Model>

      {/* Toast notifications */}
      <Toaster /> 
    </main>
  )
}

export default App;