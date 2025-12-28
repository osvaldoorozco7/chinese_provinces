import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import "./Map.css";
import ChinaSVGMap from "../ChinaSVGMap";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "../Timer";
import { provinces } from "../../data";
import ProvinceCard from "../ProvinceCard/ProvinceCard";

const Map = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const gameMode = location.state?.mode || "hanzi";

  const [displayMode, setDisplayMode] = useState(gameMode);
  const [isRunning, setIsRunning] = useState(true);

  const [currentProvince, setCurrentProvince] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState(null); // "correct" | "incorrect"

  const goTo = (page) => navigate(page);


  useEffect(() => {
    const random =
      provinces[Math.floor(Math.random() * provinces.length)];
    setCurrentProvince(random);
  }, []);


  useEffect(() => {
    setDisplayMode(gameMode);
  }, [gameMode]);


  useEffect(() => {
  if (feedback !== "correct") return;

  const timeout = setTimeout(() => {
    setCurrentProvince(getRandomProvince());
    setSelectedId(null);
    setFeedback(null);
  }, 800); // delay so user sees "Correct!"

  return () => clearTimeout(timeout);
}, [feedback]);


  const handleProvinceClick = (id) => {
    if (!currentProvince || feedback === "correct") return;

    setSelectedId(id);

    if (id === currentProvince.id) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }


  };


  const provinceColors = {};
  if (selectedId && feedback) {
    provinceColors[selectedId] =
      feedback === "correct" ? "#4caf50" : "#f44336";
  }

  const modeLabelMap = {
    hanzi: "汉字",
    pinyin: "Pinyin",
    both: "汉字 + Pinyin",
  };

  const getRandomProvince = () => {
    let next;
    do {
      next = provinces[Math.floor(Math.random() * provinces.length)];
    } while (next.id === currentProvince?.id);
    return next;
  };

  return (
    <div className="map-main-container">
      <div className="back-arrow">
        <img
          src="/Images/arrow-back.svg"
          alt=""
          onClick={() => goTo("/settings")}
        />
      </div>

      <div className="map-contents">
        <div className="main-map">
          <ChinaSVGMap
            onProvinceClick={handleProvinceClick}
            provinceColors={provinceColors}
          />
        </div>

        <div className="map-tools">
          <div className="map-mode">
            <p>Mode: {modeLabelMap[displayMode]}</p>
          </div>

          <div className="timer">
            <Timer isRunning={isRunning} />
          </div>

          <div className="flashcard">
            <ProvinceCard
              province={currentProvince}
              displayMode={displayMode}
            />
          </div>

          {feedback && (
            <div
              className={`feedback ${
                feedback === "correct" ? "correct" : "incorrect"
              }`}
            >
              {feedback === "correct" ? "Correct!" : "Try again"}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Map;
