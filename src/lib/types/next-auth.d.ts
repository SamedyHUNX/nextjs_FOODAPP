import { DefaultJWT } from "@auth/core/jwt";
import { DefaultUser } from "@auth/core/types";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string | number;
    role: string;
  }
}
