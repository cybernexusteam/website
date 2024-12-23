"use client";
import Cyberpat from "@/public/images/Cyberpatriot.png";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../../lib/utils"; // Adjusted import path
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";


export function LeNavbar() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms)); //TODO: Either remove to implement idk how to do it rn lol
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
          <div className="flex flex-col space-y-4 text-l"> 
            <Link href="/">🏠</Link>
            </div>"
        <MenuItem setActive={setActive} active={active} item="About Us">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/staff">Our Crew</HoveredLink>
            <HoveredLink href="/mission">Mission</HoveredLink>
            <HoveredLink href="/seo">Products</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Competitions">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="CyberPatriot"
              description="A national cybersecurity competition for high schoolers across the United States"
              href="/public/images/Cyberpatriot.png"
              src={Cyberpat}
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Contact">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

