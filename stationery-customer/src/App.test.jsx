import matchers from "@testing-library/jest-dom/types/matchers";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

expect.extend(matchers);

describe("App", () => {
	test("App render và chuyển trang", async () => {
		render(<App />);
	});
});
