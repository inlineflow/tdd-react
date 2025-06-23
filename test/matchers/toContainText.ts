export const toContainText = (received: HTMLElement, expectedText: string) => {
    pass: received.textContent === null ? false : received.textContent.includes(expectedText);
}