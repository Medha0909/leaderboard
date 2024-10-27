import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaRegUser } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  var z;
  const [data, setDate] = useState([]);
  const [points, setPoints] = useState([]);
  const [modal, setModal] = useState(false);
  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Login", href: "/login", current: false },
    { name: "Register", href: "/register", current: false },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const onSubmit = () => {
    setModal(!modal);
  };
  const toggleModal = async (e) => {
    setModal(!modal);
    e.preventDefault();
    window.sessionStorage.setItem("username", z);
    const response = await fetch(
      "http://localhost:7000/api/user/v1/get-users-info",
      {
        method: "POST",
        headers: {
          authHeader: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setPoints(json.pointsAwarded);
    setDate(json.date);

    if (json.success) {
      //save the authh token and redirect
      //localStorage.setItem("token");
      //props.showAlert("Logged in Succesfully","success");
      //Router.push("/buy");
    }
  };
  function sendAlert() {
    alert("Login to your account");
    navigate("/login");
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-19.79">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center "></div>
              <div className="hidden sm:ml-6 sm:block ">
                <div className="flex space-x-4 mt-[5px] ml-[82px]">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm  ">
                    <FaRegUser className="user h-[23px] w-6 text-gray-400  mb-[1px] ml-[592px] " />
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    {!localStorage.getItem("token") ? (
                      <>
                        <button
                          onClick={sendAlert}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          Your Profile
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={toggleModal}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Your Profile
                      </button>
                    )}
                  </MenuItem>

                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
              {modal && (
                <div className="modal">
                  <div onClick={toggleModal} className="overlay"></div>
                  <div className="modal-content">
                    <h2>Upload an Image</h2>
                    <input
                      className="file"
                      type="file"
                      accept="image/*"
                    ></input>

                    <button className="submit" type="submit" onClick={onSubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <Outlet />
    </div>
  );
}

export default Navbar;
