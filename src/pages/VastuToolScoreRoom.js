import React, { useEffect, useState } from "react";
import "./VastuToolScoreRoom.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { v4 as uuidv4 } from "uuid";
import DirectionModal from "../components/DirectionModal";

export default function VastuToolScoreRoom({
  roomTitle,
  closeVastuToolScoreRoom,
}) {
  const [roomDetail, setRoomDetail] = useState();
  const [modalOpen, setModalOpen] = useState({
    openOrClose: false,
    passingText: "",
  });

  const fetchRoomData = (bodyText) => {
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
        setRoomDetail(dataWithName);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchRoomData(roomTitle);
  }, [roomTitle]);

  const closeScoreRoomModal = () => {
    setModalOpen({ ...modalOpen, openOrClose: false });
  };

  const openModal = (openModalText) => {
    setModalOpen({
      ...modalOpen,
      openOrClose: true,
      passingText: openModalText,
    });
  };

  return (
    <>
      {modalOpen.openOrClose && (
        <DirectionModal
          directionForModal={modalOpen.passingText}
          closeModal={closeScoreRoomModal}
        />
      )}

      <div className="VastuToolScoreRoomDiv">
        <div className="VastuToolScoreRoomDivHeading">
          <ArrowBackIcon
            className="BackButtonIcon"
            onClick={() => closeVastuToolScoreRoom()}
          />
          <span>{roomTitle}</span>
        </div>

        {roomDetail && (
          <>
            <div className="VastuToolScoreRoomTitle">
              <span>FAVOURABLE DIRECTIONS</span>
            </div>
            <div className="directionFlex">
              {roomDetail.favourableDirections.map((data) => {
                return (
                  <div
                    key={uuidv4()}
                    className="ScoreRoomDirection1"
                    onClick={() => {
                      openModal(data);
                    }}
                  >
                    <span className="ScoreRoomText1">{data}</span>
                  </div>
                );
              })}
            </div>{" "}
          </>
        )}

        {roomDetail && (
          <>
            <div className="VastuToolScoreRoomTitle">
              <span>NEUTRAL DIRECTIONS</span>{" "}
            </div>

            <div className="directionFlex">
              {roomDetail.neutralDirections.map((data) => {
                return (
                  <div key={uuidv4()} className="ScoreRoomDirection2"
                  onClick={() => {
                      openModal(data);
                    }}>
                    <span className="ScoreRoomText2">{data}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {roomDetail && (
          <>
            <div className="VastuToolScoreRoomTitle">
              <span>UNFAVOURABLE DIRECTIONS</span>{" "}
            </div>
            <div className="directionFlex">
              {roomDetail.unfavourableDirections.map((data) => {
                return (
                  <div key={uuidv4()} className="ScoreRoomDirection3"
                  onClick={() => {
                      openModal(data);
                    }}>
                    <span className="ScoreRoomText3">{data}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
