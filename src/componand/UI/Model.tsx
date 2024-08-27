import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { ReactNode } from 'react';

// Defining interface IProps to specify the props expected by the Model component
interface IProps {
    isOpen: boolean;                // Indicates whether the dialog is open or not
    onClose: () => void;            // Function to close the dialog
    title?: string;                 // Optional title for the dialog
    children: ReactNode;            // Content to be displayed within the dialog
    description?: string;           // Optional description for the dialog
}

// Model component which represents a modal dialog
const Model = ({ isOpen, onClose, title, children, description }: IProps) => {
    return (
        <>
            {/* Transition component from @headlessui/react library */}
            <Transition appear show={isOpen}>
                {/* Dialog component representing the modal dialog */}
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
                    <div className="fixed inset-0 z-10 backdrop-blur-sm w-screen overflow-y-auto" aria-hidden="true">
                        <div className="flex min-h-full items-center justify-center p-4">
                            {/* TransitionChild component for animation effects */}
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                {/* DialogPanel representing the content area of the dialog */}
                                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                                    {/* DialogTitle for the title of the dialog */}
                                    <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                        {title}
                                    </DialogTitle>
                                    {/* Optional description for the dialog */}
                                    <p className="mt-2 text-sm/6 text-white/50">
                                        {description}
                                    </p>
                                    {/* Content to be displayed within the dialog */}
                                    <div className="mt-4">
                                        {children}
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

// Exporting the Model component as default
export default Model;
