// import React, { useEffect, useState, useMemo } from "react";
// import axios from "../../api/axios";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import PaginatedList from "./Pagination";
// import { downloadExcelForSDAT } from "./DownloadExcelFile/ExcelFileDownload";

// const SdatData = () => {
//   const [contactNumber, setContactNumber] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showImage, setShowImage] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [classValue, setClassValue] = useState("");
//   const [filterValue, setFilterValue] = useState("");
//   const [showFilteredData, setShowFilteredData] = useState([]);
//   const [showImageUrl, setShowImageUrl] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
//   const [startingDate, setStartingDate] = useState("");
//   const [lastDate, setLastDate] = useState("");
//   const history = useNavigate();

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

//   // Handle sort order change
//   const handleSortChange = (order) => {
//     console.log("handleSortChange", order);
//     setSortOrder(order);
//     // Re-fetch data with new sort order
//     if (filterValue === "class") {
//       fetchFilteredData({
//         filterBy: "class",
//         class: classValue,
//         sortOrder: order,
//       });
//     } else if (filterValue === "id") {
//       fetchFilteredData({
//         filterBy: "id",
//         studentId: inputValue,
//         sortOrder: order,
//       });
//     } else if (filterValue === "name") {
//       fetchFilteredData({
//         filterBy: "name",
//         name: inputValue,
//         sortOrder: order,
//       });
//     } else {
//       fetchAllStudents(order);
//     }
//   };

//   const getCookieValue = (name) => {
//     return document.cookie
//       .split("; ")
//       .find((row) => row.startsWith(name + "="))
//       ?.split("=")[1];
//   };

//   // Unified filter function
//   const fetchFilteredData = async (filterParams = {}) => {
//     setIsLoading(true);
//     console.log("filterParams from fetchFilteredData", filterParams, sortOrder);
//     console.log(
//       "filterParams from alldata",
//       filterParams.class,
//       filterParams.name,
//       filterParams.startingDate,
//       filterParams.lastDate,
//       filterParams.sortOrder,
//       sortOrder
//     );

//     const phone = getCookieValue("phone");
//     try {
//       // const response = await axios.post("/students/filter", filterParams);
//       const response = await axios.post("students/filter", {
//         filterBy: "multiple",
//         class: filterParams.class || classValue,
//         name: filterParams.name || inputValue,
//         // studentId : filterParams.studentId ,

//         startingDate: filterParams.startingDate || startingDate,
//         lastDate: filterParams.lastDate || lastDate,
//         sortOrder: filterParams.sortOrder,
//       });

//       console.log("Filtered students:", response.data);
//       setShowFilteredData(response.data);
//       setFilterValue("multiple");

//       console.log("Filter for all response", response);
//       setShowFilteredData(response.data);
//       setFilterValue(filterParams.filterBy);
//     } catch (error) {
//       console.error("Error filtering students:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Debounced filter function
//   const debouncedFilter = useMemo(() => debounce(fetchFilteredData, 500), []);

//   // Handle class filter change
//   const handleChangeClassFilter = async (e) => {
//     const selectedClass = e.target.value;
//     if (selectedClass === "Select Class") {
//       fetchAllStudents();
//       return;
//     }
//     setClassValue(selectedClass);
//     fetchFilteredData({ filterBy: "class", class: selectedClass, sortOrder });
//   };

//   // Handle name/ID search
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     console.log("value.length,,,,,,,,,,,,,,,,,,,,,,", value.length);
//     // if (value.length < 1) {
//     //   console.log("value.length.................", value.length);
//     //    setInputValue(value);
//     //   fetchAllStudents({ order: sortOrder });
//     //   return;
//     // } else {
//     setInputValue(value);
//     console.log("VAle from handleSearchChange", value);

//     // Determine if input is likely an ID (numeric)
//     const isIdSearch = /^\d+$/.test(value);

//     // if (isIdSearch) {
//     //   debouncedFilter({ filterBy: "id", studentId: value, sortOrder });
//     // } else {
//     debouncedFilter({ filterBy: "name", name: value, sortOrder });
//     // }
//     // }
//   };
//   const filerByDate = async () => {
//     const response = await axios.post("students/fetchDataByDateRange", {
//       startingDate,
//       lastDate,
//     });

//     console.log("filterByDate response", response);

//     setShowFilteredData(response.data.data);

//     // setShowFilteredData(response.data.data);
//     setFilterValue("daterangeData");
//   };

//   // Fetch all students when no filter is applied
//   const fetchAllStudents = (order) => {
//     fetchFilteredData({ filterBy: "all", sortOrder: order });
//   };

//   // Initialize with all students
//   useEffect(() => {
//     const phoneFromCookie = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("phone="))
//       ?.split("=")[1];

//     if (phoneFromCookie) {
//       setContactNumber(phoneFromCookie);
//     }

//     fetchAllStudents(sortOrder);
//   }, []);

//   const handleCardClick = (student, basic, batch, family) => {
//     setSelectedStudent({
//       ...student,
//       ...basic,
//       ...batch,
//       ...family,
//     });
//     setIsModalOpen(true);
//   };

//   const fetchStudentDetails = async (studentId) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`/students/${studentId}`);
//       const student = response.data;

//       setSelectedStudent({
//         ...student,
//         ...student.basicDetails,
//         ...student.batchDetails,
//         ...student.familyDetails,
//         ...student.educationalDetails,
//       });

//       setIsModalOpen(true);
//     } catch (error) {
//       console.error("Error fetching student details:", error);
//       // You might want to add error handling UI here
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedStudent(null);
//   };

//   const convertToDate = (isoString) => {
//     if (!isoString) return "";
//     const date = new Date(isoString);
//     return date.toLocaleString("en-GB", {
//       weekday: "long",
//       year: "numeric",
//       month: "numeric",
//       day: "numeric",
//     });
//   };

//   const onClickShowImage = (imageUrl) => {
//     setShowImage(true);
//     setShowImageUrl(imageUrl);
//   };

//   const renderStudentCard = (student, index, onClick) => {
//     const {
//       studentName,
//       basicDetails: basic = {},
//       batchDetails: batch = {},
//       familyDetails: family = {},
//     } = student;

//     return (
//       <div
//         key={index}
//         className="bg-white h-48 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//         onClick={onClick}
//       >
//         <div className="space-y-1">
//           <h4 className="font-semibold">Student Name: {studentName}</h4>
//           <h4>Father Name: {family?.FatherName}</h4>
//           <h4>Class: {batch?.classForAdmission}</h4>
//           <h4>Subject: {batch?.subjectCombination}</h4>
//           <h4>Exam: {basic?.examName}</h4>
//           <h4>Exam Date: {basic?.examDate}</h4>
//         </div>
//       </div>
//     );
//   };

//   const handleLogout = () => {
//   // Clear cookie with multiple attempts to cover different scenarios
//   const clearCookie = (name) => {
    
//     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    
//     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    
//     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    
//     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/adminsignup;`;
//   };

//   clearCookie("phone");
//   clearCookie("token"); // Clear token too if needed
  
//   // Also clear localStorage
//   localStorage.removeItem("token");
//   localStorage.removeItem("phone");
  
//   // Redirect to AdminSignup page
//   history("/adminsignup");
// }

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

//   console.log(formatDate("2025-05-11")); // Output: "11th May 25"

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

//     // if (inputValue) {
//     //   filters.push(`Student ID: ${inputValue}`);
//     // }

//     if (inputValue) {
//       filters.push(`Student Name: ${inputValue}`);
//     }

//     if (filterValue === "all") {
//       return "Showing all students";
//     }

//     if (filters.length === 0) {
//       return "No filters applied";
//     }

//     return `Showing Data for ${filters.join(" | ")}`;
//   };

//   return (
//     <div className="grid grid-cols-12 w-full max-w-screen-xl">
//       {isLoading && (
//         <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black bg-opacity-10 flex items-center justify-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//         </div>
//       )}

//       <div className="col-span-2 w-full bg-[#c61d23]">
//         <Sidebar />
//       </div>

//       <div className="col-span-10 max-w-7xl w-full mx-auto pr-4 py-6 bg-[#c61d23] overflow-auto h-screen">
//         <h2 className="text-3xl font-semibold text-center text-white mb-8">
//           Admin Dashboard
//         </h2>

//         <div className="flex flex-wrap gap-3 m-6 items-center justify-between">
//           <div className="flex flex-col ">
//             <label className="text-white" htmlFor="">
//               Select Class
//             </label>
//             <select
//               className="w-40 p-4 rounded-xl "
//               onChange={handleChangeClassFilter}
//               value={classValue}
//             >
//               <option value="Select Class">Select Class</option>
//               {classFilterOptions.map((item, index) => (
//                 <option key={index} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex flex-col">
//             <label className="text-white" htmlFor="">
//               Search by Name
//             </label>

//             <input
//               className="p-4 rounded-xl"
//               placeholder="Search by Name"
//               type="text"
//               value={inputValue}
//               onChange={handleSearchChange}
//             />
//           </div>

//           {/* Sort controls */}
//           <div className="flex flex-col gap-2">
//             <div className="flex items-center ml-auto bg-white py-1 pl-3 pr-1 rounded-xl justify-around ">
//               <span className="mr-2 text-gray-700">Sort by Date:</span>

//               <div>
//                 <button
//                   onClick={() => handleSortChange("desc")}
//                   className={`px-3 py-1 rounded-l-md ${
//                     sortOrder === "desc"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   Oldest First
//                 </button>
//                 <button
//                   onClick={() => handleSortChange("asc")}
//                   className={`px-3 py-1 rounded-r-md ${
//                     sortOrder === "asc"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   Newest First
//                 </button>
//               </div>
//             </div>

//             <div className="flex gap-4 bg-[#ffdd00] items-center px-3 rounded-xl py-2">
//               <input
//                 className="p-2 rounded-xl"
//                 placeholder="Find By Enquiry Number"
//                 type="date"
//                 value={startingDate}
//                 onChange={(e) => {
//                   setStartingDate(e.target.value);
//                 }}
//               />
//               <p>to</p>

//               <input
//                 className="p-2 rounded-xl"
//                 placeholder="Find By Enquiry Number"
//                 type="date"
//                 value={lastDate}
//                 onChange={(e) => {
//                   setLastDate(e.target.value);
//                 }}
//               />
//               <button
//                 className="bg-white rounded-xl px-3"
//                 onClick={fetchFilteredData}
//               >
//                 Apply
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="mb-8">
//           {/* <span className="bg-[#ffdd00] p-2 rounded-sm ">{`Filter Applied on ${filterApplied}`}</span> */}
//           {filterValue != "all" && (
//             <span className="p-2 text-white rounded-sm">{filterApplied()}</span>
//           )}

//           <div className="w-full mt-2 p-4 bg-gray-100 rounded-xl ">
//             <div className="overflow-x-auto">
//               <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md shadow-md">
//                 <table className="min-w-full bg-white">
//                   <thead className="bg-[#c61d23] text-white sticky top-0 z-10">
//                     <tr>
//                       <th className="py-3 px-4 text-left border-b">
//                         StudentID
//                       </th>
//                       <th className="py-3 px-4 text-left border-b">Name</th>
//                       <th className="py-3 px-4 text-left border-b">Class</th>
//                       <th className="py-3 px-4 text-left border-b">Date</th>
//                       <th className="py-3 px-4 text-left border-b">
//                         Payment Id
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="w-full">
//                     {
//                       // isLoading ? (
//                       //   <tr>
//                       //     <td colSpan="4" className="py-4 text-center">
//                       //       Loading...
//                       //     </td>
//                       //   </tr>
//                       // ) :
//                       showFilteredData.length > 0 ? (
//                         showFilteredData.map((student, index) => (
//                           <tr
//                             key={index}
//                             onClick={() =>
//                               fetchStudentDetails(student.student_id)
//                             }
//                             className="hover:bg-green-50 transition duration-150 ease-in-out"
//                           >
//                             <td className="py-2 px-4 border-b">
//                               {student?.StudentsId}
//                             </td>
//                             <td className="py-2 px-4 border-b">
//                               {student?.studentName}
//                             </td>
//                             <td className="py-2 px-4 border-b">
//                               {student?.classForAdmission}
//                             </td>
//                             <td className="py-2 px-4 border-b">
//                               {formatDate(student?.createdAt?.split("T")[0])}
//                             </td>
//                             <td className="py-2 px-4 border-b">
//                               {student?.paymentId}
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="4" className="py-4 text-center">
//                             No students found
//                           </td>
//                         </tr>
//                       )
//                     }
//                   </tbody>
//                 </table>
//               </div>
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//                 onClick={() => downloadExcelForSDAT(showFilteredData)}
//               >
//                 Download as Excel
//               </button>
//             </div>
//           </div>
//           <div className="flex justify-end text-white mt-2 mr-3">
//             <h2 className="mr-2">Total Count : </h2>
//             <span>{showFilteredData.length}</span>
//           </div>
//         </div>

//         <PaginatedList
//           apiEndpoint="/adminData/getData"
//           queryParams={{ contactNumber }}
//           renderItem={renderStudentCard}
//           itemsPerPage={1}
//           handleCardClick={(student) => {
//             const basic = student.basicDetails || {};
//             const batch = student.batchDetails || {};
//             const family = student.familyDetails || {};
//             handleCardClick(student, basic, batch, family);
//           }}
//         />

//         {/* Modal */}
//         {isModalOpen && selectedStudent && (
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl overflow-auto max-h-[90vh]">
//               <h3 className="text-2xl font-semibold mb-4">Student Details</h3>
//               <div className="space-y-3">
//                 <p>
//                   <strong>Name:</strong> {selectedStudent.studentName}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {selectedStudent.email}
//                 </p>
//                 <p>
//                   <strong>Contact Number:</strong>{" "}
//                   {selectedStudent.contactNumber}
//                 </p>
//                 {selectedStudent.profilePicture && (
//                   <div className="my-4 flex gap-4 items-center">
//                     <p>Profile Picture</p>
//                     <button
//                       onClick={() =>
//                         onClickShowImage(selectedStudent.profilePicture)
//                       }
//                       className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                     >
//                       View Image
//                     </button>
//                   </div>
//                 )}
//                 {selectedStudent.admitCard && (
//                   <div className="my-4 flex gap-4 items-center">
//                     <p>Admit Card</p>
//                     <button
//                       onClick={() =>
//                         window.open(selectedStudent.admitCard, "_blank")
//                       }
//                       className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                     >
//                       View Admit Card
//                     </button>
//                   </div>
//                 )}

//                 {showImage && (
//                   <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//                     <div className="relative">
//                       <img
//                         src={showImageUrl}
//                         alt="Profile"
//                         className="max-w-full max-h-screen rounded"
//                       />

//                       <button
//                         onClick={() => setShowImage(false)}
//                         className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 <p>
//                   <strong>Father Name:</strong> {selectedStudent.FatherName}
//                 </p>
//                 <p>
//                   <strong>Father Contact:</strong>{" "}
//                   {selectedStudent.FatherContactNumber}
//                 </p>
//                 <p>
//                   <strong>Father Occupation:</strong>{" "}
//                   {selectedStudent.FatherOccupation}
//                 </p>
//                 <p>
//                   <strong>Mother Name:</strong> {selectedStudent.MotherName}
//                 </p>
//                 <p>
//                   <strong>Mother Contact:</strong>{" "}
//                   {selectedStudent.MotherContactNumber}
//                 </p>
//                 <p>
//                   <strong>Mother Occupation:</strong>{" "}
//                   {selectedStudent.MotherOccupation}
//                 </p>
//                 <p>
//                   <strong>Class for Admission:</strong>{" "}
//                   {selectedStudent.classForAdmission}
//                 </p>
//                 <p>
//                   <strong>Subject Combination:</strong>{" "}
//                   {selectedStudent.program}
//                 </p>
//                 <p>
//                   <strong>Exam Name:</strong> {selectedStudent.examName}
//                 </p>
//                 <p>
//                   <strong>Exam Date:</strong> {selectedStudent.examDate}
//                 </p>
//                 <p>
//                   <strong>DOB:</strong> {convertToDate(selectedStudent.dob)}
//                 </p>
//                 <p>
//                   <strong>Created At:</strong>{" "}
//                   {convertToDate(selectedStudent.created_at)}
//                 </p>
//               </div>
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={closeModal}
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Logout */}
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={handleLogout}
//             className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Debounce utility function
// function debounce(func, delay) {
//   let timeoutId;
//   let abortController;

//   return function (...args) {
//     clearTimeout(timeoutId);
//     if (abortController) {
//       abortController.abort();
//     }

//     abortController = new AbortController();
//     const signal = abortController.signal;

//     timeoutId = setTimeout(() => {
//       func.apply(this, [...args, signal]);
//     }, delay);
//   };
// }

// export default SdatData;






















import React, { useEffect, useState, useMemo } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import PaginatedList from "./Pagination";
import { downloadExcelForSDAT } from "./DownloadExcelFile/ExcelFileDownload";
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
  Image as ImageIcon,
  CreditCard,
  Briefcase,
  ArrowUpDown,
} from "lucide-react";

const SdatData = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [classValue, setClassValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [showFilteredData, setShowFilteredData] = useState([]);
  const [showImageUrl, setShowImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [startingDate, setStartingDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const history = useNavigate();

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

  const handleSortChange = (order) => {
    setSortOrder(order);
    if (filterValue === "class") {
      fetchFilteredData({
        filterBy: "class",
        class: classValue,
        sortOrder: order,
      });
    } else if (filterValue === "id") {
      fetchFilteredData({
        filterBy: "id",
        studentId: inputValue,
        sortOrder: order,
      });
    } else if (filterValue === "name") {
      fetchFilteredData({
        filterBy: "name",
        name: inputValue,
        sortOrder: order,
      });
    } else {
      fetchAllStudents(order);
    }
  };

  const getCookieValue = (name) => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  };

  const fetchFilteredData = async (filterParams = {}) => {
    setIsLoading(true);
    try {
      const response = await axios.post("students/filter", {
        filterBy: "multiple",
        class: filterParams.class || classValue,
        name: filterParams.name || inputValue,
        startingDate: filterParams.startingDate || startingDate,
        lastDate: filterParams.lastDate || lastDate,
        sortOrder: filterParams.sortOrder,
      });

      setShowFilteredData(response.data);
      setFilterValue("multiple");
    } catch (error) {
      console.error("Error filtering students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFilter = useMemo(() => debounce(fetchFilteredData, 500), []);

  const handleChangeClassFilter = async (e) => {
    const selectedClass = e.target.value;
    if (selectedClass === "") {
      fetchAllStudents();
      return;
    }
    setClassValue(selectedClass);
    fetchFilteredData({ filterBy: "class", class: selectedClass, sortOrder });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFilter({ filterBy: "name", name: value, sortOrder });
  };

  const handleDateChange = (e, isStart) => {
    if (isStart) setStartingDate(e.target.value);
    else setLastDate(e.target.value);
  };

  const handleApplyFilters = () => {
    fetchFilteredData();
  };

  const handleClearFilters = () => {
    setStartingDate("");
    setLastDate("");
    setClassValue("");
    setInputValue("");
    setFilterValue("");
    setShowFilteredData([]);
    fetchAllStudents(sortOrder);
  };

  const fetchAllStudents = (order) => {
    fetchFilteredData({ filterBy: "all", sortOrder: order });
  };

  useEffect(() => {
    const phoneFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("phone="))
      ?.split("=")[1];

    if (phoneFromCookie) {
      setContactNumber(phoneFromCookie);
    }

    fetchAllStudents(sortOrder);
  }, []);

  const handleCardClick = (student, basic, batch, family) => {
    setSelectedStudent({
      ...student,
      ...basic,
      ...batch,
      ...family,
    });
    setIsModalOpen(true);
  };

  const fetchStudentDetails = async (studentId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/students/${studentId}`);
      const student = response.data;

      setSelectedStudent({
        ...student,
        ...student.basicDetails,
        ...student.batchDetails,
        ...student.familyDetails,
        ...student.educationalDetails,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setIsLoading(false);
    }
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
    });
  };

  const onClickShowImage = (imageUrl) => {
    setShowImage(true);
    setShowImageUrl(imageUrl);
  };

  const renderStudentCard = (student, index, onClick) => {
    const {
      studentName,
      basicDetails: basic = {},
      batchDetails: batch = {},
      familyDetails: family = {},
    } = student;

    return (
      <div
        key={index}
        className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <h4 className="text-lg font-bold">Student Name: {studentName}</h4>
        <p>Father Name: {family?.FatherName}</p>
        <p>Class: {batch?.classForAdmission}</p>
        <p>Subject: {batch?.subjectCombination}</p>
        <p>Exam: {basic?.examName}</p>
        <p>Exam Date: {basic?.examDate}</p>
      </div>
    );
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const month = monthNames[date.getMonth()];

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return n + "th";
      switch (n % 10) {
        case 1: return n + "st";
        case 2: return n + "nd";
        case 3: return n + "rd";
        default: return n + "th";
      }
    };

    return `${getOrdinal(day)} ${month} ${year}`;
  }

  const filterApplied = () => {
    const filters = [];

    if (startingDate && lastDate) {
      filters.push(`Date: ${formatDate(startingDate)} to ${formatDate(lastDate)}`);
    }
    if (classValue) filters.push(`Class: ${classValue}`);
    if (inputValue) filters.push(`Name: ${inputValue}`);

    if (filters.length === 0 && filterValue === "all") {
      return "Showing all students";
    }
    if (filters.length === 0) return "No filters applied";

    return filters.join(" | ");
  };

  const dateFormatting = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-gray-50 to-gray-100 max-w-[1920px] mx-auto">
      {isLoading && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black bg-opacity-10 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#c61d23] border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className="lg:w-64 w-full bg-gradient-to-b from-[#c61d23] to-[#a01818] shadow-xl lg:h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">SDAT Dashboard</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage student admission data</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 w-full sm:w-auto justify-center"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-[#c61d23]" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Filters</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
                    onChange={handleSearchChange}
                  />
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
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

              {/* Sort Order */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Sort by Date
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSortChange("desc")}
                    className={`flex-1 text-xs px-3 py-2 rounded-lg transition-all ${
                      sortOrder === "desc"
                        ? "bg-[#c61d23] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Oldest
                  </button>
                  <button
                    onClick={() => handleSortChange("asc")}
                    className={`flex-1 text-xs px-3 py-2 rounded-lg transition-all ${
                      sortOrder === "asc"
                        ? "bg-[#c61d23] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Newest
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                onClick={handleApplyFilters}
              >
                <Filter size={16} />
                Apply Filters
              </button>
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                onClick={handleClearFilters}
              >
                <X size={16} />
                Clear All
              </button>
            </div>
          </div>

          {/* Results Section */}
          {filterValue !== "" && (
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                <div className="w-full sm:w-auto">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Search Results</h2>
                  <p className="text-xs text-gray-600 mt-1 break-words">{filterApplied()}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <span className="text-sm font-medium text-gray-600 text-center sm:text-left">
                    Total: <span className="text-[#c61d23] font-bold">{showFilteredData.length}</span>
                  </span>
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    onClick={() => downloadExcelForSDAT(showFilteredData)}
                  >
                    <Download size={16} />
                    Export Excel
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg min-w-full inline-block align-middle">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-[#c61d23] to-[#a01818] text-white sticky top-0 z-10">
                      <tr>
                        <th className="py-3 px-2 sm:px-4 text-left text-xs font-semibold">#</th>
                        <th className="py-3 px-2 sm:px-4 text-left text-xs font-semibold whitespace-nowrap">Student ID</th>
                        <th className="py-3 px-2 sm:px-4 text-left text-xs font-semibold">Name</th>
                        <th className="py-3 px-2 sm:px-4 text-left text-xs font-semibold">Class</th>
                        <th className="py-3 px-2 sm:px-4 text-left text-xs font-semibold">Date</th>
                        <th className="py-3 px-2 sm:px-4 text-left text-xs font-semibold whitespace-nowrap">Payment ID</th>
                        <th className="py-3 px-2 sm:px-4 text-left text-xs font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showFilteredData?.map((student, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100"
                        >
                          <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">{index + 1}</td>
                          <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#c61d23]">
                            {student?.StudentsId}
                          </td>
                          <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium">{student?.studentName}</td>
                          <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">{student?.classForAdmission}</td>
                          <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">
                            {dateFormatting(student?.createdAt?.split("T")[0])}
                          </td>
                          <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">{student?.paymentId}</td>
                          <td className="py-3 px-2 sm:px-4">
                            <button
                              onClick={() => fetchStudentDetails(student.student_id)}
                              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded transition-all active:scale-95"
                            >
                              <Eye size={14} />
                              <span className="hidden sm:inline">View</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {showFilteredData?.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <FileText size={48} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No data found matching your filters</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Paginated List */}
          {contactNumber && (
            <PaginatedList
              apiEndpoint="/adminData/getData"
              queryParams={{ contactNumber }}
              renderItem={renderStudentCard}
              itemsPerPage={1}
              handleCardClick={(student) => {
                const basic = student.basicDetails || {};
                const batch = student.batchDetails || {};
                const family = student.familyDetails || {};
                handleCardClick(student, basic, batch, family);
              }}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#c61d23] to-[#a01818] text-white p-4 sm:p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold">Student Details</h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Student Name</p>
                    <p className="text-sm font-semibold">{selectedStudent.studentName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm font-semibold">{selectedStudent.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Contact Number</p>
                    <p className="text-sm font-semibold">{selectedStudent.contactNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Father's Name</p>
                    <p className="text-sm font-semibold">{selectedStudent.FatherName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Father Contact</p>
                    <p className="text-sm font-semibold">{selectedStudent.FatherContactNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Briefcase size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Father Occupation</p>
                    <p className="text-sm font-semibold">{selectedStudent.FatherOccupation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Mother's Name</p>
                    <p className="text-sm font-semibold">{selectedStudent.MotherName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Mother Contact</p>
                    <p className="text-sm font-semibold">{selectedStudent.MotherContactNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Briefcase size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Mother Occupation</p>
                    <p className="text-sm font-semibold">{selectedStudent.MotherOccupation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <GraduationCap size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Class for Admission</p>
                    <p className="text-sm font-semibold">{selectedStudent.classForAdmission}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <GraduationCap size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Subject Combination</p>
                    <p className="text-sm font-semibold">{selectedStudent.program}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Exam Name</p>
                    <p className="text-sm font-semibold">{selectedStudent.examName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Exam Date</p>
                    <p className="text-sm font-semibold">{selectedStudent.examDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Date of Birth</p>
                    <p className="text-sm font-semibold">{convertToDate(selectedStudent.dob)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar size={18} className="text-[#c61d23] mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Created At</p>
                    <p className="text-sm font-semibold">{convertToDate(selectedStudent.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Profile Picture and Admit Card */}
              {(selectedStudent.profilePicture || selectedStudent.admitCard) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                  {selectedStudent.profilePicture && (
                    <button
                      onClick={() => onClickShowImage(selectedStudent.profilePicture)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 text-sm"
                    >
                      <ImageIcon size={18} />
                      View Profile Picture
                    </button>
                  )}

                  {selectedStudent.admitCard && (
                    <button
                      onClick={() => window.open(selectedStudent.admitCard, "_blank")}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 text-sm"
                    >
                      <CreditCard size={18} />
                      View Admit Card
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-2xl border-t">
              <button
                onClick={closeModal}
                className="w-full px-4 py-3 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {showImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="relative max-w-4xl w-full">
            <img
              src={showImageUrl}
              alt="Profile"
              className="w-full h-auto rounded-lg shadow-2xl max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setShowImage(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-lg"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Debounce utility function
function debounce(func, delay) {
  let timeoutId;
  let abortController;

  return function (...args) {
    clearTimeout(timeoutId);
    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();
    const signal = abortController.signal;

    timeoutId = setTimeout(() => {
      func.apply(this, [...args, signal]);
    }, delay);
  };
}

export default SdatData;