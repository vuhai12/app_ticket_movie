import MainLayout from "Layout/MainLayout";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginServices } from "@services/auth.services";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchUsers } from "store/slices/usersSlice";

const Login = () => {
  const [isVisibility, setIsVisibility] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginSchema = z.object({
    email: z.string().min(1, "Please enter email!").email("Email is invalid!"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const { data } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (data && data.length > 0) {
      localStorage.setItem("idUser", data[0].id);
      localStorage.setItem("access_token", `123`);
      navigate("/booking-movie");
    }
  }, [data, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const data = await loginServices(formData);
      dispatch(fetchUsers({ type: "admin", auth_id: data.id }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleGuestLogin = () => {
    dispatch(fetchUsers({ type: "guest", auth_id: null }));
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#5f1a89] py-5 text-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-white">
              Login to Cinetickets
            </h3>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 sm:p-8 flex flex-col gap-6"
          >
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                {...register("email")}
                placeholder="your@email.com"
                className="px-4 py-3 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f1a89] transition"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  {...register("password")}
                  type={isVisibility ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f1a89] transition"
                />

                <button
                  type="button"
                  onClick={() => setIsVisibility(!isVisibility)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#5f1a89]"
                >
                  {isVisibility ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="py-3 rounded-xl bg-[#5f1a89] text-white font-semibold 
                         hover:bg-[#7a29b8] transition duration-300 shadow-md"
            >
              {isSubmitting ? "Logging in..." : "LOGIN"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Guest Login */}
            <button
              onClick={handleGuestLogin}
              type="button"
              className="py-3 rounded-xl border-2 border-[#5f1a89] text-[#5f1a89] 
                         font-semibold hover:bg-[#5f1a89] hover:text-white 
                         transition duration-300"
            >
              Continue as Guest
            </button>

            {/* Register */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-[#5f1a89] font-semibold hover:underline"
              >
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
