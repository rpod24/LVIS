import React from "react";
import { deepGet, deepSet } from "../utils/deepHelpers";

const InputField = ({ component, formData, setFormData }) => {
  const value = component.bind ? deepGet(formData, component.bind) ?? "" : "";

  return (
    <div className="mb-2">
      <label className="form-label small fw-semibold">
        {component.label || component.placeholder}
      </label>

      <input
        className="form-control form-control-sm"
        style={{ maxWidth: "320px" }}
        placeholder={component.placeholder}
        value={value}
        onChange={(e) =>
          setFormData((prev) => deepSet({ ...prev }, component.bind, e.target.value))
        }
      />
    </div>
  );
};

export default InputField;
