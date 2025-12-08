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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full  ">
      {/* Sidebar */}
      <div className="lg:w-64 w-full bg-gradient-to-b from-[#c61d23] to-[#a01818] shadow-xl lg:h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className=" p-6">
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
              {/* <button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c61d23] to-[#a01818] hover:from-[#b01820] hover:to-[#8f1515] text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                onClick={handleApplyFilters}
              >
                <Filter size={16} />
                Apply Filters
              </button> */}
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
                      <FileText size={48} className=" mb-3 opacity-30" />
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
          <div className="bg-white rounded-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
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
