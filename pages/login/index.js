import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react'
import { useAppContext } from "../../context/state"
import { initializeApp } from "firebase/app"
import firebaseConfig from "../api/firebase-config"
import Link from 'next/link'
import Router from 'next/router'

export default function Login() {
	const context = useAppContext()
	const app = initializeApp(firebaseConfig)
	const auth = getAuth(app)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		if ( context.userId ) {
			Router.push('/')
		}
	})

	const handleSubmit = e => {
		e.preventDefault()

		if ( !email || !password ) {
			return
		}

		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user
				onAuthStateChanged(auth, user => {
					if (user) {
						context.setUserId(user.uid)
					} else {}
				})
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(errorMessage)
			});
	}

	return (
		<div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
			<h2>Login with your email and password</h2>

			<form onSubmit={handleSubmit}>
				<div className="form-group mb-6">
					<label htmlFor="email" className="form-label inline-block mb-2 text-gray-700">Email address</label>
					<input type="email"
						aria-describedby="email"
						placeholder="Enter email"
						id="email"
						onChange={e => setEmail(e.target.value)}
						className="form-control
							block w-full
							m-0 px-3 py-1.5 
							text-gray-700 text-base font-normal
							bg-white bg-clip-padding
							border-gray-300 border border-solid rounded
							focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
							transition ease-in-out"
						/>
				</div>
				<div className="form-group mb-6">
					<label htmlFor="exampleInputPassword1" className="form-label inline-block mb-2 text-gray-700">Password</label>
					<input type="password"
						placeholder="Password"
						id="exampleInputPassword1"
						onChange={e => setPassword(e.target.value)}
						className="form-control
							block w-full
							m-0 px-3 py-1.5
							text-gray-700 text-base font-normal
							bg-white bg-clip-padding
							border-gray-300 border border-solid rounded
							focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
							transition ease-in-out"
						/>
				</div>
				<div className="flex justify-between items-center">
					<button type="submit"
							className=" px-6 py-2.5 rounded shadow-md 
								bg-blue-600
								text-white font-medium text-xs leading-tight uppercase
								hover:bg-blue-700 hover:shadow-lg
								focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
								active:bg-blue-800 active:shadow-lg
								transition duration-150 ease-in-out">
						Submit
					</button>

					<Link href="/register">
						<a className="underline hover:text-blue-500">Register</a>
					</Link>
				</div>
			</form>
		</div>
	)
}