import React, { useEffect, useState } from "react";
import Layout from "./../../Component/shared/Layout/Layout";
import moment from "moment";
import API from "../../Services/API";

const DonarList = () => {
  const [data, setData] = useState([]);

  // Find donor records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  // DELETE FUNCTION
  const handelDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You Sure Want To Delete This Donar",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr
                  key={record._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-2">
                    {record.name || `${record.organisationName} (ORG)`}
                  </td>
                  <td className="px-4 py-2">{record.email}</td>
                  <td className="px-4 py-2">{record.phone}</td>
                  <td className="px-4 py-2">
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => handelDelete(record._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No donors found.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DonarList;
