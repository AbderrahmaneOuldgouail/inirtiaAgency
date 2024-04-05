import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";

export default function FlightBookings({ bookings, status }) {
    const { post } = useForm();
    const { flash } = usePage().props;
    console.log(bookings);
    const updateStatus = (id, status) => {
        post(route("flightBookings.update", { status: status, id: id }));
    };
    return (
        <div>
            <p>Flight Bookings</p>
            {bookings.length > 0 ? (
                bookings.map((item) => (
                    <>
                        <p>
                            {item.diparture} {">"} {item.arrival}:
                        </p>
                        {item.status == status[0] ? (
                            <>
                                <PrimaryButton
                                    onClick={() =>
                                        updateStatus(item.id, status[1])
                                    }
                                >
                                    Validate
                                </PrimaryButton>
                                <PrimaryButton
                                    onClick={() =>
                                        updateStatus(item.id, status[2])
                                    }
                                >
                                    Cancel
                                </PrimaryButton>
                            </>
                        ) : (
                            <p>{item.status} </p>
                        )}
                    </>
                ))
            ) : (
                <h3>No Bookings Yet!</h3>
            )}
        </div>
    );
}
