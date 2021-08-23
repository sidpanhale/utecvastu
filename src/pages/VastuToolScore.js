import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./VastuToolScore.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import VastuToolScoreRoom from "./VastuToolScoreRoom";
import { clearData } from "../store/index";

//Vastu Result Score page
export default function VastuToolScore(props) {
  const score = useSelector((state) => state.score.value2);
  const dispatch = useDispatch();
  const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [roomTitle, setRoomTitle] = useState("");

  const closeVastuToolScoreRoom = () => {
    setIsRoomSelected(false);
  };

  return (
    <div className="vaastuToolScore">
      {isRoomSelected ? (
        <VastuToolScoreRoom
          roomTitle={roomTitle}
          closeVastuToolScoreRoom={closeVastuToolScoreRoom}
        />
      ) : (
        <>
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
              <span>{score && score.overallVastuScore}</span>
              <span className="vastuStatus">
                {score && score.vastuScoreStatus}
              </span>
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
                  {score &&
                    score.roomWiseVastuScore.map((item) => {
                      return (
                        
                        <div
                          className="roomDetailsDiv"
                          key={uuidv4()}
                          onClick={() => {
                            setIsRoomSelected(true);
                            setRoomTitle(item.room);
                          }}
                        >
                          <div className="directionSmallText">
                            <span style={{ marginBottom: "0.1rem" }}>
                              {item.room}
                            </span>
                            <span style={{ fontSize : "12px", fontWeight: "normal", lineHeight:"14px" }}>({item.direction})</span>
                          </div>
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
              </div>
            </div>
          </div>
          <div className="resetDiv" onClick={() => dispatch(clearData())}>
            <Link to="/vastutool" style={{ textDecoration: "none" }}>
              <h3 className="resetDivText">RESET VALUE SCORE</h3>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
