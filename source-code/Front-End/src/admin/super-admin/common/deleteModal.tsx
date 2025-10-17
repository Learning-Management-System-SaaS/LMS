// src/components/DeleteModal.tsx

import React, { useRef, useEffect } from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (subscriptionId: string) => void;
  subscriptionToDelete: string | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  subscriptionToDelete,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const handleDelete = () => {
    if (subscriptionToDelete) {
      onConfirm(subscriptionToDelete);
    }
    onClose();
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-96 max-w-sm p-6 bg-white rounded-lg shadow-xl">
        <h3 className="font-bold text-lg text-error flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 111 11a9 9 0 0118 0z"
            />
          </svg>
          Delete Subscription
        </h3>
        <p className="py-4 text-gray-700">
          Are you sure you want to delete the subscription{' '}
          <span className="font-semibold text-gray-800">{subscriptionToDelete}</span>?
          This action cannot be undone.
        </p>
        <div className="modal-action flex justify-end gap-3">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-error text-white" onClick={handleDelete}>
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;