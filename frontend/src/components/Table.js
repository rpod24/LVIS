import React from "react";

const Table = ({ columns, rows, onRowClick }) => (
  <table className="table table-hover">
    <thead>
      <tr>{columns.map((c) => <th key={c.field}>{c.header}</th>)}</tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row._id} onClick={() => onRowClick && onRowClick(row)}>
          {columns.map((c) => (
            <td key={c.field}>{row[c.field]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
