import React, { ReactNode } from "react";
import "./grid.css";

enum EditorType {
  STRING = "STRING",
  NUMBER = "NUMBER",
}

interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  renderer?: (value: T[keyof T]) => ReactNode;
  editor?:
    | ((
        value: T[keyof T],
        onChange: (newValue: T[keyof T]) => void,
        onCommit: () => void
      ) => JSX.Element)
    | EditorType;
}

interface GridProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  onCellUpdate?: (row: number, column: keyof T, newValue: T[keyof T]) => void;
}

function Grid<T>({ data, columns, onCellUpdate }: GridProps<T>): ReactNode {
  const [editingCell, setEditingCell] = React.useState<{
    row: number;
    column: keyof T;
  } | null>(null);

  const handleCellClick = (row: number, column: keyof T) => {
    setEditingCell({ row, column });
  };

  const handleCommit = () => {
    setEditingCell(null);
  };

  const renderEditor = (
    item: T,
    column: ColumnConfig<T>,
    onChange: (newValue: T[keyof T]) => void
  ) => {
    let editor;

    if (column.editor) {
      if (typeof column.editor === "function") {
        editor = column.editor(item[column.key], onChange, () => {
          handleCommit();
        });
      } else {
        switch (column.editor) {
          case EditorType.STRING:
            editor = (
              <input
                value={item[column.key] + ""}
                onChange={(e) => onChange(e.target.value as T[keyof T])}
                className="editor"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCommit();
                  }
                }}
              />
            );
            break;
          case EditorType.NUMBER:
            editor = (
              <input
                type="number"
                className="editor"
                value={item[column.key] + ""}
                onChange={(e) => onChange(+e.target.value as T[keyof T])}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCommit();
                  }
                }}
              />
            );
            break;
        }
      }

      if (editor) {
        return editor;
      }

      return null;
    }
  };

  const renderCell = (item: T, column: ColumnConfig<T>) => {
    const value = item[column.key];
    if (
      editingCell &&
      editingCell.row === data.indexOf(item) &&
      editingCell.column === column.key
    ) {
      return renderEditor(
        item,
        column,
        (newValue) =>
          onCellUpdate && onCellUpdate(data.indexOf(item), column.key, newValue)
      );
    }
    if (column.renderer) {
      return column.renderer(value);
    }
    if (Array.isArray(value)) {
      return value.join(",");
    }
    return value + "";
  };

  return (
    <table className="table" cellPadding={0} cellSpacing={0}>
      <thead className="thead">
        <tr>
          {columns.map((column) => (
            <th key={`th${column.key as string}`}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="tbody">
        {data.map((item, rowIndex) => (
          <tr key={rowIndex} className="tr">
            {columns.map((column) => (
              <td
                key={`td${column.key as string}`}
                className="td"
                onClick={() =>
                  column.editor
                    ? handleCellClick(rowIndex, column.key)
                    : undefined
                }
              >
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { Grid, EditorType };
