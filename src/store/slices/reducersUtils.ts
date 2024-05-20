import { StateStatus } from './types';
import { stateStatus } from './constants';

export const handlePending = (state: { status: StateStatus }) => {
	state.status = stateStatus.loading;
};

export const handleRejected = (
	state: { status: StateStatus; error: string | null },
	action
) => {
	state.status = stateStatus.failed;
	state.error = action.error.message;
};
