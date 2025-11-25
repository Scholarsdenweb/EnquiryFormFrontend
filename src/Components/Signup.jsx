// import React from "react";
// import SignupForm from "./SignupForm";
// import SignupDetailsPage from "./SignupDetailsPage";
// import scholarsDenLogo from "../assets/scholarsDenLogo.png";
// import FormHeader from "./FormHeader";
// import { User } from "lucide-react";

// const Signup = () => {
//   return (
//     <div className="min-h-screen w-full max-w-[768px] mx-auto bg-gradient-to-br from-[#fdf5f6] via-white to-[#f5eff0]">
//       {/* Signup Details Page (Top Section) */}
//       <div className="flex px-4 md:px-8 py-2">
//         <FormHeader
//           title="Enquiry Form"
//           subtitle="Start your journey with us"
//           icon={User}
//         />{" "}
//       </div>

//       {/* Signup Form (Middle Section) */}
//       <div className="flex">
//         <SignupForm />
//       </div>

//       {/* Footer (Logo at Bottom) */}
//       {/* <div className="flex justify-center items-center py-4">
//         <img className="w-24" src={scholarsDenLogo} alt="Scholars Den Logo" />
//       </div> */}
//     </div>
//   );
// };

// export default Signup;

import React from "react";
import SignupForm from "./SignupForm";
import SignupDetailsPage from "./SignupDetailsPage";
import scholarsDenLogo from "../assets/scholarsDenLogo.png";
import FormHeader from "./FormHeader";
import { GraduationCap, Phone } from "lucide-react";
import SignupHeader from "./SignupHeader";

const Signup = () => {
  return (
    <div className="min-h-screen w-full max-w-[768px] mx-auto bg-gradient-to-br from-[#fdf5f6] via-white to-[#f5eff0]">
      <SignupHeader />

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none max-w-[768px] mx-auto">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-[#ffdd00]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-[#c61d23]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Signup Form */}
      <SignupForm />

      {/* Footer Logo */}
      {/* <div className="flex justify-center items-center py-6 sm:py-8">
        <img
          className="w-20 sm:w-24 opacity-60 hover:opacity-100 transition-opacity"
          src={scholarsDenLogo}
          alt="Scholars Den Logo"
        />
      </div> */}
    </div>
  );
};

export default Signup;

// import React, { useState } from 'react';
// import { User, Phone, Mail, BookOpen, MapPin, GraduationCap } from 'lucide-react';

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     course: '',
//     city: '',
//     experience: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = () => {
//     console.log('Form submitted:', formData);
//     alert('Thank you for your enquiry! We will contact you soon.');
//   };

//   return (
//     <div className="space-y-6">
//       {/* Full Name */}
//       <div className="relative">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Full Name *
//         </label>
//         <div className="relative">
//           <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//             className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
//             placeholder="Enter your full name"
//           />
//         </div>
//       </div>

//       {/* Email */}
//       <div className="relative">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Email Address *
//         </label>
//         <div className="relative">
//           <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
//             placeholder="your.email@example.com"
//           />
//         </div>
//       </div>

//       {/* Phone */}
//       <div className="relative">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Phone Number *
//         </label>
//         <div className="relative">
//           <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
//             placeholder="+91 XXXXX XXXXX"
//           />
//         </div>
//       </div>

//       {/* Course */}
//       <div className="relative">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Course of Interest *
//         </label>
//         <div className="relative">
//           <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <select
//             name="course"
//             value={formData.course}
//             onChange={handleChange}
//             required
//             className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none appearance-none bg-white"
//           >
//             <option value="">Select a course</option>
//             <option value="web-development">Web Development</option>
//             <option value="data-science">Data Science</option>
//             <option value="mobile-development">Mobile Development</option>
//             <option value="ui-ux-design">UI/UX Design</option>
//             <option value="digital-marketing">Digital Marketing</option>
//           </select>
//         </div>
//       </div>

//       {/* City */}
//       <div className="relative">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           City *
//         </label>
//         <div className="relative">
//           <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             required
//             className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
//             placeholder="Enter your city"
//           />
//         </div>
//       </div>

//       {/* Experience */}
//       <div className="relative">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Experience Level *
//         </label>
//         <div className="relative">
//           <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <select
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             required
//             className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none appearance-none bg-white"
//           >
//             <option value="">Select experience level</option>
//             <option value="beginner">Beginner</option>
//             <option value="intermediate">Intermediate</option>
//             <option value="advanced">Advanced</option>
//             <option value="professional">Professional</option>
//           </select>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
//       >
//         Submit Enquiry
//       </button>

//       <p className="text-center text-sm text-gray-500">
//         Already have an account?{' '}
//         <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
//           Login here
//         </a>
//       </p>
//     </div>
//   );
// };

// const Signup = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 relative overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
//       <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
//         {/* Header */}
//         <SignupHeader />

//         {/* Form Card */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-sm bg-white/95">
//           <SignupForm />
//         </div>

//         {/* Footer Logo */}

//       </div>
//     </div>
//   );
// };

// export default Signup;
