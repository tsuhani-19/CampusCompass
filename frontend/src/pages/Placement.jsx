import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { companiesData } from "../data/companiesData"; // Import your data

// Reusable component to display company details
const CompanyDetails = ({ company }) => {
  if (!company) {
    return <div className="text-center p-10 text-red-500 text-lg">Company not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-24">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">{company.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
          <p><strong>Category:</strong> {company.category}</p>
          <p><strong>Package:</strong> {company.package}</p>
          <p><strong>Branches Eligible:</strong> {company.branches.join(", ")}</p>
          <p><strong>Job Role:</strong> {company.jobRole}</p>
          <p><strong>Eligible Students:</strong> {company.eligibleStudents}</p>
          <p><strong>Appeared Students:</strong> {company.appearedStudents}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">Required Skills</h3>
          <ul className="list-disc pl-6 space-y-2">
            {company.requiredSkills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Placement = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyDetails, setCompanyDetails] = useState(null);
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const name = e.target.value;
    setSelectedCompany(name);

    // Find the selected company data
    const selectedData = companiesData.find((company) => company.name === name);
    setCompanyDetails(selectedData);

    navigate(`/placement/details/${encodeURIComponent(name)}`);

  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between p-8">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center mb-12 text-gray-900"
        >
          Placement Opportunities
        </motion.h1>

        {/* Search Bar Section */}
        <div className="flex justify-center mb-12">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <label htmlFor="companySearch" className="text-lg font-medium text-gray-700">
              Search for a Company
            </label>
            <div className="relative z-10">
              <select
                id="companySearch"
                value={selectedCompany}
                onChange={handleSelectChange}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 appearance-none"
              >
                <option value="" disabled>
                  Select a company
                </option>
                {companiesData.map((company, index) => (
                  <option key={index} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Details */}
            {companyDetails && <CompanyDetails company={companyDetails} />}
          </div>
        </div>

        {/* Company Logos Carousel */}
        {/* Add your carousel code here */}
      </div>
    </div>
  );
};

export default Placement;