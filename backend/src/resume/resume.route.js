const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    const resumeText = data.text;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Analyze the following resume text and give improvement suggestions in the following format:

- Start with an overall summary (2–3 lines).
- Then break the suggestions down by sections using markdown-style headings and bullet points.
- Use **bold section names** and *concise bullets* for clarity.

Here is the resume content:
${resumeText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    fs.unlinkSync(filePath); // Clean up uploaded file
    res.json({ suggestions: text });
  } catch (error) {
    console.error("❌ Gemini analysis failed:", error.message || error);
    res.status(500).json({ error: "Gemini analysis failed." });
  }
});

module.exports = router;
