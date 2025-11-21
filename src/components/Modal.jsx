import React from "react";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 sm:px-6">
      <div
        className="
        bg-white dark:bg-gray-800 
        rounded-lg 
        w-full max-w-md sm:max-w-lg md:max-w-xl 
        p-4 sm:p-6 md:p-8
        shadow-lg
        overflow-auto
        max-h-[90vh]
      "
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg hover:text-gray-800 dark:hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
}
