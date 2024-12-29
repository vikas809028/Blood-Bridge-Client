import React, { useEffect, useState } from "react";
import Layout from "../../Component/shared/Layout/Layout";
import moment from "moment";
import API from "../../Services/API";
import { useSelector } from "react-redux";
import Spinner from "../../Component/shared/Spinner"; // Assuming your Spinner component is set up with Tailwind.

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donor records
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      setError("Error fetching data. Please try again.");
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once the data is fetched or an error occurs
    }
  };

  useEffect(() => {
    getDonars();
  }, [user?._id]);

  return (
    <Layout>
      <div className="container mt-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner /> {/* Show loading spinner */}
          </div>
        ) : error ? (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {error} {/* Show error message */}
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-md p-4">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Blood Group
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Inventory Type
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id} className="border-b">
                    <td className="px-4 py-2 text-sm text-gray-700">{record.bloodGroup}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{record.inventoryType}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{record.quantity}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{record.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Consumer;
