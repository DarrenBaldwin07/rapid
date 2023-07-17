import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Box from "./Box";

describe("Box", () => {
  it("should render default correctly", () => {
    const { container } = render(<Box />);
    expect(container).toMatchSnapshot();
  });
});
