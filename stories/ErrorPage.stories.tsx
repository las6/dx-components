import { useState } from "react";
import type { StoryDefault, Story } from "@ladle/react";
import { ErrorPage } from "../components/ErrorPage";

export default {
  title: "ErrorPage",
} satisfies StoryDefault;

export const Default: Story = () => <ErrorPage />;

export const CustomText: Story = () => (
  <ErrorPage
    title="Unable to display data"
    message="The server returned an unexpected response. Our team has been notified."
  />
);

export const WithReset: Story = () => {
  const [key, setKey] = useState(0);
  return (
    <ErrorPage
      key={key}
      reset={() => setKey((k) => k + 1)}
      title="Connection lost"
      message="Check your internet connection and try again."
    />
  );
};
