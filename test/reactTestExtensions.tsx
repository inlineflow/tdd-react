import { log } from "console";
import { act, ReactNode } from "react";
import { Container, createRoot } from "react-dom/client";

export let container: Container;
export const initializeReactContainer = () => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
};
export const render = (component: ReactNode) =>
  act(() => createRoot(container).render(component));

export const click = (element: HTMLButtonElement) => {
  act(() => element.click());
};
