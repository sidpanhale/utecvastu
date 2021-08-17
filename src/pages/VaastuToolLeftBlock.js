import React from "react";
import "./VastuTool.css";

export default function VaastuToolLeftBlock({ directionRooms, addRoomData }) {
  return (
    <div className="vastuToolLeftBox">
      <h2>{directionRooms[0].direction}</h2>
      <p className="leftBoxText">
        Want to know more about <span>{directionRooms[0].direction}</span>
      </p>
      <div className="horizontalRule">
        <hr />
      </div>
      <div className="checkBoxesDiv">
        {directionRooms.map((room) => {
          return (
            <div key={room.id} className="checkBoxDiv">
              <label>
                <input
                  className="checkboxInput"
                  type="checkbox"
                  onChange={(e) => addRoomData(e, room.roomName, room.direction)}
                />
                <span className="checkBoxText">{room.roomName}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
