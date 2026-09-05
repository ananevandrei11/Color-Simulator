import { createFileRoute } from "@tanstack/react-router";
import { ColorGame } from "../../widget/ColorGame";

export const Route = createFileRoute("/color-game/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ColorGame />;
}
