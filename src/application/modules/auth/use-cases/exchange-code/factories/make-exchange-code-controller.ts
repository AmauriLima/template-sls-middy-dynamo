import { ExchangeCodeController } from "../exchange-code-controller";
import { makeExchangeCodeUseCase } from "./make-exchange-code-use-case";

export function makeExchangeCodeController() {
  return new ExchangeCodeController(makeExchangeCodeUseCase());
}
