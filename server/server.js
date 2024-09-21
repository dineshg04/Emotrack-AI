// server.js
const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { authenticateToken } = require('./utilities');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const User = require('./models/userModel');
const Emotion = require('./models/dataModel');
const ChatMessage = require('./models/chatMessageModel');


config(); // Load environment variables

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database is Connected');
  })
  .catch((error) => {
    console.log('Database is not Connected', error);
  });

const convert =
  'I dont want you to ask any questions and dont reply, just sentiment analyse the sentence and display the relevant emoji, only one emoji';

  app.post('/calendar', authenticateToken, async (req, res) => {
    try {
      const userText = req.body.contents[0].parts[0].text;
      const dateString = req.body.date;
      const content = `${userText}. ${convert}`;
  
      const result = await model.generateContent(content);
      const emojiResult = result.response.text().trim();
  
      const newEmotion = new Emotion({
        emoji: emojiResult,
        emotion: userText,
        userId: req.user._id,
        date: new Date(dateString),
      });
      await newEmotion.save();
  
      res.json({ emoji: emojiResult, emotion: userText, date: dateString, message: "Emotion saved successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

async function generateContentWithRetry(text, prompt, dateString, user, res, retries = 5, delay = 1000) {
  try {
    const result = await model.generateContent(prompt);
    const emojiResult = result.response.text();

    const newEmotion = new Emotion({
      emoji: emojiResult,
      emotion: text,
      userId: user._id,
      date: dateString,
    });
    await newEmotion.save();

    res.json({ emoji: emojiResult, emotion: text, date: dateString, message: "Emotion saved successfully" });
  } catch (error) {
    if (retries > 0 && error.status === 503) {
      console.log(`Service is overloaded, retrying in ${delay}ms...`);
      setTimeout(() => generateContentWithRetry(text, prompt, dateString, user, res, retries - 1, delay * 2), delay);
    } else {
      console.error("Error generating content:", error);
      res.status(500).json({ error: "Failed to generate content" });
    }
  }
}
  

app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }
  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }
  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const userObj = user.toObject();
  const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user: userObj,
    accessToken,
    message: "Registration Successful",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is Required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is Required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (userInfo && userInfo.email === email && userInfo.password === password) {

    const user = userInfo.toObject();
    const accessToken = jwt.sign( user , process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      email,
      accessToken,
      message: "Login Successful",
    });
  } else {
    return res.json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

app.post("/add-emotion", authenticateToken, async (req, res) => {
  const { emoji, emotion, date } = req.body;
  const user = req.user;

  if (!emoji) {
    return res
      .status(400)
      .json({ error: true, message: "Emoji is not generated" });
  }
  if (!emotion) {
    return res
      .status(400)
      .json({ error: true, message: "Emotion is required" });
  }
  if (!date) {
    return res
      .status(400)
      .json({ error: true, message: "Date is required" });
  }

  try {
    const newEmotion = new Emotion({
      emoji,
      emotion,
      userId: user._id,
      date: new Date(date),
    });
    await newEmotion.save();

    return res.json({
      error: false,
      emoji,
      emotion,
      message: "Emotion added successfully",
    });
  } catch (error) {
    console.error("Error saving emotion:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.get("/get-emotions", authenticateToken, async (req, res) => {
  try {
    const emotions = await Emotion.find({ userId: req.user._id });
    res.json({ emotions });
  } catch (error) {
    console.error("Error fetching emotions:", error);
    res.status(500).json({ error: "Failed to fetch emotions" });
  }
});


  const chatbotPrompt =
  'You are a Mental Health emotion advice chatbot. Use the user\'s input to provide compassionate advice. Do not ask questions. Provide a brief, supportive message.';

  app.post("/bot", authenticateToken, async (req, res) => {
    try {
      const userText = req.body.contents[0].parts[0].text;
  
      // Fetch recent chat history (e.g., last 5 messages)
      const chatHistory = await ChatMessage.find({ userId: req.user._id })
        .sort({ timestamp: -1 })
        .limit(10)
        .sort({ timestamp: 1 }); // Sort back to chronological order
  
      let historyText = '';
      chatHistory.forEach((msg) => {
        historyText += `${msg.sender === 'user' ? 'User' : 'Chatbot'}: "${msg.text}"\n`;
      });
  
      const prompt = `${chatbotPrompt}\n${historyText}User: "${userText}"\nChatbot:`;
  
      const result = await model.generateContent(prompt);
      const chatbotResponse = result.response.text();
  
      // Save messages to the database as before
      await ChatMessage.insertMany([
        {
          userId: req.user._id,
          sender: 'user',
          text: userText,
        },
        {
          userId: req.user._id,
          sender: 'bot',
          text: chatbotResponse,
        },
      ]);
  
      res.json({ chatbotResponse });
    } catch (error) {
      console.error("Error in bot route:", error);
      res.status(500).json({ error: "Message cannot be generated" });
    }
  });
  

  app.post("/add-manual-emotion", authenticateToken, async (req, res) => {
    const { emoji, emotion, date } = req.body;
    const user = req.user;
  
    if (!emoji) {
      return res.status(400).json({ error: true, message: "Emoji is required" });
    }
    if (!date) {
      return res.status(400).json({ error: true, message: "Date is required" });
    }
  
    try {
      const existingEmotion = await Emotion.findOne({
        userId: user._id,
        date: new Date(date),
      });
  
      if (existingEmotion) {
        return res.status(400).json({ error: true, message: "An emoji already exists for this date" });
      }
  
      const newEmotion = new Emotion({
        emoji,
        emotion,
        userId: user._id,
        date: new Date(date),
      });
      await newEmotion.save();
  
      return res.json({
        error: false,
        emoji,
        emotion,
        message: "Emotion added successfully",
      });
    } catch (error) {
      console.error("Error saving emotion:", error);
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  });


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});