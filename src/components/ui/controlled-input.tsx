import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import cn from "clsx";
import { Label } from "@radix-ui/react-label"; // Fixed import
import { Input } from "./input";

type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  containerClassName?: string; // Fixed typo
} & ComponentProps<"input">;

const ControlledInput = <T extends FieldValues>({
  className,
  type,
  name,
  label,
  containerClassName, // Fixed typo
  ...props
}: ControlledInputProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div className={cn("w-full", containerClassName)}>
      {!!label && (
        <Label className="mb-2" htmlFor={name}>
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              type={type}
              id={name}
              data-slot="input"
              aria-invalid={!!error}
              className={className}
              {...field}
              {...props}
            />
            {!!error && (
              <p className="text-destructive text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export { ControlledInput };