// // IMPORTS
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// // intrnal imports
// const { connectDB } = require("./config/dbConfig");
// const authRoutes = require("./routes/authRoutes");
// const { default: rateLimit } = require("express-rate-limit");
// const bookRoutes = require("./routes/bookRoutes");
// const upload = require("./uploads/uploads");
// const userRoutes = require("./routes/userProfile");
// const postsRoutes = require("./routes/postsRoutes");
// const commentsRoutes = require("./routes/commentsRoutes");

// dotenv.config();

// // APP
// const app = express();


// // MIDDLEWARES
// app.use(express.json());
// app.use(cors({ origin: JSON.parse(process.env.PRODUCTION_ENV) ? process.env.CLIENT_ORIGIN : "*" }));

// // app.use('/public', express.static(path.join(__dirname , "public")));
// // console.log("public", path.join(__dirname, "public"));
// app.use("/public", express.static(path.join(__dirname, "public")));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//  // serve static files from the "public" directory
// // app.use('/uploads', express.static(path.join(__dirname, "uploads"))); 


// // RATE LIMITER
// // app.use(rateLimit({
// //     windowMs: 15 * 60 * 1000, // 15 minutes
// //     limit: 100 // limit each IP to 100 requests per windowMs
// // }));
// // GLOBAL PORT
// const PORT = process.env.PORT || 3000
// // MAIN ROUTES
// app.get("/", (req, res) => {
//     res.send("Welcome to the server API");
// });
// app.post("/upload", upload.single("file"), (req, res) => {
//     res.json({ file: req.file });
// });

// // API ROUTES
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/book", bookRoutes); 
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/posts", postsRoutes);
// app.use("/api/v1/comments", commentsRoutes);




// connectDB();


// // LISTENER 
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userProfile");
const postsRoutes = require("./routes/postsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const upload = require("./uploads/uploads");

// DB
const { connectDB } = require("./config/dbConfig");

dotenv.config();
const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "https://test-front-end-final.vercel.app", // الجديد
  "https://front-end-auth-4wmf.vercel.app", // القديم (لو محتاجه)
  "http://localhost:5173",                  // dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman/curl
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// Middleware
app.use(express.json());

// Static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Upload
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/comments", commentsRoutes);

// Connect to MongoDB
connectDB();

// Export for Vercel
module.exports = app;

