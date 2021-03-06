import React, { Component } from 'react';
import styles from './BarGraph.module.css';
import { Bar } from 'react-chartjs-2';



class BarGraph extends Component {
  
    state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Expenses',
            data: [
              
            ],
            backgroundColor: [
              
            ]
          }
        ]
      },
    }
  async componentDidMount() {
    //fetchDataByCategory must be async so that setTableData can use data
    await this.fetchDataByCategory();
     this.setTableData();
  }
  fetchDataByCategory = async () => {
    let groceryData = [];
    let rentData = [];
    let electronicsData = [];
    let otherData = [];
    let utilitiesData = [];
    let travelData = [];
    try {
      const loggedInUserID = localStorage.getItem('userID');
      //for all expenses
      // const response = await fetch("/api/expenses");
      const response = await fetch(`/api/userExpenses/${loggedInUserID}`);
      const data = await response.json();
      data.forEach(el => {
        if(el.category === 'Groceries') {
          groceryData.push(el.expensePrice)
        } else if(el.category === 'Rent') {
          rentData.push(el.expensePrice)
        } else if(el.category === 'Electronics') {
          electronicsData.push(el.expensePrice)
        } else if(el.category === 'Utilities') {
          utilitiesData.push(el.expensePrice)
        }else if(el.category === 'Travel') {
          travelData.push(el.expensePrice)
        }else {
          otherData.push(el.expensePrice)
        }
      })
    } catch (err) {
      console.log(err);
    }

    //always put in order so that the array shows correct data for label
    let categoryData = 
    [[...groceryData], [...rentData], 
    [...electronicsData], [...travelData],
    [...utilitiesData], [...otherData]].map(el => {
      if(el.length <= 0) {
        return el.push(1)
      } else {
        return el.reduce((acc, curr) => {
          return acc + curr
        })
      }
    })
    this.setState({categoryData}) 
  }
  setTableData = async () => {
    const groceryData = this.state.categoryData
    let unmodifiedData = {
      labels: ['Groceries', 'Rent', 'Electronics', 'Travel', 'Utilities', 'Other'],
      datasets: [
        {
          label: 'Expenses By Category',
          data: [],
          backgroundColor: [
            'rgba(63, 217, 238, 1)',
            'rgba(63, 217, 61, 1)',
            'rgba(67, 140, 255, 1)',
            'rgba(188, 191, 61, 1)',
            'rgba(114, 124, 255, 0.6)',
            'rgba(188, 38, 61, 1)',
          ]
        }
      ]
    }
    groceryData.forEach(el => {
      unmodifiedData.datasets[0].data.push(el)
    })
    this.setState({modifiedChartData: unmodifiedData})
  };
  render() {
    return (
      <div className={styles.chart}>
        <Bar 
        data={this.state.modifiedChartData}
        options={{
          title: {
            display: true,
            text: 'Expenses By Category'
          }
        }}
          />
         
      </div>
    )
  }
}



export default BarGraph