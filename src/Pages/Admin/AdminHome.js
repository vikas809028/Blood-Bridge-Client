
import React from "react";
import Layout from "../../Component/shared/Layout/Layout";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);

  const imageUrls = [
    './assets/images/download (1).jpeg',
    './assets/images/download (2).jpeg',
    './assets/images/WhatsApp Image 2024-12-05 at 14.44.56_8f69cc54.jpg',
    './assets/images/WhatsApp Image 2024-12-05 at 14.46.26_3b2bb634.jpg',
    './assets/images/download (3).jpeg',
    './assets/images/download.jpeg',
    './assets/images/images (1).jpeg',
    './assets/images/images.jpeg',
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Welcome Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
            Welcome, Admin <span className="text-green-500">{user?.name}</span>!
          </h1>
          <h3 className="text-xl text-center text-gray-700">
            Your Dashboard for Managing the Blood Bank App
          </h3>
          <hr className="my-6 border-t border-gray-300" />
          <p className="text-lg text-gray-800 leading-relaxed">
            We warmly welcome you to <span className="font-semibold">Blood Bridge</span>, a dedicated initiative by 
            <span className="font-semibold"> Gungun Saluja, Ashutosh Anand, Vikas Tiwari, and Dhruv Kumar</span>. Our platform is designed 
            to bridge the gap between those in urgent need of life-saving blood and the compassionate individuals 
            willing to donate. Blood is not just a resource; it is a symbol of life, hope, and humanity. 
            At Blood Bridge, we ensure that every drop donated serves as a lifeline to someone in need.
          </p>
          <p className="text-lg text-gray-800 mt-4 leading-relaxed">
            With a seamless and efficient system, we aim to make blood donation more accessible, reliable, and impactful. 
            Whether you are here to donate, manage requests, or simply learn more, we value your contribution to this 
            noble cause. Together, let us build a thriving community where every effort counts and every donation 
            transforms lives. Thank you for being an essential part of our mission!
          </p>
        </div>

        {/* Carousel Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
            Explore Our Journey
          </h2>
          <Carousel images={imageUrls} />
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
