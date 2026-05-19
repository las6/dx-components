import { useState, useCallback } from "react";
import type { StoryDefault, Story } from "@ladle/react";
import { ErrorComponent } from "../components/ErrorComponent";

export default {
  title: "ErrorComponent",
} satisfies StoryDefault;

export const Default: Story = () => (
  <ErrorComponent
    error={new Error("Could not load user data — database connection refused")}
    reset={() => {}}
    subtitle="Loader or server function threw"
  />
);

export const ChainedCause: Story = () => (
  <ErrorComponent
    error={
      new Error("Could not load user data", {
        cause: new Error("Database connection refused", {
          cause: new Error("ECONNREFUSED 127.0.0.1:5432"),
        }),
      })
    }
    reset={() => {}}
    subtitle="Loader threw — chained causes"
  />
);

export const ProdMode: Story = () => (
  <ErrorComponent
    error={new Error("Something went wrong")}
    reset={() => {}}
    mode="prod"
  />
);

export const StringError: Story = () => (
  <ErrorComponent
    error="Raw string error thrown without Error constructor"
    reset={() => {}}
  />
);

export const NoStack: Story = () => {
  const e = new Error("Error with no stack trace available");
  Object.defineProperty(e, "stack", { value: undefined });
  return <ErrorComponent error={e} reset={() => {}} />;
};

export const DeepStack: Story = () => {
  const e = new Error("Maximum call stack size exceeded");
  e.stack =
    "RangeError: Maximum call stack size exceeded\n" +
    "    at deep (/src/utils/deep.ts:15:12)\n" +
    Array.from({ length: 25 }, (_, i) =>
      `    at deep (/src/utils/deep.ts:12:5) [as ${i}]`,
    ).join("\n") +
    "\n    at Object.<anonymous> (/src/utils/deep.ts:42:1)\n" +
    "    at Module._compile (node:internal/modules/cjs/loader:1521:14)\n" +
    "    at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)\n" +
    "    at Module.load (node:internal/modules/cjs/loader:1266:32)\n" +
    "    at Module._load (node:internal/modules/cjs/loader:1091:12)";
  return <ErrorComponent error={e} reset={() => {}} />;
};

export const Flaky: Story = () => {
  const [key, setKey] = useState(0);
  const [failureRate] = useState(30);

  const reset = useCallback(() => setKey((k) => k + 1), []);

  return (
    <FlakyInner
      key={key}
      failureRate={failureRate}
      onReset={reset}
    />
  );
};

function FlakyInner({
  failureRate,
  onReset,
}: {
  failureRate: number;
  onReset: () => void;
}) {
  try {
    if (Math.random() * 100 < failureRate) {
      throw new Error(
        `Simulated random failure (${failureRate}% chance)`,
      );
    }
    return (
      <div
        style={{
          fontFamily: "monospace",
          padding: "2rem",
          color: "#4ade80",
        }}
      >
        Page loaded successfully
      </div>
    );
  } catch (e) {
    return (
      <ErrorComponent
        error={e as Error}
        reset={onReset}
        subtitle={`Random error at ${failureRate}% failure rate — click Try again`}
      />
    );
  }
}
