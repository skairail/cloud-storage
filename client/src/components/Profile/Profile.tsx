import React from "react";
import { useDispatch } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";

const Profile: React.FC = () => {
  const dispatch: any = useDispatch();

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(uploadAvatar(file));
    }
  }

  return (
    <div>
      <button onClick={() => dispatch(deleteAvatar())}>Delete Avatar</button>
      <input
        accept="image/*"
        onChange={(e) => changeHandler(e)}
        type="file"
        placeholder="Upload Avatar"
      />
    </div>
  );
};

export default Profile;
