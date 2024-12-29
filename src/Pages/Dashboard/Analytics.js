import React, { useState, useEffect } from "react";
import Header from "../../Component/shared/Layout/Header";
import API from "./../../Services/API";
import moment from "moment";
import AnalyticsLayout from "../../Component/shared/Layout/AnalyticsLayout";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];

  // Get blood group data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lifecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  // Get recent blood records
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
     <AnalyticsLayout>
      <div className="container mx-auto my-6">
        {/* Blood Group Cards */}
        <div className="flex flex-wrap justify-center">
          {data?.map((record, i) => (
            <div
              className="card m-4 p-4 w-76"
              key={i}
              style={{ backgroundColor: `${colors[i]}` }}
            >
              <div className="card-body text-center">
                <h1 className="card-title bg-light text-dark mb-3">{record.bloodGroup}</h1>
                <p className="card-text">
                  Total In : <b>{record.totalIn}</b> (ML)
                </p>
                <p className="card-text">
                  Total Out : <b>{record.totalOut}</b> (ML)
                </p>
              </div>
              <div className="card-footer text-light bg-dark text-center">
                Total Available : <b>{record.availabeBlood}</b> (ML)
              </div>
            </div>
          ))}
        </div>

        {/* Recent Blood Transactions Table */}
        <div className="my-6">
          <h1 className="text-center text-2xl font-semibold my-4">Recent Blood Transactions</h1>
          <table className="table mx-auto max-w-full table-striped">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Donor Email</th>
                <th scope="col">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData?.map((record) => (
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity} (ML)</td>
                  <td>{record.email}</td>
                  <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </AnalyticsLayout>
    </>
  );
};

export default Analytics;
