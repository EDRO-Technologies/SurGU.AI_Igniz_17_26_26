// eslint-disable-next-line @typescript-eslint/consistent-type-imports
type ReactTagProps<T extends "svg"> = import("react").ComponentProps<T>;

interface IBaseResponse {
  success: boolean;
  message: string;
}
