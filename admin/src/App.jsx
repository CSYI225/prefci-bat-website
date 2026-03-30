import { useState } from "react";
import api from "./api/axios";

// Components
import Sidebar from "./components/Sidebar";
import AccueilAdmin from "./pages/AccueilAdmin";
import PresentationAdmin from "./pages/PresentationAdmin";
import ContactAdmin from "./pages/ContactAdmin";
import ServicesAdmin from "./pages/ServicesAdmin";
import RealisationsAdmin from "./pages/RealisationsAdmin";
import DevisAdmin from "./pages/DevisAdmin";

const menuItems = [
  "Accueil",
  "Présentation",
  "Contact",
  "Services",
  "Réalisations",
  "Demandes de Devis",
  "Déconnexion",
];

function App() {
  const [activeTab, setActiveTab] = useState("Accueil");
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("access_token") || localStorage.getItem("admin_token") || "";
  });

  const [loginEmail, setLoginEmail] = useState("admin@prefci.com");
  const [loginPassword, setLoginPassword] = useState("admin123");
  const [loginError, setLoginError] = useState("");
  const [adminBusy, setAdminBusy] = useState(false);

  const handleLogin = async () => {
    setAdminBusy(true);
    setLoginError("");
    try {
      const res = await api.post("/auth/login", { email: loginEmail, password: loginPassword });
      const token = res.data?.access_token;
      if (!token) {
        setLoginError("Réponse sans access_token.");
        return;
      }
      localStorage.setItem("access_token", token);
      setAccessToken(token);
      setActiveTab("Accueil");
    } catch (e) {
      setLoginError(e?.response?.data?.message || "Identifiants incorrects.");
    } finally {
      setAdminBusy(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_token");
    setAccessToken("");
    setActiveTab("Accueil");
  };

  if (!accessToken) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Connexion Admin</h2>
          <div className="field-row">
            <label>Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="field-row">
            <label>Mot de passe</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          {loginError && <p className="login-error">{loginError}</p>}
          <button
            className="primary-btn"
            disabled={adminBusy}
            onClick={handleLogin}
          >
            {adminBusy ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Accueil":
        return <AccueilAdmin />;
      case "Présentation":
        return <PresentationAdmin />;
      case "Contact":
        return <ContactAdmin />;
      case "Services":
        return <ServicesAdmin />;
      case "Réalisations":
        return <RealisationsAdmin />;
      case "Demandes de Devis":
        return <DevisAdmin />;
      case "Déconnexion":
        return (
          <div className="placeholder-card">
            <h2>Déconnexion</h2>
            <p>Voulez-vous vraiment vous déconnecter ?</p>
            <button className="secondary-btn" onClick={() => setActiveTab("Accueil")}>
              Annuler
            </button>
            <button className="primary-btn" style={{ marginLeft: 10 }} onClick={logout}>
              Se déconnecter
            </button>
          </div>
        );
      default:
        return <div>Page n'existe pas</div>;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar items={menuItems} activeTab={activeTab} onSelect={setActiveTab} />
      <main className="content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
