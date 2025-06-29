import { toBeInputOfType } from "./toBeInputOfType";
import { toContainText } from "./toContainText";
import { toHaveClass } from "./toHaveClass";

expect.extend({ toContainText, toHaveClass, toBeInputOfType });
