import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { LuClock2 } from "react-icons/lu";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";
export default function News() {
    const context = useContext(ThemeContext);
    AOS.init();
    return (
        <div className={context.theme}>
            <div className="container pb-5">
                <h1 className="text-center py-5">
                    Discover the Beauty of orchids
                </h1>
                <p className="text-center pb-5">
                    Immerse into the world of orchids where enthusiasts and
                    experts alike come together to share knowledge, news, and
                    the pure love for these exotic beauties.
                </p>
                <div className="d-flex justify-content-center mb-5">
                    <button className="border-0 p-2 px-4 me-3 rounded-2 hvr-float-shadow detail_btn">
                        Get Started
                    </button>
                    <button className="border-0 p-2 px-4 rounded-2 hvr-float-shadow detail_btn">
                        Learn more
                    </button>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h4 className="fw-bold">Feature Insights</h4>
                        <p>
                            Delve into the heart of OrchidPulse with exclusive
                            features designed to enrich your orchid appreciation
                            and cultivation journey.
                        </p>
                        <div className="d-flex align-items-start">
                            <div className="me-2 fw-bold">
                                <FaShoppingBag />
                            </div>
                            <div>
                                <h4>Latest News</h4>
                                <p>
                                    Stay up-to-date with breaking news and
                                    in-depth articles about orchids from around
                                    the world.
                                </p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start">
                            <div className="me-2 fw-bold">
                                <IoMail />
                            </div>
                            <div>
                                <h4>Expert Tips</h4>
                                <p>
                                    Receive tailored advice from orchid
                                    specialists to nurture your plants to
                                    perfect bloom.
                                </p>
                            </div>
                        </div>
                        <div className="d-flex align-items-start">
                            <div className="me-2 fw-bold">
                                <FaBell />
                            </div>
                            <div>
                                <h4>Community Hub</h4>
                                <p>
                                    Connect with fellow orchid lovers, join
                                    discussions, and share your experiences in
                                    our vibrant community.
                                </p>
                            </div>
                        </div>
                        <button className="border-0 p-2 px-4 me-3 rounded-2 hvr-float-shadow detail_btn">
                            More info
                        </button>
                    </div>
                    <div className="col-12 col-md-6">
                        <img
                            className="w-100 object-fit-contain"
                            src="../assets/images/news.jpeg"
                        />
                    </div>
                </div>
                <h3>Our Specialties</h3>
                <p className="my-4">
                    Explore handpicked topics and understand the allure and
                    complexity of different orchid varieties that make them so
                    irresistible.
                </p>
                <div className="row justify-content-around">
                    <div className="col-12 col-lg-3 mb-5 rounded-4 blue__color p-3" data-aos="zoom-out-up" >
                        <div className="text-white my-3">
                            <MdOutlineLocalFireDepartment />
                        </div>
                        <h4 className="text-white my-2">Orchid Care</h4>
                        <p className="text-white mb-3">
                            Master the art of orchid care with our step-by-step
                            guides and resources, ensuring your orchids thrive
                        </p>
                        <button className="border-0 p-2 px-4 me-3 rounded-2 hvr-float-shadow detail_btn">
                            Read guides
                        </button>
                    </div>

                    <div className="col-12 col-lg-3 mb-5 rounded-4 blue__color p-3" data-aos="zoom-out-up" >
                        <div className="text-white my-3">
                            <LuClock2 />
                        </div>
                        <h4 className="text-white my-2">Photo Gallery</h4>
                        <p className="text-white mb-3">
                            Feast your eyes on our curated gallery showcasing
                            the stunning diversity and beauty of orchids in full
                            bloom.
                        </p>
                        <button className="border-0 p-2 px-4 me-3 rounded-2 hvr-float-shadow detail_btn">
                            Read guides
                        </button>
                    </div>
                    <div className="col-12 col-lg-3 mb-5 rounded-4 blue__color p-3" data-aos="zoom-out-up" >
                        <div className="text-white my-3">
                            <MdOutlineLocalFireDepartment />
                        </div>
                        <h4 className="text-white my-2">Events</h4>
                        <p className="text-white mb-3">
                            Discover local and international orchid-related
                            events, from shows to workshops, and mark your
                            calendar for these exciting meet-ups.
                        </p>
                        <button className="border-0 p-2 px-4 me-3 rounded-2 hvr-float-shadow detail_btn">
                            Read guides
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
