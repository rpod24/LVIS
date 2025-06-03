// components/Input.jsx   (or wherever the generic input lives)

import React, { useContext } from "react";
import { FormContext } from "../context/FormContext";   // holds {formData, setFormData}

export default function Input({ label, bind }) {
  const { formData, setFormData } = useContext(FormContext);

  /* update the shared state on every keystroke */
  function handleChange(e) {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, [bind]: value }));
  }

  return (
    <label className="field">
      <span>{label}</span>
      <input
        name={bind}
        value={formData[bind] ?? ""}   // controlled component
        onChange={handleChange}
        autoComplete="off"
      />
    </label>
  );
}
