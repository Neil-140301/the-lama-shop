import './index.css';
import { DataGrid } from '@material-ui/data-grid';
import { userRows } from '../../dummyData';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Component } from 'react';

export default class UserList extends Component {
  state = {data: userRows}

  columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
    },
    {
      field: 'transaction',
      headerName: 'Transaction Volume',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row.id}`} >
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline className="userListDelete" onClick={() => this.handleDelete(params.row.id)} />
          </>
        );
      },
    },
  ]

  handleDelete = id => {
    const {data} = this.state
    const newData = data.filter(item => item.id !== id)
    this.setState({data: newData})
  }

  render() {
    const { data } = this.state

    return (
      <div className="userList">
        <DataGrid
          disableSelectionOnClick
          rows={data}
          columns={this.columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
    )
  }
}
