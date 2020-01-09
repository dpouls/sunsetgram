import React, { useState, useEffect } from "react";
import { getUser } from "../../../redux/userReducer";
import { connect } from "react-redux";
import Axios from "axios";

const EditProfile = props => {
  const [imgUrl, setImgURL] = useState("");
  useEffect(() => {}, [imgUrl]);
  const handleSubmit = async () => {
    let res = await Axios.put("/api/editprofile", { imgUrl });

    await props.getUser(res.data[0]);

    setImgURL("");
  };
  return (
    <form>
      <input
        onChange={e => setImgURL(e.target.value)}
        name={imgUrl}
        value={imgUrl}
        type="text"
      />
      <button type="button" onClick={() => handleSubmit()}>
        Change
      </button>
    </form>
  );
};
const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps, { getUser })(EditProfile);
