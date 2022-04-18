import { useState, useEffect } from 'react';
import AddUser from './AddUser';
import Users from './Users';

function App() {
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(null);
  const [editing, setEditing] = useState(false);

  const getUser = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if (!getUser) {
      setUsers([]);
    } else {
      setUsers(getUser);
    }
  }, []);

  const adduser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
    localStorage.setItem('userData', JSON.stringify([...users, user]));
  };

  const deleteUser = (id) => {
    let filterUser = users.filter((user) => user.id !== id);

    setUsers(filterUser);
    localStorage.setItem('userData', JSON.stringify(filterUser));
  };

  const toggleEditbutton = () => {
    setEditing(!editing);
  };

  const edit = (user) => {
    setEditing(true);
    setUserEdit(user);
  };

  const updateUser = (updateUser) => {
    const fillterUsers = users.map((each) => {
      if (each.id === userEdit.id) {
        updateUser.id = userEdit.id;
        return updateUser;
      } else {
        return each;
      }
    });
    setUsers(fillterUsers);

    localStorage.setItem('userData', JSON.stringify(fillterUsers));
  };

  return (
    <>
      <div className="container">
        <h1>Curd App </h1>

        <AddUser
          adduser={adduser}
          updateUser={updateUser}
          toggleEditbutton={toggleEditbutton}
          editing={editing}
          userEdit={userEdit}
        />

        <Users
          users={users}
          deleteUser={deleteUser}
          edit={edit}
          toggleEditbutton={toggleEditbutton}
        />
      </div>
    </>
  );
}
export default App;
