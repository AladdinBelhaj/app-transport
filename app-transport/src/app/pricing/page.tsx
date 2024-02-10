import React from "react";

const Pricing = () => {
  return (
    <section>
      <div className="relative mx-auto w-full max-w-7xl items-center md:px-12 lg:px-16">
        <div>
          <div className="relative space-y-12 overflow-hidden rounded-xl p-10 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            <div className="relative flex flex-col bg-white p-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-600">
                  Freelancer
                </h3>
                <p className="mt-4 flex items-baseline text-neutral-600">
                  <span className="text-5xl font-extrabold tracking-tight">
                    $24
                  </span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="text-gray-500 mt-6">
                  The essentials to provide your best work for clients.
                </p>
                {/* Feature list */}
                <ul role="list" className="mt-6 space-y-6 border-t pt-6">
                  <span className="text-lg font-semibold text-neutral-600">
                    What&apos;s included?
                  </span>

                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-blue-600">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-neutral-600">
                      Up to 10 credit cards
                    </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-blue-600">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-neutral-600">
                      Up to 1,000 credits
                    </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-blue-600">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-neutral-600">Tacky wallet</span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-blue-600">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-neutral-600">
                      Personal profile only
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 rounded-lg">
                <a
                  href="#"
                  type="highlight"
                  className="focus:ring-gray-500 block w-full transform items-center rounded-xl border-2 border-white bg-white px-10 py-3.5 text-center text-base font-medium text-blue-600 shadow-md transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  {" "}
                  Get Started{" "}
                </a>
              </div>
            </div>
            <div className="relative flex flex-col rounded-2xl bg-blue-600 p-8">
              <div className="relative flex-1">
                <h3 className="text-xl font-semibold text-white">Startup</h3>
                <p className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight">
                    $32
                  </span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="text-solitud mt-6 text-white">
                  A plan that scales with your rapidly growing business.
                </p>
                {/* Feature list */}
                <ul role="list" className="mt-6 space-y-6 border-t pt-6">
                  <span className="text-lg font-semibold text-white">
                    What&apos;s included?
                  </span>

                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-white">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-white">
                      Up to 10 credit cards
                    </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-white">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-white">
                      Up to 10,000 credits
                    </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-white">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-white">Less tacky wallet </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-white">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-white">
                      Profile and portafolio
                    </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-white">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-neutral-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-white">Support</span>
                  </li>
                </ul>
              </div>
              <div className="z-50 mt-6 rounded-lg">
                <a
                  href="/pricing"
                  type="highlight"
                  className="focus:ring-gray-500 block w-full transform items-center rounded-xl border-2 border-white bg-white px-10 py-3.5 text-center text-base font-medium text-blue-600 shadow-md transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  {" "}
                  Get started{" "}
                </a>
              </div>
            </div>
            <div className="relative flex flex-col bg-white p-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-neutral-600">
                  Enterprise
                </h3>
                <p className="mt-4 flex items-baseline text-neutral-600">
                  <span className="text-5xl font-extrabold tracking-tight">
                    $48
                  </span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="text-gray-500 mt-6">
                  Dedicated support and infrastructure for your company.
                </p>
                {/* Feature list */}
                <ul role="list" className="mt-6 space-y-6 border-t pt-6">
                  <span className="text-lg font-semibold text-neutral-600">
                    What&apos;s included?
                  </span>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-blue-600">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-neutral-600">
                      Unlimited credit cards
                    </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-blue-600">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-neutral-600">
                      Unlimited credits
                    </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-blue-600">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-neutral-600">
                      A super wallet
                    </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-blue-600">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-neutral-600">Shout out </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-blue-600">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-neutral-600">
                      Better support
                    </span>
                  </li>
                  <li className="flex">
                    <div className="inline-flex h-6 w-6 items-center rounded-xl bg-blue-600">
                      <svg
                        className="mx-auto h-4 w-4 flex-shrink-0 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-neutral-600">
                      Custom integrations
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 rounded-lg">
                <a
                  href="#"
                  type="highlight"
                  className="focus:ring-gray-500 block w-full transform items-center rounded-xl border-2 border-white bg-white px-10 py-3.5 text-center text-base font-medium text-blue-600 shadow-md transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  {" "}
                  Get Started{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
