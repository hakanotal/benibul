import { Button, Container, LoadingOverlay } from "@mantine/core";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import NavbarComponent from "../components/NavbarComponent";
import RecordForm from "../components/Form/RecordForm";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (pos) => {
        if (pos.coords.accuracy <= 100) {
          setCoords(pos.coords);
          setLoading(false);
        } else {
          showNotification({
            title: "Konumunuz yeterince güvenilir değil",
            message: "Lütfen tekrar deneyin",
            icon: <IconX size={18} />,
            color: "red",
          });
        }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 30000 }
    );
  });

  return (
    <>
      <NavbarComponent />
      <Container className="flex flex-col items-center justify-center relative">
        {showForm && !loading ? (
          <RecordForm coords={coords} />
        ) : (
          <Button
            variant="outline"
            size="xl"
            radius="xl"
            my={32}
            onClick={() => setShowForm(true)}
          >
            Konumumu Kaydet
          </Button>
        )}

        {loading ? (
          <LoadingOverlay visible={loading} overlayBlur={2} />
        ) : (
          <Map coords={coords} />
        )}
      </Container>
    </>
  );
};

export default Home;
