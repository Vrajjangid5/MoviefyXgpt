import OpenAI from 'openai';
import {REACT_APP_OPENAI_KEY}  from "../key"
const OPENAI_KEY = REACT_APP_OPENAI_KEY;

if (!OPENAI_KEY) {
  throw new Error("Missing OPENAI_KEY environment variable");
}

const OpenAi = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export default OpenAi;
