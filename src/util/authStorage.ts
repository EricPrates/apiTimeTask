import { AuthContext } from "../types/types"
import {AsyncLocalStorage} from 'node:async_hooks';

export const authStorage = new AsyncLocalStorage<AuthContext>();

export const getContext = (): AuthContext | undefined => {
    return authStorage.getStore();
}