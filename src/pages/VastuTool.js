import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./VastuTool.css";
import { v4 as uuidv4 } from "uuid";
import VaastuToolLeftBlock from "./VaastuToolLeftBlock";
//import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { submitData } from "../store/index";
import { transferData } from "../store/index";
import HelpIcon from "@material-ui/icons/Help";
import Modal from "../components/Modal";

export default function VastuTool() {
  const [directionRooms, setDirectionRooms] = useState(null);
  const [modal, setModal] = useState(false);
  const [totalScoreData, setTotalScoreData] = useState({
    selectedRoomsAndDirection: {
      "North West": [],
      North: [],
      "North East": [],
      West: [],
      Centre: [],
      East: [],
      "South West": [],
      South: [],
      "South East": [],
    },
  });
  // console.log(totalScoreData);
  const dispatch = useDispatch();
  const history = useHistory();

  const getDirections = (bodyText) => {
    fetch(
      "https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getDirectionDetails",
      {
        method: "POST",
        body: JSON.stringify({
          direction: bodyText,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        return responseData.payload.data.favourableDirections;
      })
      .then((data) => {
        const dataWithId = data.map((data) => {
          return {
            direction: bodyText,
            roomName: data,
            id: uuidv4(),
          };
        });

        setDirectionRooms(dataWithId);
      });
  };

  const addRoomData = (e, roomName, direction) => {
    if (e.target.checked) {
      for (let key in totalScoreData.selectedRoomsAndDirection) {
        if (key === direction) {
          setTotalScoreData((prevState) => ({
            ...prevState,
            key: totalScoreData.selectedRoomsAndDirection[key].push(roomName),
          }));
        }
      }
    } else {
      for (let key in totalScoreData.selectedRoomsAndDirection) {
        if (key === direction) {
          const indexValue =
            totalScoreData.selectedRoomsAndDirection[key].indexOf(roomName);

          setTotalScoreData((prevState) => ({
            ...prevState,
            key: totalScoreData.selectedRoomsAndDirection[key].splice(
              indexValue,
              1
            ),
          }));
        }
      }
    }
  };

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
        console.log(result);
        dispatch(transferData(result));
        history.push("/vastutoolscore");
      });
  };
  const onClose = () => {
    setModal(false)
  };

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
            <VaastuToolLeftBlock
              directionRooms={directionRooms}
              addRoomData={addRoomData}
            />
          )}
        </div>

        <div className="vastuToolRight">
          <>
            <span className="knowMoreModal" onClick={() => setModal(true)}>
              <HelpIcon style={{ fontSize: "small", marginRight: "3px" }} />
              KNOW MORE
            </span>
            <div
              className="northWestDiv stylesEffect"
              onClick={() => getDirections("North West")}
            >
              <h3>NORTH-WEST</h3>
              <div className="directionButtonRooms">
                {totalScoreData.selectedRoomsAndDirection["North West"].map(
                  (item) => {
                    return (
                      <p key={uuidv4()} className="directionButtonRoomsP">
                        {item}
                      </p>
                    );
                  }
                )}
              </div>
            </div>

            <div
              className="northDiv stylesEffect"
              onClick={() => getDirections("North")}
            >
              <h3>NORTH</h3>
              <div className="directionButtonRooms">
                {totalScoreData.selectedRoomsAndDirection["North"].map(
                  (item) => {
                    return (
                      <p key={uuidv4()} className="directionButtonRoomsP">
                        {item}
                      </p>
                    );
                  }
                )}
              </div>
            </div>

            <div
              className="northEastDiv stylesEffect"
              onClick={() => getDirections("North East")}
            >
              <h3>NORTH-EAST</h3>
              <div className="directionButtonRooms">
                {totalScoreData.selectedRoomsAndDirection["North East"].map(
                  (item) => {
                    return (
                      <p key={uuidv4()} className="directionButtonRoomsP">
                        {item}
                      </p>
                    );
                  }
                )}
              </div>
            </div>

            <div
              className="westDiv stylesEffect"
              onClick={() => getDirections("West")}
            >
              <h3>WEST</h3>
              <div className="directionButtonRooms">
                {totalScoreData.selectedRoomsAndDirection.West.map((item) => {
                  return (
                    <p key={uuidv4()} className="directionButtonRoomsP">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>

            <div
              className="centreDiv stylesEffect"
              onClick={() => getDirections("Centre")}
            >
              <h3>CENTRE</h3>
              <div className="directionButtonRooms">
                {totalScoreData.selectedRoomsAndDirection.Centre.map((item) => {
                  return (
                    <p key={uuidv4()} className="directionButtonRoomsP">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>

            <div
              className="eastDiv stylesEffect"
              onClick={() => getDirections("East")}
            >
              <h3>EAST</h3>
              <div className="directionButtonRooms">
                {totalScoreData.selectedRoomsAndDirection.East.map((item) => {
                  return (
                    <p key={uuidv4()} className="directionButtonRoomsP">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>

            <div
              className="southWestDiv stylesEffect"
              onClick={() => getDirections("South West")}
            >
              <h3>SOUTH-WEST</h3>
              <div className="directionButtonRooms">
                {totalScoreData.selectedRoomsAndDirection["South West"].map(
                  (item) => {
                    return (
                      <p key={uuidv4()} className="directionButtonRoomsP">
                        {item}
                      </p>
                    );
                  }
                )}
              </div>
            </div>

            <div
              className="southDiv stylesEffect"
              onClick={() => getDirections("South")}
            >
              <h3>SOUTH</h3>
              <div className="directionButtonRooms">
                {totalScoreData.selectedRoomsAndDirection.South.map((item) => {
                  return (
                    <p key={uuidv4()} className="directionButtonRoomsP">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>

            <div
              className="southEastDiv stylesEffect"
              onClick={() => getDirections("South East")}
            >
              <h3>SOUTH-EAST</h3>
              <div className="directionButtonRooms">
                {totalScoreData.selectedRoomsAndDirection["South East"].map(
                  (item) => {
                    return (
                      <p key={uuidv4()} className="directionButtonRoomsP">
                        {item}
                      </p>
                    );
                  }
                )}
              </div>
            </div>
          </>
          <div
            className="calculateScoreDiv stylesEffect"
            onClick={() => {
              submitData(totalScoreData);
            }}
          >
            <h3 className="buttonText">Calculate Score</h3>
          </div>
        </div>
      </div>
    </>
  );
}
