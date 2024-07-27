const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();
const port = process.env.PORT || 5000;

const groq = new Groq({ apiKey: "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" });

app.use(cors()); // Enable CORS

app.get('/llama', async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt parameter is required' });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });

    return res.json({
      response: chatCompletion.choices[0]?.message?.content || ""
    });
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
    return res.status(500).json({ error: `An error occurred: ${errorMessage}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
