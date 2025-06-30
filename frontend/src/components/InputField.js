import React, { useState, useCallback } from "react";
import { deepGet, deepSet } from "../utils/deepHelpers";

const TYPE_VALIDATORS = {
  date: (v) => /^\d{4}-\d{2}-\d{2}$/.test(v),
  number: (v) => v === "" || !Number.isNaN(Number(v)),
  tel: (v) => /^\+?[\d\s\-()]{7,}$/.test(v),
  text: () => true,
};

const InputField = ({ component, formData, setFormData }) => {
  const path = component.bind;
  const { label, placeholder, validation = {} } = component;
  const value = typeof path === "string" ? deepGet(formData, path) ?? "" : "";
  const [touched, setTouched] = useState(false);

  const getError = useCallback(
    (val) => {
      if (!validation) return "";
      if (validation.required && (val === undefined || val === "")) return "This field is required.";
      if (validation.oneOf && !validation.oneOf.includes(val)) return `Must be one of: ${validation.oneOf.join(", ")}`;
      if (validation.pattern) {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(val)) return "Invalid format.";
      }
      const validatorFn = TYPE_VALIDATORS[validation.type || "text"];
      if (validatorFn && !validatorFn(val)) return "Invalid value.";
      return "";
    },
    [validation]
  );

  const error = touched ? getError(value) : "";

  const handleChange = (e) => {
    const newVal = e.target.value;
    if (typeof path !== "string") return;
    const updated = deepSet({ ...formData }, path, newVal);
    setFormData(updated);
  };

  const htmlInputType = (() => {
    switch (validation.type) {
      case "date": return "date";
      case "number": return "number";
      case "tel": return "tel";
      default: return "text";
    }
  })();

  const renderDataList = () => {
    if (!validation.oneOf) return null;
    const dataListId = `${path}-datalist`;
    return (
      <>
        <datalist id={dataListId}>
          {validation.oneOf.map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
      </>
    );
  };

  return (
    <div className="input-field" style={{ marginBottom: "1rem" }}>
      {label && (
        <label htmlFor={path} style={{ display: "block", fontWeight: "600", marginBottom: ".25rem" }}>
          {label}
        </label>
      )}

      <input
        id={path}
        type={htmlInputType}
        value={value}
        placeholder={placeholder || ""}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        list={validation.oneOf ? `${path}-datalist` : undefined}
        style={{
          width: "100%",
          padding: "0.5rem",
          border: error ? "1px solid #e53e3e" : "1px solid #cbd5e0",
          borderRadius: "0.375rem",
        }}
      />

      {renderDataList()}

      {error && (
        <p style={{ color: "#e53e3e", fontSize: "0.75rem", marginTop: "0.25rem" }}>{error}</p>
      )}
    </div>
  );
};

export default InputField;
