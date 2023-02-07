import {
  TextInput,
  Paper,
  Container,
  Button,
  NativeSelect,
  LoadingOverlay,
} from "@mantine/core";
import { useState } from "react";
import { convertCoordsTo3Words } from "../../lib/api/geolocation";
import { Record } from "../../lib/schema/Record";
import { ErrorForm } from "./ErrorForm";
import { SuccessForm } from "./SuccessForm";

export default function RecordForm(props: { coords: any }) {
  const [name_surname, setNameSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [need, setNeed] = useState("Kurtarma");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSave = async () => {
    console.log("Konumunuz kaydediliyor...");
    try {
      setLoading(true);
      const loc3w = await convertCoordsTo3Words(
        props.coords.latitude,
        props.coords.longitude
      );

      const record = Record.safeParse({
        name_surname,
        phone,
        need,
        loc_words: loc3w.words,
        nearest_place: loc3w.nearestPlace,
        created_at: Math.floor(Date.now() / 1000),
      });
      if (!record.success) throw record.error;

      console.log(record.data);

      // const res = await saveToDB(record.data);
      // if (!res.success) throw res.error;

      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container my={40} className="min-w-[360px] md:w-1/2">
      {showSuccess && <SuccessForm />}
      {showError && <ErrorForm />}
      {!showSuccess && !showError && (
        <Paper
          withBorder
          shadow="md"
          p={50}
          radius="md"
          className="relative space-y-6"
        >
          {loading && <LoadingOverlay visible={loading} overlayBlur={2} />}
          <TextInput
            size="lg"
            label="İsim Soyisim"
            required
            placeholder="Hakan Tuğrul Otal"
            value={name_surname}
            onChange={(event) => setNameSurname(event.currentTarget.value)}
          />
          <TextInput
            size="lg"
            label="Telefon Numarası"
            placeholder="533 333 33 33"
            value={phone}
            onChange={(event) => setPhone(event.currentTarget.value)}
          />

          <NativeSelect
            size="lg"
            label="İhtiyacınız"
            required
            data={["Kurtarma", "Yemek", "Isınma", "Sağlık", "Diğer"]}
            value={need}
            onChange={(event) => setNeed(event.currentTarget.value)}
          />
          <Button
            size="lg"
            fullWidth
            variant="outline"
            onClick={handleSave}
            disabled={!name_surname}
          >
            KAYDET
          </Button>
        </Paper>
      )}
    </Container>
  );
}
