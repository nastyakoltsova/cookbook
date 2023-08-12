const React = require('react');

module.exports = function NavBar({ user }) {
  return (
    <nav className="bg-primary-200 shadow-lg text-secondary-700 border-gray-200 dark:bg-gray-900 dark:border-gray-700 font-display">
      <div className="max-w-screen-xl flex flex-wrap h-24 items-center justify-between mx-auto p-2">
        <a href="/" className="flex items-center">
          <img
            src="/assets/logo2.svg"
            className="h-20 block"
            alt="Flowbite Logo"
          />
          <span className="self-center text-3xl whitespace-nowrap dark:text-white">
            Easy to cook
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex hover:bg-primary-200 flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="text-3xl bg-primary-200 flex items-center justify-between w-full py-2 pl-3 pr-4 text-secondary-700 rounded hover:text-secondary-700 md:hover:bg-transparent md:border-0 md:hover:text-secondary-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Menu
                <svg
                  className="w-5 h-5 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className=" z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                {user ? (
                  <ul
                    className="py-2 text-xl text-gray-700 dark:text-gray-400 text-center"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <a
                        href="/favourites"
                        className="block  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Favorite
                      </a>
                    </li>
                    <li>
                      <a
                        href="/login/logout"
                        className="block  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul
                    className="py-2 text-xl text-gray-700 dark:text-gray-400 text-center"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <a
                        href="/login"
                        className="block  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Login
                      </a>
                    </li>
                    <li>
                      <a
                        href="/login/registration"
                        className="block  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Registration
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js" /> */}
    </nav>
  );
};
