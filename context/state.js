import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
	const [userId, setUserId] = useState('')
	let userState = {
		userId: userId,
		setUserId: setUserId
	}

	return (
		<AppContext.Provider value={userState}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}