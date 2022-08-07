const FeedbackError = ({ msg, testId }) => (
  <div data-testid={testId} style={{ color: "red", textAlign: "left" }}>
    {msg}
  </div>
);

export default FeedbackError;
