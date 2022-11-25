import React from "react";
import { Button, Form } from "react-bootstrap";

import styles from "./Filters.module.scss";

interface ContainerProps {
  categories: TCategory[];
  filter: number;
  setFilter: React.Dispatch<React.SetStateAction<number>>;
}

type TCategory = {
  id: number;
  name: string;
  photo: string;
};

const Filters: React.FC<ContainerProps> = ({
  categories,
  filter,
  setFilter,
}) => {
  return (
    <div className={styles.container}>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.title}`}
      >
        <h4 className="mb-0">Filters</h4>
        <Form.Check type="switch" className={styles.switch} />
      </div>

      <div className={styles.filters}>
        <h3 className="mb-0">Category</h3>
        <div className={styles.filterContent}>
          {categories.map((item, index) => {
            return (
              <Form.Check
                type="checkbox"
                key={item.id}
                id={`${item.id}`}
                label={item.name}
                onChange={() => setFilter(item.id)}
                checked={filter === item.id}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.filters}>
        <h3 className="mb-0">Sort by</h3>
        <div className={styles.filterContent}>
          <Form.Check
            type="checkbox"
            id="ascending"
            label="Price - Low to high"
          />
          <Form.Check
            type="checkbox"
            id="descending"
            label="Price - High to low"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
