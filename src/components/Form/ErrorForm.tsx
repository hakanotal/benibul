import { Paper, Text, Button } from "@mantine/core";
import { IconMapPinOff } from "@tabler/icons";
import { useRouter } from "next/router";

export const ErrorForm = () => {
  const router = useRouter();

  return (
    <Paper
      withBorder
      shadow="md"
      p={40}
      radius="md"
      className="relative text-center"
    >
      <IconMapPinOff size={64} stroke={2} color="red" className="m-auto" />
      <Text size="lg" className="my-4">
        Konumunuz kaydedilirken bir hata oluştu!
      </Text>
      <Button size="md" variant="outline" onClick={() => router.reload()}>
        Tekrar Dene
      </Button>
    </Paper>
  );
};
