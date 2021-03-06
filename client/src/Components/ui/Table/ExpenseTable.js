import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { COLUMNS } from "./columns";
import  './ExpenseTable.module.css';
import { BiCaretUp, BiCaretDown } from "react-icons/bi";

const ExpenseTable = React.memo((props) => {
  const [tableData, setTableData] = useState([{ data: "data" }]);

  useEffect(() => {
    if(props.updatedData.length === 0) {
      getTableData();
    } else {
      setTableData(props.updatedData)
    }
  }, [props.updatedData]);

  async function getTableData() {
    const loggedInUserID = localStorage.getItem('userID');

    try {
      const response = await fetch(`/api/userExpenses/${loggedInUserID}`);
      const apiData = await response.json();
      setTableData(apiData);
    } catch (err) {
      console.log(err);
    }
  }

  const tableInstance = useTable({
    columns: COLUMNS,
    data: tableData
  },
  useSortBy);

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
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? <BiCaretDown /> : <BiCaretUp />) : ''}
                </span>
                </th>
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
               return <td onDoubleClick={props.clickToUpdate} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default ExpenseTable;
