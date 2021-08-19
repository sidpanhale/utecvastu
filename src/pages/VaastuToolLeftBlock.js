import React, { useState } from "react";
import DirectionModal from "../components/DirectionModal";
import "./VastuTool.css";
import { addData } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";

export default function VaastuToolLeftBlock({ directionRooms }) {
  const [isdirectionModal, setIsDirectionModal] = useState(false);
  const directionForModal = directionRooms[0].direction;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.score.value);
  // const score1 = useSelector((state) => state.score.value);

  const closeModal = () => {
    setIsDirectionModal(false);
  };
  return (
    <>
      {isdirectionModal && (
        <DirectionModal
          directionForModal={directionForModal}
          closeModal={closeModal}
        />
      )}
      <div className="vastuToolLeftBox">
        <h2>{directionRooms[0].direction}</h2>
        <div className="leftBoxTextDiv">
          <span className="leftBoxText">
            Want to know more about <span>{directionRooms[0].direction}?</span>
          </span>
          <span
            className="readNowSpan"
            onClick={() => setIsDirectionModal(true)}
          >
            READ NOW
          </span>
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
                    checked={
                      data &&
                      data.selectedRoomsAndDirection[
                        directionRooms[0].direction
                      ].includes(room.roomName)
                    }
                    onChange={(e) => {
                      // addRoomData(e, room.roomName, room.direction);
                      dispatch(
                        addData({
                          e: e.target.checked,
                          roomName: room.roomName,
                          direction: room.direction,
                        })
                      );
                    }}
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
