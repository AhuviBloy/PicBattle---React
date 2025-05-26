import { useNavigate } from "react-router-dom";
import myImage from "../assets/netfree.png";

const ErrorImage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        position: "relative",
      }}
    >
      <img
        src={myImage}
        alt="Error"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      <button
        onClick={goHome}
        style={{
          position: "absolute",
          top: "200px",
          right: "-2.5%",
          transform: "translateX(-50%)",
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#ffffffcc",
          color: "#000",
          cursor: "pointer",
        }}
      >
        חזרה לדף הבית
      </button>
    </div>
  );
};

export default ErrorImage;
