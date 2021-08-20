import React from "react";
import { Link } from "react-router-dom";
import "./SolutionsNew.css";
import Solutions1pic from "../images/solutions1pic.png";
import Solutions2pic from "../images/solutions2pic.png";


//Initial Page
export default function SolutionsNew() {
  return (
    <div className="solutionsNew">
      <div className="breadcrumb"></div>

      <div className="toolSelectHeadingDiv">
        <p className="toolSelectHeadingP">PICK THE IDEAL TOOL FOR YOU:</p>
      </div>
      <div className="toolsDiv">
        <Link to="/compasstool">
          <div className="cardLeft">
            <div className="cardLeftImage">
              <img className="image" src={Solutions1pic} alt="" />
            </div>
            <div className="cardLeftTexts">
              <p className="cardHeadingLeft">Compass Tool</p>
              <p className="cardTimeLeft">Output Time: 1 min</p>
              <p className="cardDescriptionLeft">
                Point in the direction of specific rooms to know their
                suitability according to Vaastu guidelines.
              </p>
            </div>
          </div>
        </Link>

        <Link to="/vastutool">
          <div className="cardRight">
            <div className="cardRightImage">
              <img className="image" src={Solutions2pic} alt="" />
            </div>
            <div className="cardRightTexts">
              <p className="cardHeadingRight">Vaastu Score Check</p>
              <p className="cardTimeRight">Output Time: 5 mins</p>
              <p className="cardDescriptionRight">
                Input the location of all rooms in your home and get a Vaastu
                score instantly.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
