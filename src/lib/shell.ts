import { exec as oldExec } from "shelljs";

export * from "shelljs";

export const exec = (
  command: string,
  shouldReject: (params: {
    code: number;
    value: string;
    error: string;
  }) => boolean = ({ error }) => !!error
) =>
  new Promise<string>((resolve, reject) =>
    oldExec(command, { async: true }, (code, value, error) => {
      if (shouldReject({ code, value, error })) {
        reject(new Error(error));
      } else {
        resolve(value);
      }
    })
  );
