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

export const element = (query: string) => document.querySelector(query);

export const elements = (query: string) => [
  ...document.querySelectorAll(query),
];
export const textOf = (items: Element[]) => items.map((i) => i.textContent);
type inputType = HTMLInputElement | HTMLButtonElement;
export const typesOf = (items: inputType[]) => items.map((i) => i.type);
