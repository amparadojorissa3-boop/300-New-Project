
import { NavLink} from "react-router";

export default function Header() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm px-4 min-h-20">

        {/* Left: Hamburger Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Homepage</NavLink>
              </li>
              <li>
                <NavLink to="/Info">Fillup</NavLink>
              </li>
            </ul>
          </div>

          {/* Logo / Brand Name */}
          <a className="btn btn-ghost text-2xl font-semibold">
            Keep it Cool
          </a>
        </div>

        {/* Right: Three Dots */}
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-2 shadow"
            >
              <li>
                <NavLink to="/settings">Settings</NavLink>
              </li>
              <li>
                <NavLink to="/Profile">Profile</NavLink>
              </li>
          
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}