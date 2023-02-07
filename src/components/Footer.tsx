import { ActionIcon } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import Link from "next/link";

export const Footer = () => (
  <Link
    href="https://github.com/ituitis-otal18"
    className="fixed bottom-5 right-5"
  >
    <ActionIcon size="lg">
      <IconBrandGithub size={36} stroke={2} />
    </ActionIcon>
  </Link>
);
