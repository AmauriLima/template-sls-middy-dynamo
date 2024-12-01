
import { makeResetPasswordController } from "@/application/modules/auth/use-cases/reset-password/factories/make-reset-password-controller";
import { resetPasswordSchema } from "@/application/modules/auth/use-cases/reset-password/reset-password-dto";
import { makeHandler } from "@/main/middy/make-handler";

export const handler = makeHandler(makeResetPasswordController(), { body: resetPasswordSchema });
