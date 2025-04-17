import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const SdatData = () => {
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const history = useNavigate();

  const fetchData = async () => {
    try {


      const response = await axios.post("https://api.registration.scholarsden.in/api/adminData/getData", {
        phone,
        page,
      });

      console.log("response ", response);
      setData(response.data.data);
      setNoMoreData(response.data.isLastPage);
    } catch (e) {
      console.error("Error in fetchData:", e);
    }
  };

  useEffect(() => {
    const phoneFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("phone="))
      ?.split("=")[1];

    if (phoneFromCookie) {
      setPhone(phoneFromCookie);
    }
  }, []);

  useEffect(() => {
    if (phone) {
      fetchData();
    }
  }, [phone, page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
    if (noMoreData) {
      setNoMoreData(false);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCardClick = (student, basic, batch, family) => {
    setSelectedStudent({
      ...student,
      ...basic,
      ...batch,
      ...family,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const convertToDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
  };

  function maskPhoneNumber(phone) {
    if (!phone) return "";
    const visible = phone.slice(0, 4);
    const masked = "*".repeat(phone.length - 4);
    return visible + masked;
  }

  function maskEmail(email) {
    if (!email) return email;
    const [user, domain] = email.split("@");
    const maskedUser = user[0] + "*".repeat(user.length - 3) + user.slice(-1);
    return maskedUser + "@" + domain;
  }

  const handleLogout = () => {
    document.cookie = "phone=; max-age=0; path=/";
    history("/adminsignup");
  };

  return (
    <div className="grid grid-cols-12 w-full max-w-screen-xl">
      <div className="col-span-2 w-full bg-[#c61d23]">
        <Sidebar />
      </div>

      <div className="col-span-10 max-w-7xl w-full mx-auto pr-4 py-6 bg-[#c61d23] overflow-auto h-screen">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Admin Dashboard
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {data?.map((studentItem, index) => {
            const student = studentItem;
            const basic = student.basicDetails || {};
            const batch = student.batchDetails || {};
            const family = student.familyDetails || {};

            return (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleCardClick(student, basic, batch, family)}
              >
                <div className="space-y-3">
                  {student.name && (
                    <h4 className="text-xl font-semibold text-gray-800">
                      Student Name: {student.name}
                    </h4>
                  )}
                  {family.FatherName && (
                    <h4 className="text-xl font-semibold text-gray-800">
                      Father Name: {family.FatherName}
                    </h4>
                  )}
                  {batch.classForAdmission && (
                    <h4 className="text-xl font-semibold text-gray-800">
                      Class For Admission: {batch.classForAdmission}
                    </h4>
                  )}
                  {batch.subjectCombination && (
                    <h4 className="text-xl font-semibold text-gray-800">
                      Subject Combination: {batch.subjectCombination}
                    </h4>
                  )}
                  {basic.examName && (
                    <h4 className="text-xl font-semibold text-gray-800">
                      Exam Name: {basic.examName}
                    </h4>
                  )}
                  {basic.examDate && (
                    <h4 className="text-xl font-semibold text-gray-800">
                      Exam Date: {basic.examDate}
                    </h4>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex gap-4 justify-center items-center mt-8">
          <button
            onClick={handlePrevPage}
            disabled={page <= 1}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={noMoreData}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && selectedStudent && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl overflow-auto max-h-[90vh]">
              <h3 className="text-2xl font-semibold mb-4">Student Details</h3>
              <div className="space-y-3">
                <p>
                  <strong>Name:</strong> {selectedStudent.name}
                </p>
                <p>
                  <strong>Email:</strong> {maskEmail(selectedStudent.email)}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {maskPhoneNumber(selectedStudent.phone)}
                </p>
                {selectedStudent.profilePicture && (
                  <div className="my-4 flex gap-4 items-center">
                    <p>Profile Picture</p>
                    <button
                      onClick={() => setShowImage(true)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      View Image
                    </button>
                  </div>
                )}

                {showImage && (
                  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="relative">
                      <img
                        src={selectedStudent.profilePicture}
                        alt="Profile"
                        className="max-w-full max-h-screen rounded"
                      />
                      <button
                        onClick={() => setShowImage(false)}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                <p>
                  <strong>Father Name:</strong> {selectedStudent.FatherName}
                </p>
                <p>
                  <strong>Father Contact:</strong>{" "}
                  {maskPhoneNumber(selectedStudent.FatherContactNumber)}
                </p>
                <p>
                  <strong>Father Occupation:</strong>{" "}
                  {selectedStudent.FatherOccupation}
                </p>
                <p>
                  <strong>Mother Name:</strong> {selectedStudent.MotherName}
                </p>
                <p>
                  <strong>Mother Contact:</strong>{" "}
                  {maskPhoneNumber(selectedStudent.MotherContactNumber)}
                </p>
                <p>
                  <strong>Mother Occupation:</strong>{" "}
                  {selectedStudent.MotherOccupation}
                </p>
                <p>
                  <strong>Class for Admission:</strong>{" "}
                  {selectedStudent.classForAdmission}
                </p>
                <p>
                  <strong>Subject Combination:</strong>{" "}
                  {selectedStudent.subjectCombination}
                </p>
                <p>
                  <strong>Exam Name:</strong> {selectedStudent.examName}
                </p>
                <p>
                  <strong>Exam Date:</strong> {selectedStudent.examDate}
                </p>
                <p>
                  <strong>DOB:</strong> {convertToDate(selectedStudent.dob)}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {convertToDate(selectedStudent.created_at)}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SdatData;
