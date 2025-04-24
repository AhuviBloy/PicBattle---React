import React from "react";
import { Box, Typography, Link } from "@mui/material";
import "./Footer.css";

const Footer2: React.FC = () => {
  return (
    <Box className="footer-container">
      <Typography variant="body2" className="footer-text">
        © 2025 | הקרב על התמונה | כל הזכויות שמורות
      </Typography>
      <Box className="footer-links">
        <Link href="/about" className="footer-link">אודות</Link>
        <Link href="/contact" className="footer-link">צור קשר</Link>
        <Link href="/privacy" className="footer-link">מדיניות פרטיות</Link>
      </Box>
    </Box>
  );
};

export default Footer2;