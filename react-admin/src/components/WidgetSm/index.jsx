import './index.css';
import { Visibility } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await userRequest.get('/users?new=true');
      setUsers(res.data);
    };

    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <h1 className="widgetSmTitle">New Members</h1>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li key={user._id} className="widgetSmListItem">
            <img
              src={
                user.img ||
                'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
