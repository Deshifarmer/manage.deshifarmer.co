import { useState } from "react";

const Demo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/1698487/pexels-photo-1698487.jpeg?auto=compress&cs=tinysrgb&w=1600"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-[#00001A] bg-opacity-[0.3] h-[872px]">
          <div className="px-4 flex justify-between items-center py-6 mx-auto lg:py-8 sm:max-w-xl md:max-w-full lg:max-w-screen-2xl md:px-24 lg:px-8">
            <h6 className="text-white">RMG Directory</h6>
            <div className="flex gap-10 items-center">
              <div>
                <span className="text-white">Support</span>
              </div>
              <div>
                <button
                  href="#"
                  class="rounded-xl bg-[#FE823A] px-6 py-3 text-sm font-semibold text-white shadow-xl hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  + List Your Business
                </button>
              </div>
            </div>
          </div>
          <div className="px-4 py-6 mx-auto lg:py-8 sm:max-w-xl md:max-w-full lg:max-w-screen md:px-24 lg:px-8 bg-slate-900 opacity-75 ">
            <div className="relative flex items-center justify-between lg:justify-center lg:space-x-16">
              <ul className="flex items-center hidden space-x-20 lg:flex">
                <li>
                  <a
                    href="/"
                    aria-label="Our product"
                    title="Our product"
                    className="font-light tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Accessories
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    aria-label="Our product"
                    title="Our product"
                    className="font-light tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    BSCI Companies
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    aria-label="Product pricing"
                    title="Product pricing"
                    className="font-light tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Dying Factories
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    aria-label="Product pricing"
                    title="Product pricing"
                    className="font-light tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Energy
                  </a>
                </li>
              </ul>

              <ul className="flex items-center hidden space-x-20 lg:flex">
                <li>
                  <a
                    href="/"
                    aria-label="About us"
                    title="About us"
                    className="font-light tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Freight Forwarders
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    aria-label="Sign in"
                    title="Sign in"
                    className="font-light tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Knitting
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    aria-label="Sign up"
                    title="Sign up"
                    className="font-light tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Logistics
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    aria-label="Sign up"
                    title="Sign up"
                    className="font-light tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    See More
                  </a>
                </li>
              </ul>
              <div className="lg:hidden">
                <button
                  aria-label="Open Menu"
                  title="Open Menu"
                  className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                    />
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute top-0 left-0 w-full">
                    <div className="p-5 bg-white border rounded shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <a
                            href="/"
                            aria-label="Company"
                            title="Company"
                            className="inline-flex items-center"
                          >
                            <svg
                              className="w-8 text-deep-purple-accent-400"
                              viewBox="0 0 24 24"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              stroke="currentColor"
                              fill="none"
                            >
                              <rect x="3" y="1" width="7" height="12" />
                              <rect x="3" y="17" width="7" height="6" />
                              <rect x="14" y="1" width="7" height="6" />
                              <rect x="14" y="11" width="7" height="12" />
                            </svg>
                            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                              Company
                            </span>
                          </a>
                        </div>
                        <div>
                          <button
                            aria-label="Close Menu"
                            title="Close Menu"
                            className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <svg
                              className="w-5 text-gray-600"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <nav>
                        <ul className="space-y-4">
                          <li>
                            <a
                              href="/"
                              aria-label="Our product"
                              title="Our product"
                              className="font-light tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              Product
                            </a>
                          </li>
                          <li>
                            <a
                              href="/"
                              aria-label="Our product"
                              title="Our product"
                              className="font-light tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              Features
                            </a>
                          </li>
                          <li>
                            <a
                              href="/"
                              aria-label="Product pricing"
                              title="Product pricing"
                              className="font-light tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              Pricing
                            </a>
                          </li>
                          <li>
                            <a
                              href="/"
                              aria-label="About us"
                              title="About us"
                              className="font-light tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              About us
                            </a>
                          </li>
                          <li>
                            <a
                              href="/"
                              aria-label="Sign in"
                              title="Sign in"
                              className="font-light tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              Sign in
                            </a>
                          </li>
                          <li>
                            <a
                              href="/"
                              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                              aria-label="Sign up"
                              title="Sign up"
                            >
                              Sign up
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl">
              <div className="text-center">
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                  <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                      Brand new
                    </p>
                  </div>
                  <h2 className="max-w-full mb-6 font-bold leading-none tracking-tight  sm:text-4xl md:mx-auto">
                    <span className="text-white text-4xl">Discover</span>{" "}
                    <span className="text-[#FE823A] text-4xl">
                      Your Business
                    </span>{" "}
                    <span className="text-white text-4xl">from Right Here</span>
                  </h2>
                  <p className="text-white">
                    Business directory for the RMG industry of Bangladesh and
                    its beneficiaries
                  </p>
                </div>
                <div class="w-full max-w-full mt-60 mx-auto  py-px bg-white  border rounded-xl dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40">
                  <form class="flex flex-col md:flex-row items-center">
                    <input
                      type="text"
                      placeholder="Type or search business name or license number"
                      class="flex-1 h-10 px-4 p m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
                    />

                    <button
                      type="button"
                      class="h-8 py-1 px-8 text-xs m-1 mr-4 text-white transition-colors duration-300 transform bg-[#FE823A] rounded-xl hover:bg-[#FE823A] focus:outline-none focus:bg-blue-[#FE823A]"
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
