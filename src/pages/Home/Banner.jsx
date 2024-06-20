import { useRef } from "react";

const Banner = () => {
    const carouselRef = useRef(null);

    const scrollPrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -carouselRef.current.offsetWidth,
                behavior: "smooth"
            });
        }
    };

    const scrollNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: carouselRef.current.offsetWidth,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="relative">
            <div ref={ carouselRef } className="carousel max-w-full flex overflow-hidden">
                {/* Carousel item 1 */}
                <div className="carousel-item flex-shrink-0 w-full relative">
                    <img
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Carousel Image 1"
                        className="w-full h-[85vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60"></div>

                    <div className="absolute top-1/3 md:top-1/2 left-10 max-w-5xl md:left-20">
                        <div className="text-white lg:text-4xl tracking-widest text-xl py-4 mr-4">We make it simple and match you to scholarships you qualify for.</div>
                        <h1 className="bg-white text-2xl lg:text-4xl font-extrabold tracking-widest mix-blend-screen px-4 lg:px-10 py-2 lg:py-5 text-black w-fit mt-4">Find Scholarships for University</h1>
                    </div>
                </div>

                {/* Carousel item 2 */ }
                <div className="carousel-item flex-shrink-0 w-full relative">
                    <img
                        src="https://www.ppic.org/wp-content/uploads/2021/05/college-graduate-hugging-mother-and-holding-diploma.jpg"
                        alt="Carousel Image 2"
                        className="w-full h-[85vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60"></div>

                    <div className="absolute top-1/3 md:top-1/2 left-10 max-w-5xl md:left-20">
                        <div className="text-white lg:text-4xl tracking-widest text-xl py-4 mr-4">Simplify and focus your application process with the one-stop platform for scholarships.</div>
                        <h1 className="bg-white text-2xl lg:text-4xl font-extrabold tracking-widest mix-blend-screen px-4 lg:px-10 py-2 lg:py-5 text-black w-fit mt-4">The fastest path to earning scholarships</h1>
                    </div>
                </div>

                {/* Carousel item 3 */ }
                <div className="carousel-item flex-shrink-0 w-full relative">
                    <img
                        src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Carousel Image 3"
                        className="w-full h-[85vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60"></div>

                    <div className="absolute top-1/3 md:top-1/2 left-10 max-w-5xl md:left-20">
                        <div className="text-white lg:text-4xl tracking-widest text-xl py-4 mr-4">Secure your educational journey with strategic scholarship opportunities.</div>
                        <h1 className="bg-white text-2xl lg:text-4xl font-extrabold tracking-widest mix-blend-screen px-4 lg:px-10 py-2 lg:py-5 text-black w-fit mt-4">Build your future for tomorrow</h1>
                    </div>
                </div>
            </div>

            {/* Previous Button */}
            <div className="absolute inset-y-0 left-0 flex items-center justify-start pl-2 lg:pl-4">
                <button
                    className="carousel-control-prev bg-primary-800 hover:bg-primary-600 text-text-50 rounded-full p-2 focus:outline-none"
                    onClick={ scrollPrev }
                >
                    <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
            </div>

            {/* Next Button */}
            <div className="absolute inset-y-0 right-0 flex items-center justify-end pr-2 lg:pr-4">
                <button
                    className="carousel-control-next bg-primary-800 hover:bg-primary-600 text-text-50 rounded-full p-2 focus:outline-none"
                    onClick={ scrollNext }
                >
                    <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Banner;