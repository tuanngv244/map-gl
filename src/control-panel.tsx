import * as React from "react";
import { CITIES } from "./data";

function ControlPanel(props: any) {
  return (
    <div className="control-panel">
      <button onClick={props?._onGetToVietNam}>Khu vực Việt Nam</button>
      <h3>Chọn nhà thuốc</h3>
      {CITIES.map((city, index) => (
        <div key={`btn-${index}`} className="input">
          <input
            type="radio"
            name="city"
            id={`city-${index}`}
            // defaultChecked={city.city === "San Francisco"}
            onClick={() => props.onSelectCity(city)}
          />
          <label htmlFor={`city-${index}`}>{city.city}</label>
        </div>
      ))}
    </div>
  );
}

export default React.memo(ControlPanel);
