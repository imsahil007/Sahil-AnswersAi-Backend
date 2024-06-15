const { ChatAnthropicMessages } = require('@langchain/anthropic');
// import { AnthropicClient } from "@langchain/anthropic";

const anthropicClient = new ChatAnthropicMessages(process.env.ANTHROPIC_API_KEY);

module.exports = anthropicClient;
