import { secondFunction } from "@internal/second";

export function firstFunction() {
  console.log("This is first function.");
  secondFunction();
}
