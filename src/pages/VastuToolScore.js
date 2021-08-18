import React from "react";
import { Link } from "react-router-dom";
import "./VastuToolScore.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function VastuToolScore(props) {
  const score = useSelector((state) => state.score.value);

  return (
    <div className="vaastuToolScore">
      <div className="vaastuDiv">
        <div className="backButton">
          <Link to="/vastutool" style={{ textDecoration: "none" }}>
            <ArrowBackIcon className="icon2" />
            <span className="backButtonText">Go Back</span>
          </Link>
        </div>

        <div className="OverTextDiv">
          <p className="OverTextP">OVERALL VAASTU SCORE</p>
        </div>

        <div className="scoreDiv">
          <span>{score.overallVastuScore}</span>
          <span className="vastuStatus">{score.vastuScoreStatus}</span>
        </div>

        <div className="horizontalRule2">
          <hr />
        </div>

        <div className="title2">
          <p>ROOM-WISE BREAKUP OF VAASTU SCORE</p>
        </div>

        <div className="roomDetailsOuterDiv">
          <div className="roomDetailsInnerDiv">
            <div className="roomDetails">
              {score.roomWiseVastuScore.map((item) => {
                return (
                  <div className="roomDetailsDiv" key={uuidv4()}>
                    <span style={{ marginBottom: "0.1rem" }}>{item.room}</span>
                    <div
                      className={`legendDiv ${
                        item.legend === "Favorable"
                          ? "favColor"
                          : item.legend === "Neutral"
                          ? "neutralColor"
                          : "avoidColor"
                      }`}
                    >
                      <span className="legendSpan">{item.legend}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              {" "}
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div className="resetDiv">
        <Link to="/vastutool" style={{ textDecoration: "none" }}>
          <h3 className="resetDivText">RESET VALUE SCORE</h3>
        </Link>
      </div>
    </div>
  );
}
