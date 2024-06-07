import { useForm } from "react-hook-form";
import Google from "../components/Social/Google";
import Twitter from "../components/Social/Twitter";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import usePublic from "../hooks/usePublic";

const Register = () => {
  const {
    createUser,
    setLoading,
    googleUser,
    twitterhUser,
    updateUser,
    loading,
  } = useAuth();
  const navigate = useNavigate();
  const axiosPubic = usePublic();
  const [captcha, setcaptcha] = useState("");
  const [recaptchaValid, setRecaptchaValid] = useState(false);
  const [captchaLoaded, setCaptchaLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, username, photo } = data;
    setcaptcha("");
    if (!recaptchaValid) {
      toast.error("Please complete the reCAPTCHA");
      setcaptcha("Please complete the reCAPTCHA");
      return;
    }
    const formData = new FormData();
    formData.append("image", photo[0]);
    const imgbbRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );
    const imageUrl = imgbbRes.data.data.url;
    createUser(email, password)
      .then((res) => {
        const currentuser = res?.user;
        if (currentuser) {
          const userData = {
            email: currentuser?.email || "email not add",
            name: username,
            uid: currentuser?.uid,
            role: "user",
          };
          axiosPubic
            .post("/users", userData)
            .then((res) => {
              console.log(res.data);
              navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
              console.error(err);
            });
        }
        updateUser(username, imageUrl)
          .then(() => {})
          .catch((err) => {
            console.log(err.message);
          });

        toast.success("User create successfully", {
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
        const currentuser = res?.user;
        if (currentuser) {
          const userData = {
            email: currentuser?.email || "email not add",
            name: currentuser?.displayName,
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

  const handleTwitter = () => {
    twitterhUser()
      .then((res) => {
        const currentuser = res?.user;
        if (currentuser) {
          const userData = {
            email: currentuser?.email || "email not add",
            name: currentuser?.displayName,
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
    setRecaptchaValid(!!value); // Update reCAPTCHA state based on the value
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCaptchaLoaded(true);
    }, 0); // Add a small delay to ensure ReCAPTCHA loads

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-4 sm:px-6 md:px-8 py-8 mx-auto bg-white shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl text-rose-500 font-bold">Sign Up now!</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register("username", {
                required: true,
              })}
            />
            {errors.username && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Image</span>
            </label>
            <input
              type="file"
              placeholder="Upload image"
              className="border p-2 rounded-lg w-full"
              {...register("photo", {
                required: true,
              })}
            />
            {errors.photo && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
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
              placeholder="Password"
              className="input input-bordered w-full"
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
              <span className="text-red-500 mt-1">This field is required</span>
            )}
            {errors.password && (
              <p className="text-red-500 mt-1 break-words">
                {errors.password.message}
              </p>
            )}
          </div>
          {captchaLoaded && (
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={onChange}
            />
          )}
          {captcha && <span className="text-red-500 mt-1">{captcha}</span>}
          <div className="form-control mt-6">
            <button className="btn bg-rose-500 hover:bg-rose-600 text-white text-lg w-full">
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Register"
              )}
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
          Have an account?{" "}
          <Link
            to="/login"
            className="btn-link no-underline text-rose-500 font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
