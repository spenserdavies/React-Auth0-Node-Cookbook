import React from "react";

function UnitComponent(props) {
  const {
    unitOptions,
    selectedUnit,
    onChangeUnit,
    amount,
    onChangeAmount,
  } = props;
  return (
    <div className="row form-inline">
      <input
        type="number"
        className="form-control mx-2"
        value={amount}
        onChange={onChangeAmount}
      />
      <select
        className="form-control mx-2"
        value={selectedUnit}
        onChange={onChangeUnit}
      >
        {unitOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UnitComponent;
