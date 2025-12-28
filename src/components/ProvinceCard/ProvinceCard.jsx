import React from "react";
import "./ProvinceCard.css";

const ProvinceCard = ({ province, displayMode }) => {
  if (!province) return null;

  return (
    <div className="province-card">
      <p className="card-title">Find this province:</p>

      {displayMode === "hanzi" && (
        <div className="hanzi">{province.hanzi}</div>
      )}

      {displayMode === "pinyin" && (
        <div className="pinyin">{province.pinyin}</div>
      )}

      {displayMode === "both" && (
        <>
          <div className="hanzi">{province.hanzi}</div>
          <div className="pinyin">{province.pinyin}</div>
        </>
      )}
    </div>
  );
};

export default ProvinceCard;
