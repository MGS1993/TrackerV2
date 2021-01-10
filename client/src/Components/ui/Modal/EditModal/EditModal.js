import React, {  useState } from 'react';
import styles from './EditModal.module.css';


const EditModal = props => {

  const [expenseName, setExpenseName] = useState('')
  const [expensePrice, setExpensePrice] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')


  const handleSubmitEdit = e => {
    e.preventDefault();
    let dataBody = {
      expenseName: expenseName,
      expensePrice: expensePrice,
      category: category,
      date: date.replace(/-/, '/').replace(/-/, '/'),
      selected: props.selected
    }
    fetch(`api/expenses/${props.selected}/update`, {
      method: 'PUT',
      body: JSON.stringify(dataBody),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }


  return(
    <div className={styles.EMMainWrapper}
    style={{
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.show ? '1': '0'
    }}>
      <div className={styles.EMFormWrapper}>
        <form className={styles.form} onSubmit={handleSubmitEdit}>
          <div className={styles.labelWrapper}>
            <label>
              <div>
                Expense Name
              </div>
              <input 
              type="text" name="expenseName"
              value={expenseName}
              onChange={e => setExpenseName(e.target.value)}
              required={true} />

            </label>
          </div>
          <div className={styles.labelWrapper}>
            <label>
              <div>
                Expense Price
              </div>

              <input 
              type="text"
              name="expensePrice"
              value={expensePrice}
              onChange={e => setExpensePrice(e.target.value)}
              required={true} />
            </label>
            <div className={styles.labelWrapper}>
              <label>
                <div>
                  Category
                </div>

                <select defaultValue={category} onChange={e => setCategory(e.target.value)}>
                  <option value="Electronics">Electronics</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Rent">Rent</option>
                  <option value="Travel">Travel</option>
                </select>
              </label>
            </div>
            <div className={styles.labelWrapper}>
              <label>
                <div>
                  Date
                </div>
                <input type="date" name="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required={true} />
              </label>
            </div>
            <input
            type="submit"
            value="Confirm Edit"
            className={styles.submitBtn}
            required={true} />
          </div>
        </form>
      </div>
    </div>
  )
}


export default EditModal