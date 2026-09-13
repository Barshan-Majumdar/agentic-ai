import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import rl from "readline/promises";
config();
const readline = rl.createInterface({
  input: process.stdin,
  output : process.stdout,
})

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GENAI_API_KEY,
});

// const response = await model.stream("Write a code in Java that actually shows abstraction, encapsulation, inheritance and polymorphism in a single program.go");
// for await (const chunk of response) {
//   process.stdout.write(chunk.text);
// }

// const prompt = await readline.question("Enter your prompt: ");
// console.log("Prompt:", prompt);
// readline.close();


while (true) {
  const prompt = await readline.question("User: ")
  
  const stream = await model.stream(prompt);

  for await (const chunk of stream) {
    process.stdout.write(chunk.text)
  }

  process.stdout.write("\n")
}