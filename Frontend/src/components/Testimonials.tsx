import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, X } from "lucide-react";
import { testimonialService } from "../services/testimonialService";

interface Testimonial {
  _id: string;
  company: string;
  shortText: string;
  fullText: string;
  contactPerson: string;
  designation: string;
  rating: number;
}

const staticTestimonials: Testimonial[] = [
  {
    _id: "t1",
    company: "Infosys",
    contactPerson: "Rahul Sharma",
    designation: "HR Manager",
    rating: 5,
    shortText: "TechFox provided us with exceptionally well-trained candidates. Their practical approach to training makes a real difference.",
    fullText: "TechFox provided us with exceptionally well-trained candidates. Their practical approach to training makes a real difference in how quickly our new hires contribute to real projects. The students had strong fundamentals and hands-on experience that reduced our onboarding time significantly. We highly recommend TechFox to any company looking for skilled tech talent.",
  },
  {
    _id: "t2",
    company: "Wipro Technologies",
    contactPerson: "Priya Nair",
    designation: "Talent Acquisition Lead",
    rating: 5,
    shortText: "We've hired multiple TechFox graduates and every single one has exceeded our expectations. Their training quality is top-notch.",
    fullText: "We've hired multiple TechFox graduates and every single one has exceeded our expectations. Their training quality is top-notch. Students come in with real project experience, problem-solving skills, and a professional attitude. TechFox is our go-to partner for fresh tech talent.",
  },
  {
    _id: "t3",
    company: "TCS",
    contactPerson: "Amit Verma",
    designation: "Technical Recruiter",
    rating: 5,
    shortText: "The students from TechFox are interview-ready from day one. Their confidence and technical skills stand out clearly.",
    fullText: "The students from TechFox are interview-ready from day one. Their confidence and technical skills stand out clearly compared to candidates from other institutes. The placement team at TechFox is extremely cooperative and professional. We look forward to continuing this partnership.",
  },
  {
    _id: "t4",
    company: "Cognizant",
    contactPerson: "Sneha Kulkarni",
    designation: "Campus Hiring Manager",
    rating: 4,
    shortText: "TechFox graduates bring a strong mix of technical knowledge and soft skills. They adapt quickly and perform well in teams.",
    fullText: "TechFox graduates bring a strong mix of technical knowledge and soft skills. They adapt quickly and perform well in teams. We were particularly impressed by their understanding of real-world tools and workflows. TechFox is doing great work in bridging the gap between academia and industry.",
  },
  {
    _id: "t5",
    company: "HCL Technologies",
    contactPerson: "Deepak Menon",
    designation: "Engineering Manager",
    rating: 5,
    shortText: "Partnering with TechFox has been a great experience. The quality of talent they produce is consistent and impressive.",
    fullText: "Partnering with TechFox has been a great experience. The quality of talent they produce is consistent and impressive. Their students show up with hands-on project portfolios, clear communication skills, and a strong desire to grow. We have onboarded several TechFox alumni and are very satisfied with the results.",
  },
];

function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await testimonialService.getActiveTestimonials();
      const data = response.data || [];
      setTestimonials(data.length > 0 ? data : staticTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <>
      <section className="w-full py-12 sm:py-14 md:py-16 bg-gray-50">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-3 sm:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-center text-gray-500 text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto">
            Hear from companies that have transformed their teams with our training programs
          </p>

          <div className="relative">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-10 h-10 border-4 border-[#FA8128] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 text-gray-500 text-sm">Loading testimonials...</p>
              </div>
            ) : (
              <>
                {/* Left Arrow */}
                <button
                  onClick={scrollLeft}
                  className="hidden sm:block absolute left-0 sm:-left-2 md:-left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-200 p-1.5 sm:p-2 rounded-full z-10 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="text-gray-600" size={18} />
                </button>

                {/* Slider */}
                <div
                  ref={sliderRef}
                  className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-1 sm:px-4 py-4 scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {testimonials.map((item) => (
                    <div
                      key={item._id}
                      className="min-w-[280px] sm:min-w-[300px] max-w-[280px] sm:max-w-[300px] bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6 hover:shadow-lg transition-shadow"
                    >
                      {/* Company Initial */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-lg font-bold">
                          {item.company.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                            {item.company}
                          </h3>
                          <p className="text-xs text-gray-500">{item.contactPerson}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-0.5 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <div className="relative">
                        <Quote size={20} className="text-[#FA8128]/20 absolute -top-1 -left-1" />
                        <p className="text-gray-600 text-sm leading-relaxed pl-5 line-clamp-3">
                          {item.shortText}
                        </p>
                      </div>

                      {/* View More */}
                      <button
                        onClick={() => setSelectedTestimonial(item)}
                        className="mt-4 text-[#FA8128] hover:text-[#FA8128] text-xs font-medium transition-colors"
                      >
                        Read Full Testimonial →
                      </button>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={scrollRight}
                  className="hidden sm:block absolute right-0 sm:-right-2 md:-right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-200 p-1.5 sm:p-2 rounded-full z-10 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="text-gray-600" size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Testimonial Detail Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg sm:rounded-2xl shadow-2xl z-50 w-[95%] sm:w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#FA8128] to-[#FA8128] p-4 sm:p-6 rounded-t-lg sm:rounded-t-2xl">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
                    {selectedTestimonial.company.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                      {selectedTestimonial.company}
                    </h2>
                    <p className="text-orange-100 text-xs sm:text-sm mt-1">Client Testimonial</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <Quote size={32} className="sm:w-10 sm:h-10 text-[#FA8128]/20" />
                </div>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center italic mb-4 sm:mb-6">
                  "{selectedTestimonial.fullText}"
                </p>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`sm:w-5 sm:h-5 ${i < selectedTestimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>

                {/* Contact Person */}
                <div className="text-center border-t border-gray-100 pt-3 sm:pt-4">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {selectedTestimonial.contactPerson}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {selectedTestimonial.designation}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Testimonials;
