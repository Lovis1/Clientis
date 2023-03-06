import React, { useState } from "react";
import styles from "../styles/Home.module.css";

function AddRowForm({ onAddRow, isBankPoolButtonDisabled }) {
  const [tenant_id, setTenant_id] = useState("");
  const [bankKurz, setBankKurz] = useState("");

  const handleTenant_idChange = (event) => {
    setTenant_id(event.target.value);
  };

  const handleBankKurzChange = (event) => {
    setBankKurz(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddRow(tenant_id, bankKurz);
    setTenant_id("");
    setBankKurz("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.add_row_label}>
        <div className={styles.label}>tenant ID :</div>
        <input type="text" value={tenant_id} onChange={handleTenant_idChange} />
      </label>
      <label className={styles.add_row_label}>
        <div className={styles.label}>Bank :</div>
        <input type="text" value={bankKurz} onChange={handleBankKurzChange} />
      </label>
      <button
        disabled={isBankPoolButtonDisabled}
        className={
          isBankPoolButtonDisabled
            ? styles.button_disabled
            : styles.generate_row_button_remove
        }
        type="submit"
      >
        Add Row
      </button>
    </form>
  );
}

export default AddRowForm;
