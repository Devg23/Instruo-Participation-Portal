import React, { useState, CSSProperties } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const override = (CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  });
  return (
    <div style={{ marginTop: 100 }}>
      <div className="sweet-loading">
        <PacmanLoader
          color="#000"
          loading={loading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
