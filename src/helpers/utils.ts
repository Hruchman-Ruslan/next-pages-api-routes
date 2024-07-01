import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileData = fs.readFileSync(filePath, "utf8");

  if (!fileData) {
    return [];
  }

  try {
    const data = JSON.parse(fileData);
    return data;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
}
