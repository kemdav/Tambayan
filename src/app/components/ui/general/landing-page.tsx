"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/app/components/ui/general/button";
import { motion, AnimatePresence } from "framer-motion";

// --- Carousel Component ---
const Carousel = () => {
  const images = [
    "/kemdavid.png",
    "/kemdavid.png",
    "/kemdavid.png",
    "/kemdavid.png",
    "/kemdavid.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -60, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="w-full h-[500px] relative rounded-lg overflow-hidden"
        >
          <Image
            src={images[currentIndex]}
            alt={`Carousel image ${currentIndex + 1}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>
      <motion.button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full z-10 text-gray-800"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </motion.button>
      <motion.button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full z-10 text-gray-800"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default function LandingPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggeredItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Animation variants for scroll effects
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: "#FAF7F2", fontFamily: "Poppins, sans-serif" }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeUpVariant}
        className="max-w-7xl mx-auto pt-5 pb-8 px-4 relative"
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="text-xs tracking-widest mb-1"
            style={{ color: "#000000", fontWeight: 300, letterSpacing: 1 }}
          >
            UNITING ALL SCHOOL ORGANIZATION IN ONE PLACE
          </div>
          <div
            className="text-2xl md:text-3xl italic"
            style={{ color: "#347259", fontWeight: 500, marginBottom: 0 }}
          >
            Introducing your all access org hub
          </div>
          <div
            className="relative flex items-center justify-center w-full"
            style={{ minHeight: "10rem", marginTop: 0 }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
              style={{
                zIndex: 0,
                opacity: 0.1,
                width: "22rem",
                height: "22rem",
                maxWidth: "90vw",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity }}
            >
              <Image
                src="/logo.svg"
                alt="Logo background"
                fill
                style={{ objectFit: "contain" }}
              />
            </motion.div>
            <motion.span
              style={{
                fontFamily: "Jaro, sans-serif",
                fontSize: "clamp(5rem, 16vw, 12rem)",
                fontWeight: 400,
                letterSpacing: 2,
                WebkitTextStroke: "2px #222",
                color: "transparent",
                textShadow: "0 2px 0 #fff",
                lineHeight: 1,
                zIndex: 1,
                marginTop: 0,
              }}
              className="select-none relative"
            >
              <span
                style={{
                  color: "#28302D",
                  WebkitTextStroke: "0",
                  textShadow: "none",
                }}
              >
                {" "}
                T
              </span>
              AMBAYAN
            </motion.span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeUpVariant}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center w-full mt-8 px-4 gap-8"
      >
        <motion.div
          variants={fadeUpVariant}
          className="flex-shrink-0 w-full md:w-[450px] h-[300px] relative"
        >
          <div className="relative bg-[#4B9A81] rounded-2xl shadow-xl w-full h-full">
            <div className="flex items-center gap-2 p-4">
              <Image src="/logo.svg" alt="Logo" width={24} height={24} />
              <span
                style={{
                  fontFamily: "Jaro, sans-serif",
                  fontSize: "1.5rem",
                  WebkitTextStroke: "1px #222",
                }}
                className="select-none relative"
              >
                <span
                  style={{
                    color: "#28302D",
                    WebkitTextStroke: "0",
                    textShadow: "none",
                  }}
                >
                  T
                </span>
                <span
                  style={{
                    color: "#fff",
                    WebkitTextStroke: "1px #222",
                    textShadow: "none",
                  }}
                >
                  AMBAYAN
                </span>
              </span>
            </div>
            <div
              className="absolute left-0 bottom-0 w-full rounded-b-2xl"
              style={{ height: "60px", background: "#397C68" }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          className="flex-1 flex flex-col justify-center items-start"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#222] mb-2">
            Helping student{" "}
            <span style={{ color: "#4B9A81" }}>organizations</span> thrive
          </h2>
          <p className="text-gray-500 mb-4 text-base">
            {" "}
            A platform connecting students & orgs in your school{" "}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="navigation" size="lg">
              {" "}
              Register{" "}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeUpVariant}
        className="w-full max-w-[1400px] mx-auto mt-24 px-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Manage events and tasks in{" "}
          <span style={{ color: "#4B9A81" }}>one</span> place
        </h2>
      </motion.div>

      <div className="relative w-full py-16" style={{ background: "#347259" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 items-center"
        >
          <motion.div
            variants={fadeUpVariant}
            className="flex-1 flex items-center justify-center min-h-[400px]"
          >
            <Image
              src="/kemdavid.png"
              alt="Dashboard Screenshot"
              width={500}
              height={500}
              className="rounded-lg shadow-2xl"
              style={{
                objectFit: "contain",
                maxWidth: "80%",
                maxHeight: "450px",
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
              style={{ opacity: 0.08 }}
            >
              <Image
                src="/logo.svg"
                alt="Overlay Logo"
                width={350}
                height={350}
                style={{ objectFit: "contain" }}
              />
            </div>
          </motion.div>
          <motion.div
            className="flex-1 flex flex-col gap-6 justify-center max-w-md"
            variants={staggerContainer}
          >
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
                title: "Event Management",
                desc: "Our membership management software provides a full dashboard and membership approval and payments.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                ),
                title: "Organizations' Merchandise",
                desc: "These are ordered and sold to SGA, which is then paid to the organization. This helps raise the group and the org can generate funds.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Create Organizations",
                desc: "Instantly forming a new group as a student org. It includes setting up leaders, members, and official recognition.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariant}
                className="bg-white rounded-xl shadow-lg p-6 flex items-start text-left gap-4"
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex-shrink-0 text-[#4B9A81]">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* --- New Carousel Section --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeUpVariant}
        className="w-full bg-[#FAF7F2] py-20 relative"
      >
        {/* Random transparent logos as decorative elements */}
        <div className="pointer-events-none select-none absolute inset-0 z-0">
          <Image
            src="/logo.svg"
            alt="logo1"
            width={80}
            height={80}
            style={{
              position: "absolute",
              top: "10%",
              left: "8%",
              opacity: 0.08,
            }}
          />
          <Image
            src="/logo.svg"
            alt="logo2"
            width={120}
            height={120}
            style={{
              position: "absolute",
              top: "60%",
              left: "15%",
              opacity: 0.06,
            }}
          />
          <Image
            src="/logo.svg"
            alt="logo3"
            width={60}
            height={60}
            style={{
              position: "absolute",
              top: "30%",
              right: "10%",
              opacity: 0.07,
            }}
          />
          <Image
            src="/logo.svg"
            alt="logo4"
            width={100}
            height={100}
            style={{
              position: "absolute",
              bottom: "12%",
              right: "18%",
              opacity: 0.05,
            }}
          />
          <Image
            src="/logo.svg"
            alt="logo5"
            width={90}
            height={90}
            style={{
              position: "absolute",
              bottom: "25%",
              left: "40%",
              opacity: 0.06,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Gallery</h2>
          <p className="text-gray-500 mb-10">
            A glimpse into our vibrant community activities.
          </p>
          <Carousel />
        </div>
      </motion.div>

      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeUpVariant}
        className="relative w-full bg-[#28302D] text-gray-300 pt-20 pb-10 mt-[-1px]"
      >
        <div className="absolute right-8 bottom-8 z-10 pointer-events-none select-none">
          <Image
            src="/logo.svg"
            alt="Footer Logo Small"
            width={64}
            height={64}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-6">
            <div className="text-gray-400 text-sm">
              {" "}
              Copyright © 2024 LarkCity & U.R. <br /> All rights reserved.{" "}
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 text-sm">
            <div>
              <div className="font-bold mb-3 text-white">Company</div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-3 text-white">Support</div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="font-bold mb-2 text-white">Stay up to date</div>
            <div className="flex gap-1 bg-white/20 p-1 rounded-md">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent rounded px-3 py-1.5 text-white placeholder-gray-400 focus:outline-none w-full"
              />
              <button className="bg-[#435153] hover:bg-white/20 text-white p-2 rounded-md font-semibold transition-colors flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
