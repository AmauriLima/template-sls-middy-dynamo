import { makeSignInController } from "@/application/modules/auth/use-cases/sign-in/factories/make-sign-in-controller";
import { SignInSchema } from "@/application/modules/auth/use-cases/sign-in/sign-in-dto";
import { makeHandler } from "@/main/middy/make-handler";

export const handler = makeHandler(makeSignInController(), { body: SignInSchema });
