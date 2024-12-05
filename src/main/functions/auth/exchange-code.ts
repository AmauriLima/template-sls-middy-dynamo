import { exchangeCodeSchema } from "@/application/modules/auth/use-cases/exchange-code/exchange-code-dto";
import { makeExchangeCodeController } from "@/application/modules/auth/use-cases/exchange-code/factories/make-exchange-code-controller";
import { makeHandler } from "@/main/middy/make-handler";

export const handler = makeHandler(makeExchangeCodeController(), { query: exchangeCodeSchema });
