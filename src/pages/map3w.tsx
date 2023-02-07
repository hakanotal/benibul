import { type NextPage } from "next";
import { Container, LoadingOverlay } from "@mantine/core";
import NavbarComponent from "../components/NavbarComponent";
import { Footer } from "../components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { convert3WordsToCoords } from "../lib/api/geolocation";
import Map from "../components/Map";

const MapFrom3Words: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({});
  const router = useRouter();
  const { words } = router.query;

  useEffect(() => {
    (async () => {
      try {
        if (!words) return;
        const coords = await convert3WordsToCoords(words as string);
        console.log("coords", coords);
        setCoords(coords);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [words]);

  return (
    <>
      <NavbarComponent />
      <Container className="relative flex flex-col items-center justify-center">
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

export default MapFrom3Words;
