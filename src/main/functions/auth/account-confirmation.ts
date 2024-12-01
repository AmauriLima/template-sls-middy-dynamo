import { AccountConfirmationSchema } from "@/application/modules/auth/use-cases/account-confirmation/account-confirmation-dto";
import { makeAccountConfirmationController } from "@/application/modules/auth/use-cases/account-confirmation/factories/make-account-confirmation-controller";
import { makeHandler } from "@/main/middy/make-handler";

export const handler = makeHandler(makeAccountConfirmationController(), { body: AccountConfirmationSchema });
