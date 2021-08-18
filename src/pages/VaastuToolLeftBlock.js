import React, { useState } from "react";
import DirectionModal from "../components/DirectionModal";
import "./VastuTool.css";

export default function VaastuToolLeftBlock({ directionRooms, addRoomData }) {
  const [isdirectionModal, setIsDirectionModal] = useState(false);
  const directionForModal = directionRooms[0].direction;

  const closeModal = () => {
    setIsDirectionModal(false)
  }
  return (
    <>
  {isdirectionModal && <DirectionModal directionForModal={directionForModal} closeModal={closeModal} />}
    <div className="vastuToolLeftBox">
      <h2>{directionRooms[0].direction}</h2>
      <div className="leftBoxTextDiv">
      <span className="leftBoxText">
        Want to know more about <span>{directionRooms[0].direction}?</span>
      </span>
      <span className="readNowSpan" onClick={() => setIsDirectionModal(true)}>READ NOW</span>
      </div>

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
    </>
  );
}
