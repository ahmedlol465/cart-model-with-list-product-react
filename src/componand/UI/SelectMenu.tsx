import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { category } from '../data'; // Assuming you have some data file named 'data' containing the category array
import { ICategory } from '../interfaces'; // Assuming you have an interface named 'ICategory' in a file named 'interfaces'

// Interface defining the props expected by the Select component
interface IProps {
  selected: { name: string, imageURl: string }; // Currently selected category
  setSelected: (category: ICategory) => void; // Function to update the selected category
}

// Utility function to handle CSS class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Select component to render a dropdown list of categories
const Select = ({ selected, setSelected }: IProps) => {
  // State variable to manage the open/close state of the dropdown list

  // Rendering the dropdown list
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {/* Label for the select element */}
          <Label className="block text-sm font-medium text-gray-900">category</Label>
          <div className="relative">
            {/* Button to toggle the dropdown list */}
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {/* Displaying the currently selected category */}
                <img src={selected.imageURl} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            {/* Transition component for smooth animation */}
            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              {/* Dropdown list */}
              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {/* Mapping over categories to render options */}
                {category.map((category) => (
                  <ListboxOption
                    key={category.id}
                    // Applying conditional CSS classes based on focus and selection state
                    className={({ focus }) => classNames(
                      focus ? 'bg-indigo-600 text-white' : '',
                      !focus ? 'text-gray-900' : '',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    )}
                    value={category}
                  >
                    {/* Rendering individual option */}
                    {({ selected, focus }) => (
                      <>
                        <div className="flex items-center">
                          {/* Displaying category image */}
                          <img src={category.imageURl} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          {/* Displaying category name */}
                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                            {category.name}
                          </span>
                        </div>
                        {/* Displaying checkmark icon if category is selected */}
                        {selected ? (
                          <span className={classNames(focus ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export default Select;
