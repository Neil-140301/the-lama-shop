import React, { useCallback } from 'react';
import './index.css';
import { NotificationsNone, Language } from '@material-ui/icons';
import { LogoutIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';

export default function Topbar() {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

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
            <LogoutIcon
              onClick={handleLogout}
              className="h-6 w-6 text-gray-600 mr-2 "
            />
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
