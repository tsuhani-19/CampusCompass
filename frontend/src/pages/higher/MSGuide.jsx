import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const resources = [
  { title: "DAAD Germany Scholarships", link: "https://www.daad.de/en/" },
  { title: "Study in USA - EducationUSA", link: "https://educationusa.state.gov/" },
  { title: "Masters Portal Europe", link: "https://www.mastersportal.com/" },
  { title: "GRE Preparation (ETS Official)", link: "https://www.ets.org/gre/" },
  { title: "IELTS Prep Resources", link: "https://www.ielts.org/" },
  { title: "SOP & LOR Guidance", link: "https://leverageedu.com/blog/sop-sample/" },
];

const MSGuide = () => {
  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center mb-8 text-gray-900"
        >
          MS Abroad Preparation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-lg text-center text-gray-600 mb-12"
        >
          Free resources and guidance for pursuing MS abroad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {resources.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-lg shadow-md text-center text-gray-900 font-semibold border border-gray-200 transform transition duration-300 hover:shadow-xl"
            >
              {item.title}
            </motion.a>
          ))}
        </motion.div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">MS Preparation Checklist</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Choose your specialization and target countries.</li>
            <li>Prepare and appear for GRE & IELTS/TOEFL.</li>
            <li>Shortlist universities based on your profile.</li>
            <li>Draft SOP, LORs, and update your resume.</li>
            <li>Apply before deadlines and track scholarship opportunities.</li>
          </ul>
        </div>

        <div className="w-full max-w-4xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">MS 2025 Timeline</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
          >
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-gray-900 font-bold">Start GRE/IELTS Prep</h3>
                <p className="text-gray-600">May - July 2024</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-gray-900 font-bold">University Shortlisting & SOP Draft</h3>
                <p className="text-gray-600">August - September 2024</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-gray-900 font-bold">Application Deadlines</h3>
                <p className="text-gray-600">October - December 2024</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MSGuide; 