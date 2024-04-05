import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { WavyBackground } from "@/Components/ui/WavyBackground";
import TravelsSection from "@/Components/MyComponents/HomeScreenComponents/TravelsSection";
import HotelsSection from "@/Components/MyComponents/HomeScreenComponents/HotelsSection";
import { usePage } from "@inertiajs/react";
import { useThemeMode } from "flowbite-react";


export default function Home({ hotels, travels }) {
    const { agency } = usePage().props;
    const { mode } =useThemeMode() ;
console.log(mode);
    return (
        <>
            <MainLayout>
                <Head title="Home" />
                <WavyBackground
                    containerClassName="h-screen"
                    backgroundFill={mode == "dark" ? "black" : "white"}
                >
                    <p className="text-2xl md:text-4xl lg:text-7xl text-black dark:text-white font-bold inter-var text-center">
                        {agency.name}
                    </p>
                    <p className="text-base md:text-lg mt-4 text-black dark:text-white font-normal inter-var text-center">
                        {agency.descreption}
                    </p>
                </WavyBackground>
                <TravelsSection travels={travels} />
                <div className="p-20 "></div>
                <HotelsSection hotels={hotels} />
            </MainLayout>
        </>
    );
}
