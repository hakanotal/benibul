import { type NextPage } from "next";
import { Container, Title } from "@mantine/core";
import NavbarComponent from "../components/NavbarComponent";
import { RecordTable } from "../components/RecordTable";
import { type RecordType } from "../lib/schema/Record";

const Locations: NextPage = () => {
  const mockData = [
    {
      name_surname: "Hakan Otal",
      phone: "",
      need: "Yemek",
      nearest_place: "Eminönü, İstanbul",
      loc_words: "günlük.belirgin.kullanışlı",
      created_at: 1675793095,
    },
  ];
  return (
    <>
      <NavbarComponent />
      <Container className="flex flex-col items-center justify-center">
        <Title my={40}>Tüm Kayıtlar</Title>
        <RecordTable data={mockData as RecordType[]} />
      </Container>
    </>
  );
};

export default Locations;
