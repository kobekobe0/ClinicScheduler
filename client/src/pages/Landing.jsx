import consultant from '../assets/associate.png'
import physician from '../assets/physicians.png'
import surgeon from '../assets/surgeons.png'
import about from '../assets/about.png'
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
            <div className="h-fit w-full bg-lighterDominant justify-center flex text-white pb-32">
                <div className="w-1/2 flex flex-col items-center">
                    <div className="flex flex-col justify-center items-center mt-24">
                        <h2 className="text-5xl">Main Features</h2>
                        <h3 className="text-xl font-normal text-lightGray mt-5">
                            Things you can do with the help of our system.
                        </h3>
                    </div>
                    <div className="flex mt-24 gap-20 justify-center">
                        <div className=" flex flex-col justify-center items-center text-center w-2/5">
                            <div className="p-4 w-fit bg-minor rounded-lg mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100"
                                    height="100"
                                    fill="currentColor"
                                    class="bi bi-headset"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
                                </svg>
                            </div>
                            <h3>Online Booking</h3>
                            <p className="text-lg font-normal">
                                Patients can view available appointments and
                                schedule their appointments online at any time.
                            </p>
                        </div>
                        <div className=" flex flex-col justify-center items-center text-center w-2/5">
                            <div className="p-4 w-fit bg-minor rounded-lg mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100"
                                    height="100"
                                    fill="currentColor"
                                    class="bi bi-journal-album"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M5.5 4a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5zm1 7a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3z" />
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                </svg>
                            </div>
                            <h3>Appointment reminders</h3>
                            <p className="text-lg font-normal">
                                Automated reminders via email, text message, or
                                phone call.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
