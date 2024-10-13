import React from 'react';

interface Column {
  header: string;
  accessor: string | ((row: any) => React.ReactNode);
}

interface TableProps {
  columns: Column[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="table-auto w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col, index) => (
            <th key={index} className="px-4 py-2">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b">
            {columns.map((col, colIndex) => {
              const content = typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor];
              return (
                <td key={colIndex} className="px-4 py-2">
                  {content}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
