import React from "react";
import Form from "../../Component/shared/form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../Component/shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Banner Section */}
          <div className="md:w-2/3 w-full min-h-screen">
  <img
    src="./assets/images/banner2.jpg"
    alt="registerImage"
    className="h-full w-full object-cover"
  />
</div>

          {/* Form Section */}
          <div className="md:w-1/3 w-full flex items-center justify-center min-h-screen bg-gray-100">
            <Form
              formTitle="Register"
              submitBtn="Register"
              formType="register"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
