import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const downloadExcel = (showFilteredData) => {
  if (!showFilteredData || showFilteredData.length === 0) {
    alert("No data to export!");
    return;
  }

  // Helper function to format date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  console.log("showFilteredData", showFilteredData);

  // Pick and format fields to export
  const filteredExportData = showFilteredData.map((student) => ({
    Name: student.studentName,
    "Father Name": student.fatherName,
    "Enquiry Number": student.enquiryNumber,
    Program: student.program,
    Class: student.courseOfIntrested,
    "Created At": formatDate(student.createdAt),
    "Father Contact": student.fatherContactNumber,
    "Student Contact": student.studentContact
  }));

  const worksheet = XLSX.utils.json_to_sheet(filteredExportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "enquiry_filtered_data.xlsx");
};
