"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { LoadingIndicator } from "./components";
import DropDown from "./DropDown";

const NavBar = () => {
  return (
    <nav className="border-b px-5 py-3 mb-6">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <NavigationLinks />
          </Flex>
          <Flex>
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  return (
    <Box>
      {status === "loading" && <LoadingIndicator />}
      {status === "authenticated" && <DropDown session={session} />}
      {status === "unauthenticated" && (
        <Link className="nav-link" href="/api/auth/signin">Log in</Link>
      )}
    </Box>
  );
};

const NavigationLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", link: "/" },
    { label: "Issues", link: "/issues" },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.link === currentPath,
            })}
            href={link.link}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default NavBar;
