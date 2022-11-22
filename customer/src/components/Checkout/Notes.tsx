import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import styles from "./Notes.module.scss";

interface ContainerProps {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}

const Notes: React.FC<ContainerProps> = ({ note, setNote }) => {
  const MAX_CHARACTERS = 255;
  const [charactersCount, setCharactersCount] = useState(0);

  useEffect(() => {
    setCharactersCount(note.length);
  }, [note]);

  return (
    <div className={styles.container}>
      <h4>Add Note</h4>
      <Form.Group className={styles.formGroup}>
        <Form.Control
          as="textarea"
          rows={4}
          maxLength={MAX_CHARACTERS}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <span className={styles.characters}>
          {charactersCount}/{MAX_CHARACTERS}
        </span>
      </Form.Group>
    </div>
  );
};

export default Notes;
