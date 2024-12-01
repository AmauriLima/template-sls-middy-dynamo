import { makeSignUpController } from "@/application/modules/auth/use-cases/sign-up/factories/make-sign-up-controller";
import { SignUpSchema } from "@/application/modules/auth/use-cases/sign-up/sign-up-dto";
import { makeHandler } from "@/main/middy/make-handler";

export const handler = makeHandler(makeSignUpController(), { body: SignUpSchema });
