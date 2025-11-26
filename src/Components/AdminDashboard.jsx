// import React, { useEffect, useState, useMemo } from "react";
// import axios from "../../api/axios";
// import { useNavigate } from "react-router-dom"; // Assuming you are using react-router
// import Sidebar from "./Sidebar";
// import PaginatedList from "./Pagination";
// import { downloadExcelForEnquiry } from "./DownloadExcelFile/ExcelFileDownload";
// import { useAuth } from "../../context/AuthContext";

// const AdminDashboard = () => {
//   const [phone, setPhone] = useState("");
//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null); // Track selected student
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
//   const [noMoreData, setNoMoreData] = useState(false); // Track if there's no more data
//   const history = useNavigate(); // Hook for redirection
//   const [classValue, setClassValue] = useState("");

//   const [inputValue, setInputValue] = useState("");
//   const [filterByEnquiry, setFilterByEnquiry] = useState("");
//   const [filterValue, setFilterValue] = useState("");

//   const [startingDate, setStartingDate] = useState("");
//   const [lastDate, setLastDate] = useState("");

//   const [showFilteredData, setShowFilteredData] = useState([]);

//   const numberTOemail = (number) => {
//     const numberEmail = {
//       9719706242: "urooj@scholarsden.in",
//       7037550621: "jatin@scholarsden.in",
//       9068833360: "jatin@scholarsden.in",
//       8171091333: "jatin@scholarsden.in",
//     };

//     return numberEmail[number] || null;
//   };

//   const handleApplyFilters = async (data) => {
//     const filterParams = {
//       sortOrder: "desc", // or asc, based on your needs
//       email,
//     };

//     if (classValue || data.class) filterParams.class = data.class || classValue;
//     if (inputValue || data.name) {
//       filterParams.name = data.name || inputValue;
//     }
//     if (filterByEnquiry || data.enquiry) {
//       // const isIdSearch = /^\d+$/.test(filterByEnquiry ||);
//       // if (filterByEnquiry)
//       filterParams.enquiryNumber = data.enquiry || filterByEnquiry;
//     }
//     if ((startingDate || data.startingDate) && (lastDate || data.lastDate)) {
//       filterParams.startingDate = data.startingDate || startingDate;
//       filterParams.lastDate = data.lastDate || lastDate;
//     }

//     try {
//       const response = await axios.post("/admin/filter", filterParams);
//       setShowFilteredData(response.data);
//       setFilterValue("combined");
//     } catch (error) {
//       console.error("Error ing filters:", error);
//     }
//   };
//   const handleClearFilters = (type) => {
//     if (type === "date") {
//       setStartingDate("");
//       setLastDate("");
//       setFilterValue(""); // optional: reset filter label
//       setShowFilteredData([]); // optional: clear results
//     }
//     // You can add other filter types here if needed
//   };

//   const email = numberTOemail(phone);

//   const filterStudents = async (value) => {
//     try {
//       const allfilterStudent = await axios.post("/user/filter/Student", {
//         data: value,
//         email,
//       });

//       setShowFilteredData(allfilterStudent.data);
//     } catch (error) {
//       console.error("Error filtering students:", error);
//     }
//   };
//   const filterStudentByEnquiryNumber = async (value) => {
//     try {
//       if (/^\d+$/.test(value)) {
//         const allfilterStudent = await axios.post(
//           "/user/filter/enquiryNumber",
//           {
//             data: value,
//             email,
//           }
//         );

//         setShowFilteredData(allfilterStudent.data);
//       }
//     } catch (error) {
//       console.error("Error filtering students:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);

//     // Use this instead of debounce
//     setTimeout(() => handleApplyFilters({ name: e.target.value }), 500);
//   };

//   const handleChangeEnquiryIDFilter = (e) => {
//     const value = e.target.value;
//     setFilterByEnquiry(value);

//     setTimeout(() => handleApplyFilters({ enquiry: e.target.value }), 500);
//   };

//   const handleChangeClassFilter = async (e) => {
//     setClassValue(e.target.value);

//     await handleApplyFilters({ class: e.target.value });
//   };

//   const handleDateChange = (e, isStart) => {
//     if (isStart) setStartingDate(e.target.value);
//     else setLastDate(e.target.value);

//     setTimeout(() => {
//       if (startingDate && lastDate) {
//         handleApplyFilters();
//       }
//     }, 300);
//   };

//   function debounce(func, delay) {
//     let timeoutId;
//     return function (...args) {
//       const context = this;
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => func.apply(context, args), delay);
//     };
//   }

//   const debouncedFilter = useMemo(
//     () => debounce(filterStudents, 1000),
//     [inputValue]
//   );
//   const debouncedFilterForEnquiryNumber = useMemo(
//     () => debounce(filterStudentByEnquiryNumber, 1000),
//     [filterByEnquiry]
//   );

//   useEffect(() => {
//     const phoneFromCookie = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("phone="))
//       ?.split("=")[1];

//     if (phoneFromCookie) {
//       setPhone(phoneFromCookie);
//     }
//   }, []);

//   // useEffect(() => {
//   //   // Auto redirect every 5 minutes (300000ms)
//   //   const timeout = setTimeout(() => {
//   //     handleLogout();
//   //   }, 300000);
//   //   return () => clearTimeout(timeout); // Clear the timeout when the component unmounts or changes
//   // }, []);

//   // Handle card click to open modal
//   const handleCardClick = (student) => {
//     setSelectedStudent(student);
//     console.log("Check Student details", student);
//     setIsModalOpen(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedStudent(null);
//   };

//   const convertToDate = (isoString) => {
//     const date = new Date(isoString);

//     // Format the date and time using toLocaleString
//     const formattedDate = date.toLocaleString("en-GB", {
//       weekday: "long", // Day of the week
//       year: "numeric",
//       month: "numeric",
//       day: "numeric",
//       // hour: "numeric",
//       // minute: "numeric",
//       // second: "numeric",
//       // hour12: false, // 24-hour format
//     });

//     return formattedDate;
//   };

//   const classFilterOptions = [
//     "VI",
//     "VII",
//     "VIII",
//     "IX",
//     "X",
//     "XI Engineering",
//     "XII Engineering",
//     "XII Passed Engineering",
//     "XI Medical",
//     "XII Medical",
//     "XII Passed Medical",
//   ];

//   // const createdAt = "2025-04-08T13:01:54.227Z";
//   // const updatedAt = "2025-04-08T13:01:54.227Z";

//   // console.log("Formatted createdAt:", convertToDate(createdAt));
//   // console.log("Formatted updatedAt:", convertToDate(updatedAt));

//   function maskPhoneNumber(phone) {
//     if (phone.length > 4) {
//       const visible = phone.slice(0, 4);
//       const masked = "*".repeat(phone.length - 4);
//       return visible + masked;
//     }
//   }

//   function formatDate(dateString) {
//     const date = new Date(dateString);

//     const day = date.getDate();
//     const year = date.getFullYear().toString().slice(-2); // get last two digits of year
//     const monthNames = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     const month = monthNames[date.getMonth()];

//     // Add ordinal suffix to day
//     const getOrdinal = (n) => {
//       if (n > 3 && n < 21) return n + "th";
//       switch (n % 10) {
//         case 1:
//           return n + "st";
//         case 2:
//           return n + "nd";
//         case 3:
//           return n + "rd";
//         default:
//           return n + "th";
//       }
//     };

//     return `${getOrdinal(day)} ${month} ${year}`;
//   }

//   const filterApplied = () => {
//     const filters = [];

//     if (startingDate && lastDate) {
//       filters.push(
//         `Date Range: ${formatDate(startingDate)} to ${formatDate(lastDate)}`
//       );
//     }

//     if (classValue) {
//       filters.push(`Class: ${classValue}`);
//     }

//     if (filterByEnquiry) {
//       filters.push(`Enquiry Number: ${filterByEnquiry}`);
//     }

//     if (inputValue) {
//       filters.push(`Student Name: ${inputValue}`);
//     }

//     if (filters.length === 0 && filterValue === "all") {
//       return "Showing all students";
//     }

//     if (filters.length === 0) {
//       return "No filters applied";
//     }

//     return `Showing Data for ${filters.join(" | ")}`;
//   };

//   function maskEmail(email) {
//     if (!email) return email; // Return if email is null or undefined
//     const [user, domain] = email.split("@");
//     const maskedUser = user[0] + "*".repeat(user?.length - 3) + user?.slice(-1);
//     return maskedUser + "@" + domain;
//   }

//   const xApiKey = "oomfKA3I2K6TCJYistHyb7sDf0l0F6c8AZro5DJh";
//   const company_id = "5df87cba87461833";
//   const secretToken =
//     "0ee2949396336195eeb7d93ae59c6c91f55336242df878f02464af03f0df6eb0";
//   const userID = "67a1cf3bba37c164";
//   const publicIvRId = "66827d11c1cab220";
//   const referenceId = "";
//   const maskedCall = async (customerNumber) => {
//     async function triggerOBDCall() {
//       const url = "https://obd-api.myoperator.co/obd-api-v1";

//       const headers = {
//         "x-api-key": xApiKey,
//         "Content-Type": "application/json",
//       };

//       const payload = {
//         company_id: company_id,
//         secret_token: secretToken,
//         type: "1",
//         user_id: userID,
//         number: customerNumber,
//         public_ivr_id: publicIvRId,
//         reference_id: referenceId,
//         region: "<region of a call>",
//         caller_id: "<caller id number of a call>",
//         group: "<group of a dedicated number>",
//       };

//       try {
//         const response = await fetch(url, {
//           method: "POST",
//           headers: headers,
//           body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(
//             `API error: ${response.status} - ${JSON.stringify(errorData)}`
//           );
//         }

//         const data = await response.json();
//       } catch (error) {
//         console.log("error", error);
//         console.error("Error occurred:", error.message);
//       }
//     }

//     // Call the function
//     triggerOBDCall();
//   };

//   async function triggerOBDCall(customerNumber) {
//     const url = "https://obd-api.myoperator.co/obd-api-v1";
//     const apiKey = "{{oomfKA3I2K6TCJYistHyb7sDf0l0F6c8AZro5DJh}}"; // Replace with actual key

//     const payload = {
//       company_id: "5df87cba87461833",
//       secret_token:
//         "0ee2949396336195eeb7d93ae59c6c91f55336242df878f02464af03f0df6eb0",
//       type: "1",
//       user_id: "67a1cf3bba37c164",
//       number: `+91${customerNumber}`,
//       public_ivr_id: "667fc996500ea596",
//       reference_id: "abd9238dh21ss",
//       region: "<region of a call>",
//       caller_id: "<caller id number of a call>",
//       group: "<group of a dedicated number>",
//     };

//     try {
//       // const response = await fetch(url, {
//       //   method: "POST",
//       //   headers: {
//       //     "x-api-key": apiKey,
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify(payload),
//       // });

//       const response = await axios.post("/admin/trigger-obd", {
//         phone: selectedStudent.fatherContactNumber,
//       });

//       if (!response.ok) {
//         console.log("response errror ", response);
//       }

//       // const data = await response.json();
//       // alert("Response: " + JSON.stringify(data));
//     } catch (error) {
//       console.log("Erorr for callfunction", error);
//       console.error("Error:", error.message);
//     }
//   }

//   const filerByDate = async () => {
//     const response = await axios.post("user/fetchDataByDateRange", {
//       startingDate,
//       lastDate,
//     });

//     setShowFilteredData(response.data.data);
//     setFilterValue("daterangeData");
//   };

//   const dateFormatting = (isoDate) => {
//     const date = new Date(isoDate);

//     // Get components and format as two digits
//     const year = String(date.getFullYear()).slice(2); // "25"
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // "04"
//     const day = String(date.getDate()).padStart(2, "0"); // "22"

//     const formattedDate = `${day}-${month}-${year}`;
//     return formattedDate;
//   };

//   // Handle logout
//   // const handleLogout = () => {
//   //   // Remove phone cookie
//   //   document.cookie = "phone=; max-age=0; path=/"; // This clears the phone cookie

//   //   // Redirect to AdminSignup page
//   //   history("/adminsignup");
//   // };

//   const handleLogout = () => {
//     // Clear cookie with multiple attempts to cover different scenarios
//     const clearCookie = (name) => {
//       document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

//       document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;

//       document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

//       document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/adminsignup;`;
//     };

//     clearCookie("phone");
//     clearCookie("token"); // Clear token too if needed

//     // Also clear localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("phone");

//     // Redirect to AdminSignup page
//     history("/adminsignup");
//   };

//   const renderStudentCard = (student, index, onClick) => {
//     return (
//       <div
//         key={index}
//         className="bg-white p-4 rounded shadow"
//         onClick={onClick}
//       >
//         <h4 className="text-lg font-bold">
//           Enquiry Number: {student.enquiryNumber}
//         </h4>
//         <h4 className="text-lg font-bold">Name: {student.studentName}</h4>
//         {<p>Father Name:{student.fatherName}</p>}
//         {<p>Program: {student.program}</p>}
//         {<p>Class: {student.courseOfIntrested}</p>}
//         {/* { <p>Exam: {basic.examName}</p>}
//         {<p>Exam Date: {basic.examDate}</p>} */}
//       </div>
//     );
//   };

//   return (
//     <div className="grid grid-cols-12 w-full max-w-screen-xl ">
//       <div className="col-span-2 w-full bg-[#c61d23] ">
//         <Sidebar />
//       </div>

//       <div className="  col-span-10 max-w-7xl w-full mx-auto pr-4 py-6 bg-[#c61d23] overflow-auto h-screen">
//         <h2 className="text-3xl font-semibold text-center text-white mb-8">
//           Admin Dashboard
//         </h2>
//         <div className="flex gap-3 my-3">
//           <div className="flex flex-col">
//             {<label className="text-white">Select Class</label>}
//             <select
//               className=" w-40 p-2 rounded-sm "
//               onChange={handleChangeClassFilter}
//               value={classValue}
//             >
//               <option>Select Class</option>

//               {classFilterOptions.map((item, index) => {
//                 return (
//                   <option className="" key={index} value={item}>
//                     {item}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//           <div>
//             {<label className="text-white">Find By Name</label>}

//             <input
//               className="p-1 rounded-sm"
//               placeholder="Find By Student Name"
//               type="text"
//               value={inputValue}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             {<label className="text-white">Find By Enquiry Number</label>}

//             <input
//               className="p-1 rounded-sm"
//               placeholder="Find By Enquiry Number"
//               type="text"
//               value={filterByEnquiry}
//               onChange={handleChangeEnquiryIDFilter}
//             />
//           </div>
//           <div className="flex gap-4 bg-[#ffdd00] items-center px-1 rounded-xl py-2">
//             <label></label>
//             <input
//               className="p-2 rounded-xl"
//               type="date"
//               value={startingDate}
//               onChange={(e) => handleDateChange(e, true)}
//             />
//             <input
//               className="p-2 rounded-xl"
//               type="date"
//               value={lastDate}
//               onChange={(e) => handleDateChange(e, false)}
//             />
//             <div className="flex gap-1 ">
//               <button className="bg-white  p-1" onClick={handleApplyFilters}>
//                 Apply
//               </button>
//               {/* <button className="bg-white p-1" onClick={handleClearFilters}>
//                 Clear
//               </button> */}
//             </div>
//           </div>
//         </div>

//         {filterValue != "" && (
//           <div className="mb-8">
//             {filterValue != "all" && (
//               <span className=" p-2 rounded-sm text-white">
//                 {filterApplied()}
//               </span>
//             )}
//             <div className="w-full p-4 bg-gray-100 rounded-xl ">
//               <div className="overflow-x-auto">
//                 <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md shadow-md">
//                   <table className="min-w-full bg-white">
//                     <thead className="bg-[#c61d23] text-white sticky top-0 z-10">
//                       <tr>
//                         <th className="py-3 px-4 text-left border-b">Index</th>
//                         <th className="py-3 px-4 text-left border-b">Date</th>
//                         <th className="py-3 px-4 text-left border-b">
//                           Enquiry Number
//                         </th>
//                         <th className="py-3 px-4 text-left border-b">Name</th>
//                         <th className="py-3 px-4 text-left border-b">
//                           Father Name
//                         </th>
//                         <th className="py-3 px-4 text-left border-b">
//                           Program
//                         </th>
//                         <th className="py-3 px-4 text-left border-b">Class</th>
//                         <th className="py-3 px-4 text-left border-b">
//                           Contact Number
//                         </th>
//                       </tr>
//                     </thead>

//                     {
//                       <tbody className="w-full">
//                         {showFilteredData?.map((student, index) => (
//                           <tr
//                             key={index}
//                             className="hover:bg-green-50 transition duration-150 ease-in-out"
//                             onClick={() => handleCardClick(student)}
//                           >
//                             <td className="py-2 px-4 border-b">{index + 1}</td>
//                             <td className="py-2 px-4 border-b">
//                               {dateFormatting(student.createdAt.split("T")[0])}
//                             </td>
//                             <td className="py-2 px-4 border-b">
//                               {student.enquiryNumber}
//                             </td>
//                             <td className="py-2 px-4 border-b">
//                               {student.studentName}
//                             </td>
//                             <td className="py-2 px-4 border-b">
//                               {student.fatherName}
//                             </td>
//                             <td className="py-2 px-4 border-b">
//                               {student.program}
//                             </td>
//                             <td className="py-2 px-4 border-b">
//                               {student.courseOfIntrested}
//                             </td>
//                             <td className="py-2 px-4 border-b">
//                               {maskPhoneNumber(student.fatherContactNumber)}
//                             </td>
//                             {/* <div className="flex justify-between w-full items-center">
//                             <p>
//                       <strong>Father's Contact:</strong>{" "}
//                       {maskPhoneNumber(student.fatherContactNumber)}
//                     </p>

//                             <button
//                               className="py-2 px-2 bg-[#ffdd00] border-2 rounded-xl "
//                               onClick={() => {
//                                 triggerOBDCall(student.fatherContactNumber);
//                               }}
//                             >
//                               {" "}
//                               Call Now{" "}
//                             </button>
//                           </div> */}
//                           </tr>
//                         ))}
//                       </tbody>
//                     }
//                   </table>

//                   {showFilteredData?.length === 0 && (
//                     <div className="w-full text-center justify-center items-center p-6">
//                       Data Not Found
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//                 onClick={() => downloadExcelForEnquiry(showFilteredData)}
//               >
//                 Download as Excel
//               </button>
//             </div>

//             <div className="flex justify-end text-white mt-2 mr-3">
//               <h2 className="mr-2">Total Count : </h2>
//               <span>{showFilteredData.length}</span>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 gap-6">
//           {data?.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//               onClick={() => handleCardClick(item)}
//             >
//               <div className="space-y-3">
//                 {item.enquiryNumber && (
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     Enquiry Name : {item.enquiryNumber}
//                   </h4>
//                 )}
//                 {item.studentName && (
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     Student Name : {item.studentName}
//                   </h4>
//                 )}
//                 {item.fatherName && (
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     Father Name : {item.fatherName}
//                   </h4>
//                 )}
//                 {item.city && (
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     City : {item.city}
//                   </h4>
//                 )}
//                 {item.courseOfIntrested && (
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     Course Of Intrested : {item.courseOfIntrested}
//                   </h4>
//                 )}
//                 {item.schoolName && (
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     School Name : {item.schoolName}
//                   </h4>
//                 )}
//                 {item.createdAt && (
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     Created At : {convertToDate(item.createdAt)}
//                   </h4>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination Buttons */}
//         {/* <div className="flex gap-4 justify-center items-center mt-8">
//           <button
//             onClick={handlePrevPage}
//             disabled={page <= 1}
//             className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400"
//           >
//             Prev
//           </button>
//           <button
//             onClick={handleNextPage}
//             disabled={noMoreData}
//             className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400"
//           >
//             Next
//           </button>
//         </div> */}

//         {phone && email && (
//           <PaginatedList
//             apiEndpoint="/admin/getEnquiryData"
//             queryParams={{ phone }}
//             renderItem={renderStudentCard}
//             itemsPerPage={1}
//             email={email}
//             handleCardClick={(student) => {
//               handleCardClick(student);
//             }}
//           />
//         )}

//         {/* Modal for displaying detailed information */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl">
//               <h3 className="text-2xl font-semibold mb-4">Student Details</h3>
//               {selectedStudent && (
//                 <div className="space-y-3">
//                   <p>
//                     <strong>Enquiry Number:</strong>{" "}
//                     {selectedStudent.enquiryNumber}
//                   </p>
//                   <p>
//                     <strong>Name:</strong> {selectedStudent.studentName}
//                   </p>
//                   <div className="flex justify-between w-full items-center">
//                     <p>
//                       <strong>Father's Contact:</strong>{" "}
//                       {selectedStudent.fatherContactNumber}
//                       {/* {maskPhoneNumber(selectedStudent.fatherContactNumber)} */}
//                     </p>

//                     {/* <button
//                       className="py-2 px-2 bg-[#ffdd00] border-2 rounded-xl "
//                       onClick={() => {
//                         triggerOBDCall(selectedStudent.fatherContactNumber);
//                       }}
//                     >
//                       {" "}
//                       Call Now{" "}
//                     </button> */}
//                   </div>

//                   {selectedStudent.email && (
//                     <p>
//                       <strong>Email:</strong> {maskEmail(selectedStudent.email)}
//                     </p>
//                   )}
//                   <p>
//                     <strong>Program:</strong> {selectedStudent.program}
//                   </p>
//                   <p>
//                     <strong>Course Interested:</strong>{" "}
//                     {selectedStudent.courseOfIntrested}
//                   </p>
//                   <p>
//                     <strong>School Name:</strong> {selectedStudent.schoolName}
//                   </p>
//                   <p>
//                     <strong>Father's Name:</strong> {selectedStudent.fatherName}
//                   </p>
//                   {/* <p>
//                     <strong>Father's Occupation:</strong>{" "}
//                     {selectedStudent.fatherOccupations}
//                   </p> */}
//                   <p>
//                     <strong>City:</strong> {selectedStudent.city}
//                   </p>
//                   <p>
//                     <strong>State:</strong> {selectedStudent.state}
//                   </p>
//                   {selectedStudent.howToKnow && (
//                     <p>
//                       <strong>How to Know:</strong> {selectedStudent.howToKnow}
//                     </p>
//                   )}
//                   {selectedStudent.remarks && (
//                     <p>
//                       <strong>Remarks:</strong> {selectedStudent.remarks}
//                     </p>
//                   )}

//                   {/* <p>
//                     <strong>Intime:</strong> {selectedStudent.intime}
//                   </p> */}
//                   <p>
//                     <strong>Enquiry Taken By:</strong>{" "}
//                     {selectedStudent.enquiryTakenBy}
//                   </p>
//                   {/* <p>
//                     <strong>Brochure Given:</strong>{" "}
//                     {selectedStudent.brochureGiven}
//                   </p> */}
//                   <p>
//                     <strong>Created At:</strong>{" "}
//                     {convertToDate(selectedStudent.createdAt)}
//                   </p>
//                   <p>
//                     <strong>Updated At:</strong>{" "}
//                     {convertToDate(selectedStudent.updatedAt)}
//                   </p>

//                   {selectedStudent.studentContactNumber && (
//                     <div>
//                       <p>
//                         <strong>Student Contact:</strong>{" "}
//                         {selectedStudent.studentContactNumber}
//                       </p>
//                       <button
//                         className="py-2 px-2 bg-[#ffdd00] border-2 rounded-xl "
//                         onClick={() => {
//                           maskedCall(selectedStudent.fatherContactNumber);
//                         }}
//                       >
//                         {" "}
//                         Call Now{" "}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={closeModal}
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Logout Button */}
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={handleLogout}
//             className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState, useMemo } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import PaginatedList from "./Pagination";
import { downloadExcelForEnquiry } from "./DownloadExcelFile/ExcelFileDownload";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  Filter,
  Download,
  X,
  Phone,
  Mail,
  Calendar,
  User,
  GraduationCap,
  MapPin,
  FileText,
  LogOut,
  Eye,
  ChevronDown,
} from "lucide-react";

const AdminDashboard = () => {
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const history = useNavigate();
  const [classValue, setClassValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filterByEnquiry, setFilterByEnquiry] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [showFilteredData, setShowFilteredData] = useState([]);

  const numberTOemail = (number) => {
    const numberEmail = {
      9719706242: "urooj@scholarsden.in",
      7037550621: "jatin@scholarsden.in",
      9068833360: "jatin@scholarsden.in",
      8171091333: "jatin@scholarsden.in",
    };
    return numberEmail[number] || null;
  };

  const handleApplyFilters = async (data) => {
    const filterParams = {
      sortOrder: "desc",
      email,
    };

    if (classValue || data.class) filterParams.class = data.class || classValue;
    if (inputValue || data.name) filterParams.name = data.name || inputValue;
    if (filterByEnquiry || data.enquiry)
      filterParams.enquiryNumber = data.enquiry || filterByEnquiry;
    if ((startingDate || data.startingDate) && (lastDate || data.lastDate)) {
      filterParams.startingDate = data.startingDate || startingDate;
      filterParams.lastDate = data.lastDate || lastDate;
    }

    try {
      const response = await axios.post("/admin/filter", filterParams);
      setShowFilteredData(response.data);
      setFilterValue("combined");
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleClearFilters = () => {
    setStartingDate("");
    setLastDate("");
    setClassValue("");
    setInputValue("");
    setFilterByEnquiry("");
    setFilterValue("");
    setShowFilteredData([]);
  };

  const email = numberTOemail(phone);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setTimeout(() => handleApplyFilters({ name: e.target.value }), 500);
  };

  const handleChangeEnquiryIDFilter = (e) => {
    const value = e.target.value;
    setFilterByEnquiry(value);
    setTimeout(() => handleApplyFilters({ enquiry: e.target.value }), 500);
  };

  const handleChangeClassFilter = async (e) => {
    setClassValue(e.target.value);
    await handleApplyFilters({ class: e.target.value });
  };

  const handleDateChange = (e, isStart) => {
    if (isStart) setStartingDate(e.target.value);
    else setLastDate(e.target.value);

    setTimeout(() => {
      if (startingDate && lastDate) {
        handleApplyFilters();
      }
    }, 300);
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

  const handleCardClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const convertToDate = (isoString) => {
    console.log("isoString", isoString);
    if (isoString) {
      const date = new Date(isoString);
      return date.toLocaleString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    } else {
      return;
    }
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

  function maskPhoneNumber(phone) {
    if (phone && phone.length > 4) {
      const visible = phone.slice(0, 4);
      const masked = "*".repeat(phone.length - 4);
      return visible + masked;
    }
    return phone;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return n + "th";
      switch (n % 10) {
        case 1:
          return n + "st";
        case 2:
          return n + "nd";
        case 3:
          return n + "rd";
        default:
          return n + "th";
      }
    };

    return `${getOrdinal(day)} ${month} ${year}`;
  }

  const filterApplied = () => {
    const filters = [];

    if (startingDate && lastDate) {
      filters.push(
        `Date: ${formatDate(startingDate)} to ${formatDate(lastDate)}`
      );
    }
    if (classValue) filters.push(`Class: ${classValue}`);
    if (filterByEnquiry) filters.push(`Enquiry #${filterByEnquiry}`);
    if (inputValue) filters.push(`Name: ${inputValue}`);

    if (filters.length === 0 && filterValue === "all") {
      return "Showing all students";
    }
    if (filters.length === 0) return "No filters applied";

    return filters.join(" | ");
  };
  function maskEmail(email) {
    if (!email) return email;

    const [user, domain] = email.split("@");

    // Handle cases where user part is too short
    if (user.length <= 2) {
      // For 1-2 character usernames, mask all but first character
      return user[0] + "*".repeat(Math.max(0, user.length - 1)) + "@" + domain;
    }

    // For 3+ character usernames, show first and last character
    const maskedUser = user[0] + "*".repeat(user.length - 2) + user.slice(-1);
    return maskedUser + "@" + domain;
  }
  const dateFormatting = (isoDate) => {
    const date = new Date(isoDate);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleLogout = () => {
    const clearCookie = (name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    };

    clearCookie("phone");
    clearCookie("token");
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    history("/adminsignup");
  };

  const renderStudentCard = (student, index, onClick) => {
    return (
      <div
        key={index}
        className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <h4 className="text-lg font-bold">
          Enquiry #: {student.enquiryNumber}
        </h4>
        <h4 className="text-lg font-bold">Name: {student.studentName}</h4>
        <p>Father: {student.fatherName}</p>
        <p>Program: {student.program}</p>
        <p>Class: {student.courseOfIntrested}</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 max-w-[1920px] mx-auto">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-[#c61d23] to-[#a01818] shadow-xl">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage student enquiries and data
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-[#c61d23]" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Class Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Select Class
                </label>
                <div className="relative">
                  <select
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 pr-10 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent appearance-none bg-white"
                    onChange={handleChangeClassFilter}
                    value={classValue}
                  >
                    <option value="">All Classes</option>
                    {classFilterOptions.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Name Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Student Name
                </label>
                <div className="relative">
                  <input
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 pl-9 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent"
                    placeholder="Search by name..."
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                  />
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Enquiry Number Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Enquiry Number
                </label>
                <div className="relative">
                  <input
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 pl-9 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent"
                    placeholder="Search by enquiry #..."
                    type="text"
                    value={filterByEnquiry}
                    onChange={handleChangeEnquiryIDFilter}
                  />
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 text-xs border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent"
                    type="date"
                    value={startingDate}
                    onChange={(e) => handleDateChange(e, true)}
                  />
                  <input
                    className="flex-1 text-xs border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-[#c61d23] focus:border-transparent"
                    type="date"
                    value={lastDate}
                    onChange={(e) => handleDateChange(e, false)}
                  />
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center gap-3 mt-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                onClick={handleApplyFilters}
              >
                <Filter size={16} />
                Apply Filters
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                onClick={handleClearFilters}
              >
                <X size={16} />
                Clear All
              </button>
            </div>
          </div>

          {/* Results Section */}
          {filterValue !== "" && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Search Results
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {filterApplied()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600">
                    Total:{" "}
                    <span className="text-[#c61d23] font-bold">
                      {showFilteredData.length}
                    </span>
                  </span>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    onClick={() => downloadExcelForEnquiry(showFilteredData)}
                  >
                    <Download size={16} />
                    Export Excel
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-[#c61d23] to-[#a01818] text-white sticky top-0 z-10">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-semibold">
                          #
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold">
                          Date
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold">
                          Enquiry #
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold">
                          Name
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold">
                          Father
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold">
                          Program
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold">
                          Class
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold">
                          Contact
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {showFilteredData?.map((student, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100"
                        >
                          <td className="py-3 px-4 text-sm">{index + 1}</td>
                          <td className="py-3 px-4 text-sm">
                            {dateFormatting(student.createdAt.split("T")[0])}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-[#c61d23]">
                            {student.enquiryNumber}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium">
                            {student.studentName}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {student.fatherName}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {student.program}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {student.courseOfIntrested}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {maskPhoneNumber(student.fatherContactNumber)}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleCardClick(student)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded transition-all active:scale-95"
                            >
                              <Eye size={14} />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {showFilteredData?.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <FileText size={48} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">
                        No data found matching your filters
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Paginated List */}
          {phone && email && (
            <PaginatedList
              apiEndpoint="/admin/getEnquiryData"
              queryParams={{ phone }}
              renderItem={renderStudentCard}
              itemsPerPage={1}
              email={email}
              handleCardClick={(student) => handleCardClick(student)}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#c61d23] to-[#a01818] text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Student Details</h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Enquiry Number</p>
                    <p className="text-sm font-semibold">
                      {selectedStudent.enquiryNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Student Name</p>
                    <p className="text-sm font-semibold">
                      {selectedStudent.studentName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Father's Name</p>
                    <p className="text-sm font-semibold">
                      {selectedStudent.fatherName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Contact Number</p>
                    <p className="text-sm font-semibold">
                      {selectedStudent.fatherContactNumber}
                    </p>
                  </div>
                </div>

                {selectedStudent.email && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail size={18} className="text-[#c61d23] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="text-sm font-semibold">
                        {maskEmail(selectedStudent.email)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <GraduationCap size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Program</p>
                    <p className="text-sm font-semibold">
                      {selectedStudent.program}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <GraduationCap size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Class</p>
                    <p className="text-sm font-semibold">
                      {selectedStudent.courseOfIntrested}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">School Name</p>
                    <p className="text-sm font-semibold">
                      {selectedStudent.schoolName || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">City</p>
                    <p className="text-sm font-semibold">
                      {selectedStudent.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">State</p>
                    <p className="text-sm font-semibold">
                      {selectedStudent.state || "N/A"}
                    </p>
                  </div>
                </div>

                {selectedStudent.howToKnow && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText size={18} className="text-[#c61d23] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">How to Know</p>
                      <p className="text-sm font-semibold">
                        {selectedStudent.howToKnow}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Enquiry Taken By</p>
                    <p className="text-sm font-semibold">
                      {selectedStudent.enquiryTakenBy}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Created At</p>
                    <p className="text-sm font-semibold">
                      {convertToDate(selectedStudent.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Updated At</p>
                    <p className="text-sm font-semibold">
                      {convertToDate(selectedStudent.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              {selectedStudent.remarks && (
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText size={18} className="text-[#c61d23] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">Remarks</p>
                    <p className="text-sm">{selectedStudent.remarks}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-2xl border-t">
              <button
                onClick={closeModal}
                className="w-full px-4 py-3 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
