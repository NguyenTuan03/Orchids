import { useContext } from "react";
import { CiTwitter, CiLinkedin, CiFacebook } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { ThemeContext } from "./ThemeContext";
export default function Footer() {
  const context = useContext(ThemeContext);
    return (
      <div className={context.theme}>
        <div className="ft p-3 py-3 border-top pt-5">
            <div className="container d-flex flex-column align-items-center flex-md-row justify-content-md-around">
                <div className="">
                    <p>Copyright@2024 - Nguyen Anh Tuan</p>
                    <h2 className="text-center">umso</h2>
                    <div className="social text-center mb-4">
                        <CiTwitter className="me-2" />
                        <CiLinkedin className="me-2" />
                        <CiFacebook className="me-2" />
                        <FaGithub className="me-2" />
                        <FaInstagram className="me-2" />
                    </div>
                </div>
                <div className="">

                <div className="d-flex flex-column flex-md-row">
                  <ul className="footer_terms">
                    <li className="fw-bold">Feature</li>
                    <li>Something Great</li>
                    <li>Another Thing</li>
                    <li>So many Features</li>
                    <li>It is amazing</li>
                  </ul>
                  <ul className="footer_terms">
                    <li className="fw-bold">Company</li>
                    <li>Blog</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Jobs</li>
                  </ul>
                  <ul className="footer_terms">
                    <li className="fw-bold">Legal</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                    <li>Cookie Policy</li>
                  </ul>
                </div>
                </div>
            </div>
        </div>
      </div>
    );
}
