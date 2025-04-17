import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Track selected student
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [noMoreData, setNoMoreData] = useState(false); // Track if there's no more data
  const history = useNavigate(); // Hook for redirection

  const numberTOemail = (number) => {
    const numberEmail = {
      9719706242: "urooj@scholarsden.in",
    };

    console.log("numberTOemail function called", number);
    return numberEmail[number] || null;
  };

  const fetchData = async () => {
    const email = await numberTOemail(phone);
    console.log("email from numberTOemail", email);
    console.log("page from fetchData", phone);
    try {
      const response = await axios.post("/admin/getEnquiryData", {
        email,
        page,
      });
      setData(response.data.data);
      setNoMoreData(response.data.isLastPage); // Set noMoreData based on the response
      console.log("response from fetchData", response);
    } catch (e) {
      console.log("error in fetchData", e);
    }
  };

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

  useEffect(() => {
    if (phone) {
      fetchData(); // Only call when phone is available
    }
  }, [phone, page]); // Runs on phone or page change

  // useEffect(() => {
  //   // Auto redirect every 5 minutes (300000ms)
  //   const timeout = setTimeout(() => {
  //     handleLogout();
  //   }, 300000);
  //   return () => clearTimeout(timeout); // Clear the timeout when the component unmounts or changes
  // }, []);

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

  // Handle card click to open modal
  const handleCardClick = (student) => {
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

  const createdAt = "2025-04-08T13:01:54.227Z";
  const updatedAt = "2025-04-08T13:01:54.227Z";

  console.log("Formatted createdAt:", convertToDate(createdAt));
  console.log("Formatted updatedAt:", convertToDate(updatedAt));

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
        "x-api-key": `${xApiKey}`,
        "Content-Type": "application/json",
      };

      const payload = {
        company_id: `${company_id}`,
        secret_token: `${secretToken}`,
        type: "1",
        user_id: `${userID}`,
        number: `${customerNumber}`,
        public_ivr_id: `${publicIvRId}`,
        reference_id: `${referenceId}`,
        region: "<region of a call>",
        caller_id: "<caller id number of a call>",
        group: "<group of a dedicated number>",
      };

      try {
        const response = await axios.post(url, payload, { headers });
        console.log("Response:", response.data);
      } catch (error) {
        console.log("error ", error);
        console.error(
          "Error occurred:",
          error.response ? error.response.data : error.message
        );
      }
    }

    // Call the function
    triggerOBDCall();
  };

  // Handle logout
  const handleLogout = () => {
    // Remove phone cookie
    document.cookie = "phone=; max-age=0; path=/"; // This clears the phone cookie

    // Redirect to AdminSignup page
    history("/adminsignup");
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

        <div className="grid grid-cols-1 gap-6">
          {data?.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCardClick(item)}
            >
              <div className="space-y-3">
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
        <div className="flex gap-4 justify-center items-center mt-8">
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
        </div>

        {/* Modal for displaying detailed information */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl">
              <h3 className="text-2xl font-semibold mb-4">Student Details</h3>
              {selectedStudent && (
                <div className="space-y-3">
                  <p>
                    <strong>Name:</strong> {selectedStudent.studentName}
                  </p>
                  <div className="flex justify-between w-full items-center">
                    <p>
                      <strong>Father's Contact:</strong>{" "}
                      {maskPhoneNumber(selectedStudent.fatherContactNumber)}
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
