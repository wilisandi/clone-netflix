import Navbar from "@/components/utilities/Navbar";

export default function ClientLayout({ children }) {
    return (
    <>
    <Navbar />
    {children}
    </>
    )
}