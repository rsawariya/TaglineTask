import React from 'react';

interface FieldProps {
    value: string;
    handleChange: (value: string) => void;
}

const Field: React.FC<FieldProps> = ({ value, handleChange }) => {
    return (
        <input
            type="text"
            className="w-[200px] h-[50px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Name" 
            value={value}
            onChange={(e)=>handleChange(e.target.value)}
            />
    );
};

export default React.memo(Field);
