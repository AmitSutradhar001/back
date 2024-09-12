import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/set", async (req, res) => {
  const amitSutradhar = "amitSutradhar";
  const token = jwt.sign({ amitSutradhar }, "amit2001");

  return res
    .status(200)
    .cookie("asblog_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({ asblog_token: token, message: "Signed in successfully!" });
});

app.get("/get", (req, res) => {
  const token = req.cookies.asblog_token;
  console.log("Token received from cookies:", token);

  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(400).json({ message: "No token found" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
