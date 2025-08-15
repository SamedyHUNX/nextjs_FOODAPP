"use client";

import { Button } from "@/components/ui/button";
import * as Collapsible from "@radix-ui/react-collapsible";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Apple,
  Boxes,
  ChevronDown,
  ChevronLeft,
  LogOut,
  Menu,
  Ruler,
  Utensils,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import z from "zod";
import { customErrorMap } from "@/lib/customErrorMap";
import { useSignOut } from "@/app/(auth)/sign-in/_services/use-sign-in-mutations";
import { Session } from "next-auth";
import { Role } from "../../../../generated/prisma";

z.setErrorMap(customErrorMap);

type RouteGroupType = {
  group: string;
  items: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
};

const ROUTE_GROUP: RouteGroupType[] = [
  {
    group: "Foods Management",
    items: [
      {
        href: "/admin/foods-management/foods",
        label: "Foods",
        icon: <Apple className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/categories",
        label: "Categories",
        icon: <Boxes className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/serving-units",
        label: "Serving Units",
        icon: <Ruler className="mr-2 size-3" />,
      },
    ],
  },
  {
    group: "Meals Management",
    items: [
      {
        href: "/client",
        label: "Meals",
        icon: <Utensils className="mr-2 size-3" />,
      },
    ],
  },
];

type RouteGroupProps = RouteGroupType;

const RouteGroup = ({ group, items }: RouteGroupProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <Button
          className="text-foreground/80 w-full font-normal flex justify-between"
          variant={"ghost"}
        >
          {group}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <motion.div
          className={`flex flex-col gap-2 ${
            !open ? "pointer-events-none" : ""
          }`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {items.map((item) => (
            <Button
              key={item.href}
              className="w-full justify-start font-normal"
              variant="ghost"
              asChild
            >
              <Link
                href={item.href}
                className={`flex items-center rounded-md px-5 py-2 transition-all ${
                  pathname === item.href
                    ? "bg-foreground/10 hover:bg-foreground/15"
                    : "hover:bg-foreground/10"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            </Button>
          ))}
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

type DashboardLayoutProps = { children: ReactNode; session: Session };

const DashboardLayout = ({ children, session }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);
  const signOutMutation = useSignOut();
  const userRole = session.user.role;

  const fileredRouteGroup = ROUTE_GROUP.filter((group) => {
    if (userRole === Role.ADMIN) {
      return group.group === "Foods Management";
    } else {
      return group.group === "Meals Management";
    }
  });

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-background border-b flex items-center justify-between px-4">
        <Button size="icon" variant="outline" onClick={() => setOpen(!open)}>
          <Menu className="h-4 w-4" />
        </Button>

        <div className="flex gap-2">
          <ThemeToggle />

          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex h-9 items-center gap-2 px-2"
                >
                  <Avatar className="h-8 w-8 flex pt-1.5 pl-2">
                    <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{session.user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="flex items-center gap-3 px-2 py-1.5">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 z-20 h-full w-64 bg-background border-r transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="font-semibold">Admin Dashboard</h1>
          <Button size="icon" variant="outline" onClick={() => setOpen(false)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-2">
          {fileredRouteGroup.map((routeGroup) => (
            <RouteGroup {...routeGroup} key={routeGroup.group} />
          ))}
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <main
        className={`pt-16 transition-all duration-300 ease-in-out ${
          open ? "lg:ml-64" : "ml-0"
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export { DashboardLayout };
