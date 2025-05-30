import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  console.log("Login component user state:", user);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  useEffect(() => {
    console.log("Login useEffect user:", user);
    if (user) {
      navigate("/tasks");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#ffe5d4] via-[#fdbba1] to-[#fb8c5d]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-4 border border-[#e5e7eb] w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#4b5563]">Login</h2>
        <input
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          type="email"
          required
          className="w-full px-3 py-2 border border-[#d1d5db] rounded focus:outline-none focus:ring-2 focus:ring-[#f45a2b]"
        />
        <input
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          type="password"
          required
          className="w-full px-3 py-2 border border-[#d1d5db] rounded focus:outline-none focus:ring-2 focus:ring-[#f45a2b]"
        />
        <button
          type="submit"
          className="bg-[#f45a2b] hover:bg-[#d94a24] text-white py-2 rounded w-full font-semibold transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;



