
import { makeGetProfileController } from "@/application/modules/auth/use-cases/get-profile/factories/make-get-profile-controller";
import { makeHandler } from "@/main/middy/make-handler";

export const handler = makeHandler(makeGetProfileController());
