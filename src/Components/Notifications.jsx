import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Notifications() {
  let { notifications } = useSelector((store) => store.chat);

  return (
    <>
      {/* For Small Screens */}
      <div
        tabIndex={0}
        role="button"
        className="btn md:hidden btn-circle btn-ghost btn-xs text-info"
      >
        <Link to={"/chat"} class="relative">
          <svg
            class={`w-8 h-8 text-black ${
              notifications?.length ? 'animate-wiggle' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 21"
            className="w-8 h-8"
          >
            <path
              fill="white"
              stroke=""
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"
            />
          </svg>
          <div class="px-1 py-0.5 bg-blue-500 min-w-5 rounded-full text-center text-white text-xs absolute -top-2 -end-1 translate-x-1/4 text-nowrap">
            <div class="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-blue-400 w-full h-full"></div>
            {notifications?.length}
          </div>
        </Link>
      </div>
      {/* ======For large Screens */}
      <div className="hidden md:block dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle btn-ghost btn-xs text-info"
        >
          <div class="relative">
          <svg
            class={`w-8 h-8 text-black ${
              notifications?.length ? 'animate-wiggle' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 21"
            className="w-8 h-8"
          >
            <path
              fill="white"
              stroke=""
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"
            />
          </svg>
          <div class="px-1 py-0.5 bg-blue-500 min-w-5 rounded-full text-center text-white text-xs absolute -top-2 -end-1 translate-x-1/4 text-nowrap">
            <div class={`absolute top-0 start-0 rounded-full -z-10 ${notifications?.length ? "animate-ping":""} bg-blue-400 w-full h-full`}></div>
            {notifications?.length}
          </div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card h-[300px] w-72 overflow-x-hidden overflow-y-auto compact dropdown-content bg-white text-black rounded-box z-[1]  shadow p-0"
        >
          <div tabIndex={0} className="card-body">
            <div class="block px-4 py-2 font-medium text-center text-white rounded-t-lg  bg-blue-500 dark:text-white">
              Notifications
            </div>

            {notifications?.length === 0 ? (
              <div className="h-full flex pt-4 justify-center  font-semibold">
                No Notification
              </div>
            ) : (
              notifications?.map((notification) => {
                return (
                  <Link
                    to={'/chat/' + notification.senderId}
                    className="hover:bg-slate-200 flex items-center justify-between p-2 border-b border-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle">
                          <img
                            src={notification?.photoUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          Message from {notification?.firstName}{' '}
                          {notification.lastName}
                        </p>
                        <p className="text-xs text-gray-600 ">
                          {notification?.msg?.length > 50
                            ? `${notification?.msg.substring(0, 30)}...`
                            : notification?.msg}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;
