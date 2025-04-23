import React, { useEffect, useState, useMemo } from "react";
import axios from "../../api/axios";
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
  const [inputValue, setInputValue] = useState("");
  const [classValue, setClassValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [showFilteredData, setShowFilteredData] = useState([]);

  const history = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "/adminData/getData",
        {
          phone,
          page,
        }
      );

      console.log("fetchData", response);

      setData(response.data.data);
      setNoMoreData(response.data.isLastPage);
    } catch (e) {
      console.error("Error in fetchData:", e);
    }
  };

  const filterStudents = async () => {
    try {
      const allfilterStudent = await axios.post("/students/filter/Student", {
        data: inputValue,
      });

      console.log("allfilterStudent", allfilterStudent);

      setShowFilteredData(allfilterStudent.data);
    } catch (error) {
      console.error("Error filtering students:", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilterValue(value);
    debouncedFilter(value);
  };

  // function debounce(func, delay) {
  //   let timeoutId;
  //   return function (...args) {
  //     const context = this;
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func.apply(context, args), delay);
  //   };
  // }


  function debounce(func, delay) {
    let timeoutId;
    let abortController;
  
    return function (...args) {
      // Cancel any previous timer
      clearTimeout(timeoutId);
  
      // Abort any ongoing request
      if (abortController) {
        abortController.abort();
      }
  
      // Set up for a new request
      abortController = new AbortController();
      const signal = abortController.signal;
  
      // Debounce logic
      timeoutId = setTimeout(() => {
        func.apply(this, [...args, signal]);
      }, delay);
    };
  }
  
  

  const debouncedFilter = useMemo(
    () => debounce(filterStudents, 1000),
    [inputValue]
  );

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

  const classFilterOptions = ["VI", "VII", "VIII", "IX", "X", "XI Engineering", "XII Engineering", "XII Passed Engineering", "XI Medical", "XII Medical", "XII Passed Medical"];

  const handleChangeClassFilter = async (e) => {


    const filterValue = e.target.value;
    try {
      const filterByClass = await axios.post("/students/filterByClass", {
        filterByClassName: e.target.value,
      });

      console.log("filterByClass", filterByClass);
      // setInputValue(filterByClass.data);
      setClassValue(filterByClass.data);
      setFilterValue(filterByClass.data);

      setShowFilteredData(filterByClass.data.data);
    } catch (error) {
      console.log("Error", error);
    }
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

    console.log("email form markEmail", email);
    const [user, domain] = email.split("@");
    const maskedUser = user[0] + "*".repeat(user.length - 1);
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

        <div className="flex gap-3 m-6">
          <select
            className=" w-40 p-2 rounded-xl "
            onChange={handleChangeClassFilter}
          >
            <label>Select Class</label>

            <option>Select Class</option>

            {classFilterOptions.map((item, index) => {
              return (
                <option className="" key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <input
            className="p-2 rounded-xl"
            placeholder="Find By Student Name"
            type="text"
            value={inputValue}
            onChange={handleChange}
          />
        </div>

        {filterValue != "" && (
          <div className="w-full p-4 bg-gray-100 rounded-xl mb-8">
            <div className="overflow-x-auto">
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-[#c61d23] text-white sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-4 text-left border-b">
                        StudentID
                      </th>
                      <th className="py-3 px-4 text-left border-b">Name</th>
                      <th className="py-3 px-4 text-left border-b">Class</th>
                      {/* <th className="py-3 px-4 text-left border-b">
                        Father Name
                      </th>
                      <th className="py-3 px-4 text-left border-b">Program</th>
                      <th className="py-3 px-4 text-left border-b">Class</th> */}
                    </tr>
                  </thead>

                  {
                    <tbody className="w-full">
                      {showFilteredData.map((student, index) => (
                        <tr
                          key={index}
                          className="hover:bg-green-50 transition duration-150 ease-in-out"
                        >
                          <td className="py-2 px-4 border-b">
                            {student.StudentsId}
                          </td>
                          <td className="py-2 px-4 border-b">{student.studentName}</td>
                          <td className="py-2 px-4 border-b">
                            {student?.batchDetail?.classForAdmission}
                          </td>
                          {/* <td className="py-2 px-4 border-b">
                            {student.fatherName}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {student.program}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {student.courseOfIntrested}
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  }
                </table>

                {showFilteredData.length === 0 && (
                  <div className="w-full text-center justify-center items-center p-6">
                    Data Not Found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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
                  {student.studentName && (
                    <h4 className="text-xl font-semibold text-gray-800">
                      Student Name: {student.studentName}
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
                  <strong>Name:</strong> {selectedStudent.studentName}
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
