import React from "react";

function UnitComponent() {
  return (
    <div className="row form-inline">
      <input type="number" className="form-control mx-2" />
      <select className="form-control mx-2">
        <option value="Tbsp">Tbsp</option>
        <option value="tsp">tsp</option>
      </select>
    </div>
  );
}

export default UnitComponent;
