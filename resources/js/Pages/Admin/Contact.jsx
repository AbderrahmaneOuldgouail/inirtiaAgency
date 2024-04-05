import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Contact({ contacts }) {
    const { data, setData, post, delete: destroy } = useForm();
    const { flash } = usePage().props;
    const deleteContact = (id) => {
        destroy(route(`contact.destroy`, id));
    };

    const sendReplay = (email, first_name) => {
        // console.log(email, data);
        post(route(`contact.replay`, {'email' :  email, 'first_name' : first_name}));
    };
    console.log(flash);
    return (
        <div>
            <p>Contact</p>
            {contacts.map((item) => (
                <>
                    <p>Subject : {item.subject}</p>
                    <PrimaryButton
                        onClick={() => deleteContact(item.id)}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Supprimé
                    </PrimaryButton>
                    <form>
                        <textarea
                            id="message"
                            value={data.message}
                            name="message"
                            className="m-1 "
                            onChange={(e) => setData("message", e.target.value)}
                            col={100}
                            rows={10}
                        ></textarea>
                        <SecondaryButton onClick={() => sendReplay(item.email, item.first_name)}>
                            Replay
                        </SecondaryButton>
                    </form>
                </>
            ))}
        </div>
    );
}
