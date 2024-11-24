import { BadRequestError } from "./customErrors";

export const validateId = (id: string): number => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId) || parsedId <= 0) {
    throw new BadRequestError(`Invalid ID provided`);
  }
  return parsedId;
};
