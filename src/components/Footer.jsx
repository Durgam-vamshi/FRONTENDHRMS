import React from "react";

export default function Footer() {
  return (
    <footer className="
      bg-gray-100 dark:bg-gray-900 
      text-gray-700 dark:text-gray-300 
      border-t border-gray-200 dark:border-gray-700
      w-full
      py-4 sm:py-5 md:py-6
      mt-6
    ">
      <div className="
        container mx-auto 
        px-4 sm:px-6 lg:px-12
        flex flex-col items-center justify-center
        space-y-1 sm:space-y-2
      ">
        <p className="text-xs sm:text-sm md:text-base text-center">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>

        <p className="text-[10px] sm:text-xs md:text-sm text-center">
          Made with ❤️ by Vamshi Durgam
        </p>
      </div>
    </footer>
  );
}
