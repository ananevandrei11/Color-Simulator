import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <nav className="nav">
        <Link to="/">Color Game</Link>
        <Link to="/tic-tac-toe">Tic Tac Toe</Link>
      </nav>
      <Outlet />
    </React.Fragment>
  );
}
