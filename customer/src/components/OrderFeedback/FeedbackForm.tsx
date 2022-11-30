import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import styles from "./FeedbackForm.module.scss";

interface ContainerProps {}

const FeedbackForm: React.FC<ContainerProps> = ({}) => {
  const MAX_CHARACTERS = 255;
  const [charactersCount, setCharactersCount] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setCharactersCount(feedback.length);
  }, [feedback]);

  return (
    <div className={styles.container}>
      <Form.Group className={styles.formGroup}>
        <Form.Label>Your Feedback</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          maxLength={MAX_CHARACTERS}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <span className={styles.characters}>
          {charactersCount}/{MAX_CHARACTERS}
        </span>
      </Form.Group>

      <Button variant="primary" className={styles.btnGray}>
        Submit Feedback
      </Button>
    </div>
  );
};

export default FeedbackForm;
