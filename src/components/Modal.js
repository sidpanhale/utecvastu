import React from "react";
import "./Modal.css";
import CloseIcon from "@material-ui/icons/Close";

//Vastu Tool Page (know more) modal
const Modal = React.memo((props) => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="modalBox">
        <div className="modalHeading">
          <span className="modalHeadingText">Legend</span>
          <span className="modalHeadingIcon">
            <CloseIcon style={{ fontSize: "large" }} onClick={props.onClose}/>
          </span>
        </div>

        <div className="modalDetails">
          <p className="modalDetailsTitle">EXCELLENT</p>
          <p className="modalDetailsTitleText">
            Your plan is as per the highest standards of Vaastu. Good job!
          </p>
          <p className="modalDetailsTitle">GOOD</p>
          <p className="modalDetailsTitleText">
            Most of the rooms in your layout have proper Vaastu compliance.
          </p>
          <p className="modalDetailsTitle">IMPROVEMENT REQUIRED</p>
          <p className="modalDetailsTitleText">
            If you are in planning stage, try re-positioning some rooms to
            improve Vaastu compliance.
          </p>
          <p className="modalDetailsTitle">NON-VAASTU COMPLIANT</p>
          <p className="modalDetailsTitleText">
            Please consult a Vaastu expert to help design the layout according
            to Vaastu.
          </p>
        </div>

      </div>
    </React.Fragment>
  );
});

export default Modal;
