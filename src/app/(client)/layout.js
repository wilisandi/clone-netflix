import Navbar from "@/components/utilities/Navbar";
import SmoothScroll from "@/components/utilities/SmoothScroll";

export default function ClientLayout({ children }) {
    return (
        <div>
            <Navbar />
            <div id='main' className="main max-h-full max-w-full w-full h-screen overflow-y-auto overflow-x-hidden">
                <div>
                    {children}
                </div>
            </div>
            <SmoothScroll />
        </div>
    )
}