import { toBeInputOfType } from "./toBeInputOfType";
import { toBeRendered } from "./toBeRendered";
import { toBeRenderedWithProps } from "./toBeRenderedWithProps";
import { toContainText } from "./toContainText";
import { toHaveClass } from "./toHaveClass";

expect.extend({ toContainText, toHaveClass, toBeInputOfType, toBeRenderedWithProps, toBeRendered });
