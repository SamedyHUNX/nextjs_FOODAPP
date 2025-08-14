import z from "zod";
import { patterns } from "./constants";

const regexSchema = (pattern: RegExp) => z.coerce.string().regex(pattern);
const requiredStringSchema = z.string().min(1).max(255).trim();

const passwordSchema = z
  .string()
  .max(255)
  .refine((str) => patterns.minimumOneUpperCaseLetter.test(str), {
    message: "Minimum one upper case letter",
  });

export { requiredStringSchema, regexSchema, passwordSchema };
