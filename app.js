const { json } = require('express');
const express = require('express');
const { OpenAI } = require('openai');
const app = express();
require('dotenv').config();

const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

app.use(express.json());

app.post("/generate-lies", async (req, res) => {
    let truthArray = req.body
    console.log(`trutharr value`,truthArray)
    let truthLieArray = [];

    for (let i = 0; i < truthArray.length; i++) {
      const prompt = `Provide a plausible lie based on, related to and similar in scale and scope the following truths in one sentence: ${truthArray[i].truth_1}, ${truthArray[i].truth_2}`;

      const gptResponse = await openai.chat.completions.create({ model: "gpt-4-1106-preview",  messages: [
        {
          "role": "system",
          "content": "you are a lie generator for the game two truths and a lie. The objective of the game is to present a statement that is false alongside with two statements that are true where false statement is convincing enough to confuse the players into thinking the false statement could be true."
        },{"role": "user", "content": prompt}], max_tokens: 60, temperature: 1.1});

        console.log(gptResponse.choices)

        truthArray[i]["truth_3"] = gptResponse.choices[0].message.content.trim();
      truthLieArray.push(truthArray[i]);
  }
    
    res.json(truthLieArray);
});

