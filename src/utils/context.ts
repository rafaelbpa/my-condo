/* eslint-disable no-spaced-func */
import { createContext } from 'react';
import { DatabaseProps } from './types';

export const DatabaseContext = createContext<
  [DatabaseProps[] | null, (database: DatabaseProps[]) => void]
>([null, () => {}]);

export const ModalContext = createContext<
  [
    boolean,
    (bool: boolean) => void,
    DatabaseProps | undefined,
    (code: DatabaseProps) => void,
  ]
>([false, () => {}, undefined, () => {}]);
