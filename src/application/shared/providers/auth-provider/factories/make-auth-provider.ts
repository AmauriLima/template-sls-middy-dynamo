import { cognitoClient } from "@/application/shared/infra/clients/cognito-client";
import { AwsCognitoAuthProvider } from "../aws-cognito-auth-provider/aws-cognito-auth-provider";

export function makeAuthProvider() {
  return new AwsCognitoAuthProvider(cognitoClient);
}
