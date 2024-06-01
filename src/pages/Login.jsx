import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Google from "../components/Social/Google";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import usePublic from "../hooks/usePublic";
import Twitter from "../components/Social/Twitter";
const Login = () => {
  const { singInUser, setLoading, googleUser, twitterhUser } = useAuth();
  const navigate = useNavigate();
  const [captcha, setcaptcha] = useState("");
  const axiosPubic = usePublic();
  const location = useLocation();
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [recaptchaValid, setRecaptchaValid] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    setcaptcha("");

    if (!recaptchaValid) {
      toast.error("Please complete the reCAPTCHA");
      setcaptcha("Please complete the reCAPTCHA");
      return;
    }
    singInUser(email, password)
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success("User login successfully", {
          duration: 4000,
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error(error?.message.split(":")[1]);
        setLoading(false);
      });
  };
  const handleGoogle = () => {
    googleUser()
      .then((res) => {
        console.log(res.user);
        const currentuser = res?.user;
        if (currentuser) {
          const userData = {
            email: currentuser?.email,
            role: "user",
          };
          axiosPubic
            .post("/users", userData)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
        navigate(location?.state ? location.state : "/");
        toast.success("User login successfully", {
          duration: 4000,
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error(error?.message.split(":")[1]);
        setLoading(false);
      });
  };
  const handleTwitter = () => {
    twitterhUser()
      .then((res) => {
        console.log(res.user);
        const currentuser = res?.user;
        if (currentuser) {
          const userData = {
            email: currentuser?.email,
            uid: currentuser?.uid,
            role: "user",
          };
          axiosPubic
            .post("/users", userData)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
        navigate(location?.state ? location.state : "/");
        toast.success("User login successfully", {
          duration: 4000,
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error(error?.message.split(":")[1]);
        setLoading(false);
      });
  };
  function onChange(value) {
    console.log("Captcha value:", value);
    setRecaptchaValid(!!value); // Update reCAPTCHA state based on the value
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCaptchaLoaded(true);
    }, 0); // Add a small delay to ensure ReCAPTCHA loads

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div>
      <div className="hero  ">
        <div className="min-w-[500px]">
          <div className="card w-full  shadow-2xl">
            <div className="text-center ">
              <h1 className="text-4xl text-rose-500 font-bold">Login now!</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}{" "}
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="form-control x">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: true,
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/,
                      message: `Password must contain at least one uppercase letter, one lowercase letter, and one special character`,
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}{" "}
                {errors.password && (
                  <p className="text-red-500 break-all w-[400px]">
                    {errors.password.message}
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {captchaLoaded && (
                <ReCAPTCHA
                  sitekey={`${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`}
                  onChange={onChange}
                />
              )}{" "}
              {captcha && <span className="text-red-500">{captcha}</span>}
              <div className="form-control mt-6">
                <button className="btn bg-rose-500 hover:bg-rose-500 text-white text-lg">
                  Login
                </button>
              </div>
            </form>
            <div className="flex  gap-3 justify-center">
              <span onClick={handleGoogle}>
                <Google />
              </span>{" "}
              <span onClick={handleTwitter}>
                <Twitter />
              </span>
            </div>
            <p className="text-center my-3">
              Do not have an account please!{" "}
              <Link
                to="/singup"
                className="btn-link no-underline text-rose-500 font-bold"
              >
                Singup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
