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
  const handleTogglePassword = () => {
    setIsVisibility(!isVisibility);
  };
  const loginSchema = z.object({
    email: z.string().min(1, "Please enter email!").email("Email is invalid!"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

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
      navigate("/");
    } catch (error) {}
  };

  const { data } = useAppSelector((state) => state.users);

  const handleGuestLogin = () => {
    dispatch(fetchUsers({ type: "guest", auth_id: null }));
  };

  useEffect(() => {
    if (data && data.length > 0) {
      localStorage.setItem("idUser", data[0].id);
      localStorage.setItem("access_token", `123`);

      navigate("/booking-movie");
    }
  }, [data]);

  return (
    <MainLayout>
      <div className="rounded-[20px] w-full sm:w-[500px] mx-auto my-[50px] bg-white overflow-hidden">
        <h3 className="text-[20px] text-white bg-[#5f1a89] text-center py-[10px] ">
          Login to Cinetickets
        </h3>

        <form
          className="p-[20px] flex flex-col gap-[20px]"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            type="submit"
            className="py-[10px] bg-[#5f1a89] rounded-[10px] text-white"
          >
            {isSubmitting ? "..." : "LOGIN"}
          </button>
          <div className="flex justify-center relative items-center">
            <div className="w-[35px] z-[99] h-[35px] rounded-[50%] text-[12px] bg-gray-300 flex items-center justify-center">
              OR
            </div>
            <div className="w-full h-[1px] bg-gray-300 absolute top-1/2 -translate-y-1/2"></div>
          </div>
          <button
            onClick={handleGuestLogin}
            type="button"
            className="py-[10px] border-[1px] text-[#5f1a89] border-[#5f1a89]  rounded-[10px] "
          >
            GUEST LOGIN
          </button>
          <p className="text-center text-[12px]">
            Did you have an account yet?{" "}
            <span className="text-[#5f1a89]">
              <Link to="/register"> Register Now</Link>
            </span>
          </p>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
