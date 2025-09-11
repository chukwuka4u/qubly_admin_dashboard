import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconPlus,
  IconUsers,
  IconLogout,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "MyQueues",
    icon: IconUsers,
    href: "/queues",
  },
  {
    id: uniqueId(),
    title: "Create New Queue",
    icon: IconPlus,
    href: "/queues/new",
  },
  {
    navlabel: true,
    subheader: "AUTH",
  },
  {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogout,
    href: "/authentication/login",
  }

];

export default Menuitems;


