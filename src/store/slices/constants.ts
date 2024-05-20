import { StateStatus, UserRole } from './types';

export const adminCredentials = {
	email: 'admin@email.com',
};

export const stateStatus: { [key in StateStatus]: StateStatus } = {
	idle: 'idle',
	loading: 'loading',
	succeeded: 'succeeded',
	failed: 'failed',
};

export const userRole: { [key in UserRole]: UserRole } = {
	admin: 'admin',
	user: 'user',
};
