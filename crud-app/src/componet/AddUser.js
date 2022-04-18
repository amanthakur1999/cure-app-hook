import { useState, useEffect, useRef } from 'react';

function AddUser(props) {
  const initionalstate = { name: '', username: '' };

  const [user, setUser] = useState(initionalstate);

  function handelChange(event) {
    let { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  const prevPropRef = useRef();

  useEffect(() => {
    prevPropRef.current = props;
  });
  const prevProp = prevPropRef.current;

  useEffect(() => {
    if (props.userEdit && prevProp.userEdit !== props.userEdit) {
      let { name, username } = props.userEdit;
      setUser({ name, username });
    }
  }, [prevProp, props.userEdit]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.username) return;
    if (!props.editing) {
      props.adduser(user);
    } else {
      props.toggleEditbutton();
      props.updateUser(user);
    }
    setUser(initionalstate);
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          onSubmit(event);
        }}
      >
        <input
          type="text"
          name="username"
          value={user.username}
          placeholder="username"
          onChange={handelChange}
        />
        <br />
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="name"
          onChange={handelChange}
        />
        <br />

        <input type="submit" value={props.editing ? 'Update' : 'Add'} />
        {props.editing ? (
          <input
            type="reset"
            value="cancle"
            onClick={() => {
              props.toggleEditbutton();
              setUser(initionalstate);
            }}
          />
        ) : (
          ''
        )}
      </form>
    </>
  );
}

export default AddUser;
