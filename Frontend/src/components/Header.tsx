import { Menu, X, ChevronRight, Flame, Code, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// @ts-ignore
import { useAuth } from "../context/AuthContext";
// @ts-ignore
import { courseService } from "../services/courseService";
// @ts-ignore
import { categoryService } from "../services/categoryService";

// Social media icons
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

interface Course {
  _id: string;
  title: string;
  name?: string;
  description: string;
  category: {
    _id: string;
    name: string;
  } | string;
}

interface Category {
  _id: string;
  name: string;
  status: string;
}

const navItems = [
  { name: "Summer Internship", path: "/summer-internship" },
  { name: "Hire From Us", path: "/hire-from-us" },
  { name: "Contact Us", path: "/contact-us" },
];
// Order: All Courses → Summer Internship → Hire From Us → Contact Us

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, categoriesRes] = await Promise.all([
        courseService.getAllCourses({ status: 'published', limit: 100 }),
        categoryService.getAllCategories()
      ]);
      setCourses(coursesRes.data?.courses || coursesRes.data || []);
      // Backend returns data directly as array, not data.categories
      const allCategories = categoriesRes.data || [];
      const activeCategories = Array.isArray(allCategories)
        ? allCategories.filter((c: Category) => c.status === 'Active')
        : [];
      setCategories(activeCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 1);
  };

  const getCategoryId = (course: Course) => {
    if (typeof course.category === 'object' && course.category !== null) {
      return course.category._id;
    }
    return course.category;
  };

  // Get courses for active category
  const activeCourses = activeCategory === "all"
    ? courses.slice(0, 9)
    : courses.filter((c) => getCategoryId(c) === activeCategory).slice(0, 9);

  return (
    <header className="w-full">
      {/* Top Contact Bar */}
      {/* <div className="w-full bg-[#FA8128] text-white text-sm py-2">
        <div className="w-full px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-1 md:gap-2">
            <WhatsappIcon />
            <span className="font-medium text-xs sm:text-sm">9686111919</span>
            <span className="hidden sm:inline font-medium text-xs sm:text-sm">9686700500</span>
            <span className="hidden md:inline font-medium">9686800700</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="#" className="hover:opacity-80 transition-opacity"><YoutubeIcon /></a>
            <a href="#" className="hover:opacity-80 transition-opacity"><FacebookIcon /></a>
            <a href="#" className="hover:opacity-80 transition-opacity"><LinkedinIcon /></a>
            <a href="#" className="hover:opacity-80 transition-opacity hidden sm:inline"><TwitterIcon /></a>
            <a href="#" className="hover:opacity-80 transition-opacity hidden sm:inline"><InstagramIcon /></a>
            <a href="#" className="hover:opacity-80 transition-opacity"><WhatsappIcon /></a>
          </div>
        </div>
      </div> */}

      {/* Main Navbar */}
      <nav className="w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 border-b border-orange-100 relative">
        <div className="max-w-[1280px] mx-auto px-1 md:px-8 flex items-center justify-between py-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/techfox_logo_transparent.png"
              alt="TechFox"
              className="h-20 sm:h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 text-[0.85rem] font-medium text-gray-700">
            {/* All Courses with Dropdown */}
            <li className="relative">
              <button
                onClick={() => setCoursesOpen(!coursesOpen)}
                className={`flex items-center gap-1 transition-colors duration-200 py-2 border-b-2 ${
                  coursesOpen || location.pathname === "/courses" || location.pathname.startsWith("/course")
                    ? "text-[#FA8128] border-[#FA8128] font-semibold"
                    : "border-transparent hover:text-[#FA8128]"
                }`}
              >
                All Courses
                <ChevronRight size={16} className={`transition-transform ${coursesOpen ? "rotate-90" : ""}`} />
              </button>
              {coursesOpen && (
                <div className="absolute top-full -left-4 transform translate-y-2">
                  <div className="w-3 h-3 bg-[#FA8128] rotate-45 absolute left-8 -top-1.5"></div>
                </div>
              )}
            </li>

            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`transition-colors duration-200 py-2 border-b-2 ${
                    location.pathname === item.path
                      ? "text-[#FA8128] border-[#FA8128] font-semibold"
                      : "border-transparent hover:text-[#FA8128]"
                  }`}
                  onClick={() => setCoursesOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Section - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-9 h-9 bg-[#FA8128] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(user.name)}
                  </div>
                  <span className="font-medium text-gray-700 text-sm">{user.name}</span>
                </button>

                {profileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                      <p className="text-xs text-gray-400 mt-1 capitalize">Role: {user.role}</p>
                    </div>
                    <Link
                      to={user.role === 'admin' ? '/admin' : '/student'}
                      onClick={() => setProfileOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      {user.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#FA8128] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#FA8128] transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-gray-700 hover:text-[#FA8128] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mega Menu Dropdown */}
        {coursesOpen && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 z-50 px-8"
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="flex max-w-[1100px] mx-auto bg-white shadow-xl border-t-4 border-[#FA8128] rounded-b-lg overflow-hidden">
              {/* Left Sidebar - Categories */}
              <div className="w-[260px] bg-gray-50 border-r border-gray-200 max-h-[450px] overflow-y-auto">
                {/* All Courses option */}
                <button
                  onMouseEnter={() => setActiveCategory("all")}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm hover:bg-white transition-colors ${
                    activeCategory === "all" ? "bg-white text-[#FA8128] border-r-2 border-[#FA8128]" : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Flame size={18} className={activeCategory === "all" ? "text-[#FA8128]" : "text-gray-500"} />
                    <span className="font-medium">Popular Courses</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>

                {/* Dynamic Categories */}
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onMouseEnter={() => setActiveCategory(category._id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm hover:bg-white transition-colors ${
                      activeCategory === category._id ? "bg-white text-[#FA8128] border-r-2 border-[#FA8128]" : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>

              {/* Right Content - Courses */}
              <div className="flex-1 p-6 min-h-[400px]">
                {activeCategory ? (
                  activeCourses.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {activeCourses.map((course) => (
                        <Link
                          key={course._id}
                          to={`/course/${course._id}`}
                          className="p-4 rounded-lg hover:bg-gray-50 hover:border-2 hover:border-[#FA8128] border-2 border-transparent transition-all duration-200 group"
                          onClick={() => {
                            setCoursesOpen(false);
                            window.scrollTo(0, 0);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <Code size={16} className="text-[#FA8128]" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 text-sm group-hover:text-[#FA8128] transition-colors">
                                {course.title || course.name}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                                {course.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-gray-500 text-sm">No courses in this category yet.</p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-500 text-sm">Please select a category</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <ul className="flex flex-col text-base font-medium p-4 gap-1">
              <li>
                <Link
                  to="/courses"
                  className="block py-3 px-4 hover:bg-orange-50 hover:text-[#FA8128] rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  All Courses
                </Link>
              </li>
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="block py-3 px-4 hover:bg-orange-50 hover:text-[#FA8128] rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {/* Mobile Auth */}
              {user ? (
                <>
                  <li className="border-t border-gray-200 mt-2 pt-2">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-10 h-10 bg-[#FA8128] rounded-full flex items-center justify-center text-white font-semibold">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      to={user.role === 'admin' ? '/admin' : '/student'}
                      className="w-full flex items-center gap-2 py-3 px-4 text-[#FA8128] hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <LayoutDashboard size={18} />
                      {user.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="border-t border-gray-200 mt-2 pt-2">
                  <Link
                    to="/login"
                    className="block bg-[#FA8128] text-white text-center py-3 px-4 rounded-lg hover:bg-[#FA8128] transition-colors font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Backdrop */}
      {coursesOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setCoursesOpen(false)}
          style={{ top: "120px" }}
        ></div>
      )}
    </header>
  );
}

export default Header;
