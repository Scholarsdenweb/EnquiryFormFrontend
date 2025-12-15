// import { useState } from "react";

import "./App.css";
import Signup from "./Components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EnquiryForm from "./Components/EnquiryForm";
import TakenBy from "./Components/TakenBy";
import { Provider } from "react-redux";
import store from "./../redux/store";
import FormSubmitted from "./Components/FormSumited";
import Spinner from "./Components/Spinner";
import AdminDashboard from "./Components/AdminDashboard";
import FirstPage from "./Components/FirstPage";
import FirstPageContant from "./Components/FirstPageContant";
import SdatData from "./Components/SdatData";
import Pagination from "./Components/Pagination";
import PrivateRoute from "./Components/PrivateRoute";
import AdminLogin from "./Components/AdminLogin";
import NotFound from "./Components/NotFound";
// import { useSelector } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/firstPage" element={<FirstPage />} />
            <Route path="/enquiryform" element={<EnquiryForm />} />
            <Route path="/enquiryform/takenBy" element={<TakenBy />} />
            <Route path="/FormSubmitted" element={<FormSubmitted />} />
            <Route path="/adminSignup" element={<AdminLogin />} />
            {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
            <Route
              path="/adminDashboard"
              element={<PrivateRoute component={AdminDashboard} />}
            />
            <Route
              path="/sdatForm"
              element={<PrivateRoute component={SdatData} />}
            />
            <Route
              path="/pagination"
              element={<PrivateRoute component={Pagination} />}
            />
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
