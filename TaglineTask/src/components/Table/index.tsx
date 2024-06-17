import React, { memo } from 'react';

interface TableProps {
    cols: string[];
    rows: Array<{ [key: string]: any }>;
}

const Table: React.FC<TableProps> = ({ cols, rows }) => {
    if (!rows.length) return <p>No data available</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        {cols.map((header) => (
                            <th key={header} className="py-3 px-6 text-left border-b border-gray-200">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            {cols.map((col) => (
                                <td key={col} className="py-3 px-6 text-left border-b border-gray-200">
                                    {row[col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(Table);