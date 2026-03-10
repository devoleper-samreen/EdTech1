import { useState } from "react";
import { motion } from "framer-motion";
import CallbackModal from "./CallbackModal";
//className='max-w-[1180px] w-full mx-auto'

function Hero() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  return (
    <section className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-10 min-h-[calc(100vh-80px)] sm:min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden pt-0" >
      {/* Background decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl"></div>

      {/* Wavy lines decoration */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 400C100 300 300 500 500 400C700 300 900 500 1100 400C1300 300 1500 500 1700 400" stroke="#FA8128" strokeWidth="2" fill="none"/>
          <path d="M-100 500C100 400 300 600 500 500C700 400 900 600 1100 500C1300 400 1500 600 1700 500" stroke="#FA8128" strokeWidth="2" fill="none"/>
          <path d="M-100 600C100 500 300 700 500 600C700 500 900 700 1100 600C1300 500 1500 700 1700 600" stroke="#FA8128" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      <div className="w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            className="flex-1 max-w-xl text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              <span className="italic font-light">Largest Software</span>
              <br />
              <span className="italic text-[#FA8128] relative inline-block mt-2">
                Training Organization
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#FA8128] rounded-full"></span>
              </span>
            </h1>

            <p className="mt-6 sm:mt-8 text-gray-600 text-sm sm:text-md leading-relaxed">
              World's premier software training institution, dedicated to bridging
              the gap between industry demands and academic curricula. With
              centers worldwide, we provide a platform for young minds to
              cultivate successful careers.
            </p>

            <motion.button
              onClick={() => setIsCallbackOpen(true)}
              className="mt-4 sm:mt-6 bg-[#FA8128] hover:bg-[#FA8128] text-white font-semibold py-2.5 sm:py-3 px-8 sm:px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Demo
            </motion.button>
          </motion.div>

          {/* Callback Modal */}
          <CallbackModal
            isOpen={isCallbackOpen}
            onClose={() => setIsCallbackOpen(false)}
          />

          {/* Right Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-start w-full -ml-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="/texfox_transparent.png"
              alt="Software Training Mind Map"
              className="w-full max-w-[300px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
