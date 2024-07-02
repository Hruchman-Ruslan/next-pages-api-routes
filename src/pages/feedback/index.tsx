import { Fragment, useState } from "react";

import { IFeedback } from "@/types/feedback";

import { buildFeedbackPath, extractFeedback } from "@/helpers/utils";

export interface FeedbackPageProps {
  feedbackItems: IFeedback[];
}

export default function FeedbackPage({ feedbackItems }: FeedbackPageProps) {
  const [feedbackData, setFeedbackData] = useState<IFeedback>();

  function loaderFeedbackHandler(id: string) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map(({ id, text }) => (
          <li key={id}>
            {text}
            <button onClick={loaderFeedbackHandler.bind(null, id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data: IFeedback[] = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
