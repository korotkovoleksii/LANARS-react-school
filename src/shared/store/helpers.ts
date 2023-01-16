import { AnyAction } from '@reduxjs/toolkit';
import { Status } from 'shared/helpers/statusRequstRTK';

const hasPrefix = (action: AnyAction, prefix: string) =>
  action.type.startsWith(prefix);
const isPending = (action: AnyAction) => action.type.endsWith('/pending');
const isFulfilled = (action: AnyAction) => action.type.endsWith('/fulfilled');
const isRejected = (action: AnyAction) => action.type.endsWith('/rejected');

export const isPendingAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isPending(action);
};

export const isRejectedAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isRejected(action);
};

export const isFulfilledAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => {
  return hasPrefix(action, prefix) && isFulfilled(action);
};

export const rejectedAction = (state: { status: string; error: string | null }, action: AnyAction): void => {
  state.status = Status.Error;
  state.error = action.payload.message;
};
export const pendingAction = (state: { status: string; error: string | null }): void => {
  state.status = Status.Loading;
  state.error = null;
};
export const fulfilledAction = (state: { status: string; error: string | null }): void => {
  state.status = Status.Finished;
  state.error = null;
};
