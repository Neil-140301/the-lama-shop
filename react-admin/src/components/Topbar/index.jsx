import React from 'react';
import './index.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';

export default function Topbar() {
  return (
    <div className="topbar ">
      <div className="topbarWrapper">
        <div className="topLeft">
          <p className="logo">The Lama Shop Admin</p>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer ">
            <NotificationsNone />
            <span className="topIconBadge">3</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://avatars.githubusercontent.com/u/1486366?v=4"
            alt=""
            className="topAvatar ring ring-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
