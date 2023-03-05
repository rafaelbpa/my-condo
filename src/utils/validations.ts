import { getParentSubstring } from './helpers';
import { DatabaseProps } from './types';

type EntryData = {
  parentAccount: string;
  code: string;
  database: DatabaseProps[];
};

type ValidationProps = (boolean | string)[];

const checkIfCodeIsUnique = (code: string, database: DatabaseProps[]) => {
  let error = '';
  let isUnique = true;
  const result = database.filter(entry => entry.code === code);
  if (result.length > 0) {
    error = 'Já existe um registro com esse mesmo código';
    isUnique = false;
  }
  return [isUnique, error];
};

const checkIfNotContains999 = (code: string): ValidationProps => {
  let error = '';
  const result = !code.includes('999');
  if (!result) {
    error = 'O código contém um nó maior que 999';
  }
  return [result, error];
};

const isFromCorrectParent = (
  code: string,
  parentAccount: string,
): ValidationProps => {
  const parentSubstring = getParentSubstring(code);
  const parentCode = parentAccount.split(' - ')[0];
  let error = '';
  const result = parentSubstring.includes(parentCode);
  if (!result) {
    error = 'O código não é do mesmo pai.';
  }

  return [result, error];
};

export const validateBeforeSaving = ({
  parentAccount,
  code,
  database,
}: EntryData): ValidationProps => {
  return (
    checkIfNotContains999(code) &&
    isFromCorrectParent(code, parentAccount) &&
    checkIfCodeIsUnique(code, database)
  );
};
