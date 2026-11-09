import { useState } from "react";
import { useNavigate } from "react-router";

export default function Info() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  sessionStorage.setItem("customerInfo", JSON.stringify(formData));
  navigate("/items");
};

  return (
    
  <div
    className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage:
        "url(https://images.pexels.com/photos/40450765/pexels-photo-40450765.jpeg)",
    }}
  >
    <div className="card bg-base-100 w-full max-w-lg shadow-xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <h2 className="card-title text-2xl mb-2">Your Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="form-control w-full">
            <span className="label-text mb-1">First Name</span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Pangalan"
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Last Name</span>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apelyido"
              className="input input-bordered w-full"
              required
            />
          </label>
        </div>

        <label className="form-control w-full">
          <span className="label-text mb-1">Address</span>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street, Barangay, City, Province"
            className="textarea textarea-bordered w-full"
            rows={3}
            required
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1">Contact Info</span>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="09** *** ****"
            className="input input-bordered w-full"
            required
          />
        </label>

        <div className="card-actions justify-between mt-4">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
);
}