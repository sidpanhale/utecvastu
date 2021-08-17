import React from "react";
import { Link } from "react-router-dom";
import "./HeaderNew.css";
import utecLogo from "../images/utecLogo.png";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function HeaderNew() {
  return (
    <div className="header">
      <div className="header-left">
        <div className="header_option">
          <Link to="/SolutionsNew">
            <img className="header_logo" src={utecLogo} alt="" />
          </Link>
        </div>

        <div className="header_optionDiv">
          <span className="header_optionAbout">About</span>
        </div>

        <div className="header_optionDiv">
          <span className="header__optionLearn">Learn</span>
        </div>

        <div className="header_optionDiv">
          <span className="header__optionSolutions">Solutions</span>
        </div>
      </div>

      <div className="header-right">
        <div className="header_optionDiv">
          <span className="header__optionEnglish">English</span>
        </div>

        <div className="header_optionDiv">
          <span className="header__optionSupport">Support</span>
        </div>

        <div className="header_optionDiv customCss">
          <span className="header__optionMyProjects">My Projects</span>
        </div>

        <div className="header_optionDiv">
          <SearchIcon className="icons" />
        </div>

        <div className="header_optionDiv">
          <NotificationsNoneIcon className="icons" />
        </div>

        <div className="header_optionDiv">
          <AccountCircleIcon className="icons" />
        </div>
      </div>
    </div>
  );
}
