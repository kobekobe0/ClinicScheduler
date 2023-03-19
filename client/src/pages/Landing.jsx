import consultant from '../assets/associate.png'
import physician from '../assets/physicians.png'
import surgeon from '../assets/surgeons.png'
import about from '../assets/about.png'
function Landing() {
    return (
        <div className="bg-dominant font-inter w-full h-fit text-3xl font-bold flex flex-col items-center">
            {' '}
            {/* top portion */}
            <div className="flex flex-col w-1/2 items-center h-fit bg-dominant mb-60 -xl:w-full">
                <div className="text-white flex py-10 w-full justify-between -xl:px-12">
                    <div>
                        <h1>Startup</h1>
                    </div>
                    <div className="w-fit -md:hidden">
                        <ul className="font-normal flex text-xl gap-7">
                            <li>Careers</li>
                            <li>Services</li>
                            <li>About us</li>
                        </ul>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center mt-28">
                    <div className="flex flex-col items-center">
                        <h2 className="text-white text-5xl -xl:text-4xl">
                            Your health matters
                        </h2>

                        <p className="text-white text-xl font-semibold text-center w-2/3 mt-5 -xl:font-normal -lg:text-lg">
                            Scheduling your healthcare appointments has never
                            been easier. With our user-friendly platform, you
                            can quickly and easily book appointments with your
                            healthcare provider and manage your healthcare
                            schedule all in one place.
                        </p>
                    </div>
                    <div className="flex w-1/2 items-center justify-center mt-12 text-lg font-semibold">
                        <div className="flex items-center w-full justify-center">
                            <div className="text-white gap-4 w-full flex items-center justify-center -lg:flex-col -md:text-base">
                                <button className="px-6 py-3 bg-sub rounded-lg w-fit">
                                    Get Started
                                </button>
                                <button className="px-6 py-3 bg-minor rounded-lg w-fit">
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
                        <h2 className="text-5xl -lg:text-2xl">Main Features</h2>
                        <h3 className="text-xl font-normal text-lightGray mt-5 -lg:text-lg -lg:text-center">
                            Things you can do with the help of our system.
                        </h3>
                    </div>
                    <div className="flex mt-24 gap-20 justify-center -lg:flex-col">
                        <div className=" flex flex-col justify-center items-center text-center w-2/5 -lg:w-full">
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
                            <h3 className="-lg:text-2xl">Online Booking</h3>
                            <p className="text-lg font-normal -lg:text-base mt-4">
                                Patients can view available appointments and
                                schedule their appointments online at any time.
                            </p>
                        </div>
                        <div className=" flex flex-col justify-center items-center text-center w-2/5 -lg:w-full">
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
                            <h3 className="-lg:text-2xl">
                                Appointment reminders
                            </h3>
                            <p className="text-lg font-normal mt-4 -lg:text-base">
                                Automated reminders via email, text message, or
                                phone call.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/*third portion*/}
            <div className="h-fit w-full bg-dominant justify-center flex text-white">
                <div className="w-1/2 flex flex-col items-center -lg:w-full -lg:px-12">
                    <div className="flex flex-col justify-center items-center mt-24">
                        <h2 className="text-5xl -lg:text-2xl">
                            For professionals
                        </h2>
                        <h3 className="text-xl font-normal text-lightGray mt-5 -lg:text-center -lg:text-lg">
                            We are currently looking for:
                        </h3>
                    </div>
                    <div className="mt-10 bg-lighterDominant p-5 rounded-lg">
                        <div className="flex align-center justify-center h-fit -md:flex-col gap-5 -md:items-center -md:text-center">
                            <img
                                src={consultant}
                                alt="consultant"
                                style={{ width: '140px', height: 'auto' }}
                                className=" object-contain"
                            />
                            <div className="justify-center flex flex-col gap-5">
                                <h4 className="text-2xl">Junior consultants</h4>
                                <p className="text-base font-normal">
                                    A junior consultant is an entry-level
                                    position in a consulting firm responsible
                                    for assisting senior consultants with
                                    research, analysis, and client
                                    communication. They conduct research on
                                    industry trends, competitors, and best
                                    practices and present findings in reports.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 bg-lighterDominant p-5 rounded-lg text-start">
                        <div className="flex align-center justify-center h-fit -md:flex-col gap-5 -md:items-center -md:text-center">
                            <img
                                src={surgeon}
                                alt="consultant"
                                style={{ width: '140px', height: 'auto' }}
                                className="object-contain"
                            />
                            <div className="justify-center flex flex-col mr-4 gap-5">
                                <h4 className="text-2xl">Surgeons</h4>
                                <p className="text-base font-normal">
                                    Surgeons perform surgeries to treat
                                    injuries, diseases, and deformities. They
                                    collaborate with other healthcare
                                    professionals and undergo extensive training
                                    to become licensed professionals in
                                    hospitals and clinics.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 bg-lighterDominant p-5 rounded-lg">
                        <div className="flex align-center justify-center h-fit -md:flex-col gap-5 -md:items-center -md:text-center">
                            <img
                                src={physician}
                                alt="consultant"
                                style={{ width: '140px', height: 'auto' }}
                                className="object-contain"
                            />
                            <div className="justify-center flex flex-col gap-5">
                                <h4 className="text-2xl">Physicians</h4>
                                <p className="text-base font-normal">
                                    Physicians are medical professionals who
                                    diagnose and treat illnesses and injuries.
                                    They work in a variety of settings,
                                    including hospitals, clinics, and private
                                    practices. Physicians may specialize in a
                                    particular area of medicine, such as
                                    cardiology or pediatrics.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex p-12 text-lightGray mb-10 -lg:flex-col text-center">
                        <h3 className="text-lg font-medium -lg:text-sm -md:text-xs">
                            You may send your CVs here :
                        </h3>
                        <i className="text-lg font-medium -lg:text-sm">
                            {' '}
                            kobebrian.santos.e@gmail.com{' '}
                        </i>
                    </div>
                </div>
            </div>
            {/*fourth*/}
            <div className="h-screen w-full justify-center flex text-white bg-lighterDominant">
                <div className="w-1/2 flex flex-col items-center -lg:w-full -lg:text-center -lg: px-5">
                    <div className="flex flex-col justify-center items-center mt-24">
                        <h2 className="text-5xl -lg:text-2xl">About</h2>
                        <h3 className="text-xl font-normal text-lightGray mt-5 -lg:text-lg">
                            Who are we?
                        </h3>
                    </div>
                    <div className="mt-10">
                        <img
                            src={about}
                            alt=""
                            style={{
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                            }}
                            className="bg-dominant p-2"
                        />
                    </div>
                    <div className="h-full">
                        <p className="text-lg font-normal  -lg:text-base">
                            Our hospital scheduling website is a platform
                            designed to make healthcare scheduling easier and
                            more convenient for patients and healthcare
                            providers. We understand the challenges that come
                            with scheduling healthcare appointments, and our
                            mission is to provide a simple, user-friendly
                            solution to address these challenges.
                            <br />
                            <br />
                            Our team is comprised of healthcare and technology
                            experts who have extensive experience in developing
                            innovative solutions to improve the healthcare
                            industry. We are passionate about providing patients
                            with access to high-quality healthcare services and
                            empowering healthcare providers to manage their
                            schedules more efficiently.
                            <br />
                            <br />
                            Our platform is built with patient privacy and
                            security in mind, and we adhere to the highest
                            standards of data protection. We are committed to
                            providing excellent customer service and support,
                            and we are always looking for ways to improve our
                            platform and services. Thank you for choosing our
                            hospital scheduling website for your healthcare
                            scheduling needs. We look forward to serving you and
                            helping you manage your healthcare schedule with
                            ease.
                        </p>
                    </div>
                </div>
            </div>
            <div className="h-fit w-full justify-center flex text-white bg-dominant">
                <div className="p-24">
                    <h5 className="text-lg font-semibold">
                        All rights reserved © 2023
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Landing
