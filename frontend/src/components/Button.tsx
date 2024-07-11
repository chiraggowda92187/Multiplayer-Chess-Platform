import React from "react"








export const Button = ({onClick, children} : {onClick : ()=> void, children : React.ReactNode})=>{
    return (
      <button
        onClick={onClick}
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-9"
      >
        {children}
      </button>
    );
}