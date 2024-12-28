import "./App.css";
import { EXAMPLE_DATA_USERS } from "./const";
import MultiSelectDropdown from "./Dropdown";
import { EditorType, Grid } from "./Grid";
import { useEffect, useMemo, useState } from "react";

interface Record {
  name: string;
  age: number;
  tags: string[];
  users: number[];
}

interface User {
  id: number;
  name: string;
  url: string;
}

const CustomGrid = Grid<Record>;

function App() {
  const [records, setRecords] = useState<Record[]>(EXAMPLE_DATA_USERS);

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(() => {
    return () => {
      fetch(
        document.location.href.indexOf("localhost") === -1
          ? "api/users"
          : "http://localhost:5001/api/users"
      )
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error("Error fetching users:", error));
    };
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <CustomGrid
      columns={[
        {
          key: "name",
          header: "Name",
          editor: EditorType.STRING,
          renderer: (name) => {
            return (
              <a
                href={"#"}
                onClick={(event) => {
                  alert(`Clicked on ${name}`);
                  event.stopPropagation();
                  event.preventDefault();
                }}
              >
                {name}
              </a>
            );
          },
        },
        { key: "age", header: "Age", editor: EditorType.NUMBER },
        {
          key: "users",
          header: "Users",
          renderer: (values) => {
            return (
              <div
                title={users
                  .filter((user) => {
                    return (values as number[]).includes(user.id);
                  })
                  .map((user) => user.name)
                  .join("\r\n")}
              >
                {renderUsers(values as number[], users, false)}
              </div>
            );
          },
          editor: (values, onChange) => {
            return (
              <>
                <MultiSelectDropdown
                  options={users.map((user) => {
                    return { value: user.id, label: user.name };
                  })}
                  onChange={onChange}
                  value={values as number[]}
                  placeholder="Select users..."
                  renderer={(values, selected) => {
                    return renderUsers(values, users, selected);
                  }}
                />
              </>
            );
          },
        },
        {
          key: "tags",
          header: "Tags",
          renderer: (tags) => {
            return (
              <div>
                {(tags as string[]).map((tag) => {
                  return (
                    <span
                      key={tag}
                      className="tag"
                      style={{
                        border: "1px solid black",
                        padding: "2px",
                        margin: "2px",
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            );
          },
          editor: (tags, onChange, onCommit) => (
            <input
              value={(tags as string[]).join(",")}
              className="editor"
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
      onCellUpdate={(row, column, newValue) => {
        const updatedRecords = [...records];
        (updatedRecords[row][column] as Record[keyof Record]) = newValue;
        setRecords(updatedRecords);
      }}
      data={records}
    />
  );
}

const renderUsers = (values: number[], users: User[], selected: boolean) => {
  return (
    <div style={{ display: "flex" }}>
      {values.slice(0, 3).map((value) => {
        const user = users.find((user) => user.id === value);
        return user ? (
          <div
            key={`avatar${value}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <img
              width={25}
              key={user.url}
              src={user.url}
              alt={user.name}
              style={{ marginRight: "5px" }}
            />
            <span style={{ whiteSpace: "nowrap" }}>
              {user?.name} {selected ? "✔" : ""}
            </span>
          </div>
        ) : null;
      })}
      {values.length > 3 && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>+{values.length - 3}</span>
        </div>
      )}
    </div>
  );
};

export default App;
