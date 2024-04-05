import React from 'react';
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";

export default function TravelBookings({bookings, status, type}) {
  const { post } = useForm();
  const { flash } = usePage().props;
  const updateStatus = (id, status) => {
    post(route("travelBookings.update", { status: status, id: id, type: type }));
  };
  console.log(type);
  return (
      <div>
          <p>Travel Bookings</p>
          {bookings.length > 0 ? (
              bookings.map((item) => (
                  <>
                      <p>{item.name} :</p>
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
