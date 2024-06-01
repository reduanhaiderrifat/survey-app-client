import { useForm } from "react-hook-form";
import Google from "../components/Social/Google";
import Twitter from "../components/Social/Twitter";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { createUser, setLoading, googleUser, twitterhUser, updateUser } =
    useAuth();
  const navigate = useNavigate();
  const [captcha, setcaptcha] = useState("");
  const [recaptchaValid, setRecaptchaValid] = useState(false); // State to track reCAPTCHA
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { email, password, username, photo } = data;
    setcaptcha("");
    if (!recaptchaValid) {
      toast.error("Please complete the reCAPTCHA");
      setcaptcha("Please complete the reCAPTCHA");
      return;
    }
    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        updateUser(username, photo);
        navigate(location?.state ? location.state : "/");
        toast.success("User login successfully");
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
        navigate(location?.state ? location.state : "/");
        toast.success("User login successfully");
      })
      .catch((error) => {
        toast.error(error?.message.split(":")[1]);
        setLoading(false);
      });
  };
  const handleTwitter = () => {
    twitterhUser()
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success("User login successfully");
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
      <div className="hero min-h-[calc(100vh-240px)] ">
        <div className="min-w-[500px]  ">
          <div className="card w-full  shadow-2xl">
            <div className="text-center ">
              <h1 className="text-4xl text-rose-500 font-bold">SingUp now!</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  {...register("username", {
                    required: true,
                  })}
                />
                {errors.username && (
                  <span className="text-red-500">This field is required</span>
                )}{" "}
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text font-bold">Image</span>
                </label>
                <input
                  type="file"
                  placeholder="upload image"
                  className="border p-2 rounded-lg "
                  {...register("photo", {
                    required: true,
                  })}
                />
                {errors.photo && (
                  <span className="text-red-500">This field is required</span>
                )}{" "}
              </div>
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
              <div className="form-control ">
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
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}{" "}
                {errors.password && (
                  <p className="text-red-500 break-all w-[450px]">
                    {errors.password.message}
                  </p>
                )}
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
                  Register
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
              Have an account please!{" "}
              <Link
                to="/login"
                className="btn-link no-underline text-rose-500 font-bold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
