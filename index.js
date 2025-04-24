const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to the API Page, everything is working properly");
});

app.post('/signup', (req, res) => {
  try {
    const { username, email, password, dob } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({ error: "Username cannot be empty" });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({ error: "Email cannot be empty" });
    }

    if (!password || password.length < 8 || password.length > 16) {
      return res.status(400).json({ error: "Password length should be greater than 8 or less than or equal to 16" });
    }

    res.status(200).json({
      message: "Signup successful",
      user: {
        username,
        email,
        dob,
      }
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
