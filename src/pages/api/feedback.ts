import fs from "fs";

import { NextApiRequest, NextApiResponse } from "next";

import { IFeedback } from "@/types/feedback";

import { buildFeedbackPath, extractFeedback } from "@/helpers/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback: IFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const filePath = buildFeedbackPath();
    const data: IFeedback[] = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data: IFeedback[] = extractFeedback(filePath);

    res.status(200).json({ feedback: data });
  }
}
