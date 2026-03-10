import { motion } from "framer-motion";

function WhyChooseUs() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-white">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10 sm:mb-12 md:mb-16 italic">
          Why Choose TechFox
        </h2>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
              Placement Assistance
            </h3>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
              Our dedicated placement cell works tirelessly to connect our
              students with leading IT companies for job opportunities. With
              a strong network of corporate partners and frequent
              recruitment drives to ensure maximum exposure for our
              students, we achieve outstanding placement success.
            </p>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FA8128] italic">
                  3.1Lac+
                </p>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                  Students Placed<br />in Total
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FA8128] italic">
                  4,100+
                </p>
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                  Multinational<br />companies hire from us
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center lg:justify-start">
              <motion.button
                className="bg-[#FA8128] hover:bg-[#FA8128] text-white font-semibold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Placements
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop"
              alt="Professional"
              className="w-full max-w-[300px] sm:max-w-md h-[300px] sm:h-[350px] md:h-[400px] rounded-lg object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
