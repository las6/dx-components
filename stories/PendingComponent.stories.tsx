import type { StoryDefault, Story } from "@ladle/react";
import { PendingComponent } from "../components/PendingComponent";

export default {
  title: "PendingComponent",
} satisfies StoryDefault;

export const Default: Story = () => <PendingComponent />;
