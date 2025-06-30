import React from "react";

const TextArea = ({ component, formData, setFormData }) => {
  const { name, label, placeholder } = component;

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={formData[name] || ""}
        placeholder={placeholder || ""}
        onChange={handleChange}
        className="w-full rounded-md border px-3 py-2 resize-y"
        rows={4}
      />
    </div>
  );
};

export default TextArea;
