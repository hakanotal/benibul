import { useState } from "react";
import { createStyles, Table, ScrollArea } from "@mantine/core";
import { type RecordType } from "../lib/schema/Record";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export function RecordTable(props: { data: RecordType[] }) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = props.data.map((row) => (
    <tr key={row.created_at}>
      <td>{row.name_surname}</td>
      <td>{row.phone ? row.phone : "-"}</td>
      <td>{row.need}</td>
      <td>{row.nearest_place}</td>
      <td>
        {new Date(1000 * row.created_at).toLocaleString("tr", {
          localeMatcher: "best fit",
        })}
      </td>
      <td>
        <Link
          href={"/map3w?words=" + row.loc_words}
          style={{ textDecoration: "none" }}
        >
          <IconArrowRight size={32} color="teal" />
        </Link>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      className="h-full w-full"
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Ad Soyad</th>
            <th>Telefon</th>
            <th>İhtiyaç</th>
            <th>En Yakın Bölge</th>
            <th>Eklenme Tarihi</th>
            <th>Konumu Gör</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
