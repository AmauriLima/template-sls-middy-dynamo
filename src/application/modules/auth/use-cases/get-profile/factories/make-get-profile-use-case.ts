import { AwsCognitoAuthProvider } from "@/application/shared/providers/auth-provider/aws-cognito-auth-provider";
import { GetProfileUseCase } from "../get-profile-use-case";

export function makeGetProfileUseCase() {
  return new GetProfileUseCase(new AwsCognitoAuthProvider());
}
