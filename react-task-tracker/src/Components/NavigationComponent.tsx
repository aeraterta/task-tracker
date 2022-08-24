import { Link } from "react-router-dom";

export default function NavigationComponent() {
  return (
    <div>
        <Link to="/privacy">Privacy</Link> |{" "}
        <Link to="/tos">ToS</Link>
    </div>
  );
}