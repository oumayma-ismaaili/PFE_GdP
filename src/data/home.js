import {
  ClipboardDocumentListIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  FolderOpenIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const stats = [
  { label: "Vacation days left", value: 12 },
  { label: "Sick days left", value: 4 },
  { label: "Personal days left", value: 2 },
];

export const actions = [
    {
      icon: CodeBracketIcon,
      name: "Code Repository",
      href: "#",
      iconForeground: "text-green-700",
      iconBackground: "bg-green-50",
      description: "Access and manage your code repositories.",
    },
    {
      icon: Cog6ToothIcon,
      name: "Settings",
      href: "#",
      iconForeground: "text-gray-700",
      iconBackground: "bg-gray-50",
      description: "Configure project settings and preferences.",
    },
    {
      icon: ChartBarIcon,
      name: "Analytics",
      href: "#",
      iconForeground: "text-red-700",
      iconBackground: "bg-red-50",
      description: "View project metrics and performance data.",
    },
    {
      icon: FolderOpenIcon,
      name: "File Manager",
      href: "#",
      iconForeground: "text-orange-700",
      iconBackground: "bg-orange-50",
      description: "Organize and manage project files.",
    },
    {
      icon: PresentationChartLineIcon,
      name: "Reports",
      href: "#",
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
      description: "Generate and view project reports.",
    },
    {
      icon: UserGroupIcon,
      name: "Team Collaboration",
      href: "#",
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
      description: "Collaborate with your team members.",
    },
  ];
