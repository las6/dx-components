import type { StoryDefault, Story } from "@ladle/react";
import { NotFoundComponent } from "../components/NotFoundComponent";

export default {
  title: "NotFoundComponent",
} satisfies StoryDefault;

export const Default: Story = () => <NotFoundComponent />;
