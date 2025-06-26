describe("toBeInputOfTypeMatcher", () => {
  it("matches input's type", () => {
    const element = document.createElement("input");
    element.type = "text";

    expect(element).toBeInputOfType("text");
  });

  it("doesn't match when the types differ", () => {
    const element = document.createElement("input");
    element.type = "text";

    expect(element).not.toBeInputOfType("radio");
  });

  it("doesn't match elements that are not inputs", () => {
    const element = document.createElement("select");
    // element.type = "radio";
    expect(element).not.toBeInputOfType("text");
  });
});
