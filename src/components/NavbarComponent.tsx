import ColorSchemeToggle from "./ColorSchemeToggle";
import {
  createStyles,
  Header,
  Group,
  Container,
  Burger,
  Button,
  ScrollArea,
  Drawer,
  Divider,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 64,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  burgerHidden: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function NavbarComponent() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const links = [
    { title: "Kayıtları Gör", href: "/records" },
  ];

  return (
    <>
      <Header height={64}>
        <Container className={classes.inner}>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            className={classes.burger}
          />
          <Group className={classes.burgerHidden} spacing={5}>
            {links.map((link) => (
              <Link key={link.title} href={link.href}>
                <Button variant="outline">{link.title}</Button>
              </Link>
            ))}
          </Group>

          <Title
            size={36}
            className="bg-gradient-to-r from-blue-400 to-pink-600 bg-clip-text font-extrabold text-transparent"
          >
            BeniBul
          </Title>

          <Group
            spacing={5}
            className={classes.burgerHidden}
            position="right"
            noWrap
          >
            <ColorSchemeToggle />
          </Group>
        </Container>
      </Header>

      <Drawer
        opened={opened}
        onClose={toggle}
        size="100%"
        padding="md"
        className={classes.burger}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Group className="flex flex-col text-center">
            {links.map((link) => (
              <Link key={link.title} href={link.href}>
                <Button variant="outline">{link.title}</Button>
              </Link>
            ))}
            <Divider />
            <ColorSchemeToggle />
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}
