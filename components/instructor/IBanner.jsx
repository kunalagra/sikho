
const IBanner = () => {
    return (
        <main className='banner-image'>
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-75px md:4px">
                            Empower Students to Build <br /> the Future with Tech
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-black">
                            Teach skills with your courses.
                        </p>
                        <div className="mt-5">
                            <button className="w-[200px] bg-purple-1 hover:bg-purple-2 text-white font-bold py-4 px-3 rounded">
                                Create a new plan {'>'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default IBanner;
