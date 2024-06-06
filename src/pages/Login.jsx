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
  const [captcha, setCaptcha] = useState("");
  const axiosPublic = usePublic();
  const location = useLocation();
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [recaptchaValid, setRecaptchaValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    setCaptcha("");

    if (!recaptchaValid) {
      toast.error("Please complete the reCAPTCHA");
      setCaptcha("Please complete the reCAPTCHA");
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
        const currentUser = res?.user;
        if (currentUser) {
          const userData = {
            email: currentUser?.email || "email not added",
            uid: currentUser?.uid,
            name: currentUser?.displayName,
            role: "user",
          };
          axiosPublic
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
        const currentUser = res?.user;
        if (currentUser) {
          const userData = {
            email: currentUser?.email || "email not added",
            name: currentUser?.displayName,
            uid: currentUser?.uid,
            role: "user",
          };
          axiosPublic
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
    setRecaptchaValid(!!value); 
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCaptchaLoaded(true);
    }, 0); 
    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-6 py-8 mx-auto bg-white shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl text-rose-500 font-bold">Login now!</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/,
                  message: `Password must contain at least one uppercase letter, one lowercase letter, and one special character`,
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          {captchaLoaded && (
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={onChange}
            />
          )}
          {captcha && <p className="text-red-500 mt-1">{captcha}</p>}
          <div className="form-control mt-6">
            <button className="btn bg-rose-500 hover:bg-rose-600 text-white text-lg w-full">
              Login
            </button>
          </div>
        </form>
        <div className="flex justify-center gap-3 mt-6">
          <span onClick={handleGoogle}>
            <Google />
          </span>
          <span onClick={handleTwitter}>
            <Twitter />
          </span>
        </div>
        <p className="text-center my-3">
          Do not have an account?{" "}
          <Link
            to="/singup"
            className="btn-link no-underline text-rose-500 font-bold"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
