import {
  LayoutDashboard,
  Ticket,
  BookOpen,
  Wrench,
  FileText,
  Calculator,
  Users,
  Boxes,
  Settings
} from "lucide-react";

export const sidebarModules = {

  SUPER_ADMIN: [

    {
      key: "dashboard",
      icon: <LayoutDashboard size={22} />
    },

    {
      key: "tickets",
      icon: <Ticket size={22} />
    },

    {
      key: "documentation",
      icon: <BookOpen size={22} />
    },

    {
      key: "interventions",
      icon: <Wrench size={22} />
    },

    {
      key: "contracts",
      icon: <FileText size={22} />
    },

    {
      key: "quotes",
      icon: <Calculator size={22} />
    },

    {
      key: "users",
      icon: <Users size={22} />
    },

    {
      key: "services",
      icon: <Boxes size={22} />
    },

    {
      key: "configuration",
      icon: <Settings size={22} />
    },

  ],

  TECHNICIEN: [

    {
      key: "dashboard",
      icon: "🏠",
    },

    {
      key: "tickets",
      icon: "🎫",
    },

    {
      key: "documentation",
      icon: "📚",
    },

    {
      key: "interventions",
      icon: "🛠",
    },

    {
      key: "telephony",
      icon: "☎️",
    },

    {
      key: "network",
      icon: "🌐",
    },

    {
      key: "servers",
      icon: "🖥️",
    },

    {
      key: "backup",
      icon: "💾",
    },

    {
      key: "supervision",
      icon: "📈",
    },

  ],

  CLIENT: [

    {
      key: "dashboard",
      icon: "🏠",
    },

    {
      key: "tickets",
      icon: "🎫",
    },

    {
      key: "interventions",
      icon: "🛠",
    },

    {
      key: "contracts",
      icon: "📑",
    },

    {
      key: "quotes",
      icon: "💰",
    },

    {
      key: "services",
      icon: "📦",
    },

  ],

};