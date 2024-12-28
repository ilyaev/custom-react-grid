import React, { useState, useRef, useEffect } from "react";
import "./dropdown.css";

interface Option {
  value: number;
  label: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  onChange: (selectedValues: number[]) => void;
  value?: number[];
  placeholder?: string;
  renderer?: (value: number[], selected: boolean) => JSX.Element;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  onChange,
  placeholder = "Select options...",
  value = [] as number[],
  renderer = undefined,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<number[]>(value);
  const [searchInput, setSearchInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    const isSelected = selectedValues.includes(option.value);
    let newSelectedValues = [...selectedValues];

    if (isSelected) {
      newSelectedValues = newSelectedValues.filter(
        (value) => value !== option.value
      );
    } else {
      newSelectedValues.push(option.value);
    }

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const isOptionSelected = (option: Option) => {
    return selectedValues.includes(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="multiselect-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedValues.length > 0
          ? renderer
            ? renderer(selectedValues, false)
            : options
                .filter((option) => selectedValues.includes(option.value))
                .map((option) => option.label)
                .join(", ")
          : placeholder}
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <div className="dropdown-popup">
          <input
            type="text"
            className="dropdown-search"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <ul className="dropdown-list">
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className={isOptionSelected(option) ? "selected" : ""}
              >
                {renderer
                  ? renderer([option.value], isOptionSelected(option))
                  : option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
