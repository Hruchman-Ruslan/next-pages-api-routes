import { IFeedback } from "@/types/feedback";

import { buildFeedbackPath, extractFeedback } from "@/helpers/utils";

export interface FeedbackPageProps {
  feedbackItems: IFeedback[];
}

export default function FeedbackPage({ feedbackItems }: FeedbackPageProps) {
  return (
    <ul>
      {feedbackItems.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
