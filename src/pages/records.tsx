import { type NextPage } from "next";
import { Container, Title, LoadingOverlay } from "@mantine/core";
import NavbarComponent from "../components/NavbarComponent";
import { RecordTable } from "../components/RecordTable";
import { type RecordType } from "../lib/schema/Record";
import { useState } from "react";
import { getAllRecords } from "../lib/api/dynamodb";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { Footer } from "../components/Footer";

const Locations: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<RecordType[]>([]);

  useState(async () => {
    try {
      const allRecords = (await getAllRecords()) as RecordType[];
      setRecords(allRecords);
    } catch {
      showNotification({
        title: "Bir hata oluştu",
        message: "Lütfen tekrar deneyin",
        icon: <IconX size={18} />,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <NavbarComponent />
      <Container className="relative flex flex-col items-center justify-center">
        <Title my={40}>Tüm Kayıtlar</Title>
        {loading ? (
          <LoadingOverlay visible={loading} overlayBlur={2} />
        ) : (
          <RecordTable data={records} />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Locations;
