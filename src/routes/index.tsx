import { createFileRoute } from "@tanstack/react-router";
import { ColorGame } from "../widget/ColorGame";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ColorGame />;
}
