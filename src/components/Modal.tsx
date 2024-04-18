import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed z-10 inset-0 overflow-y-auto"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            contentLabel="Modal"
            ariaHideApp={false}
        >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {children}
                </div>
            </div>
        </ReactModal>
    );
};

export default Modal;