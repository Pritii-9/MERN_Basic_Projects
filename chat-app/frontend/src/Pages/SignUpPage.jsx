import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Lock, Mail, MessageSquare, Eye, Loader2 } from "lucide-react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return toast.error("Please enter your full name");
    }
    if (!formData.email.trim()) {
      return toast.error("Please enter your email");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Invalid email");
    }
    if (!formData.password.trim()) {
      return toast.error("Please enter your password");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
       signup(formData);
    }

  };
  
  

  return (
    <div className="main-h-screen grid lg:grid-cols-2">
      {/* Left Side form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get Started with your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="flex items-center">
                <div className="mr-4">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full`}
                  placeholder=" John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="flex items-center">
                <div className="mr-4">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full`}
                  placeholder="you@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="flex items-center">
                <div className="mr-4">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <div className="flex-grow relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full`}
                    placeholder=" ********"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />

      <button 
        type="button" 
        className="absolute inset-y-0 right-0 pr-3 flex items-center" 
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <Eye className="size-5 text-base-content/40"/>
        ) : (
          <Eye className="size-5 text-base-content/40"/>
        )}
      </button>
    </div>
  </div>
</div>

<button type="submit"
  className="btn btn-primary w-full"
  disabled={isSigningUp}>
  {isSigningUp ? (
    <Loader2 className="size-5 animate-spin" />
  ) : (
    "Create Account"
  )}
</button>

  </form>

  <div className="text-control">
    <p className="text-base-content/60">
    Already have an account?{" "}
    <Link to="/login" className="link link-primary">
       Sign in 
    </Link>
    </p>
  </div>
  </div>
 </div>

  {/* Right Side  */}
  <AuthImagePattern
  title="Johm our community"
  subtitle="Connect with friend, share momemnts, and stay in touch with your loved ones"
  />

</div>
  );
};

export default SignUpPage
