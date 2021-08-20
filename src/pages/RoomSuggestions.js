import React from "react";
import "./RoomSuggestions.css";
import { v4 as uuidv4 } from "uuid";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

//This component provides details of selected rooms from CompassTool component
export default function RoomSuggestions({ roomsData, backButton }) {
  return (
    <div className="RoomSuggestions">
      <div className="heading">
        <ArrowBackIcon className="icon" onClick={()=>backButton()}/><span>{roomsData.name}</span>
      </div>

      <div className="vastuToolLeftBox">
        <div className="vastuToolLeftBoxTitle">
          <span>FAVOURABLE DIRECTIONS</span>
        </div>

        <div className="directionFlex">
          {roomsData.favourableDirections.map((data) => {
            return (
              <div key={uuidv4()} className="direction1">
                <span className="directionText1">{data}</span>
              </div>
            );
          })}
        </div>

        <div className="vastuToolLeftBoxTitle">
          <span>NEUTRAL DIRECTIONS</span>{" "}
        </div>

        <div className="directionFlex">
          {roomsData.neutralDirections.map((data) => {
            return (
              <div key={uuidv4()} className="direction2">
                <span className="directionText2">{data}</span>
              </div>
            );
          })}
        </div>

        <div className="vastuToolLeftBoxTitle">
          <span>UNFAVOURABLE DIRECTIONS</span>{" "}
        </div>
        <div className="directionFlex">
          {roomsData.unfavourableDirections.map((data) => {
            return (
              <div key={uuidv4()} className="direction3">
                <span className="directionText3">{data}</span>
              </div>
            );
          })}
        </div>

        <div className="vastuToolLeftBoxTitle">
          <span>About</span>
        </div>
          <div className="aboutDiv">
              <p className="aboutP">
              In general, bathroom has a toilet and/or bathtub, vanity with sink or just a sink. The primary concern for the bathroom location is the toilet location. Bathing area, vanity and sink locations and orientations are flexible. Therefore, the guidelines for the bathroom location follow the ones for the toilets.
              </p>
          </div>
      </div>
    </div>
  );
}
