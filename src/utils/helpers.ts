import { DatabaseProps } from './types';

export const filterNames = (data: DatabaseProps[]) => {
  return data.filter(account => account.acceptReleases === 'Não');
};

export const getCodeSuggestion = (
  parentCode: string,
  data: DatabaseProps[],
) => {
  const childrenCodes = data.filter(child => {
    if (child.code.startsWith(`${parentCode}.`)) {
      return child.code;
    }
  });
  const codes = childrenCodes.map(child => child.code);
  return getNextProductCode(parentCode, codes);
};

const getNextProductCode = (code: string, existingCodes: string[]): string => {
  if (existingCodes.length === 0) {
    return `${code}.1`;
  }

  const parts = existingCodes[existingCodes.length - 1].split('.');
  const lastPart = parts.pop();
  const parent = parts.join('.');
  let nextLastPart = parseInt(lastPart ?? '0', 10) + 1;

  if (nextLastPart > 999) {
    const parentParts = parent.split('.');
    const lastParentPart = parentParts.pop();
    const nextParentPart = parseInt(lastParentPart ?? '0', 10) + 1;
    const nextParent = parentParts.join('.') + '.' + nextParentPart;
    nextLastPart = 1;
    return getNextProductCode(nextParent + '.' + nextLastPart, existingCodes);
  } else {
    const nextCode = parent + '.' + nextLastPart;
    if (existingCodes.includes(nextCode)) {
      return getNextProductCode(nextCode, existingCodes);
    } else {
      return nextCode;
    }
  }
};

export const getLastSubstring = (str: string) => {
  const lastDotIndex = str.lastIndexOf('.');

  if (lastDotIndex === -1) {
    return str;
  }
  return str.slice(lastDotIndex + 1);
};

export const getParentSubstring = (str: string) => {
  const lastDotIndex = str.lastIndexOf('.');

  if (lastDotIndex === -1) {
    return str;
  }
  return str.slice(0, lastDotIndex);
};

export const addNewRegister = (
  value: DatabaseProps,
  database: DatabaseProps[],
) => {
  //
  let indexToFindOut: number | null = null;
  const prefix = getParentSubstring(value.code);

  if (database.length === 0) {
    indexToFindOut = 0;
  }

  database.map((data, index) => {
    if (data.code.startsWith(prefix)) {
      let lastFromParent = getLastSubstring(data.code);
      let current = getLastSubstring(value.code);
      if (
        index !== 0 &&
        parseInt(lastFromParent, 10) + 1 === parseInt(current, 10)
      ) {
        indexToFindOut = index + 1;
      }
      if (prefix.length + 2 === value.code.length) {
        indexToFindOut = index + 1;
      }
    }
  });

  if (indexToFindOut) {
    database.splice(indexToFindOut, 0, value);
  } else {
    console.log('nao achei index');
  }

  return database;
};

export const deleteRegister = (
  item: DatabaseProps,
  database: DatabaseProps[],
) => {
  let indexToFindOut: number | null = null;

  database.map((data, index) => {
    if (data.code === item.code) {
      indexToFindOut = index;
    }
  });
  if (indexToFindOut !== null) {
    database.splice(indexToFindOut, 1);
  }
  return database;
};

export const getParentAccount = (code: string, database: DatabaseProps[]) => {
  const prefix = getParentSubstring(code);
  const result = database.filter(data => {
    if (data.code.startsWith(prefix)) {
      return data;
    }
  });
  if (result.length === 0) {
    return '';
  }
  return result[0].code;
};
