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

export const form = (id?: string) => element("form") as HTMLFormElement;

export const formElement = <T,>(
  id: string,
  type: new (...args: any[]) => T
) => {
  const item = element(`form > [name=${id}]`);
  if (item instanceof type) {
    return item as T;
  }
  throw new Error(`${id} not found in form children`);
};

export const submit = (formElement: HTMLElement) => {
  const event = new Event("submit", {
    bubbles: true,
    cancelable: true,
  });
  act(() => formElement.dispatchEvent(event));
  return event;
};

export const submitButton = () => element("input[type=submit]");
