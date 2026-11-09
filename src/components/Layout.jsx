import { Outlet } from "react-router";
import Header from "./Header";
import Footers from "./Footers";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footers />
    </div>
  );
}