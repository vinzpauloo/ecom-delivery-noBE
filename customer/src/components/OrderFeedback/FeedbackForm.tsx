import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import styles from "./FeedbackForm.module.scss";
import FileInput from "./FileInput";

interface ContainerProps {
  feedback: string;
  setFeedback: any;
  handleOnClick: any;
  setImageFiles?: any;
}

const FeedbackForm: React.FC<ContainerProps> = ({
  feedback,
  setFeedback,
  handleOnClick,
  setImageFiles,
}) => {
  const MAX_CHARACTERS = 255;
  const [charactersCount, setCharactersCount] = useState(0);

  useEffect(() => {
    setCharactersCount(feedback.length);
  }, [feedback]);

  return (
    <div className={styles.container}>
      <Row>
        <Col lg={{ span: 5, offset: 1 }}>
          <FileInput setImageFiles={setImageFiles} />

          {/* <Button variant="primary" className={styles.btnGray}>
            Upload Image
          </Button> */}
        </Col>

        <Col lg={{ span: 5 }}>
          <Form.Group className={styles.formGroup}>
            {/* <Form.Label>Your Feedback</Form.Label> */}
            <Form.Control
              as="textarea"
              rows={4}
              maxLength={MAX_CHARACTERS}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your Feedback"
            />
            <span className={styles.characters}>
              {charactersCount}/{MAX_CHARACTERS}
            </span>
          </Form.Group>

          <Button
            variant="primary"
            className={styles.btnGray}
            onClick={handleOnClick}
          >
            Submit Feedback
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FeedbackForm;
