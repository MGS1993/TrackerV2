import React, { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import  './ExpenseTable.module.css';

const ExpenseTable = React.memo(() => {
  const [tableData, setTableData] = useState([{ data: "data" }]);
  console.log('expense table rendered...')
  useEffect(() => {
    
    (async function getTableData() {
      console.log("fetchData ran...");
      try {
        const response = await fetch("/api/expenses");
        const apiData = await response.json();
        setTableData(apiData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => tableData, []);
  // console.log(tableData);

  const tableInstance = useTable({
    columns: COLUMNS,
    data: tableData
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
               return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default ExpenseTable;
