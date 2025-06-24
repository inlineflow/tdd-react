export { }

declare global {
    namespace jest {
        interface Matchers<R> {
            toContainText: (expectedText: string) => R;
            toHaveClass: (expectedClass: string) => R;
        }
    }
}
