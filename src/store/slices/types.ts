export type StateStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type UserRole = 'admin' | 'user';
export type Error = null | string;

export interface UserState {
	status: StateStatus;
	error: Error;
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: UserRole;
}
