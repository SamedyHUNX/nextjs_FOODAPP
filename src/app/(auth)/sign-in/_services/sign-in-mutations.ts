"use server";

import { executeAction } from "@/lib/executeAction";
import { signInSchema, SignInSchema } from "../_types/signInSchema";
import { signIn as authSignin, signOut as authSignOut } from "@/lib/auth";

const signIn = async (data: SignInSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = signInSchema.parse(data);
      await authSignin("credentials", validatedData);
    },
  });
};

const signOut = () => {
  return executeAction({
    actionFn: authSignOut,
  });
};

export { signIn, signOut };
