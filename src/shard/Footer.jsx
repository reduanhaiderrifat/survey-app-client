import { Fade } from "react-awesome-reveal";
import { FaArrowUp, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="px-4 divide-y dark:bg-gray-100 text-white dark:text-gray-800 bg-[#010313]">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <div className="flex justify-center space-x-3 lg:justify-start">
            <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-600"></div>
            <img className="w-16" src="/logo.png" alt="" />
            <span className="self-center nosifer-regular text-2xl font-semibold">
              <Typewriter
                words={["Survey Sense"]}
                loop={500}
                cursor
                cursorStyle="."
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3   sm:grid-cols-3">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-900">
              Contact
            </h3>
            <Fade cascade>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    <span> +880 01537140067</span>
                  </a>
                </li>

                <li>
                  <a rel="noopener noreferrer" href="#">
                    support@gmail.com
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    report latter
                  </a>
                </li>
              </ul>
            </Fade>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-900">
              Ruels & Conditions
            </h3>
            <Fade cascade>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Privacy
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </Fade>
          </div>

          <div className="space-y-3 ">
            <div className="uppercase dark:text-gray-900">Social media</div>
            <div className="flex  justify-around ">
              <Fade cascade>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Facebook"
                  className="flex items-center p-1"
                >
                  <FaFacebook size={25} className="hover:text-blue-400" />
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Twitter"
                  className="flex items-center p-1"
                >
                  <FaTwitter size={25} className="hover:text-sky-400" />
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Instagram"
                  className="flex items-center  p-1"
                >
                  <FaInstagram size={25} className="hover:text-red-400" />
                </a>
                <a
                  onClick={scrollToTop}
                  className="btn rounded-full  md:ml-4 lg:ml-4 border-[#e0bb17f5] text-[#e0bb17f5] bg-transparent hover:bg-transparent"
                >
                  <FaArrowUp />
                </a>
              </Fade>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-600">
        <a href="#">
          <Typewriter
            words={["© Copyright 2024. All Rights Reserved."]}
            loop={1}
            cursor
            cursorStyle="."
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
