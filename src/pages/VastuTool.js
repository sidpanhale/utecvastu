import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./VastuTool.css";
import { v4 as uuidv4 } from "uuid";
import VaastuToolLeftBlock from "./VaastuToolLeftBlock";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { transferData, clearData } from "../store/index";
import HelpIcon from "@material-ui/icons/Help";
import Modal from "../components/Modal";

export default function VastuTool() {
  const [directionRooms, setDirectionRooms] = useState();
  const [modal, setModal] = useState(false);
  const data = useSelector((state) => state.score.value);
  const dispatch = useDispatch();
  const history = useHistory();

  //fetches all the rooms from database and adds id, direction-name to it
  const getRooms = (bodyText) => {
    fetch(
      "https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomList"
    )
      .then((response) => response.json())
      .then((responseData) => {
        return responseData.payload.data.roomList;
      })
      .then((data1) => {
        const dataWithId = data1.map((eachData) => {
          return {
            direction: bodyText,
            roomName: eachData,
            id: uuidv4(),
          };
        });
        setDirectionRooms(dataWithId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetches the score of sent data
  const submitData = (data) => {
    fetch(
      "https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getVastuScore",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        return responseData.payload.data;
      })
      .then((result) => {
        dispatch(transferData(result));
        history.push("/vastutoolscore");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClose = () => {
    setModal(false);
  };

  //checks if rooms are present in an array of directions
  const roomsPresent = () => {
    for (let key in data.selectedRoomsAndDirection) {
      if (data.selectedRoomsAndDirection[key].length > 0) {
        return true;
      }
    }
  };

  const directionArray = [
    "North West",
    "North",
    "North East",
    "West",
    "Centre",
    "East",
    "South West",
    "South",
    "South East",
  ];

  return (
    <>
      {modal && <Modal onClose={onClose} />}
      <div className="vastuTool">
        <div className="vastuToolLeft">
          <div className="vastuToolLeftHeadingDiv">
            <p className="vastuToolLeftHeadingP">
              Select the rooms that are present in each direction of your home
              by clicking on the relevant boxes on the right.
            </p>
          </div>
          {directionRooms && (
            <VaastuToolLeftBlock directionRooms={directionRooms} />
          )}
        </div>

        <div className="vastuToolRight">
          <>
            <span className="knowMoreModal" onClick={() => setModal(true)}>
              <HelpIcon style={{ fontSize: "small", marginRight: "3px" }} />
              KNOW MORE
            </span>

            {/* Mapping all the direction Blocks */}
            <div className="vastuToolRightDiv">
              {directionArray.map((eachDirection) => {
                return (
                  <div
                    key={uuidv4()}
                    className="directionBlock stylesEffect"
                    onClick={() => getRooms(eachDirection)}
                  >
                    <h3>{eachDirection}</h3>
                    <div className="directionButtonRooms">
                      {!data.selectedRoomsAndDirection[eachDirection].length ? (
                        <span>
                          No rooms
                          <br /> selected
                        </span>
                      ) : (
                        <>
                          {data.selectedRoomsAndDirection[eachDirection]
                            .slice(0, 3)
                            .map((item) => {
                              return (
                                <p
                                  key={uuidv4()}
                                  className="directionButtonRoomsP"
                                >
                                  {item}
                                </p>
                              );
                            })}
                          {data.selectedRoomsAndDirection[eachDirection]
                            .length > 3 &&
                            `+
                  ${
                    data.selectedRoomsAndDirection[eachDirection].slice(3)
                      .length
                  }
                  more`}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>

          {/* checks if any room is selected or not, and accordingly shows buttons */}
          {roomsPresent() ? (
            <>
              <button
                className="vastuToolButtonLeft vastuToolButton"
                onClick={() => {
                  submitData(data);
                }}
              >
                <h3 className="buttonText">Calculate Score</h3>
              </button>
              <button
                className="vastuToolButtonRight vastuToolButton"
                onClick={() => dispatch(clearData())}
              >
                <h3 className="buttonText">Reset all</h3>
              </button>
            </>
          ) : (
            <button
              disabled
              className="vastuToolButton vastuToolButtonDisabled"
              onClick={() => {
                submitData(data);
              }}
            >
              <h3 className="buttonText">Calculate Score</h3>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
