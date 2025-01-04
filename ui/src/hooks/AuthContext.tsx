import React, { createContext, useState, useEffect, useCallback } from 'react';
import apiClient, { apis } from '../api/client';
import { isErrorFromAlias } from '@zodios/core';
import { signup } from '../components/auth/types/auth.types';

type Props = {
	children?: React.ReactNode;
};

export enum AuthStatus {
	Loading,
	SignedIn,
	SignedOut,
}

export interface IAuthContext {
	authenticated: boolean;
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	signup: (payload: signup) => Promise<void>;
}

interface User {
	id: number;
	username: string;
}

const initialValue: IAuthContext = {
	user: null,
	authenticated: false,
	login: async () => {},
	logout: () => {},
	signup: async () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: Props) => {
	const [token, setToken] = useState(() => localStorage.getItem('token'));
	const [authenticated, setAuthenticated] = useState(() => !!token);
	const [user, setUser] = useState<User | null>(null);

	const login = useCallback(async (email: string, password: string) => {
		try {
			const response = await apiClient.login({
				identifier: email,
				password,
			});
			const { token } = response?.data;
			setToken(token);
			setAuthenticated(true);
			localStorage.setItem('token', token);
		} catch (error) {
			if (
				isErrorFromAlias(apis, 'login', error) &&
				error.response?.status === 401
			) {
				throw error.response.data;
			}
			throw new Error('Something went wrong');
		}
	}, []);

	const signup = useCallback(async (payload: signup) => {
		try {
			const response = await apiClient.signup(payload);
			const { token, user } = response?.data;
			setToken(token);
			setUser(user);
			setAuthenticated(true);
			localStorage.setItem('token', token);
		} catch (error) {
			if (
				isErrorFromAlias(apis, 'signup', error) &&
				error.response?.status === 500
			) {
				throw error.response.data;
			}
			throw new Error('Something went wrong');
		}
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setAuthenticated(false);
		localStorage.removeItem('token');
	}, []);

	useEffect(() => {
		const token = localStorage.getItem('token');
		setAuthenticated(!!token);
	}, [token]);

	return (
		<AuthContext.Provider
			value={{ user, authenticated, login, logout, signup }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
