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
  // usePathname is dependent on browser API
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  console.log(session);
  const links = [
    { label: "Dashboard", link: "/" },
    { label: "Issues", link: "/issues" },
  ];
  return (
    <nav className="border-b px-5 py-3 mb-6">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
          </Flex>
          <Flex>
            <Box>
              {status === "loading" && <LoadingIndicator />}
              {status === "authenticated" && (
                <DropDown session={session}/>
              )}
              {status === "unauthenticated" && (
                <Link href="/api/auth/signin">Log in</Link>
              )}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
