import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../Component/shared/Layout/Layout";
import API from "../Services/API";
import { useSelector } from "react-redux";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // Find donor records
  const getDonars = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto mt-6 px-4">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left font-semibold text-sm">Blood Group</th>
                <th className="py-3 px-4 text-left font-semibold text-sm">Inventory Type</th>
                <th className="py-3 px-4 text-left font-semibold text-sm">Quantity</th>
                <th className="py-3 px-4 text-left font-semibold text-sm">Email</th>
                <th className="py-3 px-4 text-left font-semibold text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr key={record._id} className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-700">{record.bloodGroup}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{record.inventoryType}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{record.quantity}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{record.email}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Donation;
