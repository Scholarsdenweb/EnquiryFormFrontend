import React, { useEffect, useState, useMemo } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router
import Sidebar from "./Sidebar";
import PaginatedList from "./Pagination";

const AdminDashboard = () => {
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Track selected student
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [noMoreData, setNoMoreData] = useState(false); // Track if there's no more data
  const history = useNavigate(); // Hook for redirection
  const [classValue, setClassValue] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [filterByEnquiry, setFilterByEnquiry] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [showFilteredData, setShowFilteredData] = useState([]);

  const numberTOemail = (number) => {
    const numberEmail = {
      9719706242: "urooj@scholarsden.in",
      7037550621: "jatin@scholarsden.in",
    };

    console.log("numberTOemail function called", number);
    return numberEmail[number] || null;
  };

  const email = numberTOemail(phone);

  const filterStudents = async () => {
    try {
      console.log("inputValue data", inputValue);
      const allfilterStudent = await axios.post("/user/filter/Student", {
        data: inputValue,
        email,
      });

      console.log("Show student data", allfilterStudent);
      setShowFilteredData(allfilterStudent.data);
    } catch (error) {
      console.error("Error filtering students:", error);
    }
  };
  const filterStudentByEnquiryNumber = async () => {
    try {
      console.log("inputValue filterByEnquiry data", filterByEnquiry);
      const allfilterStudent = await axios.post("/user/filter/enquiryNumber", {
        data: filterByEnquiry,
        email,
      });

      console.log("Show student data", allfilterStudent);
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
  const handleChangeEnquiryIDFilter = (e) => {
    const value = e.target.value;
    setFilterByEnquiry(value);
    setFilterValue(value);
    debouncedFilterForEnquiryNumber(value);
  };

  const handleChangeClassFilter = async (e) => {
    try {
      const filterByClass = await axios.post("/user/filter/filterByClass", {
        filterByClassName: e.target.value,
        email,
      });

      console.log("filterByClass", filterByClass);
      // setInputValue(filterByClass.data);
      setClassValue(filterByClass.data);
      setFilterValue(e.target.value);

      setShowFilteredData(filterByClass.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  }

  const debouncedFilter = useMemo(
    () => debounce(filterStudents, 1000),
    [inputValue]
  );
  const debouncedFilterForEnquiryNumber = useMemo(
    () => debounce(filterStudentByEnquiryNumber, 1000),
    [filterByEnquiry]
  );

  useEffect(() => {
    const phoneFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("phone="))
      ?.split("=")[1];

    if (phoneFromCookie) {
      setPhone(phoneFromCookie);
      console.log("phone set from cookie:", phoneFromCookie);
    }
  }, []);

  // useEffect(() => {
  //   // Auto redirect every 5 minutes (300000ms)
  //   const timeout = setTimeout(() => {
  //     handleLogout();
  //   }, 300000);
  //   return () => clearTimeout(timeout); // Clear the timeout when the component unmounts or changes
  // }, []);

  // Handle card click to open modal
  const handleCardClick = (student) => {
    console.log("HandleCardClcik", student);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const convertToDate = (isoString) => {
    const date = new Date(isoString);

    // Format the date and time using toLocaleString
    const formattedDate = date.toLocaleString("en-GB", {
      weekday: "long", // Day of the week
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false, // 24-hour format
    });

    return formattedDate;
  };

  const classFilterOptions = [
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI Engineering",
    "XII Engineering",
    "XII Passed Engineering",
    "XI Medical",
    "XII Medical",
    "XII Passed Medical",
  ];

  // const createdAt = "2025-04-08T13:01:54.227Z";
  // const updatedAt = "2025-04-08T13:01:54.227Z";

  // console.log("Formatted createdAt:", convertToDate(createdAt));
  // console.log("Formatted updatedAt:", convertToDate(updatedAt));

  function maskPhoneNumber(phone) {
    const visible = phone.slice(0, 4);
    const masked = "*".repeat(phone.length - 4);
    return visible + masked;
  }

  function maskEmail(email) {
    if (!email) return email; // Return if email is null or undefined
    const [user, domain] = email.split("@");
    const maskedUser = user[0] + "*".repeat(user?.length - 3) + user?.slice(-1);
    return maskedUser + "@" + domain;
  }

  const xApiKey = "oomfKA3I2K6TCJYistHyb7sDf0l0F6c8AZro5DJh";
  const company_id = "5df87cba87461833";
  const secretToken =
    "0ee2949396336195eeb7d93ae59c6c91f55336242df878f02464af03f0df6eb0";
  const userID = "67a1cf3bba37c164";
  const publicIvRId = "66827d11c1cab220";
  const referenceId = "";
  const maskedCall = async (customerNumber) => {
    async function triggerOBDCall() {
      const url = "https://obd-api.myoperator.co/obd-api-v1";

      const headers = {
        "x-api-key": xApiKey,
        "Content-Type": "application/json",
      };

      const payload = {
        company_id: company_id,
        secret_token: secretToken,
        type: "1",
        user_id: userID,
        number: customerNumber,
        public_ivr_id: publicIvRId,
        reference_id: referenceId,
        region: "<region of a call>",
        caller_id: "<caller id number of a call>",
        group: "<group of a dedicated number>",
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `API error: ${response.status} - ${JSON.stringify(errorData)}`
          );
        }

        const data = await response.json();
        console.log("Response:", data);
      } catch (error) {
        console.log("error", error);
        console.error("Error occurred:", error.message);
      }
    }

    // Call the function
    triggerOBDCall();
  };

  async function triggerOBDCall(customerNumber) {
    const url = "https://obd-api.myoperator.co/obd-api-v1";
    const apiKey = "{{oomfKA3I2K6TCJYistHyb7sDf0l0F6c8AZro5DJh}}"; // Replace with actual key

    const payload = {
      company_id: "5df87cba87461833",
      secret_token:
        "0ee2949396336195eeb7d93ae59c6c91f55336242df878f02464af03f0df6eb0",
      type: "1",
      user_id: "67a1cf3bba37c164",
      number: `+91${customerNumber}`,
      public_ivr_id: "667fc996500ea596",
      reference_id: "abd9238dh21ss",
      region: "<region of a call>",
      caller_id: "<caller id number of a call>",
      group: "<group of a dedicated number>",
    };

    try {
      // const response = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "x-api-key": apiKey,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(payload),
      // });

      const response = await axios.post("/admin/trigger-obd", {
        phone: selectedStudent.fatherContactNumber,
      });

      if (!response.ok) {
        console.log("response errror ", response);
      }

      // const data = await response.json();
      // alert("Response: " + JSON.stringify(data));
    } catch (error) {
      console.log("Erorr for callfunction", error);
      console.error("Error:", error.message);
    }
  }

  const dateFormatting = (isoDate) => {
    const date = new Date(isoDate);

    // Get components and format as two digits
    const year = String(date.getFullYear()).slice(2); // "25"
    const month = String(date.getMonth() + 1).padStart(2, "0"); // "04"
    const day = String(date.getDate()).padStart(2, "0"); // "22"

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  // Handle logout
  const handleLogout = () => {
    // Remove phone cookie
    document.cookie = "phone=; max-age=0; path=/"; // This clears the phone cookie

    // Redirect to AdminSignup page
    history("/adminsignup");
  };

  const renderStudentCard = (student, index, onClick) => {
    return (
      <div
        key={index}
        className="bg-white p-4 rounded shadow"
        onClick={onClick}
      >
        <h4 className="text-lg font-bold">
          Enquiry Number: {student.enquiryNumber}
        </h4>
        <h4 className="text-lg font-bold">Name: {student.studentName}</h4>
        {<p>Father Name:{student.fatherName}</p>}
        {<p>Program: {student.program}</p>}
        {<p>Class: {student.courseOfIntrested}</p>}
        {/* { <p>Exam: {basic.examName}</p>}
        {<p>Exam Date: {basic.examDate}</p>} */}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-12 w-full max-w-screen-xl ">
      <div className="col-span-2 w-full bg-[#c61d23] ">
        <Sidebar />
      </div>

      <div className="  col-span-10 max-w-7xl w-full mx-auto pr-4 py-6 bg-[#c61d23] overflow-auto h-screen">
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
          <input
            className="p-2 rounded-xl"
            placeholder="Find By Enquiry Number"
            type="text"
            value={filterByEnquiry}
            onChange={handleChangeEnquiryIDFilter}
          />
        </div>

        {console.log("filterValue fro console", filterValue)}

        {filterValue != "" && (
          <div className="w-full p-4 bg-gray-100 rounded-xl mb-8">
            <div className="overflow-x-auto">
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-[#c61d23] text-white sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-4 text-left border-b">Index</th>
                      <th className="py-3 px-4 text-left border-b">Date</th>
                      <th className="py-3 px-4 text-left border-b">Enquiry Number</th>
                      <th className="py-3 px-4 text-left border-b">Name</th>
                      <th className="py-3 px-4 text-left border-b">
                        Father Name
                      </th>
                      <th className="py-3 px-4 text-left border-b">Program</th>
                      <th className="py-3 px-4 text-left border-b">Class</th>
                      <th className="py-3 px-4 text-left border-b">Contact Number</th>
                    </tr>
                  </thead>

                  {
                    <tbody className="w-full">
                      {showFilteredData?.map((student, index) => (
                        <tr
                          key={index}
                          className="hover:bg-green-50 transition duration-150 ease-in-out"
                        >
                          <td className="py-2 px-4 border-b">{index + 1}</td>
                          <td className="py-2 px-4 border-b">
                            {dateFormatting(student.createdAt.split("T")[0])}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {student.enquiryNumber}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {student.studentName}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {student.fatherName}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {student.program}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {student.courseOfIntrested}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {maskPhoneNumber(student.fatherContactNumber)}
                          </td>
                          {/* <div className="flex justify-between w-full items-center">
                            <p>
                      <strong>Father's Contact:</strong>{" "}
                      {maskPhoneNumber(student.fatherContactNumber)}
                    </p>

                            <button
                              className="py-2 px-2 bg-[#ffdd00] border-2 rounded-xl "
                              onClick={() => {
                                triggerOBDCall(student.fatherContactNumber);
                              }}
                            >
                              {" "}
                              Call Now{" "}
                            </button>
                          </div> */}
                        </tr>
                      ))}
                    </tbody>
                  }
                </table>

                {showFilteredData?.length === 0 && (
                  <div className="w-full text-center justify-center items-center p-6">
                    Data Not Found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {data?.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCardClick(item)}
            >
              <div className="space-y-3">
                {item.enquiryNumber && (
                  <h4 className="text-xl font-semibold text-gray-800">
                    Enquiry Name : {item.enquiryNumber}
                  </h4>
                )}
                {item.studentName && (
                  <h4 className="text-xl font-semibold text-gray-800">
                    Student Name : {item.studentName}
                  </h4>
                )}
                {item.fatherName && (
                  <h4 className="text-xl font-semibold text-gray-800">
                    Father Name : {item.fatherName}
                  </h4>
                )}
                {item.city && (
                  <h4 className="text-xl font-semibold text-gray-800">
                    City : {item.city}
                  </h4>
                )}
                {item.courseOfIntrested && (
                  <h4 className="text-xl font-semibold text-gray-800">
                    Course Of Intrested : {item.courseOfIntrested}
                  </h4>
                )}
                {item.schoolName && (
                  <h4 className="text-xl font-semibold text-gray-800">
                    School Name : {item.schoolName}
                  </h4>
                )}
                {item.createdAt && (
                  <h4 className="text-xl font-semibold text-gray-800">
                    Created At : {convertToDate(item.createdAt)}
                  </h4>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        {/* <div className="flex gap-4 justify-center items-center mt-8">
          <button
            onClick={handlePrevPage}
            disabled={page <= 1}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={noMoreData}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400"
          >
            Next
          </button>
        </div> */}

        {phone && email && (
          <PaginatedList
            apiEndpoint="/admin/getEnquiryData"
            queryParams={{ phone }}
            renderItem={renderStudentCard}
            itemsPerPage={1}
            email={email}
            handleCardClick={(student) => {
              handleCardClick(student);
            }}
          />
        )}

        {/* Modal for displaying detailed information */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl">
              <h3 className="text-2xl font-semibold mb-4">Student Details</h3>
              {selectedStudent && (
                <div className="space-y-3">
                  <p>
                    <strong>Enquiry Number:</strong>{" "}
                    {selectedStudent.enquiryNumber}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedStudent.studentName}
                  </p>
                  <div className="flex justify-between w-full items-center">
                    <p>
                      <strong>Father's Contact:</strong>{" "}
                      {selectedStudent.fatherContactNumber}
                      {/* {maskPhoneNumber(selectedStudent.fatherContactNumber)} */}
                    </p>

                    <button
                      className="py-2 px-2 bg-[#ffdd00] border-2 rounded-xl "
                      onClick={() => {
                        triggerOBDCall(selectedStudent.fatherContactNumber);
                      }}
                    >
                      {" "}
                      Call Now{" "}
                    </button>
                  </div>

                  <p>
                    <strong>Email:</strong> {maskEmail(selectedStudent.email)}
                  </p>
                  <p>
                    <strong>Program:</strong> {selectedStudent.program}
                  </p>
                  <p>
                    <strong>Course Interested:</strong>{" "}
                    {selectedStudent.courseOfIntrested}
                  </p>
                  <p>
                    <strong>School Name:</strong> {selectedStudent.schoolName}
                  </p>
                  <p>
                    <strong>Father's Name:</strong> {selectedStudent.fatherName}
                  </p>
                  <p>
                    <strong>Occupation:</strong>{" "}
                    {selectedStudent.fatherOccupations}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedStudent.city}
                  </p>
                  <p>
                    <strong>State:</strong> {selectedStudent.state}
                  </p>
                  <p>
                    <strong>How to Know:</strong> {selectedStudent.howToKnow}
                  </p>
                  <p>
                    <strong>Remarks:</strong> {selectedStudent.remarks}
                  </p>

                  <p>
                    <strong>Intime:</strong> {selectedStudent.intime}
                  </p>
                  <p>
                    <strong>Enquiry Taken By:</strong>{" "}
                    {selectedStudent.enquiryTakenBy}
                  </p>
                  <p>
                    <strong>Brochure Given:</strong>{" "}
                    {selectedStudent.brochureGiven}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {convertToDate(selectedStudent.createdAt)}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {convertToDate(selectedStudent.updatedAt)}
                  </p>

                  {selectedStudent.studentContactNumber && (
                    <div>
                      <p>
                        <strong>Student Contact:</strong>{" "}
                        {selectedStudent.studentContactNumber}
                      </p>
                      <button
                        className="py-2 px-2 bg-[#ffdd00] border-2 rounded-xl "
                        onClick={() => {
                          maskedCall(selectedStudent.fatherContactNumber);
                        }}
                      >
                        {" "}
                        Call Now{" "}
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
