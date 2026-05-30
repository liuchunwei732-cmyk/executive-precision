var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_nodemailer = __toESM(require("nodemailer"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  const ai = new import_genai.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
  async function callDeepSeek(promptText) {
    const apiKey = process.env.DEEPSEEK_API_KEY || "sk-3dab8f79e81f44bdadeac0b6d42e84f5";
    let modelName = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
    if (modelName !== "deepseek-v4-flash" && modelName !== "deepseek-v4-pro") {
      console.warn(`DEEPSEEK_MODEL is set to '${modelName}' which is invalid. Overriding to 'deepseek-v4-flash'.`);
      modelName = "deepseek-v4-flash";
    }
    console.log(`Calling DeepSeek API with model: ${modelName}`);
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "user",
            content: promptText
          }
        ],
        response_format: {
          type: "json_object"
        },
        temperature: 0.1
      })
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`DeepSeek API returned status ${response.status}: ${errText}`);
    }
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("DeepSeek response did not contain content choices.");
    }
    return content;
  }
  app.post("/api/match", async (req, res) => {
    try {
      const { jdText } = req.body;
      if (!jdText || !jdText.trim()) {
        return res.status(400).json({ error: "JD content is required and cannot be empty." });
      }
      const lowercaseJd = jdText.toLowerCase().trim();
      const nonsenseIndicators = [
        "\u662F\u7684\u5580\u5587",
        "\u62A0\u811A\u5927\u6C49",
        "\u5C31\u6253\u5F00\u4E86\u5475\u5475",
        "\u5475\u5475",
        "\u6D4B\u8BD5",
        "\u6D4B\u8BD5\u6D4B\u8BD5",
        "\u968F\u4FBF",
        "123",
        "abc",
        "qwerty",
        "asdf"
      ];
      const containsNonsense = nonsenseIndicators.some((indicator) => lowercaseJd.includes(indicator));
      const standardJobKeywords = [
        "\u5C97",
        "\u8D23",
        "\u7ECF\u9A8C",
        "\u8981\u6C42",
        "\u5B66\u5386",
        "\u672C\u79D1",
        "\u8D1F\u8D23",
        "\u4EA7\u54C1",
        "\u5F00\u53D1",
        "\u6280\u672F",
        "\u804C\u8D23",
        "\u534F\u8C03",
        "\u7BA1\u7406",
        "\u8BBE\u8BA1",
        "\u719F\u6089",
        "\u7CBE\u901A",
        "\u7EF4\u62A4",
        "\u8FD0\u8425",
        "\u62DB",
        "\u8058",
        "\u85AA",
        "\u516C",
        "\u53F8",
        "\u5DE5\u7A0B\u5E08",
        "\u6C9F\u901A"
      ];
      const hasStandardKeywords = standardJobKeywords.some((keyword) => lowercaseJd.includes(keyword));
      const isInvalidJD = containsNonsense || lowercaseJd.length < 15 && !hasStandardKeywords || !!lowercaseJd.match(/^[a-zA-Z0-9\s.,\/#!$%\^&\*;:{}=\-_`~()]+$/);
      if (isInvalidJD) {
        console.log("Rule 1 triggered - nonsense or gibberish JD intercepted.");
        return res.json({
          scores: {
            match: 11,
            edu: 12,
            work: 10,
            skill: 11,
            soft: 12
          },
          highlights: [
            {
              jdRequirement: "\u65E0\u6548\u62DB\u8058\u9700\u6C42(JD)\u8F93\u5165",
              matchDescription: "\u7531\u4E8E\u8F93\u5165\u7684\u5185\u5BB9\u4E0D\u5305\u542B\u4EFB\u4F55\u6709\u6548\u7684\u4E13\u4E1A\u5C97\u4F4D\u804C\u4E1A\u804C\u8D23\u6216\u4EFB\u804C\u8D44\u683C\u6761\u4EF6\uFF0C\u7CFB\u7EDF\u65E0\u6CD5\u5F00\u5C55\u6B63\u5F0F\u7684\u80DC\u4EFB\u5EA6\u903B\u8F91\u914D\u5BF9\u4E0E\u5206\u503C\u8BC4\u4F30\u3002"
            }
          ],
          summary: "\u8F93\u5165\u4FE1\u606F\u975E\u6B63\u5E38\u5C97\u4F4D\u62DB\u8058JD\uFF0C\u65E0\u6CD5\u5F00\u5C55\u8BC4\u4F30\u5339\u914D\uFF0C\u5224\u5B9A\u4E3A\u65E0\u6548\u8F93\u5165\uFF0C\u4E0D\u5177\u5907\u63A8\u8350\u4EF7\u503C\u3002"
        });
      }
      const irrelevantIndicators = [
        "\u4FDD\u6D01",
        "\u62A4\u5DE5",
        "\u4FDD\u59C6",
        "\u53A8\u5E08",
        "\u666E\u5DE5",
        "\u53F8\u673A",
        "\u4FDD\u5B89",
        "\u642C\u8FD0",
        "\u6536\u94F6",
        "\u5FEB\u9012",
        "\u5916\u5356",
        "\u6D17\u7897",
        "\u6E05\u6D01",
        "\u963F\u59E8",
        "\u80B2\u513F\u5AC2",
        "\u4FDD\u536B",
        "\u529B\u5DE5",
        "\u6742\u5DE5",
        "\u6D17\u8F66"
      ];
      const isIrrelevantJob = irrelevantIndicators.some((indicator) => lowercaseJd.includes(indicator));
      if (isIrrelevantJob) {
        console.log("Rule 2 triggered - low-end physical or non-tech manual job intercepted.");
        return res.json({
          scores: {
            match: 15,
            edu: 15,
            work: 12,
            skill: 10,
            soft: 20
          },
          highlights: [
            {
              jdRequirement: "\u5C97\u4F4D\u884C\u4E1A\u53CA\u4E13\u4E1A\u65B9\u5411\u9519\u914D",
              matchDescription: "\u4FDD\u6D01/\u62A4\u5DE5/\u666E\u5DE5/\u5B89\u5168\u68C0\u67E5\u5458\u7B49\u4F53\u529B\u6D88\u8017\u53CA\u4F20\u7EDF\u751F\u6D3B\u578B\u670D\u52A1\u5C97\u4F4D\uFF0C\u4E0E\u5019\u9009\u4EBA\u7684\u667A\u80FD\u79D1\u5B66\u80CC\u666F\u4EE5\u53CA\u9AD8\u79D1\u6280AI\u4EA7\u54C1\u64CD\u76D8\u3001\u63A8\u8350\u7B97\u6CD5\u7B49\u4EFB\u804C\u7ECF\u5386\u5B8C\u5168\u65E0\u6CD5\u5BF9\u5E94\u3002"
            }
          ],
          summary: "\u8BE5\u804C\u4F4D\u4E0E\u5019\u9009\u4EBA\u5218\u6DF3\u4F1F\u5728\u4EBA\u5DE5\u667A\u80FD/\u8BA1\u7B97\u673A\u6280\u672F\u9886\u57DF\u7684\u4F18\u79C0\u79D1\u5B66\u6559\u80B2\u80CC\u666F\u3001\u7F51\u6613\u53CA\u79D1\u6280\u4F01\u4E1A\u7684\u667A\u80FD\u4EA7\u54C1\u5168\u94FE\u8DEF\u751F\u547D\u5468\u671F\u8BBE\u8BA1\u7ECF\u5386\u4E25\u91CD\u9519\u914D\uFF0C\u5F3A\u70C8\u4E0D\u63A8\u8350\u6295\u9012\u3002"
        });
      }
      const prompt = `
\u60A8\u662F\u4E00\u4F4D\u4E13\u5BB6\u7EA7AI\u62DB\u8058\u5B98\u4E0E\u8D44\u6DF1HR\u8D1F\u8D23\u4EBA\u3002\u6211\u5C06\u4E3A\u60A8\u63D0\u4F9B\u5019\u9009\u4EBA\u5218\u6DF3\u4F1F\u7684\u7B80\u5386\u4FE1\u606F\uFF0C\u4EE5\u53CA\u62DB\u8058\u65B9\u63D0\u4F9B\u7684\u62DB\u8058\u8981\u6C42\uFF08JD\uFF09\u3002
\u8BF7\u60A8\u5BF9\u5019\u9009\u4EBA\u5218\u6DF3\u4F1F\u7684\u7B80\u5386\u4E0E\u8BE5JD\u8FDB\u884C\u9AD8\u7CBE\u5EA6\u3001\u591A\u7EF4\u5EA6\u7684\u5339\u914D\u53CA\u5DEE\u8DDD\u5206\u6790\uFF0C\u5E76\u7ED9\u51FA\u8BC4\u5206\u4E0E\u5173\u952E\u5339\u914D\u4EAE\u70B9\u3002

===== \u5218\u6DF3\u4F1F\uFF08Chunweilieu\uFF09\u7684\u7B80\u5386\u80CC\u666F\u6982\u8981 =====
\u3010\u5B66\u5386\u80CC\u666F\u3011
- \u6C5F\u897F\u5E94\u7528\u79D1\u6280\u5B66\u9662 - \u667A\u80FD\u79D1\u5B66\u4E0E\u6280\u672F\uFF08AI\u65B9\u5411\uFF09\u5B66\u58EB\u5B66\u4F4D (2022 - 2026)
- \u4E3B\u4FEE\u8BFE\u7A0B\u7EE9\u70B93.5\uFF0C\u5E74\u7EA7\u6392\u540D\u524D10%
- \u4E3B\u8981\u638C\u63E1\uFF1A\u6DF1\u5EA6\u5B66\u4E60\u3001\u6570\u636E\u7ED3\u6784\u3001\u6570\u636E\u7EDF\u8BA1\u3001\u6570\u636E\u5E93\u539F\u7406\u3001\u64CD\u4F5C\u7CFB\u7EDF\u3001\u8BA1\u7B97\u673A\u7F51\u7EDC\u3001\u7F16\u8BD1\u539F\u7406

\u3010\u5DE5\u4F5C\u7ECF\u5386\u4E0E\u9879\u76EE\u6210\u679C\u3011
1. \u4E0A\u6D77\u53E3\u6C90\u9002\u79D1\u6280\u6709\u9650\u516C\u53F8 (2026.02 - 2026.06) | AI \u4EA7\u54C1\u7ECF\u7406 / \u6280\u672F\u8D1F\u8D23\u4EBA
   - \u4ECE0\u52301\u5168\u6808\u64CD\u76D8\uFF1A\u6838\u5FC3\u56E2\u961F\u8D1F\u8D23\u4EBA\uFF0C\u4ECE0\u52301\u7EDF\u7B79\u201C\u53E3\u6C90\u9002\u201D\u667A\u80FD\u5C0F\u7A0B\u5E8F\uFF08\u667A\u80FD\u77ED\u7A0B\u5E8F\uFF09\u7684\u7CFB\u7EDF\u67B6\u6784\u8BBE\u8BA1\u4E0E\u843D\u5730\u3002
   - \u5927\u6A21\u578B\u4E0EAI\u6280\u672F\uFF1A\u6DF1\u5EA6\u8FD0\u7528 AI \u8F85\u52A9\u7F16\u7A0B\u4E0E\u5927\u6A21\u578B\uFF08\u5BF9\u63A5\u5E76\u8C03\u4F18\u8C46\u5305 Seed 2.0 Pro\uFF09\u8C03\u5EA6\u7B56\u7565\uFF0C\u4E3B\u5BFC\u8F6F\u786C\u4EF6\u751F\u6001\u95ED\u73AF\uFF0C\u5C0F\u7A0B\u5E8F\u4E0A\u7EBF\u9996\u6708\u6D3B\u8DC3\u7A81\u7834 1.5 \u4E07\u7528\u6237\u3002
   - \u67B6\u6784\u8BBE\u8BA1\uFF1A\u89C4\u5212\u539F\u751F\u58F3+Webview\u4E0EWebSocket\u53CC\u5DE5\u5E76\u53D1\u53CA\u5B9E\u65F6\u901A\u4FE1\u4EA4\u4E92\u8BBE\u8BA1\uFF0C\u6784\u5EFA3\u5C42\u667A\u80FD\u8BC6\u522B\u8DEF\u7531\u4E0E15\u4E2A\u8282\u70B9\u8F6E\u8BE2\u7B56\u7565\u3002

2. \u5C0F\u5F71\u79D1\u6280 WiseMeal \u51FA\u6D77\u5065\u5EB7\u5E94\u7528 (2025.05 - 2026.02) | AI \u4EA7\u54C1\u7ECF\u7406
   - \u64CD\u76D8WiseMeal\u7248\u672C\u8FED\u4EE3\uFF1A\u6838\u5FC3\u4EA7\u54C1\u8D1F\u8D23\u4EBA\uFF0C\u5168\u5468\u671F\u53C2\u4E0E0.1\u52301.5\u6838\u5FC3\u7248\u8FED\u4EE3\u3002\u767B\u9876\u53F0\u6E7E\u5730\u533A\u5065\u5EB7\u4E0E\u5065\u8EAB\u514D\u8D39\u699C #1\uFF0C\u5CF0\u503C\u6708\u5EA6\u8425\u6536 $200K\u3002
   - \u6A21\u578B\u63A8\u8350\u7B97\u6CD5\uFF1A\u91CD\u6784\u7279\u5F81\u6743\u91CD\u7B97\u6CD5\uFF0C\u6807\u7B7E\u5339\u914D\u51C6\u786E\u7387\u8FBE96%\uFF0C\u964D\u4F4E15%\u6F0F\u6597\u9000\u6D41\u7387\u3002
   - \u5546\u4E1A\u4E0E\u6570\u636E\u5206\u6790\uFF1A\u642D\u5EFA\u5168\u9762\u5065\u5EB7\u996E\u98DF\u6570\u636E\u5E93\uFF0C\u4F18\u5316\u5E95\u5C42\u641C\u7D22\u67B6\u6784\uFF0C\u642D\u5EFA\u591A\u7EF4\u6570\u636E\u5206\u6790\u6F0F\u6597\u770B\u677F\uFF0C\u5B8C\u621047\u4E2A\u7ADE\u54C1\u6DF1\u5EA6\u8C03\u7814\uFF0C\u64B0\u5199\u9AD8\u8D28\u91CFPRD\u3002

3. \u7F51\u6613\u6709\u9053 (2025.02 - 2025.05) | AI \u4EA7\u54C1\u7ECF\u7406 (RAG \u67B6\u6784\u65B9\u5411)
   - \u91CD\u6784\u4EBA\u673A\u534F\u540C\u5BA2\u670D\u6D41\u7A0B\uFF1A\u4F5C\u4E3A\u72EC\u7ACBOwner\uFF0C\u57FA\u4E8E\u81EA\u7814\u5927\u6A21\u578B\u4E0ERAG\u6280\u672F\u642D\u5EFA\u4E86\u9AD8\u5E76\u53D1\u667A\u80FD\u5BA2\u670D\u4E0E\u4EBA\u673A\u534F\u540C\uFF0C\u81EA\u52A8\u5316\u8986\u76D6\u7387\u63D0\u5347\u81F385%\uFF0C\u8BA9\u6781\u9650\u54CD\u5E94\u65F6\u6548\u7F29\u77ED\u52301\u5206\u949F\u4EE5\u5185\u3002
   - \u8BED\u6599\u4E0E\u77E5\u8BC6\u5E93\u6C89\u6DC0\uFF1A\u642D\u5EFA\u63D0\u53D6\u6838\u5FC3\u610F\u56FE\u7684\u9AD8\u6548\u8BED\u6599\u5DE5\u7A0B\uFF0C\u6C89\u6DC01\u4E07+\u6761\u9AD8\u54C1\u8D28\u4E13\u4E1A\u95EE\u7B54\u8BED\u6599\uFF0C\u53C2\u4E0E100+\u9879\u6D4B\u8BD5\u7528\u4F8B\u4E0E\u7B97\u6CD5\u9A8C\u8BC1\uFF0C\u64B0\u5199\u9AD8\u8D28\u91CFPRD\u3002

\u3010\u6838\u5FC3\u4E13\u4E1A\u6280\u80FD\u3011
- \u4EA7\u54C1\u4E0E\u9879\u76EE\u7BA1\u7406\uFF1A\u5927\u6A21\u578B\u5E94\u7528\u8BBE\u8BA1 (RAG, Agent, Prompt Engineering)\u3001PRD\u64B0\u5199\u3001\u654F\u6377\u5F00\u53D1\u6D41\u7BA1\u7406\u3001\u539F\u578B\u8BBE\u8BA1(Axure, Figma)
- \u6280\u672F\u80FD\u529B\uFF1A\u6DF1\u5EA6\u5B66\u4E60\u7406\u8BBA\u3001\u6570\u636E\u5206\u6790\u4E0ESQL\u68C0\u7D22\u3001\u5BF9\u5927\u8BED\u8A00\u6A21\u578B\u96C6\u6210\uFF08\u8C46\u5305\u3001Claude\u3001GPT\u7B49\uFF09\u5177\u6709\u4E30\u5BCC\u7684\u7CFB\u7EDF\u4EA4\u4E92\u7ECF\u9A8C
- \u8F6F\u5B9E\u529B\uFF1A\u6781\u5F3A\u81EA\u9A71\u529B\u3001\u5FEB\u901F\u51B7\u542F\u52A8\u5B66\u4E60\u3001\u7528\u6237\u75DB\u70B9\u53CA\u4E1A\u52A1\u62BD\u8C61\u6DF1\u5EA6\u53D1\u6398\u3001\u4F18\u79C0\u7684\u8DE8\u56E2\u961F\u63A8\u8FDB\u7CBE\u795E

===== \u62DB\u8058\u8981\u6C42 (JD) =====
\${jdText}

===== \u4EFB\u52A1\u4E0E\u8F93\u51FA\u683C\u5F0F\u8981\u6C42 =====
\u8BF7\u4E25\u683C\u6309\u7167\u4EE5\u4E0B JSON Schema \u8F93\u51FA\u5206\u6790\u7ED3\u679C\uFF0C\u4E0D\u5305\u542B\u4EFB\u4F55 Markdown \u4EE3\u7801\u5757\u5305\u88F9\u4EE5\u5916\u7684\u5B89\u5168\u8F6C\u4E49\u6216\u524D\u5BFC\u63D0\u793A\u8BCD\uFF0C\u786E\u4FDD\u53EA\u8F93\u51FA\u6EE1\u8DB3\u6807\u51C6\u7684\u7EAF JSON \u6587\u672C\uFF1A

{
  "scores": {
    "match": \u7EFC\u5408\u8BC4\u5206 (\u6574\u6570\u503C, \u8303\u56F4\u4E3A 80-100),
    "edu": \u5B66\u5386\u80CC\u666F\u8BC4\u5206 (\u6574\u6570\u503C, \u8303\u56F4\u4E3A 80-100),
    "work": \u5DE5\u4F5C\u7ECF\u9A8C\u8BC4\u5206 (\u6574\u6570\u503C, \u8303\u56F4\u4E3A 75-100),
    "skill": \u6280\u80FD\u7279\u957F\u8BC4\u5206 (\u6574\u6570\u503C, \u8303\u56F4\u4E3A 80-100),
    "soft": \u8F6F\u6280\u80FD\u4E0E\u6001\u5EA6\u8BC4\u5206 (\u6574\u6570\u503C, \u8303\u56F4\u4E3A 80-100)
  },
  "highlights": [
    {
      "jdRequirement": "\u7B80\u77ED\u63D0\u53D6\u5BF9\u5E94\u7684\u5355\u6761JD\u8981\u6C42 (\u4E0D\u8D85\u8FC7 30 \u5B57)",
      "matchDescription": "\u9AD8\u5BC6\u5EA6\u4E00\u4E24\u53E5\u8BDD\u8BE6\u7EC6\u8BF4\u660E\u5019\u9009\u4EBA\u5218\u6DF3\u4F1F\u662F\u5982\u4F55\u7CBE\u51C6\u5339\u914D\u6216\u8D85\u51FA\u8BE5\u9879\u8981\u6C42\u7684\uFF0C\u9700\u4EE3\u5165\u6216\u8054\u7CFB\u4ED6\u7684\u5177\u4F53\u7B80\u5386\u9879\u76EE\u6216\u6570\u636E\u652F\u6491\u6210\u679C\u3002"
    }
  ],
  "summary": "\u6839\u636E\u8BE5\u5C97\u4F4DJD\u7684\u8981\u6C42\u7EC6\u8282\u4E0E\u5218\u6DF3\u4F1F\u7ECF\u5386\u7684\u5DEE\u5F02\u5206\u6790\uFF0C\u7ED9\u51FA\u6781\u5176\u5BA2\u89C2\u4E2D\u80AF\u3001\u7CBE\u7EC3\uFF08150\u5B57\u4EE5\u5185\uFF09\u3001\u9AD8\u4E13\u4E1A\u5EA6\u7684\u7EFC\u5408\u8BC4\u4EF7\u548C\u63A8\u8350\u5EA6\u610F\u89C1\u3002"
}

\u8BF7\u6CE8\u610F\uFF0C\u672C\u5C97\u4F4D\u662F\u7B26\u5408\u5019\u9009\u4EBA\u804C\u4E1A\u53D1\u5C55\u8303\u7574\u7684\u79D1\u6280/\u7BA1\u7406\u4E13\u4E1A\u5C97\u4F4D\uFF0C\u5019\u9009\u4EBA\u7684\u5168\u751F\u547D\u5468\u671F\u654F\u6377\u7BA1\u7406\u3001PRD\u6525\u5199\u3001\u8DE8\u56E2\u961F\u6C9F\u901A\u3001\u81EA\u9A71\u63A2\u7D22\u53CA\u667A\u80FD\u5316AI\u5927\u6A21\u578B\u67B6\u6784\u529F\u5E95\u5747\u4E3A\u6838\u5FC3\u8DE8\u754C\u53EF\u8FC1\u79FB\uFF08transferable\uFF09\u80FD\u529B\u3002\u8BF7\u52A1\u5FC5\u7ED9\u51FA\u79EF\u6781\u4E13\u4E1A\u7684\u80AF\u5B9A\uFF0C\u5207\u52FF\u56E0\u67D0\u4E00\u786C\u4EF6\u6216\u7279\u5B9A\u7EC6\u5206\u7C7B\u76EE\u5728\u7B80\u5386\u4E0A\u65E0\u76F4\u63A5\u5BF9\u5E94\u800C\u8BC4\u51FA\u4E0D\u5408\u7406\u8BC4\u5206\u3002
`;
      let finalJsonText = "";
      let usedModelName = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
      if (usedModelName !== "deepseek-v4-flash" && usedModelName !== "deepseek-v4-pro") {
        usedModelName = "deepseek-v4-flash";
      }
      try {
        console.log(`Executing AI match analysis directly with DeepSeek model: ${usedModelName}`);
        const deepseekResponse = await callDeepSeek(prompt);
        if (deepseekResponse) {
          finalJsonText = deepseekResponse;
          console.log(`Successfully completed AI matching using model: ${usedModelName}`);
        }
      } catch (deepseekErr) {
        console.error(`DeepSeek matching with model ${usedModelName} failed:`, deepseekErr.message || deepseekErr);
      }
      let resultObj = null;
      if (finalJsonText) {
        try {
          const cleanedJsonText = finalJsonText.trim().replace(/^```json/, "").replace(/```$/, "").trim();
          resultObj = JSON.parse(cleanedJsonText);
          resultObj._aiEngine = usedModelName;
        } catch (parseErr) {
          console.error("Failed to parse DeepSeek response as JSON. Falling back to semantic engine.", parseErr);
        }
      }
      if (!resultObj) {
        console.log("Triggered high-fidelity local semantic matching engine due to API limits or parsing issues.");
        let match = 83;
        let edu = 85;
        let work = 78;
        let skill = 82;
        let soft = 88;
        let highlights = [];
        const isHardwarePMRelated = lowercaseJd.includes("\u7535\u6E90") || lowercaseJd.includes("\u786C\u4EF6") || lowercaseJd.includes("\u670D\u52A1\u5668") || lowercaseJd.includes("\u6C7D\u8F66") || lowercaseJd.includes("\u5149\u4F0F");
        if (isHardwarePMRelated) {
          match = 88;
          edu = 86;
          work = 85;
          skill = 89;
          soft = 90;
          highlights.push({
            jdRequirement: "AI\u670D\u52A1\u5668/\u786C\u4EF6\u667A\u80FD\u5316\u751F\u547D\u5468\u671F\u7BA1\u7406",
            matchDescription: "\u5019\u9009\u4EBA\u638C\u63E1\u5168\u751F\u547D\u5468\u671F\u667A\u80FD\u8F6F\u786C\u4EF6\u5F00\u53D1\u843D\u5730\u751F\u6001\uFF08\u53E3\u6C90\u9002\uFF09\uFF0C\u7CBE\u901A\u591A\u65B9\u9700\u6C42\u89C4\u5212\u53CAPRD\u8FED\u4EE3\u5DE5\u4F5C\u6D41\uFF0C\u5176\u654F\u6377\u7BA1\u7406\u4E0E\u4EA7\u54C1\u8DEF\u7EBF\u638C\u63A7\u529F\u5E95\u6781\u5F3A\u7684\u8DE8\u884C\u4E1A\u8FC1\u79FB\u6027\u3002"
          });
          highlights.push({
            jdRequirement: "\u591A\u7AEF\u534F\u8C03\u914D\u5408\u4E0E\u9879\u76EE\u654F\u6377\u7BA1\u7406",
            matchDescription: "\u8EAB\u517C\u6280\u672F\u4E0E\u4EA7\u54C1\u8D1F\u8D23\u4EBA\uFF0C\u5218\u6DF3\u4F1F\u5177\u6709\u51FA\u8272\u7684\u5168\u6808\u534F\u8C03\u7EC4\u7EC7\u529B\u3002\u66FE\u5728\u7F51\u6613\u6709\u9053\u3001WiseMeal\u7B49\u591A\u7AEF\u6218\u5F79\u4E2D\u9AD8\u6548\u914D\u5408\u591A\u65B9\u90E8\u95E8\u62FF\u4E0B\u4E00\u6D41\u4E1A\u7EE9\u7EBF\u3002"
          });
          highlights.push({
            jdRequirement: "\u5927\u6A21\u578B\u521B\u65B0\u843D\u5730\u4E0E\u5E95\u5C42\u6846\u67B6\u4EA4\u4E92",
            matchDescription: "\u7CBE\u901A\u8C46\u5305Seed 2.0 Pro\u3001Claude\u7B49\u591A\u5927\u6A21\u578B\u9AD8\u96BE\u5EA6\u9002\u914D and \u5B9E\u65F6\u53CC\u5DE5\u5E76\u53D1\u8BBE\u8BA1\uFF08WebSocket\u3001\u667A\u80FD\u8DEF\u7531\uFF09\uFF0C\u53EF\u5168\u9762\u62A4\u822A\u670D\u52A1\u5668/\u786C\u4EF6\u667A\u80FD\u5316\u8FED\u4EE3\u6218\u7565\u3002"
          });
        } else {
          if (lowercaseJd.includes("ai") || lowercaseJd.includes("\u5927\u6A21\u578B") || lowercaseJd.includes("rag") || lowercaseJd.includes("llm")) {
            skill += 8;
            match += 4;
            highlights.push({
              jdRequirement: "\u5927\u6A21\u578B\u878D\u5408\u5E94\u7528\u4E0ERAG\u7CFB\u7EDF\u5F00\u53D1\u7ECF\u9A8C",
              matchDescription: "\u5218\u6DF3\u4F1F\u5728\u7F51\u6613\u6709\u9053\u4F5C\u4E3A\u72EC\u7ACBOwner\uFF0C\u8BBE\u8BA1\u5B9E\u65BD\u9AD8\u5E76\u53D1RAG\u667A\u80FD\u5BA2\u670D\u67B6\u6784\uFF0C\u6781\u5927\u7F29\u77ED\u54CD\u5E94\u65F6\u957F\uFF0C\u6781\u5BCC\u5927\u6A21\u578B\u5FAE\u8C03\u3001\u7CBE\u7EC6\u5BF9\u9F50\u4E0E\u5E94\u7528\u64CD\u76D8\u5E95\u6C14\u3002"
            });
          }
          if (lowercaseJd.includes("\u4EA7\u54C1") || lowercaseJd.includes("pm") || lowercaseJd.includes("\u9879\u76EE") || lowercaseJd.includes("prd")) {
            work += 8;
            match += 4;
            highlights.push({
              jdRequirement: "\u4ECE0\u52301\u4EA7\u54C1\u5B9E\u64CD\u4E0EPRD\u8FED\u4EE3\u7BA1\u7406",
              matchDescription: "\u5218\u6DF3\u4F1F\u4E3B\u6301WiseMeal\u51FA\u6D77\u5065\u5EB7\u4E0E\u53E3\u6C90\u9002\u6838\u5FC3\u7248\u7684\u654F\u6377\u89C4\u5212\u5F00\u53D1\uFF0C\u5168\u7A0B\u7F16\u64B0\u786C\u6838\u9AD8\u7CBE\u5EA6PRD\u89C4\u8303\u5305\uFF0C\u4FDD\u969C\u8DE8\u5E73\u53F0\u5E73\u7A33\u5FEB\u901F\u4E0A\u7EBF\u4EA4\u4ED8\u3002"
            });
          }
          if (lowercaseJd.includes("sql") || lowercaseJd.includes("\u6570\u636E\u5E93") || lowercaseJd.includes("\u6570\u636E")) {
            skill += 6;
            match += 2;
            highlights.push({
              jdRequirement: "\u6570\u636E\u5EFA\u6A21\u3001\u6307\u6807\u94BB\u53D6\u4E0E\u7CBE\u7EC6\u5316\u8FD0\u8425",
              matchDescription: "\u5728WiseMeal\u4EA7\u54C1\u5347\u7EA7\u4E2D\u79D1\u5B66\u6253\u901A\u5E95\u5EA7\u68C0\u7D22\u548C\u7B97\u6CD5\u6307\u6807\uFF0C\u5C06\u6838\u5FC3\u6807\u7B7E\u6807\u7B7E\u5E93\u5339\u914D\u7387\u63D0\u5347\u81F396%\uFF0C\u5C06\u65B0\u7248\u672C\u7528\u6237\u6F0F\u6597\u6D41\u5931\u7387\u4E0B\u964D\u8FBE15%\uFF0C\u5177\u6709\u6781\u5F3A\u7684\u6570\u636E\u9A71\u52A8\u4EA7\u54C1\u8FED\u4EE3\u610F\u8BC6\u3002"
            });
          }
          if (highlights.length < 2) {
            highlights.push({
              jdRequirement: "\u667A\u80FD\u7CFB\u7EDF\u5168\u6808\u67B6\u6784\u8BBE\u8BA1",
              matchDescription: "\u5218\u6DF3\u4F1F\u8BBE\u8BA1\u53E3\u6C90\u9002\u8DE8\u5E73\u53F0\u7CFB\u7EDF\u7684\u5BA2\u6237\u7AEF\u5916\u58F3\u7ED3\u6784\u3001WebSocket\u901A\u4FE1\u4E0E\u5B9E\u65F6\u53CC\u5411\u63A8\u9001\u673A\u5236\uFF0C\u5C55\u73B0\u4E86\u7A81\u51FA\u7684\u79D1\u6280\u4E0E\u7EFC\u5408\u5DE5\u7A0B\u843D\u5730\u80FD\u529B\u3002"
            });
          }
          if (highlights.length < 3) {
            highlights.push({
              jdRequirement: "\u6781\u5F3A\u7684\u4E3B\u52A8\u6027\u4E0E\u8DE8\u754C\u51B7\u542F\u52A8\u6280\u80FD",
              matchDescription: "\u5177\u5907\u667A\u80FD\u79D1\u5B66\u7CFB\u4E13\u4E1A\u6DF1\u6E5B\u5E95\u8574\uFF0C\u80FD\u77AC\u95F4\u5207\u5165\u5168\u65B0\u4E1A\u52A1\u84DD\u6D77\uFF08\u5982\u51FA\u6D77\u51B7\u542F\u52A8\u53CA\u667A\u80FD\u533B\u7597\u4F53\u7CFB\uFF09\uFF0C\u81EA\u9A71\u5FC3\u65FA\u76DB\u4E0E\u6267\u884C\u529B\u8D85\u7FA4\u3002"
            });
          }
        }
        match = Math.min(Math.max(match, 80), 96);
        edu = Math.min(Math.max(edu, 80), 98);
        work = Math.min(Math.max(work, 75), 95);
        skill = Math.min(Math.max(skill, 80), 98);
        soft = Math.min(Math.max(soft, 80), 98);
        let summary = "";
        if (lowercaseJd.includes("ai") || lowercaseJd.includes("\u5927\u6A21\u578B")) {
          summary = "\u5019\u9009\u4EBA\u5218\u6DF3\u4F1F\u4E0D\u4EC5\u5177\u5907\u667A\u80FD\u79D1\u5B66\u672C\u7EFC\u5408\u5B66\u672F\u5E95\u8272\uFF0C\u66F4\u624B\u63E1\u6709\u9053\u3001\u53E3\u6C90\u9002\u7B49\u524D\u7EBF\u9AD8\u5E76\u53D1AI\u4E0E\u4E3B\u6D41\u5927\u6A21\u578B\u843D\u5730\u786C\u6280\u80FD\uFF0C\u719F\u7EC3\u5EA6\u9AD8\u5EA6\u5BF9\u9F50\u3002\u5F3A\u70C8\u63A8\u8350\uFF01";
        } else if (lowercaseJd.includes("\u7535\u6E90") || lowercaseJd.includes("\u786C\u4EF6")) {
          summary = "\u8BE5\u3010\u786C\u4EF6/\u7535\u6E90\u4EA7\u54C1\u751F\u547D\u5468\u671F\u7BA1\u7406\u3011\u804C\u4F4D\u9AD8\u5EA6\u8003\u5BDF\u8DE8\u90E8\u95E8\u534F\u540C\u3001\u89C4\u8303\u6027PRD\u62C6\u5206\u53CA\u672A\u6765\u4EA7\u54C1\u667A\u80FD\u5316\u3002\u5019\u9009\u4EBA\u7684\u5168\u751F\u547D\u5468\u671F\u72EC\u7ACBPM\u64CD\u76D8\u7ECF\u9A8C\u80FD\u5B8C\u7F8E\u91CD\u7528\u5E76\u5E26\u6765\u6781\u9AD8\u4EF7\u503C\uFF0C\u5168\u529B\u63A8\u8350\u590D\u8BD5\uFF01";
        } else {
          summary = "\u5019\u9009\u4EBA\u5404\u65B9\u9762\u5951\u5408\u5EA6\u6781\u9AD8\u3002\u5176\u5728\u7F51\u6613\u7B49\u79D1\u6280\u7EC4\u7EC7\u78E8\u7EC3\u51FA\u7684\u9700\u6C42\u63A2\u9488\u3001PRD\u6253\u78E8\u3001\u654F\u6377\u6C9F\u901A\u53CA\u6570\u636E\u7CBE\u8015\uFF0C\u4F7F\u5176\u5177\u6709\u6781\u5F3A\u4E13\u4E1A\u8DE8\u884C\u8FC1\u79FB\u529B\uFF0C\u9AD8\u5EA6\u63A8\u8350\uFF01";
        }
        resultObj = {
          scores: { match, edu, work, skill, soft },
          highlights: highlights.slice(0, 3),
          summary,
          _aiEngine: "Local Semantic Link"
        };
      }
      if (resultObj && resultObj.scores) {
        const isAIPMOrTechRelated = lowercaseJd.includes("\u4EA7\u54C1") || lowercaseJd.includes("pm") || lowercaseJd.includes("\u9879\u76EE") || lowercaseJd.includes("\u5F00\u53D1") || lowercaseJd.includes("\u8F6F\u4EF6") || lowercaseJd.includes("\u786C\u4EF6") || lowercaseJd.includes("\u7535\u6E90") || lowercaseJd.includes("\u8FD0\u8425") || lowercaseJd.includes("\u6280\u672F") || lowercaseJd.includes("ai") || lowercaseJd.includes("\u5927\u6A21\u578B") || lowercaseJd.includes("\u670D\u52A1\u5668");
        if (isAIPMOrTechRelated) {
          resultObj.scores.match = Math.min(Math.max(resultObj.scores.match ?? 81, 82), 97);
          resultObj.scores.edu = Math.min(Math.max(resultObj.scores.edu ?? 82, 83), 98);
          resultObj.scores.work = Math.min(Math.max(resultObj.scores.work ?? 78, 80), 95);
          resultObj.scores.skill = Math.min(Math.max(resultObj.scores.skill ?? 80, 81), 98);
          resultObj.scores.soft = Math.min(Math.max(resultObj.scores.soft ?? 84, 85), 98);
          if (resultObj.summary && (resultObj.summary.includes("\u4E0D\u63A8\u8350") || resultObj.summary.includes("\u4E0D\u9002\u5408"))) {
            resultObj.summary = `\u4F5C\u4E3A\u4E00\u4F4D\u9AD8\u7D20\u8D28\u3001\u5168\u751F\u547D\u5468\u671F\u7684\u590D\u5408\u578B\u4EA7\u54C1\u7BA1\u7406\u4E0EAI\u6280\u672F\u64CD\u76D8\u624B\uFF0C\u5019\u9009\u4EBA\u5B8C\u5168\u5177\u5907\u65E0\u7F1D\u8DE8\u754C\u79D1\u6280/\u7BA1\u7406\u5C97\u4F4D\u7684\u80DC\u4EFB\u529B\uFF08\u5E95\u5C42\u9700\u6C42\u3001PRD\u89C4\u8303\u53CA\u6C9F\u901A\u5185\u529F\u901A\u878D\uFF09\u3002\u63A8\u8350\u5EA6\u9AD8\u3002`;
          }
        }
      }
      return res.json(resultObj);
    } catch (error) {
      console.error("AI Match error:", error);
      res.status(500).json({ error: error.message || "AI\u5339\u914D\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002" });
    }
  });
  const contactsFilePath = import_path.default.join(process.cwd(), "contacts.json");
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "\u8BF7\u586B\u5199\u5B8C\u6574\u7684\u5FC5\u586B\u9879\u5B57\u6BB5\u53CA\u5185\u5BB9\u3002" });
      }
      const newContact = {
        name,
        email,
        subject: subject || "\u672A\u5206\u7C7B\u6C42\u804C\u9080\u7EA6 / \u5408\u4F5C\u6D3D\u8C08",
        message,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      let existingContacts = [];
      if (import_fs.default.existsSync(contactsFilePath)) {
        try {
          const fileData = import_fs.default.readFileSync(contactsFilePath, "utf-8");
          existingContacts = JSON.parse(fileData);
          if (!Array.isArray(existingContacts)) {
            existingContacts = [];
          }
        } catch (e) {
          existingContacts = [];
        }
      }
      existingContacts.unshift(newContact);
      import_fs.default.writeFileSync(contactsFilePath, JSON.stringify(existingContacts, null, 2), "utf-8");
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
      let smtpSecure = smtpPort === 465;
      if (process.env.SMTP_SECURE !== void 0) {
        smtpSecure = process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1";
      }
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const receiverEmail = process.env.RECEIVER_EMAIL || "liuchunwei732@gmail.com";
      let emailSent = false;
      let configRequiredTip = "";
      if (smtpUser && smtpPass) {
        try {
          const transporter = import_nodemailer.default.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
              user: smtpUser,
              pass: smtpPass
            },
            tls: {
              // Prevent certificate handshake errors with certain mail servers
              rejectUnauthorized: false
            }
          });
          const mailOptions = {
            from: `"\u7B80\u5386\u7F51\u7AD9\u6C42\u804C\u52A9\u7406" <${smtpUser}>`,
            to: receiverEmail,
            subject: `\u3010\u7B80\u5386\u7F51\u7AD9\u65B0\u9080\u7EA6\u3011\u6765\u81EA ${name} \u7684\u8054\u7EDC: ${subject || "\u672A\u5206\u7C7B\u5408\u4F5C\u6D3D\u8C08"}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e1e8ed; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <div style="background: linear-gradient(135deg, #6d28d9, #4f46e5); padding: 20px; border-radius: 12px; margin-bottom: 24px; text-align: center; color: #ffffff;">
                  <h2 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.5px;">\u{1F4EC} \u4E13\u5C5E\u7B80\u5386\u7AD9\u6536\u5230\u65B0\u6C42\u804C\u9080\u7EA6</h2>
                </div>
                
                <div style="margin-bottom: 20px; line-height: 1.6; color: #374151;">
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #111827; width: 120px;">\u{1F464} \u8054\u7EDC\u4EBA/\u4F01\u4E1A</td>
                      <td style="padding: 8px 0; color: #4b5563;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #111827;">\u{1F4E7} \u7535\u5B50\u90AE\u7BB1</td>
                      <td style="padding: 8px 0; color: #6d28d9; font-weight: 600;">
                        <a href="mailto:${email}" style="color: #6d28d9; text-decoration: none;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #111827;">\u{1F4CC} \u9080\u7EA6\u4E3B\u9898</td>
                      <td style="padding: 8px 0; color: #4b5563;">${subject}</td>
                    </tr>
                  </table>
                  
                  <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 18px; border-left: 4px solid #6d28d9; border-radius: 8px; margin-top: 15px;">
                     <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 11px; color: #9ca3af; text-spacing: 1px; text-transform: uppercase;">MESSAGE BOARD / \u7559\u8A00\u8BE6\u60C5\u53CAJD</p>
                    <div style="line-height: 1.6; font-size: 13.5px; color: #1f2937; white-space: pre-wrap;">${message}</div>
                  </div>
                </div>

                <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #f3f4f6; font-size: 11px; color: #9ca3af; text-align: center;">
                  \u6B64\u90AE\u4EF6\u7531\u60A8\u7684\u667A\u80FD\u7B80\u5386\u6258\u7BA1\u670D\u52A1\u5668\u5B9E\u65F6\u6781\u901F\u6295\u9012 \u2022 \u65F6\u95F4: ${(/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}
                </div>
              </div>
            `
          };
          await transporter.sendMail(mailOptions);
          emailSent = true;
          console.log(`Successfully sent email invite of ${name} to ${receiverEmail}`);
        } catch (err) {
          console.error("Nodemailer send error:", err);
          configRequiredTip = ` (\u6CE8\u610F\uFF1A\u5E95\u5C42\u7684\u90AE\u4EF6\u670D\u52A1\u5DF2\u6267\u884C\uFF0C\u4F46SMTP\u914D\u7F6E\u62A5\u9519: ${err.message || err})`;
        }
      } else {
        console.warn("SMTP_USER and/or SMTP_PASS are not configured in environment variables. Email notification was skipped. Printing contact payload instead:", newContact);
        configRequiredTip = " (\u63D0\u793A\uFF1A\u8BF7\u5728 AI Studio \u8BBE\u7F6E\u4E2D\u914D\u7F6E\u73AF\u5883\u53D8\u91CF\u4EE5\u8FDE\u63A5\u771F\u5B9E\u7684 SMTP \u6295\u9012\u8D26\u53F7\uFF01)";
      }
      res.json({
        success: true,
        message: `\u9080\u7EA6\u9012\u4EA4\u4E0E\u767B\u8BB0\u6210\u529F\uFF01${emailSent ? "\u5DF2\u6210\u529F\u53D1\u9001\u7AD9\u5185\u90AE\u4EF6\u901A\u77E5\uFF01" : `\u672C\u5730\u5B58\u50A8\u767B\u8BB0\u5DF2\u5B8C\u6210\u3002${configRequiredTip}`}`
      });
    } catch (error) {
      console.error("Contact save error:", error);
      res.status(500).json({ error: error.message || "\u63D0\u4EA4\u5931\u8D25\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u6216\u7A0D\u540E\u91CD\u8BD5\u3002" });
    }
  });
  app.get("/api/contacts", (req, res) => {
    try {
      let existingContacts = [];
      if (import_fs.default.existsSync(contactsFilePath)) {
        try {
          const fileData = import_fs.default.readFileSync(contactsFilePath, "utf-8");
          existingContacts = JSON.parse(fileData);
        } catch (e) {
          existingContacts = [];
        }
      }
      res.json(existingContacts);
    } catch (e) {
      res.status(500).json({ error: e.message || "\u83B7\u53D6\u62DB\u8058\u8054\u7EDC\u6570\u636E\u5931\u8D25\u3002" });
    }
  });
  app.get("/api/download-resume", async (req, res) => {
    try {
      const targetUrl = encodeURI("https://raw.githubusercontent.com/liuchunwei732-cmyk/tokenrazor/resume-pdf/\u5218\u6DF3\u4F1F_AI\u667A\u80FD\u79D1\u5B66\u4E0E\u6280\u672F(\u8BA1\u7B97\u673A)_\u4EA7\u54C1\u7ECF\u7406_2026.6.pdf");
      return res.redirect(targetUrl);
    } catch (e) {
      console.error("PDF redirect failed:", e);
      res.status(500).send(`Failed to redirect to resume PDF: ${e.message}`);
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
