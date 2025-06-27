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

export const click = (element: HTMLButtonElement | HTMLInputElement) => {
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

type FormFieldTag = "input" | "select";
type FormField = {
  [K in FormFieldTag]: HTMLElementTagNameMap[K];
};

export const field = (
  id: string
  // type: new (...args: any[]) => T
) => {
  const item = element(`form [name=${id}]`);
  if (!item) {
    throw new Error(`${id} not found in form children`);
  }

  const allowedTypes = [HTMLInputElement, HTMLSelectElement];
  for (const x of allowedTypes) {
    if (item instanceof x) {
      return item;
    }
  }

  throw new Error(`${id} not of type <input> or <button>`);
};

export const submit = (formElement: HTMLElement) => {
  const event = new Event("submit", {
    bubbles: true,
    cancelable: true,
  });
  act(() => formElement.dispatchEvent(event));
  return event;
};

export const submitButton = () =>
  element("input[type=submit]") as HTMLButtonElement;

const originalValueProperty = (reactElement: HTMLElement) => {
  const prototype = Object.getPrototypeOf(reactElement);
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
  if (descriptor === undefined) {
    throw new Error(
      `Passed argument has no 'value' property. Argument: ${reactElement}`
    );
  }
  return descriptor;
};

export const change = (target: HTMLElement, value: string) => {
  const descriptor = originalValueProperty(target);
  if (!descriptor.set) {
    throw new Error("Property 'value' doesn't have a 'set()' function");
  }
  descriptor.set.call(target, value);
  const event = new Event("change", {
    bubbles: true,
  });
  act(() => target.dispatchEvent(event));
};

export const labelFor = (fieldName: string) => {
  return element(`label[for=${fieldName}]`);
};

export const clickAndWait = async (
  element: HTMLInputElement | HTMLButtonElement
) => act(async () => click(element));

export const submitAndWait = async (formElement: HTMLElement) =>
  act(async () => submit(formElement));
