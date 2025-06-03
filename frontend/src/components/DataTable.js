import { getNested } from "../utils/deepHelpers";

export default function DataTable({ component }) {
  return (
    <table className="table table-bordered table-sm">
      <thead>
        <tr>
          {component.columns.map((col, idx) => (
            <th key={idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(component.rows || []).map((row, rowIdx) => (
          <tr
            key={rowIdx}
            onClick={() => {
              if (component.onRowClick) {
                try {
                  /* eslint-disable no-new-func */
                  const fn = new Function("row", "navigate", `return ${component.onRowClick};`);
                  fn(row, (url) => (window.location.href = url));
                  /* eslint-enable no-new-func */
                } catch (err) {
                  console.error("Failed to eval onRowClick:", err);
                }
              }
            }}
            style={{ cursor: component.onRowClick ? "pointer" : "default" }}
          >
            {component.columns.map((col, colIdx) => (
              <td key={colIdx}>{getNested(row, col.field)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
