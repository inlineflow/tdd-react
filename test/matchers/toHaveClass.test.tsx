import { toHaveClass } from "./toHaveClass";

describe("toHaveClassMatcher", () => {
  it("matches the class of an element", () => {
    const button = document.createElement("button");
    button.classList.add("toggled");

    expect(button).toHaveClass("toggled");
  });

  it("doesn't match the class of an element if negated", () => {
    const button = document.createElement("button");
    button.classList.add("untoggled");

    expect(button).not.toHaveClass("toggled");
  });
});
