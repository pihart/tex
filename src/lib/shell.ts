import { exec as oldExec } from "shelljs";

export * from "shelljs";

export const exec = (command: string) =>
  new Promise<string>((resolve, reject) =>
    oldExec(command, { async: true }, (code, value, error) => {
      if (error) {
        return reject(new Error(error));
      }
      resolve(value);
    })
  );

export default exec;
