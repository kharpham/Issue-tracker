"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  // usePathname is dependent on browser API
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", link: "/" },
    { label: "Issues", link: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b px-3 h-14 mb-6 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className={classNames({
                "text-zinc-900": link.link === currentPath,
                "text-zinc-500": link.link !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.link}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
