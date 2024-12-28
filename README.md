# custom-react-grid

## Getting Started

### Installing Dependencies

To install the dependencies in the root folder, run:

```bash
npm install
```

#### Frontend

Navigate to the frontend package directory and install the dependencies:

```bash
cd packages/frontend
npm install
```

#### Backend

Navigate to the backend package directory and install the dependencies:

```bash
cd packages/backend
npm install
```

### Running the Packages

#### Backend

To start the backend package, run:

```bash
cd packages/backend
npm run start
```

#### Frontend

To start the frontend package, run:

```bash
cd packages/frontend
npm run dev
```

Once the frontend server is running, open your browser and navigate to [http://localhost:5173/](http://localhost:5173/) to view the application.

## Demo

You can view a live demo of the `Grid` component [here](https://pbartz.net/).

## Architecture Decisions

The project is structured as a monorepo using Lerna, with separate packages for the frontend and backend. The frontend is built with React, TypeScript, and Vite, while the backend uses Express and TypeScript. This separation allows for clear distinction and management of client and server code.

## Assumptions Made

- The frontend and backend will be developed and run independently.
- The backend will serve static files from the frontend's build directory in production.
- The frontend will fetch user data from the backend API.

## Known Limitations or Trade-offs

- The backend does not include authentication or authorization mechanisms.
- The frontend does not handle large datasets efficiently.
- The project relies on a fixed set of user images stored in the public directory.

## Future Improvement Suggestions

- Implement authentication and authorization in the backend.
- Optimize the frontend for handling larger datasets.
- Add unit and integration tests for both frontend and backend.
- Improve error handling and user feedback in the frontend.
- Implement a more dynamic way to manage user images, possibly using a cloud storage solution.
- Extend the library of renderers and editors to support more data types and custom components.
- Improve the performance and flexibility of the rendering and editing mechanisms.
- Enhance the user interface and experience for editing complex data structures.
- Refactor the grid component to have renderers and editors as separate components.

# Grid Component

The `Grid` component is a flexible and customizable data grid for React applications. It supports custom renderers and editors for each column, allowing for a wide range of use cases.

## Installation

To use the `Grid` component, import it into your project:

```tsx
import { Grid, EditorType } from "./Grid";
```

## Props

### `GridProps`

- `data` - An array of data objects to be displayed in the grid.
- `columns` - An array of column configurations.
- `onCellUpdate` - A callback function that is called when a cell value is updated.

### `ColumnConfig`

- `key` - The key of the data object to be displayed in the column.
- `header` - The header text for the column.
- `renderer` - A custom renderer function for the column.
- `editor` - A custom editor function or predefined editor type for the column.

### `EditorType`

- `STRING` - A string editor.
- `NUMBER` - A number editor.

## Example Usage

```tsx
import React, { useState } from "react";
import { Grid, EditorType } from "./Grid";

interface Record {
  name: string;
  age: number;
  tags: string[];
}

const initialData: Record[] = [
  { name: "Alice", age: 25, tags: ["JavaScript", "React"] },
  { name: "Bob", age: 30, tags: ["TypeScript", "Node.js"] },
];

const App: React.FC = () => {
  const [data, setData] = useState<Record[]>(initialData);

  const handleCellUpdate = (
    row: number,
    column: keyof Record,
    newValue: Record[keyof Record]
  ) => {
    const updatedData = [...data];
    updatedData[row][column] = newValue;
    setData(updatedData);
  };

  return (
    <Grid
      data={data}
      columns={[
        { key: "name", header: "Name", editor: EditorType.STRING },
        { key: "age", header: "Age", editor: EditorType.NUMBER },
        {
          key: "tags",
          header: "Tags",
          renderer: (tags) => (tags as string[]).join(", "),
          editor: (tags, onChange, onCommit) => (
            <input
              value={(tags as string[]).join(",")}
              onChange={(e) => onChange(e.target.value.split(","))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCommit();
                }
              }}
            />
          ),
        },
      ]}
      onCellUpdate={handleCellUpdate}
    />
  );
};

export default App;
```

## Custom Renderers and Editors

You can provide custom renderers and editors for each column to customize the display and editing experience.

### Custom Renderer

A custom renderer function receives the cell value and returns a React node.

```tsx
const customRenderer = (value: string) => <strong>{value}</strong>;
```

### Custom Editor

A custom editor function receives the cell value, an `onChange` callback, and an `onCommit` callback. It returns a JSX element for editing the cell value.

```tsx
const customEditor = (
  value: string,
  onChange: (newValue: string) => void,
  onCommit: () => void
) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        onCommit();
      }
    }}
  />
);
```

## Styling

The `Grid` component uses the following CSS classes for styling:

- `table` - The main table element.
- `thead` - The table header element.
- `tbody` - The table body element.
- `tr` - The table row element.
- `td` - The table cell element.
- `editor` - The editor input element.

You can customize these styles by modifying the `grid.css` file.

## Conclusion

The `Grid` component is a powerful and flexible data grid for React applications. It supports custom renderers and editors, making it suitable for a wide range of use cases.

# MultiSelectDropdown Component

The `MultiSelectDropdown` component is a customizable multi-select dropdown component built with React. It allows users to select multiple options from a dropdown list.

### Props

- **`options`**: An array of objects representing the available options. Each option should have a `value` (number) and a `label` (string).
- **`onChange`**: A function that is called when the selected values change. It receives the new array of selected values as an argument.
- **`value`** (optional): An array of numbers representing the initially selected values.
- **`placeholder`** (optional): A string to display when no options are selected. Defaults to `"Select options..."`.
- **`renderer`** (optional): A custom renderer function for the selected values. It receives the selected values and a boolean indicating if option is selected.

### Example Usage

```tsx
import React from "react";
import MultiSelectDropdown from "./path/to/MultiSelectDropdown";

const options = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
];

const App = () => {
  const handleSelectionChange = (selectedValues: number[]) => {
    console.log("Selected values:", selectedValues);
  };

  return (
    <MultiSelectDropdown
      options={options}
      onChange={handleSelectionChange}
      placeholder="Select your options"
    />
  );
};

export default App;
```
