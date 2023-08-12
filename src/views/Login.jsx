const React = require("react");
const Layout = require("./Layout");

module.exports = function LogIn() {
  return (
    <Layout>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-display text-secondary-700 leading-9 tracking-tight">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form name="logForm" className="space-y-6" action="#" method="POST">
            <div>
              <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold leading-6 text-secondary-700">Forgot password?</a>
                </div> */}
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center text-white border bg-green-700 hover:text-secondary-700 hover:border-secondary-700 hover:bg-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a href="/login/registration" className="font-semibold leading-6 text-secondary-700">  Sign up</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

