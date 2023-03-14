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
        </div>
    )
}

export default Landing
