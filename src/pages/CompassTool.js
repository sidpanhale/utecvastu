import React, { useEffect, useState } from "react";
import "./CompassTool.css";
import compassTool from "../images/compassTool.png";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import RoomSuggestions from "./RoomSuggestions";

export default function CompassTool() {
  const [roomData, setRoomData] = useState([]);

  const [selectedRoomSuggestions, setSelectedRoomSuggestions] = useState(null);

  useEffect(() => {
    Axios.get(
      "https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomList"
    )
      .then((responseData) => {
        return responseData.data.payload.data.roomList;
      })
      .then((data) => {
        const dataWithId = data.map((data) => {
          return {
            roomName: data,
            id: uuidv4(),
          };
        });

        setRoomData(dataWithId);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const selectedRoomDetailsHandler = (bodyText) => {
    fetch(
      "https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomDetails",
      {
        method: "POST",
        body: JSON.stringify({
          roomName: bodyText,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        return { ...responseData.payload.data, name: bodyText };
      })
      .then((dataWithName) => {
        setSelectedRoomSuggestions(dataWithName);
      }).catch((error) => {
        console.log(error.message);
      });
  };

  const backButtonHandler =() =>{
    setSelectedRoomSuggestions(null)
  }

  return (
    <div className="compassTool">
      <div className="compassToolLeft">
        {selectedRoomSuggestions ? (
          <RoomSuggestions roomsData={selectedRoomSuggestions} backButton={backButtonHandler}/>
        ) : (
          <>
            <p className="compassToolLeftHeading">
              Tap on a room below to see the suitable direction for it in your
              home alongside additional information.
            </p>

            <div>
              <ul className="cardComponents">
                {roomData.map((data) => (
                  <div
                    key={data.id}
                    className="card"
                    onClick={() => selectedRoomDetailsHandler(data.roomName)}
                  >
                    <li className="cardText">{data.roomName}</li>
                  </div>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="compassToolRight">
        <img src={compassTool} alt="" />
      </div>
    </div>
  );
}
