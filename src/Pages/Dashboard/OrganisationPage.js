import React, { useEffect, useState } from "react";
import Layout from "./../../Component/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../Services/API";

const OrganisationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // Fetch organisation records
  const getOrg = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-orgnaisation");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get("/inventory/get-orgnaisation-for-hospital");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, [user]);

  return (
    <Layout>
      <div className="overflow-x-auto bg-white shadow-lg rounded-md p-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {record.organisationName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{record.email}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{record.phone}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{record.address}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default OrganisationPage;
