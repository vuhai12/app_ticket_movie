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

  const handleTogglePassword = () => {
    setIsVisibility(!isVisibility);
  };

  const registerSchema = z.object({
    email: z.string().min(5, "Please enter email!").email("Email is invalid!"),
    password: z.string().min(6, "Password must be at least 6 characters!"),
    name: z.string().min(3, "Name must be at least 3 characters!"),
  });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async () => {
    try {
      reset();
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setError("email", {
            type: "server",
            message: "Email is registered!",
          });
          return;
        }
      }
    }
  };
  return (
    <MainLayout>
      <div className="rounded-[20px] w-full sm:w-[500px]  mx-auto my-[50px] bg-white overflow-hidden">
        <h3 className="text-[20px] text-white bg-[#5f1a89] text-center py-[10px] ">
          Register to Cinetickets
        </h3>

        <form
          className="p-[20px] flex flex-col gap-[20px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[10px]">
            <label>Name</label>
            <input
              {...register("name")}
              placeholder="name"
              className="py-[10px] px-[20px] border-gray-400 border-[1px] rounded-[10px]"
            />
            {errors.name && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <label>Email</label>
            <input
              {...register("email")}
              placeholder="email"
              className="py-[10px] px-[20px] border-gray-400 border-[1px] rounded-[10px]"
            />
            {errors.email && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <label>Password</label>
            <div className="flex">
              <input
                {...register("password")}
                type={isVisibility ? "text" : "password"}
                placeholder="Password"
                className=" py-[10px] flex-1 w-full px-[20px] border-gray-400 border-[1px] rounded-tl-[10px] rounded-bl-[10px]"
              />
              <div
                className="w-[50px] h-[50px] bg-gray-400 flex items-center justify-center"
                onClick={handleTogglePassword}
              >
                {isVisibility ? (
                  <Eye className="w-5 h-5 text-white" />
                ) : (
                  <EyeOff className="w-5 h-5 text-white" />
                )}
              </div>
            </div>
            {errors.password && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.password.message}
              </div>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className="py-[10px] bg-[#5f1a89] rounded-[10px] text-white"
          >
            Register
          </button>

          <p className="text-center text-[12px]">
            Already have an account?
            <span className="text-[#5f1a89]">
              <Link to="/login"> Login Now</Link>
            </span>
          </p>
        </form>
      </div>
    </MainLayout>
  );
};

export default Register;
