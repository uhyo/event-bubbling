export function assertNever(value: never): never {
  throw new Error(`Never ${value}`);
}
