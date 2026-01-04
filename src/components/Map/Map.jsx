import React, { useCallback, useEffect, useState } from "react";
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
  const [isRunning] = useState(true);

  const [currentProvince, setCurrentProvince] = useState(null);
  const [feedback, setFeedback] = useState(null); 

  const [attempts, setAttempts] = useState(0);
  const [wrongSelections, setWrongSelections] = useState([]);
  const [revealCorrect, setRevealCorrect] = useState(false);

  const goTo = (page) => navigate(page);


  useEffect(() => {
    const random =
      provinces[Math.floor(Math.random() * provinces.length)];
    setCurrentProvince(random);
  }, []);


  useEffect(() => {
    setDisplayMode(gameMode);
  }, [gameMode]);

  const getRandomProvince = useCallback(() => {
    let next;
    do {
      next = provinces[Math.floor(Math.random() * provinces.length)];
    } while (next.id === currentProvince?.id);
    
    return next;
  }, [currentProvince]);

useEffect(() => {
  if (feedback !== "correct") return;

  const timeout = setTimeout(() => {
    setCurrentProvince(getRandomProvince());
    setFeedback(null);
    setAttempts(0);
    setWrongSelections([]);
    setRevealCorrect(false);
  }, 900);

  return () => clearTimeout(timeout);
}, [feedback, getRandomProvince]);


const handleProvinceClick = (id) => {
  if (!currentProvince || feedback === "correct") return;

  setAttempts((prev) => {
    const next = prev + 1;

    
    if (id === currentProvince.id) {
      if (next === 1) {
        
        setFeedback("correct");
      } else {
        
        setRevealCorrect(true);
        setFeedback("correct");
      }
      return next;
    }

    setWrongSelections((prevWrong) =>
      prevWrong.includes(id) ? prevWrong : [...prevWrong, id]
    );

    if (next >= 3) {
      setRevealCorrect(true);
      setFeedback("correct");
    }

    return next;
  });
};


const provinceColors = {};

wrongSelections.forEach((id) => {
  provinceColors[id] = "#f44336";
});

if (currentProvince) {
  if (attempts === 1 && feedback === "correct") {
    provinceColors[currentProvince.id] = "#4caf50";
  }

  if (attempts === 2 && feedback === "correct" && revealCorrect) {
    provinceColors[currentProvince.id] = "#fbc02d";
  }

  if (attempts >= 3) {
    provinceColors[currentProvince.id] = "#4caf50";
  }
}



  const modeLabelMap = {
    hanzi: "汉字",
    pinyin: "Pinyin",
    both: "汉字 + Pinyin",
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
            <p>Game mode <br /> {modeLabelMap[displayMode]}</p>
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
