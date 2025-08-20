import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Testimonials from "./testimonials";

import Work from "./Work";
import Cta from "./cta";
import Footer from "./footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar/>
        <Hero/>
        <Features/>
        <Work/>
        <Testimonials/>
        <Cta/>
        <Footer/>
      <ToastContainer/>
    </div>
  )
}
