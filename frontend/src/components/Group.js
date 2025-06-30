import React from "react";
import ComponentRenderer from "./ComponentRenderer";

export default function Group({ label, fields, components, formData, setFormData }) {
  const children = fields || components;

  return (
    <div className="group">
      {label && <h3>{label}</h3>}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {children?.map((child, i) => (
          <ComponentRenderer
            key={i}
            component={child}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
      </div>
    </div>
  );
}
