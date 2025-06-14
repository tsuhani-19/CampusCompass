// src/pages/Details.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { companiesData } from "../data/companiesData";

const Details = () => {
  const { companyName } = useParams(); // e.g., Seclore
  const company = companiesData.find((c) => c.name === companyName);

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

export default Details;