import React from 'react';

function Users(props) {
  const handelEdit = (user) => {
    props.edit(user);
  };
  return (
    <>
      <div className="user">
        {props.users.map((each) => (
          <div key={each.id} className="singleUser">
            <p>
              <span>Name:</span> {each.name}
            </p>
            <p>
              <span>Username:</span> {each.username}
            </p>
            <button
              onClick={() => {
                handelEdit(each);
              }}
            >
              Edit
            </button>

            <button
              onClick={() => {
                props.deleteUser(each.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Users;
