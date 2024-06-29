import Link from "next/link";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const links = [
    {label: 'Dashboard', link: '/'},
    {label: 'Issues', link: '/'},
  ]
  return (
    <nav className="flex space-x-6 border-b px-3 h-14 mb-6 items-center"> 
      <Link href="/"><FaBug/></Link>
      <ul className="flex space-x-6">
        {links.map(link => <li key={link.label}>
          <Link className="text-zinc-500 hover:text-zinc-200 transition-colors" href={link.link}>{link.label}</Link>
        </li>)}
      </ul>
    </nav>
  );
};

export default NavBar;
