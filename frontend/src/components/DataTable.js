import { getNested } from "../utils/deepHelpers";

export default function DataTable({ component, formData }) {
  const rows = component.bind ? getNested(formData, component.bind) : component.rows || [];
  console.log("📦 formData:", formData);
  console.log("🔁 component.bind:", component.bind);
  console.log("🔁 bound rows:", rows);
  return (
    <table className="table table-bordered table-sm">
      <thead>
        <tr>
          {component.columns.map((col, idx) => (
            <th key={idx}>{col.header || col.label || ""}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(rows || []).map((row, rowIdx) => (
          <tr
            key={rowIdx}
            onClick={() => {
              if (component.onRowClick) {
                try {
                  const fn = new Function("row", "navigate", `return ${component.onRowClick};`);
                  fn(row, (url) => (window.location.href = url));
                } catch (err) {
                  console.error("Failed to eval onRowClick:", err);
                }
              }
            }}
            style={{ cursor: component.onRowClick ? "pointer" : "default" }}
          >
            {component.columns.map((col, colIdx) => {
              let content;

              if (typeof col.render === "function") {
                content = col.render(row);
              } else if (col.field) {
                content = getNested(row, col.field);
              } else {
                content = "";
              }
console.log("📦 first row sample:", component.rows?.[0]);
console.log("🧩 expected fields:", component.columns.map(c => c.field));
console.log("🧩 first row sample row:", component.columns.map(c => c.field)[1]);
console.log("🧩 first row sample fields:", component.rows?.[0][component.columns.map(c => c.field)[1]]);
console.log("COL FIELD:", col.field);
console.log("nested:", getNested(row, col.field? col.field : ""));
              return (
                <td key={colIdx}>
                  {(() => {
                    const value = getNested(row, col.field? col.field : "");
                    console.log(`🔎 row[${col.field}] =`, value);
                    return value ?? "[undefined]";
                  })()}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
