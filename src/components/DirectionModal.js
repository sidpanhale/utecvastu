import React, { useEffect, useState } from "react";
import "./DirectionModal.css";
import CloseIcon from "@material-ui/icons/Close";
import { v4 as uuidv4 } from "uuid";

//Vastu Tool Direction Modal
const DirectionModal = React.memo((props) => {
  const [directionStatus, setDirectionStatus] = useState();

  //Selected Direction from props is stored
  const direction = props.directionForModal;

  //Data is fetched of selected direction
  const fetchData = (direction) => {
    fetch(
      "https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getDirectionDetails",
      {
        method: "POST",
        body: JSON.stringify({
          direction: direction,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setDirectionStatus(responseData.payload.data.favourableDirections);
      });
  };

  useEffect(() => {
    fetchData(direction);
  }, [direction]);

  return (
    <React.Fragment>
      <div className="DirectionBackdrop" onClick={props.closeModal} />
      <div className="DirectionModalBox">
        <div className="DirectionModalHeading">
          <span className="DirectionModalHeadingText">{direction}</span>
          <span className="DirectionModalHeadingIcon">
            <CloseIcon
              style={{ fontSize: "large" }}
              onClick={props.closeModal}
            />
          </span>
        </div>

        <div className="DirectionModalDetails">
          <p className="DirectionModalDetailsTitle">FAVOURABLE ROOMS</p>
          
          {directionStatus && <ul className="listElementsDiv">
            {directionStatus.map((item) => {
              return <li key={uuidv4()} className="DirectionModalDetailsTitleText">{item}</li>;
            })}
          </ul>}
        </div>
      </div>
    </React.Fragment>
  );
});

export default DirectionModal;
