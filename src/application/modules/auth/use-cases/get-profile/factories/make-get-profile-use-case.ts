import { makeAuthProvider } from "@/application/shared/providers/auth-provider/factories/make-auth-provider";
import { GetProfileUseCase } from "../get-profile-use-case";

export function makeGetProfileUseCase() {
  return new GetProfileUseCase(makeAuthProvider());
}
