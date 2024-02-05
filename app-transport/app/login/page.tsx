import React from "react";
import styles from "./Login.module.css";
import Image from "next/image";
import "./Login.module.css";

const login = () => {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <Image
          className={styles.img}
          src="/assets/bg-login.png"
          alt=""
          width={900}
          height={400}
        />
        <div className="card w-95 bg-base-100 shadow-xl h-60 w-48">
          <div className="card-body">
            <img
              className="mx-auto h-3 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-1 text-center text-xs font-bold leading-3 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <form className="space-y-2" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className={
                    "block text-xs font-medium leading-6 text-gray-900"
                  }
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sx">
                    <a
                      href="#"
                      className="font-semibold text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default login;
