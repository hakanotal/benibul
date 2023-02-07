import { Button, Container, LoadingOverlay } from "@mantine/core";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import NavbarComponent from "../components/NavbarComponent";
import RecordForm from "../components/Form/RecordForm";
import { Footer } from "../components/Footer";

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
          console.error("Konumunuz yeterince güvenilir değil.");
        }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 30000 }
    );
  });

  return (
    <>
      <NavbarComponent />
      <Container className="relative flex flex-col items-center justify-center">
        {showForm && !loading ? (
          <RecordForm coords={coords} />
        ) : (
          <Button
            variant="filled"
            size="xl"
            radius="xl"
            my={32}
            onClick={() => setShowForm(true)}
          >
            Kayıt Oluştur
          </Button>
        )}

        {loading ? (
          <LoadingOverlay visible={loading} overlayBlur={2} />
        ) : (
          <Map coords={coords} />
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Home;
