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
        
        // Reset classes on route change to ensure fresh animations
        const allRevealElements = document.querySelectorAll('.reveal');
        allRevealElements.forEach(el => {
            el.classList.remove('active');
            el.classList.remove('observed');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once active, we can stop observing this specific element if we want
                    // observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 });

        const observeElements = () => {
            const elements = document.querySelectorAll('.reveal:not(.observed)');
            elements.forEach((el) => {
                el.classList.add('observed');
                observer.observe(el);
            });
        };

        // Initial observation
        observeElements();

        // MutationObserver to catch dynamically added content
        const mutationObserver = new MutationObserver(() => {
            observeElements();
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
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
