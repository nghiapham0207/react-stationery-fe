import { describe, expect, it } from "vitest";
import { dateToString } from "../helpers";

describe("dateToString", () => {
	it("không truyền tham số", () => {
		expect(dateToString()).toBe(undefined);
	});
	it("truyền đúng", () => {
		expect(dateToString("2023-10-17")).toBe("17/10/2023");
	});
});
