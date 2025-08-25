const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = process.env.PORT || 3000;

// Telegram setup
const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN";
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Admins
const adminIds = ["YOUR_ADMIN_ID"];
let PIN = "0103";

// Middleware
app.use(cors());
app.use(express.json());

// Files
const suggestionsFile = path.join(__dirname, "suggestions.json");
const bannedFile = path.join(__dirname, "banned.json");

// Ensure files exist
function ensureFile(filePath) {
  if (!fs.existsSync(filePath))
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}
ensureFile(suggestionsFile);
ensureFile(bannedFile);

// Banned words
const bannedWords = [
  "spam","etc","badword1","badword2" // Add your banned words here
];
function containsBannedWord(text) {
  return bannedWords.some((word) => text.toLowerCase().includes(word));
}

// Telegram helper
async function sendTelegramMessage(message) {
  try {
    await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: "HTML" });
  } catch (err) {
    console.error("Telegram send failed:", err.message);
  }
}

// Suggestions API
app.post("/api/suggestion", async (req, res) => {
  const { email, message } = req.body;
  if (!email || !message)
    return res.status(400).json({ error: "Email & message required." });

  let bannedList = JSON.parse(fs.readFileSync(bannedFile, "utf-8") || "[]");
  if (bannedList.includes(email))
    return res.status(403).json({ error: "You are banned." });

  if (containsBannedWord(message)) {
    if (!bannedList.includes(email)) bannedList.push(email);
    fs.writeFileSync(bannedFile, JSON.stringify(bannedList, null, 2));
    await sendTelegramMessage(
      `<b>Blocked Suggestion & User Banned</b>\nEmail: ${email}\nMessage: ${message}\nTime: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
    );
    return res.status(403).json({ error: "Inappropriate content. You are banned." });
  }

  const newSuggestion = {
    email,
    message,
    time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };

  try {
    const data = JSON.parse(fs.readFileSync(suggestionsFile, "utf-8") || "[]");
    data.push(newSuggestion);
    fs.writeFileSync(suggestionsFile, JSON.stringify(data, null, 2));

    await sendTelegramMessage(
      `<b>New Suggestion</b>\nEmail: ${newSuggestion.email}\nMessage: ${newSuggestion.message}\nTime: ${newSuggestion.time}`
    );

    res.json({ success: true, message: "Suggestion saved successfully." });
  } catch (err) {
    console.error("Error saving suggestion:", err);
    await sendTelegramMessage(`Error saving suggestion for ${email}: ${err.message}`);
    res.status(500).json({ error: "Failed to save suggestion." });
  }
});

// PIN system
const pendingPin = {};

function executeCommand(userId, chatId, text) {
  const bannedList = JSON.parse(fs.readFileSync(bannedFile, "utf-8") || "[]");
  const suggestions = JSON.parse(fs.readFileSync(suggestionsFile, "utf-8") || "[]");

  if (text.startsWith("/ban ")) {
    const email = text.split(" ")[1];
    if (!bannedList.includes(email)) bannedList.push(email);
    fs.writeFileSync(bannedFile, JSON.stringify(bannedList, null, 2));
    bot.sendMessage(chatId, `${email} has been banned.`);
  } else if (text.startsWith("/unban ")) {
    const email = text.split(" ")[1];
    const newList = bannedList.filter((e) => e !== email);
    fs.writeFileSync(bannedFile, JSON.stringify(newList, null, 2));
    bot.sendMessage(chatId, `${email} has been unbanned.`);
  } else if (text === "/listbanned") {
    bot.sendMessage(chatId, `Banned Users:\n${bannedList.join("\n") || "None"}`);
  } else if (text === "/serverstatus") {
    bot.sendMessage(chatId, `Server is ONLINE`);
  } else if (text === "/turnoff") {
    bot.sendMessage(chatId, `Turning off server...`);
    process.exit(0);
  } else if (text === "/listmessages") {
    if (suggestions.length === 0) return bot.sendMessage(chatId, "No suggestions yet.");
    suggestions.forEach((s, i) => {
      const inline = [[{ text: "Delete", callback_data: `delete|${i}` }]];
      bot.sendMessage(chatId, `#${i + 1}\nEmail: ${s.email}\nMessage: ${s.message}\nTime: ${s.time}`, {
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: inline }
      });
    });
  } else if (text === "/clear") {
    bot.sendMessage(chatId, "Chat cleared successfully.");
  }
}

// Telegram listener
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  const text = msg.text?.trim();
  if (!text || !adminIds.includes(userId)) return;

  if (pendingPin[userId]?.waiting) {
    if (text === PIN) {
      bot.sendMessage(chatId, "PIN correct. Welcome Admin.");
      bot.sendMessage(chatId, `Available Commands:\n/ban <email>\n/unban <email>\n/listbanned\n/listmessages\n/serverstatus\n/turnoff`, { parse_mode: "HTML" });
      if (pendingPin[userId].command) {
        executeCommand(userId, chatId, pendingPin[userId].command);
      }
    } else {
      bot.sendMessage(chatId, "Wrong PIN. Command cancelled.");
    }
    pendingPin[userId] = null;
    return;
  }

  const adminCommands = ["/ban", "/unban", "/listbanned", "/serverstatus", "/turnoff", "/listmessages"];
  if (adminCommands.some((c) => text.startsWith(c))) {
    pendingPin[userId] = { waiting: true, command: text };
    bot.sendMessage(chatId, "Enter your admin PIN to execute this command:");
    return;
  }

  if (text === "/start") {
    pendingPin[userId] = { waiting: true, command: null };
    bot.sendMessage(chatId, "Welcome Admin. Please enter your PIN:");
    return;
  }
});

// Inline delete
bot.on("callback_query", async (query) => {
  const data = query.data;
  const chatId = query.message.chat.id;

  if (data.startsWith("delete|")) {
    const index = parseInt(data.split("|")[1]);
    let suggestions = JSON.parse(fs.readFileSync(suggestionsFile, "utf-8") || "[]");
    if (index >= 0 && index < suggestions.length) {
      const deleted = suggestions.splice(index, 1)[0];
      fs.writeFileSync(suggestionsFile, JSON.stringify(suggestions, null, 2));
      bot.editMessageText(`Deleted:\nEmail: ${deleted.email}\nMessage: ${deleted.message}`, {
        chat_id: chatId,
        message_id: query.message.message_id
      });
    }
  }
});

// Root route
app.get("/", (req, res) => res.send("Cute Cloud Suggestions Server is running."));

// Start server
app.listen(PORT, async () => {
  const now = new Date();
  const formattedTime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  console.log(`Server Live on port: ${PORT} | Time: ${formattedTime}`);
  await sendTelegramMessage(`Cute Cloud Suggestions Server is LIVE\nPort: ${PORT}\nTime: ${formattedTime}`);
});

// Shutdown
async function handleExit(signal) {
  const now = new Date();
  const formattedTime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  console.log(`Server shutting down due to ${signal} at ${formattedTime}`);
  await sendTelegramMessage(`Server shutting down\nTime: ${formattedTime}\nReason: ${signal}`);
  process.exit(0);
}
process.on("SIGINT", () => handleExit("SIGINT"));
process.on