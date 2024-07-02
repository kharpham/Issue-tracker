import NextLink from 'next/link'; //Rename Link to NextLink
import { Link as RadixLink} from '@radix-ui/themes'; // Similar
import { ReactNode } from 'react';

interface Props {
    href: string;
    children: string;
}

const Link = ({href, children}: Props) => {
  return (  
    <NextLink href={href} passHref legacyBehavior><RadixLink>{children}</RadixLink></NextLink>
  )
}

export default Link