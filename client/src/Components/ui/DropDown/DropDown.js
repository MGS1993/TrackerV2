import React from "react";
import styles from "./DropDown.module.css";

const DropDown = (props) => {
  
  return (
    <div className={styles.viewWrapper}>
      <button onClick={props.clickedTable}>Table</button>
      <button onClick={props.clickedBar}>Bar</button>
    </div>
  );
};

export default DropDown;
