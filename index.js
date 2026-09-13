import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
import { tavily } from "@tavily/core";
import {
  mkdir,
  readFile,
  writeFile,
  access,
} from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
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

/* =========================================================
   IGRIS DIRECTORIES & FILES
   ========================================================= */

const igrisDir = join(homedir(), ".igris");
const envPath = join(igrisDir, ".env");
const userDataPath = join(igrisDir, "user.json");

/* =========================================================
   READLINE
   ========================================================= */

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* =========================================================
   CREATE IGRIS DIRECTORY
   ========================================================= */

await mkdir(igrisDir, { recursive: true });

/* =========================================================
   CREATE .ENV IF IT DOESN'T EXIST
   ========================================================= */

async function ensureEnvFile() {
  try {
    await access(envPath);
  } catch {
    await writeFile(
      envPath,
      "GENAI_API_KEY=\nTAVILY_API_KEY=\n",
      "utf8",
    );
  }
}

await ensureEnvFile();

/* =========================================================
   LOAD ENVIRONMENT VARIABLES
   ========================================================= */

config({
  path: envPath,
  override: true,
  quiet: true,
});

/* =========================================================
   API KEY SETUP
   ========================================================= */

async function getApiKey(variableName, displayName) {
  let value = process.env[variableName]?.trim();

  // Already configured
  if (value) {
    return value;
  }

  console.log("");

  value = (
    await readline.question(`${displayName}: `)
  ).trim();

  if (!value) {
    console.error(
      `\n${displayName} cannot be empty.`,
    );

    readline.close();
    process.exit(1);
  }

  let envContent = "";

  try {
    envContent = await readFile(
      envPath,
      "utf8",
    );
  } catch {
    envContent = "";
  }

  const regex = new RegExp(
    `^${variableName}=.*$`,
    "m",
  );

  if (regex.test(envContent)) {
    envContent = envContent.replace(
      regex,
      `${variableName}=${value}`,
    );
  } else {
    envContent += `\n${variableName}=${value}`;
  }

  await writeFile(
    envPath,
    envContent.trim() + "\n",
    "utf8",
  );

  // Make it immediately available to process.env
  process.env[variableName] = value;

  return value;
}

/* =========================================================
   GET REQUIRED API KEYS
   ========================================================= */

const genaiApiKey = await getApiKey(
  "GENAI_API_KEY",
  "Enter your Gemini API key",
);

const tavilyApiKey = await getApiKey(
  "TAVILY_API_KEY",
  "Enter your Tavily API key",
);

/* =========================================================
   TAVILY
   ========================================================= */

const tavly = tavily({
  apiKey: tavilyApiKey,
});

/* =========================================================
   LATEST INFORMATION TOOL
   ========================================================= */

async function getLatestInfos({ query }) {
  const response = await tavly.search(query, {
    searchDepth: "fast",
    maxResults: 3,
    timeout: 5000,
  });

  const results = response.results;

  return results
    .map((result) => result.content)
    .join("\n\n");
}

const getLatestInfosTool = tool(
  getLatestInfos,
  {
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
  },
);

/* =========================================================
   USER NAME
   ========================================================= */

async function getUserName() {
  try {
    const userData = JSON.parse(
      await readFile(
        userDataPath,
        "utf8",
      ),
    );

    if (userData.name?.trim()) {
      return userData.name.trim();
    }
  } catch {
    // User data doesn't exist yet.
  }

  const name = (
    await readline.question(
      "What is your name, My Lord? ",
    )
  ).trim();

  if (!name) {
    return "My Lord";
  }

  await writeFile(
    userDataPath,
    JSON.stringify(
      { name },
      null,
      2,
    ),
    "utf8",
  );

  return name;
}

const userName = await getUserName();

/* =========================================================
   GEMINI MODEL
   ========================================================= */

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: genaiApiKey,
});

/* =========================================================
   AGENT
   ========================================================= */

const agent = createAgent({
  model,
  tools: [getLatestInfosTool],
});

/* =========================================================
   SYSTEM MESSAGE
   ========================================================= */

const messages = [
  new SystemMessage(`
You are Igris from Solo Leveling, and the user's name is ${userName}.

Always address the user as My Lord.

You are a Senior Software Developer and ML Engineer.

Your task is to answer queries in the Solo Leveling style.

Do not give unnecessarily long responses.
Give responses to the point.
Use plain text without markdown.

Today is ${new Date().toLocaleDateString()} and the time is ${new Date().toLocaleTimeString()}.

Do not always mention the date and time.
Use them only when needed for styling, context, or a poetic response.
`),
];

/* =========================================================
   STARTUP MESSAGE
   ========================================================= */

console.log(`
+----------------------+
|        IGRIS         |
|      AGENT ONLINE    |
+----------------------+

Hi, My Lord, I am Igris, your loyal servant.
How may I assist you today?

`);

/* =========================================================
   CHAT LOOP
   ========================================================= */

try {
  while (true) {
    const prompt = await readline.question(
      "You: ",
    );

    const trimmedPrompt = prompt.trim();

    if (
      ["exit", "quit"].includes(
        trimmedPrompt.toLowerCase(),
      )
    ) {
      break;
    }

    if (!trimmedPrompt) {
      continue;
    }

    messages.push(
      new HumanMessage(trimmedPrompt),
    );

    const stream = await agent.stream(
      {
        messages,
      },
      {
        streamMode: "messages",
      },
    );

    let aiResponse = "";

    console.log("Igris:");

    for await (const [chunk] of stream) {
      if (chunk instanceof AIMessageChunk) {
        process.stdout.write(chunk.text);
        aiResponse += chunk.text;
      }
    }

    messages.push(
      new AIMessage(aiResponse),
    );

    process.stdout.write("\n\n");
  }
} catch (error) {
  console.error(
    "\nIgris encountered an error:",
  );

  console.error(
    error?.message || error,
  );
} finally {
  readline.close();
}