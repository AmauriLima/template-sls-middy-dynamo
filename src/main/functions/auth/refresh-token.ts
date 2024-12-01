import { makeRefreshTokenController } from "@/application/modules/auth/use-cases/refresh-token/factories/make-refresh-token-controller";
import { RefreshTokenSchema } from "@/application/modules/auth/use-cases/refresh-token/refresh-token-dto";
import { makeHandler } from "@/main/middy/make-handler";

export const handler = makeHandler(makeRefreshTokenController(), { body: RefreshTokenSchema });
