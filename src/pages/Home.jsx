import { NavLink } from "react-router";

export default function Home() {
  return (
    <>
      <div
        className="bg-pink-300 hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/37105821/pexels-photo-37105821.png)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Wear Your Vibe, Own Your Style</h1>
            <p className="mb-5">
              Discover the perfect T-shirt that speaks to your personality and lets you express yourself with confidence. Our collection of unique designs is crafted to make a statement, so you can wear your vibe and own your style.
            </p>

            <NavLink to="/info" className="btn btn-primary">
              Shop Now
            </NavLink>
          </div>
        </div>
      </div>

    
    </>
  );
}