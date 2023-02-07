import { Paper, Text } from "@mantine/core";
import { IconMapPin } from "@tabler/icons";

export const SuccessForm = () => {
  return (
    <Paper
      withBorder
      shadow="md"
      p={40}
      radius="md"
      className="relative text-center"
    >
      <IconMapPin size={64} stroke={2} color="lightgreen" className="m-auto" />
      <Text size="lg" className="my-4">
        Konumunuz başarıyla kaydedildi!
      </Text>
    </Paper>
  );
};
