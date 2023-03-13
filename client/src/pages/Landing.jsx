function Landing() {
    return (
        <div className="bg-dominant font-inter w-full h-fit text-3xl font-bold flex flex-col items-center">
            {' '}
            {/* top portion */}
            <div className="flex flex-col w-1/2 items-center h-fit bg-dominant mb-60">
                <div className="text-white flex py-10 w-full justify-between">
                    <div>
                        <h1>Startup</h1>
                    </div>
                    <div className="w-fit">
                        <ul className="font-normal flex text-xl gap-7">
                            <li>Careers</li>
                            <li>Services</li>
                            <li>About us</li>
                        </ul>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center mt-28">
                    <div className="flex flex-col items-center">
                        <h2 className="text-white text-5xl">
                            Your health matters
                        </h2>

                        <p className="text-white text-xl font-semibold text-center w-2/3 mt-5">
                            Scheduling your healthcare appointments has never
                            been easier. With our user-friendly platform, you
                            can quickly and easily book appointments with your
                            healthcare provider and manage your healthcare
                            schedule all in one place.
                        </p>
                    </div>
                    <div className="flex w-1/2 items-center justify-center mt-12 text-lg font-semibold">
                        <div className="flex items-center w-full justify-center">
                            <div className="text-white gap-4 w-full flex items-center justify-center">
                                <button className="px-6 py-3 bg-sub rounded-lg w-1/3">
                                    Get Started
                                </button>
                                <button className="px-6 py-3 bg-minor rounded-lg w-1/3">
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*second portion*/}
            <div className="h-screen w-full bg-lighterDominant justify-center flex text-white">
                <div className="w-1/2 flex flex-col items-center">
                    <div className="flex flex-col justify-center items-center mt-24">
                        <h2 className="text-5xl">Main Features</h2>
                        <h3 className="text-xl font-normal text-lightGray mt-5">
                            Things you can do with the help of our system.
                        </h3>
                    </div>
                    <div>
                        <div>
                            <svg
                                viewBox="-256 -256 1536.00 1536.00"
                                class="icon"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                stroke="#000000"
                                stroke-width="37.888"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M484 1008.8H480c-33.6-1.6-63.2-25.6-72-59.2-10.4-40 10.4-80.8 49.6-95.2 8.8-3.2 18.4-4.8 27.2-4.8 30.4 0 58.4 17.6 71.2 44.8 3.2 6.4 7.2 7.2 9.6 7.2h3.2c135.2-22.4 235.2-96 297.6-218.4 0.8-0.8 0.8-2.4 1.6-4l2.4-6.4-7.2 0.8-4.8 0.8c-3.2 0-4.8 0.8-7.2 0.8h-6.4c-59.2 0-107.2-48-107.2-107.2V457.6c0-59.2 48-107.2 107.2-107.2h6.4c7.2 0 13.6 2.4 20.8 4 3.2 0.8 7.2 1.6 10.4 2.4l2.4 0.8 6.4 2.4-1.6-7.2C856 212 718.4 68 522.4 63.2H512c-200 0-341.6 144.8-378.4 288l-1.6 6.4 6.4-1.6c2.4-0.8 4.8-0.8 7.2-1.6 5.6-1.6 10.4-3.2 16-4 5.6-0.8 12-1.6 17.6-1.6 50.4 0 96.8 38.4 104.8 88 0.8 6.4 1.6 14.4 1.6 22.4v108c0 52-34.4 94.4-85.6 105.6-7.2 1.6-14.4 2.4-21.6 2.4-52 0-96.8-38.4-105.6-88.8-0.8-7.2-1.6-12.8-1.6-18.4v-32c0-28-0.8-56.8 0-84.8 3.2-140.8 61.6-256.8 172-344 55.2-44 120-72 192-84.8 35.2-6.4 72-8.8 107.2-5.6 5.6 0.8 12 0.8 17.6 1.6 62.4 6.4 120.8 25.6 172.8 56.8 104.8 61.6 173.6 152.8 205.6 269.6 9.6 34.4 14.4 71.2 14.4 109.6V567.2c0 16.8-4 32.8-11.2 49.6-2.4 4.8-4 10.4-4.8 16-0.8 1.6-0.8 4-1.6 5.6-46.4 156-174.4 273.6-333.6 306.4-9.6 1.6-20 4-32.8 5.6-6.4 0.8-8 4.8-9.6 8-12.8 29.6-41.6 50.4-75.2 50.4z m362.4-612h-6.4c-31.2 3.2-53.6 28.8-53.6 59.2V567.2c0 4.8 0.8 9.6 1.6 14.4 6.4 27.2 30.4 46.4 57.6 46.4 2.4 0 4.8 0 7.2-0.8 31.2-4 53.6-28.8 53.6-59.2V456.8c0-4.8-0.8-9.6-1.6-13.6-7.2-27.2-31.2-46.4-58.4-46.4z m-668 0c-33.6 0-59.2 26.4-59.2 60v109.6c0 4.8 0.8 9.6 1.6 13.6 6.4 27.2 30.4 46.4 57.6 46.4h6.4c31.2-3.2 53.6-28.8 53.6-59.2V456.8c-0.8-33.6-26.4-60-60-60z"
                                        fill="#666666"
                                    ></path>
                                </g>
                            </svg>
                            <h3>Online booking</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
