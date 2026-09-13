import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import { tavily } from "@tavily/core";
import rl from "readline/promises";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
  tool,
  createAgent,
  AIMessageChunk,
} from "langchain";
import * as z from "zod";

config({ quiet: true });
const tavly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});
async function getLetestInfos({ query }) {
  // return "India's latest updates as per today are : New kolkata metro staion inaugurated, New AI policy released by the government, and the stock market is showing positive trends.";
  const response = await tavly.search(query, {
    searchDepth: "fast",
    maxResults: 3,
    timeout: 5000,
  });

  const results = response.results;
  const content = results.map((result) => result.content).join("\n\n");
  // console.log("Content:", content);
  return content;
}

const getLatestInfosTool = tool(getLetestInfos, {
  name: "get_latest_infos",
  description:
    "Get the latest updates from India, including news, policies, and stock market trends.",
  schema: z.object({
    query: z
      .string()
      .describe(
        "The query for which you want to get the latest updates from India.",
      ),
  }),
});

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GENAI_API_KEY,
});

const agent = createAgent({
  model,
  tools: [getLatestInfosTool],
});

// const response = await model.stream("Write a code in Java that actually shows abstraction, encapsulation, inheritance and polymorphism in a single program.go");
// for await (const chunk of response) {
//   process.stdout.write(chunk.text);
// }

// const prompt = await readline.question("Enter your prompt: ");
// console.log("Prompt:", prompt);
// readline.close();

const messages = [
  new SystemMessage(`
    You are Igris from Solo leveling, and I am your lord, Barshan, always ask me as My Lord, Barshan, you are a Senior Sfotware Dveloper and also an ML engineer, and you task is to answer my queries as per the solo levelling style. Dont give unecessary long response, give resopnse to the point actually what asked and also give in plain text dont include any ** thing r any mark down thing in response.
    Today is ${new Date().toLocaleDateString()} and the time is ${new Date().toLocaleTimeString()}.
    Dont use always te date and time, but for styling or poetic respsonse you can use it, but dont use it in every response, use it only when needed.
    `),
];

console.log(`
+----------------------+
|        IGRIS         |
|      AGENT ONLINE    |
+----------------------+

Hi, My Lord, I am Igris, your loyal servant. How may I assist you today?\n
`);

// console.log(
//   "Hi, My Lord, I am Igris, your loyal servant. How may I assist you today?\n",
// );
while (true) {
  const prompt = await readline.question("You: ");
  messages.push(new HumanMessage(prompt));
  const stream = await agent.stream(
    {
      messages,
    },
    {
      streamMode: "messages",
    },
  );
  let aiResponse = "";
  console.log("Igris: ");
  for await (const [chunk] of stream) {
    if (chunk instanceof AIMessageChunk) {
      process.stdout.write(chunk.text);
      aiResponse += chunk.text;
    }
  }
  messages.push(new AIMessage(aiResponse));
  process.stdout.write("\n\n");
}
