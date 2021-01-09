import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import  './ExpenseTable.module.css';

const ExpenseTable = React.memo((props) => {
  const [tableData, setTableData] = useState([{ data: "data" }]);
  console.log('expense table rendered...')

  useEffect(() => {
    if(props.updatedData.length === 0) {
      getTableData();
    } else {
      setTableData(props.updatedData)
    }
  }, [props.updatedData]);

  
  async function getTableData() {
    console.log("fetchData ran...");
    try {
      const response = await fetch("/api/expenses");
      const apiData = await response.json();
      setTableData(apiData);
    } catch (err) {
      console.log(err);
    }
  }

  
  
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
    <table  {...getTableProps()}>
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
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr id={tableData[index]._id} onClick={props.clicked} {...row.getRowProps()}>
              {row.cells.map((cell) => {
               return <td  {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default ExpenseTable;
