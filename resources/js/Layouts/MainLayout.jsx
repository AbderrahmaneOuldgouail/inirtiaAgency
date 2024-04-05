import Navbar from "@/Components/MyComponents/Navbar";
import Footer from "@/Components/MyComponents/Footer";

export default function MainLayout({ children }) {
    return (
        <div >
            <Navbar />
            <div className=" bg-white dark:bg-gray-800  overflow-hidden ">
                {children}
            </div>
            <Footer />
        </div>
    );
}
