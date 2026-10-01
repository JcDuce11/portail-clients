import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

import SuperAdminDashboard from "../dashboards/SuperAdminDashboard";
import AdminDashboard from "../dashboards/AdminDashboard";
import TechnicianDashboard from "../dashboards/TechnicianDashboard";
import CommercialDashboard from "../dashboards/CommercialDashboard";
import ClientDashboard from "../dashboards/ClientDashboard";

export default function Dashboard() {

  const { user } = useAuth();
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

  return (

    <AppLayout>

      <h1>
        {t("dashboard.welcome")}{" "}
        {user?.firstname ||
          user?.email}
        👋
      </h1>

      {renderDashboard()}

    </AppLayout>

  );

}