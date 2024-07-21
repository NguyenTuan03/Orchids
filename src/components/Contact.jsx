import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
export default function Contact() {
  const context = useContext(ThemeContext);
    return (
      <div className={context.theme}>
        <div className="container pb-5">
            <div className="row">
                <div className="col-12 col-lg-6">
                    <h1 className="mt-5">Contact Us</h1>
                    <p className="text-lowercase">
                        LET CONNECT: WE HERE TO HELP, AND WE WOULD LOVE TO HEAR
                        FROM YOU! WHETHER YOU HAVE A QUESTION, A COMMENT, OR
                        JUST WANT TO CHAT, YOU CAN REACH OUT TO US THROUGH THE
                        CONTACT FORM ON THIS PAGE, OR BY PHONE, EMAIL, OR SOCIAL
                        MEDIA.
                    </p>
                    <div className="d-flex flex-column flex-lg-row mb-4">
                        <button className="w-100 border-0 mb-3 mb-lg-0 p-2 w-150 me-3 rounded-2 hvr-float-shadow detail_btn">
                            <IoChatbubbleEllipsesOutline /> Via support chat
                        </button>
                        <button className="w-100 border-0 p-2 w-150 me-3 rounded-2 hvr-float-shadow detail_btn">
                            <CiPhone />
                            Via Call
                        </button>
                    </div>
                    <form>
                        <p>Or you can send Email</p>
                        <div className="mb-3">
                            <label
                                form="exampleFormControlInput1"
                                className="form-label"
                            >
                                Name
                            </label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label
                                form="exampleFormControlInput1"
                                className="form-label"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                form="exampleFormControlTextarea1"
                                className="form-label"
                            >
                                Wite your description here
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                            ></textarea>
                        </div>
                        <button className="border-0 p-2 w-150 me-3 rounded-2 hvr-float-shadow detail_btn">
                            Send email form
                        </button>
                    </form>
                </div>
                <div className="col-12 col-lg-6">
                    <img
                        className="w-100 contact__img mt-5"
                        src="/assets/images/contact.jpg"
                    />
                </div>
            </div>
        </div>
      </div>
    );
}
