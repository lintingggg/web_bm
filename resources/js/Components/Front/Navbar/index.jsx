import React, { useState } from 'react';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from './ResizableNavbar';

export default function FrontNavbar({ forceVisible = false }) {
  const navItems = [
    {
      name: "Beranda",
      link: "/",
    },
    {
      name: "Profil",
      link: "#",
      subItems: [
        { name: "Tentang Kami", link: "/profil/tentang-kami" },
        { name: "Struktur Organisasi", link: "/profil/struktur-organisasi" },
        { name: "Logo BM", link: "/profil/logo-bm" },
        { name: "Mars BM", link: "/profil/mars-bm" },
      ],
    },
    {
      name: "Artikel",
      link: "/artikel",
    },
    {
      name: "Galeri",
      link: "/galeri",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar forceVisible={forceVisible}>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <div key={`mobile-link-${idx}`} className="w-full">
                <a
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300 w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md block font-medium"
                >
                  {item.name}
                </a>
                {item.subItems && (
                  <div className="flex flex-col pl-4 mt-1 space-y-1">
                    {item.subItems.map((sub, sIdx) => (
                      <a
                        key={`mobile-sub-${idx}-${sIdx}`}
                        href={sub.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-neutral-500 dark:text-neutral-400 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md block text-sm"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              {/* Login Admin removed as requested */}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
