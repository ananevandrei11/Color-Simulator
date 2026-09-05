import { createFileRoute } from "@tanstack/react-router";
import { TicTakToe } from "../../widget/TicTakToe";

export const Route = createFileRoute("/tic-tac-toe/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TicTakToe />;
}
