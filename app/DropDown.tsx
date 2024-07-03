import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";

interface Props {
  session: Session | null;
}

const DropDown = ({ session }: Props) => {
  if (!session) return null;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session.user?.image!}
          fallback={session.user?.name!}
          size="2"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="p-2">
        <Text>{session.user?.name}</Text>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Sign out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DropDown;
