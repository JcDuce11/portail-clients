import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

import SuperAdminDashboard from "../dashboards/SuperAdminDashboard";
import AdminDashboard from "../dashboards/AdminDashboard";
import TechnicianDashboard from "../dashboards/TechnicianDashboard";
import CommercialDashboard from "../dashboards/CommercialDashboard";
import ClientDashboard from "../dashboards/ClientDashboard";
import Configuration from "./Configuration";

export default function Dashboard() {

  
  const { user,currentPage } = useAuth();
  const { t } = useTranslation();

  const renderDashboard = () => {

    switch (user?.role) {

      case "SUPER_ADMIN":
        return <SuperAdminDashboard />;

      case "ADMIN":
        return <AdminDashboard />;

      case "TECHNICIEN":
        return <TechnicianDashboard />;

      case "COMMERCIAL":
        return <CommercialDashboard />;

      case "CLIENT":
        return <ClientDashboard />;

      default:
        return null;
    }

  };

  const renderContent = () => {

    switch(currentPage) {

        case "configuration":

            return (
                <Configuration />
            );

        case "dashboard":

        default:

            return (

                <>
                    <h1>
                        Bienvenue Alexandre 👋
                    </h1>

                    <h2>
                        Dashboard Super Administrateur
                    </h2>

                    <p>
                        KPIs à venir...
                    </p>
                </>

            );
    }
};

console.log(
  "CURRENT PAGE =",
  currentPage
);

  return (

    <AppLayout>

      {renderContent()}

    </AppLayout>

  );

}