import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorComponent } from "./ErrorComponent";
import { ErrorPage } from "./ErrorPage";

describe("ErrorComponent", () => {
  const testError = new Error("Test error message");
  testError.stack = "Error: Test error message\n    at myFunc (/src/App.tsx:10:5)\n    at render (/node_modules/react/index.js:100:1)";
  const resetFn = vi.fn();

  beforeEach(() => {
    resetFn.mockReset();
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: mockWriteText,
      },
      configurable: true,
    });
  });

  describe("dev mode", () => {
    it("renders the full dev overlay with badge and stack", () => {
      render(<ErrorComponent error={testError} reset={resetFn} />);
      expect(screen.getByText("Error")).toBeDefined();
      expect(screen.getByText("Test error message")).toBeDefined();
      expect(screen.getByText("myFunc")).toBeDefined();
      expect(screen.getByText("/src/App.tsx:10:5")).toBeDefined();
      expect(screen.getByText(/Copy error/)).toBeDefined();
      expect(screen.getByText(/Try again/)).toBeDefined();
    });

    it("renders subtitle when provided", () => {
      render(
        <ErrorComponent error={testError} reset={resetFn} subtitle="Loader failed" />,
      );
      expect(screen.getByText("Loader failed")).toBeDefined();
    });

    it('marks own-code frames with data-own="true"', () => {
      render(<ErrorComponent error={testError} reset={resetFn} />);
      const ownFrame = screen.getByText("myFunc").closest('[data-own="true"]');
      expect(ownFrame).toBeTruthy();
    });

    it("calls reset when Try again is clicked", async () => {
      const user = userEvent.setup();
      render(<ErrorComponent error={testError} reset={resetFn} />);
      await user.click(screen.getByText(/Try again/));
      expect(resetFn).toHaveBeenCalledOnce();
    });

    it("triggers handleCopy when 'c' key is pressed", async () => {
      const user = userEvent.setup();
      render(<ErrorComponent error={testError} reset={resetFn} />);
      const writeTextSpy = vi.spyOn(navigator.clipboard, "writeText");
      await user.keyboard("c");
      expect(writeTextSpy).toHaveBeenCalled();
    });

    it("triggers reset when 'r' key is pressed", async () => {
      const user = userEvent.setup();
      render(<ErrorComponent error={testError} reset={resetFn} />);
      await user.keyboard("r");
      expect(resetFn).toHaveBeenCalled();
    });

    it("shows keyboard shortcut hints", () => {
      render(<ErrorComponent error={testError} reset={resetFn} />);
      expect(screen.getByText("C")).toBeDefined();
      expect(screen.getByText("R")).toBeDefined();
    });
  });

  describe("mode prop", () => {
    it('mode="dev" renders dev overlay', () => {
      render(
        <ErrorComponent error={testError} reset={resetFn} mode="dev" />,
      );
      expect(screen.getByText(/Copy error/)).toBeDefined();
    });

    it('mode="prod" renders ErrorPage instead of dev overlay', () => {
      render(
        <ErrorComponent error={testError} reset={resetFn} mode="prod" />,
      );
      // ErrorPage renders "This page couldn't load", not "Copy error"
      expect(screen.queryByText("Copy error")).toBeNull();
      expect(screen.getByText("This page couldn't load")).toBeDefined();
    });
  });

  describe("chained errors", () => {
    it("renders cause chain", () => {
      const causeError = new Error("DB connection refused");
      const rootError = new Error("Failed to fetch user", { cause: causeError });
      rootError.stack = "Error: Failed to fetch user\n    at loadUser (/src/api.ts:5:2)";
      causeError.stack = "Error: DB connection refused\n    at connect (/src/db.ts:20:3)";

      render(<ErrorComponent error={rootError} reset={resetFn} />);

      const causedByBadges = screen.getAllByText("Caused by");
      expect(causedByBadges.length).toBe(1);
      expect(screen.getByText("DB connection refused")).toBeDefined();
      expect(screen.getByText("connect")).toBeDefined();
    });
  });

  describe("non-Error values", () => {
    it("renders string errors", () => {
      render(<ErrorComponent error="Something broke" reset={resetFn} />);
      expect(screen.getByText("Something broke")).toBeDefined();
    });

    it("renders object errors via toString", () => {
      render(
        <ErrorComponent
          error={{ code: 500, message: "Server error" }}
          reset={resetFn}
        />,
      );
      expect(screen.getByText("[object Object]")).toBeDefined();
    });
  });

  describe("no stack", () => {
    it("renders error without stack trace", () => {
      const noStackError = new Error("No stack available");
      noStackError.stack = "";
      render(<ErrorComponent error={noStackError} reset={resetFn} />);
      expect(screen.getByText("No stack available")).toBeDefined();
    });
  });

  describe("standalone ErrorPage", () => {
    it("renders with default title and message", () => {
      render(<ErrorPage />);
      expect(screen.getByText("This page couldn't load")).toBeDefined();
      expect(screen.getByText("Something went wrong. Please try again.")).toBeDefined();
    });

    it("renders custom title and message", () => {
      render(<ErrorPage title="Custom title" message="Custom message" />);
      expect(screen.getByText("Custom title")).toBeDefined();
      expect(screen.getByText("Custom message")).toBeDefined();
    });
  });
});
