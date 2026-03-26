import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Accueil from "./Pages/Accueil.jsx"
import Presentation from "./Pages/Presentation.jsx"
import Services from "./Pages/Services.jsx"
import Realisations from "./Pages/Realisations.jsx"
import Contact from "./Pages/Contact.jsx"
import Test from "./Pages/Test.jsx"
import Hero from "./Components/Hero.jsx"
import Footer from "./Components/Footer.jsx"



import { useLocation } from "react-router-dom";
import "./Styles/Animations.css";

const ScrollToTopAndReveal = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // observer.unobserve(entry.target); // Optional: animate only once
                }
            });
        }, { threshold: 0.1 });

        setTimeout(() => {
            const elements = document.querySelectorAll('.reveal');
            elements.forEach((el) => observer.observe(el));
        }, 100);

        return () => observer.disconnect();
    }, [pathname]);

    return null;
}

const Layout = () => {
  return (
    <div className="app-container">
      <ScrollToTopAndReveal />
      <Hero />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Accueil />
      },
      {
        path: "/Presentation",
        element: <Presentation />
      },
      {
        path: "/Services",
        element: <Services />
      },
      {
        path: "/Realisations",
        element: <Realisations />
      },
      {
        path: "/Contact",
        element: <Contact />
      },
      {
        path: "/Test",
        element: <Test />
      },
    ]
  }
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
