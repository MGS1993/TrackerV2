import React, {useState, useEffect} from "react";
import styles from "./DropDown.module.css";

const DropDown = (props) => {
  const [dataView, setDataView] = useState(
    [
      {id:0, title: 'Table', selected: false}, 
      {id:1, title: 'BarGraph', selected: false}
    ]
    )
  useEffect(() => {
    console.log(dataView)
  },[dataView])
  return (
    <div className={styles.viewWrapper}>
      <button>Table</button>
      <button>Bar</button>
    </div>
  );
};

export default DropDown;
