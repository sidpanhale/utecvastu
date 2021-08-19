import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./VastuTool.css";
import { v4 as uuidv4 } from "uuid";
import VaastuToolLeftBlock from "./VaastuToolLeftBlock";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { submitData } from "../store/index";
import { transferData, clearData } from "../store/index";
import HelpIcon from "@material-ui/icons/Help";
import Modal from "../components/Modal";

export default function VastuTool() {
  const [directionRooms, setDirectionRooms] = useState(null);
  const [modal, setModal] = useState(false);
  const data = useSelector((state) => state.score.value);
  // const [totalScoreData, setTotalScoreData] = useState({
  //   selectedRoomsAndDirection: {
  //     "North West": [],
  //     North: [],
  //     "North East": [],
  //     West: [],
  //     Centre: [],
  //     East: [],
  //     "South West": [],
  //     South: [],
  //     "South East": [],
  //   },
  // });
  // console.log(totalScoreData);
  const dispatch = useDispatch();
  const history = useHistory();

  const getRooms = (bodyText) => {
    fetch(
      "https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomList"
    )
      .then((response) => response.json())
      .then((responseData) => {
        return responseData.payload.data.roomList;
      })
      .then((data) => {
        const dataWithId = data.map((data) => {
          return {
            direction: bodyText,
            roomName: data,
            id: uuidv4(),
          };
        });
        // console.log(dataWithId);
        setDirectionRooms(dataWithId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const addRoomData = (e, roomName, direction) => {
  //   if (e.target.checked) {
  //     for (let key in totalScoreData.selectedRoomsAndDirection) {
  //       if (key === direction) {
  //         setTotalScoreData((prevState) => ({
  //           ...prevState,
  //           key: totalScoreData.selectedRoomsAndDirection[key].push(roomName),
  //         }));
  //       }
  //     }
  //   } else {
  //     for (let key in totalScoreData.selectedRoomsAndDirection) {
  //       if (key === direction) {
  //         const indexValue =
  //           totalScoreData.selectedRoomsAndDirection[key].indexOf(roomName);

  //         setTotalScoreData((prevState) => ({
  //           ...prevState,
  //           key: totalScoreData.selectedRoomsAndDirection[key].splice(
  //             indexValue,
  //             1
  //           ),
  //         }));
  //       }
  //     }
  //   }
  // };

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

  const roomsPresent = () => {
    for (let key in data.selectedRoomsAndDirection) {
      if (data.selectedRoomsAndDirection[key].length > 0) {
        return true;
      }
    }
  };

  const directionArray = [
    "NORTH-WEST",
    "NORTH",
    "NORTH-EAST",
    "WEST",
    "CENTRE",
    "EAST",
    "SOUTH-WEST",
    "SOUTH",
    "SOUTH-EAST",
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
            <>
              {/* {data &&
                directionArray.map((eachDirection) => {
                  return (
                    <div
                      key={uuidv4()}
                      className="northWestDiv stylesEffect"
                      onClick={() => getRooms(eachDirection)}
                    >
                      <h3>{eachDirection}</h3>
                      <div className="directionButtonRooms">
                        {!data.selectedRoomsAndDirection[eachDirection]
                          .length ? (
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
                })} */}
            </>
            <>
              <div
                className="northWestDiv stylesEffect"
                onClick={() => getRooms("North West")}
              >
                <h3>NORTH-WEST</h3>
                <div className="directionButtonRooms">
                  {!data.selectedRoomsAndDirection["North West"].length ? (
                    <span>
                      No rooms
                      <br /> selected
                    </span>
                  ) : (
                    <>
                      {data.selectedRoomsAndDirection["North West"]
                        .slice(0, 3)
                        .map((item) => {
                          return (
                            <p key={uuidv4()} className="directionButtonRoomsP">
                              {item}
                            </p>
                          );
                        })}
                      {data.selectedRoomsAndDirection["North West"].length >
                        3 &&
                        `+
                  ${
                    data.selectedRoomsAndDirection["North West"].slice(3).length
                  }
                  more`}
                    </>
                  )}
                </div>
              </div>

              <div
                className="northDiv stylesEffect"
                onClick={() => getRooms("North")}
              >
                <h3>NORTH</h3>
                <div className="directionButtonRooms">
                  {!data.selectedRoomsAndDirection["North"].length ? (
                    <span>
                      No rooms
                      <br /> selected
                    </span>
                  ) : (
                    <>
                      {data.selectedRoomsAndDirection["North"]
                        .slice(0, 3)
                        .map((item) => {
                          return (
                            <p key={uuidv4()} className="directionButtonRoomsP">
                              {item}
                            </p>
                          );
                        })}
                      {data.selectedRoomsAndDirection["North"].length > 3 &&
                        `+
                  ${data.selectedRoomsAndDirection["North"].slice(3).length}
                  more`}
                    </>
                  )}
                </div>
              </div>

              <div
                className="northEastDiv stylesEffect"
                onClick={() => getRooms("North East")}
              >
                <h3>NORTH-EAST</h3>
                <div className="directionButtonRooms">
                  {!data.selectedRoomsAndDirection["North East"].length ? (
                    <span>
                      No rooms
                      <br /> selected
                    </span>
                  ) : (
                    <>
                      {data.selectedRoomsAndDirection["North East"]
                        .slice(0, 3)
                        .map((item) => {
                          return (
                            <p key={uuidv4()} className="directionButtonRoomsP">
                              {item}
                            </p>
                          );
                        })}
                      {data.selectedRoomsAndDirection["North East"].length >
                        3 &&
                        `+
                  ${
                    data.selectedRoomsAndDirection["North East"].slice(3).length
                  }
                  more`}
                    </>
                  )}
                </div>
              </div>

              <div
                className="westDiv stylesEffect"
                onClick={() => getRooms("West")}
              >
                <h3>WEST</h3>
                <div className="directionButtonRooms">
                  {!data.selectedRoomsAndDirection.West.length ? (
                    <span>
                      No rooms
                      <br /> selected
                    </span>
                  ) : (
                    <>
                      {data.selectedRoomsAndDirection.West.slice(0, 3).map(
                        (item) => {
                          return (
                            <p key={uuidv4()} className="directionButtonRoomsP">
                              {item}
                            </p>
                          );
                        }
                      )}
                      {data.selectedRoomsAndDirection.West.length > 3 &&
                        `+
                  ${data.selectedRoomsAndDirection.West.slice(3).length}
                  more`}
                    </>
                  )}
                </div>
              </div>

              <div
                className="centreDiv stylesEffect"
                onClick={() => getRooms("Centre")}
              >
                <h3>CENTRE</h3>
                <div className="directionButtonRooms">
                  {!data.selectedRoomsAndDirection.Centre.length ? (
                    <span>
                      No rooms
                      <br /> selected
                    </span>
                  ) : (
                    <>
                      {data.selectedRoomsAndDirection.Centre.slice(0, 3).map(
                        (item) => {
                          return (
                            <p key={uuidv4()} className="directionButtonRoomsP">
                              {item}
                            </p>
                          );
                        }
                      )}
                      {data.selectedRoomsAndDirection.Centre.length > 3 &&
                        `+
                  ${data.selectedRoomsAndDirection.Centre.slice(3).length}
                  more`}
                    </>
                  )}
                </div>
              </div>

              <div
                className="eastDiv stylesEffect"
                onClick={() => getRooms("East")}
              >
                <h3>EAST</h3>
                <div className="directionButtonRooms">
                  {!data.selectedRoomsAndDirection.East.length ? (
                    <span>
                      No rooms
                      <br /> selected
                    </span>
                  ) : (
                    <>
                      {data.selectedRoomsAndDirection.East.slice(0, 3).map(
                        (item) => {
                          return (
                            <p key={uuidv4()} className="directionButtonRoomsP">
                              {item}
                            </p>
                          );
                        }
                      )}
                      {data.selectedRoomsAndDirection.East.length > 3 &&
                        `+
                  ${data.selectedRoomsAndDirection.East.slice(3).length}
                  more`}
                    </>
                  )}
                </div>
              </div>

              <div
                className="southWestDiv stylesEffect"
                onClick={() => getRooms("South West")}
              >
                <h3>SOUTH-WEST</h3>
                <div className="directionButtonRooms">
                  {!data.selectedRoomsAndDirection["South West"].length ? (
                    <span>
                      No rooms
                      <br /> selected
                    </span>
                  ) : (
                    <>
                      {data.selectedRoomsAndDirection["South West"]
                        .slice(0, 3)
                        .map((item) => {
                          return (
                            <p key={uuidv4()} className="directionButtonRoomsP">
                              {item}
                            </p>
                          );
                        })}
                      {data.selectedRoomsAndDirection["South West"].length >
                        3 &&
                        `+
                  ${
                    data.selectedRoomsAndDirection["South West"].slice(3).length
                  }
                  more`}
                    </>
                  )}
                </div>
              </div>

              <div
                className="southDiv stylesEffect"
                onClick={() => getRooms("South")}
              >
                <h3>SOUTH</h3>
                <div className="directionButtonRooms">
                  {!data.selectedRoomsAndDirection.South.length ? (
                    <span>
                      No rooms
                      <br /> selected
                    </span>
                  ) : (
                    <>
                      {data.selectedRoomsAndDirection.South.slice(0, 3).map(
                        (item) => {
                          return (
                            <p key={uuidv4()} className="directionButtonRoomsP">
                              {item}
                            </p>
                          );
                        }
                      )}
                      {data.selectedRoomsAndDirection.South.length > 3 &&
                        `+
                  ${data.selectedRoomsAndDirection.South.slice(3).length}
                  more`}
                    </>
                  )}
                </div>
              </div>

              <div
                className="southEastDiv stylesEffect"
                onClick={() => getRooms("South East")}
              >
                <h3>SOUTH-EAST</h3>
                <div className="directionButtonRooms">
                  {!data.selectedRoomsAndDirection["South East"].length ? (
                    <span>
                      No rooms
                      <br /> selected
                    </span>
                  ) : (
                    <>
                      {data.selectedRoomsAndDirection["South East"]
                        .slice(0, 3)
                        .map((item) => {
                          return (
                            <p key={uuidv4()} className="directionButtonRoomsP">
                              {item}
                            </p>
                          );
                        })}
                      {data.selectedRoomsAndDirection["South East"].length >
                        3 &&
                        `+
                  ${
                    data.selectedRoomsAndDirection["South East"].slice(3).length
                  }
                  more`}
                    </>
                  )}
                </div>
              </div>
            </>
          </>

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
