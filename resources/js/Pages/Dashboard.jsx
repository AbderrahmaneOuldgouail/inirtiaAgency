import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("flight.index")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Flights
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("hotel.index")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Hotel
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("travel.index", "travel")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Travels
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("travel.index", "omra")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Omra
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("hotelBookings.index")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Hotel Bookings
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("flightBookings.index")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Flight Bookings
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("travelBookings.index", "travel")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Travel Bookings
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("travelBookings.index", "omra")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Omra Bookings
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("contact.index")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Contact
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Link
                                href={route("agency.index")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Agency
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
