import React from 'react'

function LoginForm() {
    return (
        <div className="max-w-4xl ">
            <div className=" rounded-xl p-8 shadow-lg w-[500px] ">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">

                            <input
                                type="email"
                                id="email"
                                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-700 bg-gray-50"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">

                            <input
                                type="password"
                                id="password"
                                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-700 bg-gray-50"
                                placeholder="Enter your password"

                            />
                            <div className="text-end mt-4">
                                <a href="#" className="text-sm text-black hover:underline">Forgot password?</a>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-black  text-white font-semibold rounded-lg shadow-md transition duration-200">Login</button>

                    <div className="text-center mt-4 text-gray-700">
                        <p>Dont have account?&nbsp;
                            <a href="#" className="text-sm text-black hover:underline">Signup</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm