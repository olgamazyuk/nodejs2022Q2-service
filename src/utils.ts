import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const validateId = (uuid: string) => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};
