import React from "react";
import { deepGet, deepSet } from "../utils/deepHelpers";

export default function SelectField({
  component,
  formData,
  setFormData,
}) {
  const {
    bind,
    label,
    options = [],
    optionsFrom,
    optionLabelField = "label",
    optionValueField = "_id", // now expecting full object
    disabled = false,
    className = "",
  } = component;

  const value = deepGet(formData, bind) ?? null;

  // Dynamically get the options (rooms) from formData
  const resolvedOptions = optionsFrom
    ? deepGet(formData, optionsFrom) || []
    : options;

    console.log("🔍 optionsFrom", optionsFrom);
console.log("🔍 resolvedOptions", deepGet(formData, optionsFrom));

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedObj = resolvedOptions.find(
      (opt) => String(opt[optionValueField]) === selectedId
    );

    const updated = deepSet(formData, bind, selectedObj ?? null);
    setFormData(updated);
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <select
        value={value?._id || ""}
        onChange={handleChange}
        disabled={disabled}
        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          -- select --
        </option>

        {resolvedOptions.map((opt, i) => {
          const optionLabel = opt[optionLabelField] ?? opt.label ?? opt;
          const optionValue = opt[optionValueField] ?? opt.value ?? opt;
          return (
            <option key={optionValue || i} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}
