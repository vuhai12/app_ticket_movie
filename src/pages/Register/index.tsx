import MainLayout from "Layout/MainLayout";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

const Register = () => {
  const [isVisibility, setIsVisibility] = useState(false);
  const navigate = useNavigate();

  const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters!"),
    email: z.string().min(5, "Please enter email!").email("Email is invalid!"),
    password: z.string().min(6, "Password must be at least 6 characters!"),
  });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // TODO: Call API register here
      console.log(data);

      reset();
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setError("email", {
            type: "server",
            message: "Email is already registered!",
          });
        }
      }
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#5f1a89] py-5 text-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-white">
              Register to Cinetickets
            </h3>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 sm:p-8 flex flex-col gap-6"
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                {...register("name")}
                placeholder="John Doe"
                className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f1a89] transition"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                {...register("email")}
                placeholder="your@email.com"
                className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f1a89] transition"
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
                  placeholder="Create password"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f1a89] transition"
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

            {/* Register Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="py-3 rounded-xl bg-[#5f1a89] text-white font-semibold 
                         hover:bg-[#7a29b8] transition duration-300 shadow-md"
            >
              {isSubmitting ? "Creating account..." : "REGISTER"}
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#5f1a89] font-semibold hover:underline"
              >
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
