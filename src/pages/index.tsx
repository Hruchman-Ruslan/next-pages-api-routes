import { useRef } from "react";

export default function Home() {
  const emailInput = useRef<HTMLInputElement>(null);
  const feedbackInput = useRef<HTMLTextAreaElement>(null);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    const enteredEmail = emailInput.current?.value;
    const enteredFeedback = feedbackInput.current?.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="text" id="email" ref={emailInput} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea rows={5} id="feedback" ref={feedbackInput} />
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  );
}
