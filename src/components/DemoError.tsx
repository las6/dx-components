import { useMemo } from "react";
import { ErrorComponent } from "../../components/ErrorComponent";

interface DemoErrorProps {
  message: string;
  stack?: string;
  causeMessages?: string[];
  causeStacks?: string[];
  subtitle?: string;
}

function buildError(
  message: string,
  stack?: string,
  causeMessages?: string[],
  causeStacks?: string[],
): Error {
  const error = new Error(message);
  if (stack) {
    error.stack = stack;
  }

  const causes = causeMessages ?? [];
  const causeStackArr = causeStacks ?? [];
  let currentCause: Error | undefined;

  for (let i = causes.length - 1; i >= 0; i--) {
    const ce = new Error(causes[i]);
    if (causeStackArr[i]) {
      ce.stack = causeStackArr[i];
    }
    if (currentCause) {
      ce.cause = currentCause;
    }
    currentCause = ce;
  }

  if (currentCause) {
    error.cause = currentCause;
  }

  return error;
}

export default function DemoError({
  message,
  stack,
  causeMessages,
  causeStacks,
  subtitle,
}: DemoErrorProps) {
  const error = useMemo(
    () => buildError(message, stack, causeMessages, causeStacks),
    [message, stack, causeMessages, causeStacks],
  );

  return (
    <ErrorComponent
      error={error}
      reset={() => {}}
      subtitle={subtitle}
      mode="dev"
    />
  );
}
