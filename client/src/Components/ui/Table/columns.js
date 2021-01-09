import {  format, parseISO  } from 'date-fns';


export const COLUMNS = [
  {
    Header: 'Date',
    accessor: 'date',
    Cell: (props) => {
      if(props.value !== undefined) {
        const custom_date = format(parseISO(props.value), 'M/d/Y')
        return <span>{custom_date}</span>
      } else {
        return null
      }
      
    }
  },
  {
    Header: 'ExpenseName',
    accessor: 'expenseName'
  },
  {
    Header: 'ExpensePrice',
    accessor: 'expensePrice'
  },
  {
    Header: 'Category',
    accessor: 'category'
  },
  // {
  //   Header: 'ID',
  //   accessor: '_id'
  // }
]