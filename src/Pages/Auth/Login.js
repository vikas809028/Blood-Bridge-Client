import React from "react";
import Form from "../../Component/shared/form/Form";
import { useSelector } from "react-redux";
import Spinner from "./../../Component/shared/Spinner";
import "./login.css";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <div className="h-screen flex flex-col">
      {error && (
        <div className="text-red-500 text-center p-2">
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex h-full">
          {/* Banner Section */}
          <div className="hidden md:block md:w-2/3 flex-shrink-0">
            <img
              src="./assets/images/banner1.jpg"
              alt="loginImage"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-1/3 w-full flex items-center justify-center bg-gray-100">
            <div className="w-full p-6">
              <div className="bg-white shadow-lg rounded-lg p-8">
                <Form
                  formTitle={"Login Page"}
                  submitBtn={"Login"}
                  formType={"login"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
