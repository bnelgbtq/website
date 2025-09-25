import Rainbow from "../Rainbow/Rainbow";
import "./rainbowSpinner.css";

export default function RainbowSpinner({ height = 300 }) {
  return (
    <div className="rainbow-spinner" style={{ "--height": height + "px" }}>
      {Array.from({ length: 2 }).map((_, i) => (
        <div className="rainbow-spinner__rainbow" key={i}>
          <Rainbow />
        </div>
      ))}
    </div>
  );
}
