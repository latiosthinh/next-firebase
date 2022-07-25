import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseConfig from "./firebase-config";

const authUser = () => {
	const auth = getAuth()
	onAuthStateChanged(auth, user => {
		if (user) {
			return user.uid;
		}

		return ''
	})
}

export default authUser