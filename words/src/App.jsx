import { useRef, useState } from "react";

export default function FiveLetterInput() {
  const [values, setValues] = useState(["", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.toUpperCase();

    if (!/^[A-Z]?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="container">
      <div className="word-box">
        {values.map((val, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
}