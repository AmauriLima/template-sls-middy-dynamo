
import { makeForgotPasswordController } from "@/application/modules/auth/use-cases/forgot-password/factories/make-forgot-password-controller";
import { forgotPasswordSchema } from "@/application/modules/auth/use-cases/forgot-password/forgot-password-dto";
import { makeHandler } from "@/main/middy/make-handler";

export const handler = makeHandler(makeForgotPasswordController(), { body: forgotPasswordSchema });
