import React from "react";
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import { usePage } from "@inertiajs/react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";


export default function Navbar() {
    const { auth, agency } = usePage().props;

    const navData = [
        {
            label: "Home",
            link: "home",
        },
        {
            label: "Hotels",
            link: "hotel.list",
        },
        {
            label: "Travels",
            link: "travel.list",
        },
        {
            label: "Omra",
            link: "omra.list",
        },
        {
            label: "Flights",
            link: "flight.list",
        },
        {
            label: "Contact",
            link: "contact",
        },
    ];

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href={route("home")}
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src={agency.logo}
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        {agency.name}
                    </span>
                </a>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Flowbite>
                        <DarkThemeToggle />
                    </Flowbite>
                    {auth?.user ? (
                        <>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            // className="inline-flex items-center px-3 py-2 text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                            className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-full text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {/* {auth.user.first_name} */}
                                            <span class="font-medium text-gray-600 dark:text-gray-300">
                                                {auth.user.first_name[0]}
                                                {auth.user.last_name[0]}
                                            </span>
                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link
                                        href={route("profile.edit")}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Profile
                                    </Dropdown.Link>
                                    {auth.user?.role == "admin" && (
                                        <Dropdown.Link
                                            href={route("dashboard")}
                                        >
                                            Dashboard
                                        </Dropdown.Link>
                                    )}
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-user"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {navData.map(({ label, link }, index) => (
                            <li key={index}>
                                <Link
                                    href={route(link)}
                                    className={
                                        route().current(link)
                                            ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                            : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    }
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
