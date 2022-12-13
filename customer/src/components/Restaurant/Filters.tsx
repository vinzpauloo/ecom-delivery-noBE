import React from "react";
import { Button, Form } from "react-bootstrap";

import styles from "./Filters.module.scss";

interface ContainerProps {
  categories: TCategory[];
  filter: number;
  setFilter: React.Dispatch<React.SetStateAction<number>>;
  sort: number;
  setSort: React.Dispatch<React.SetStateAction<number>>;
  isFilterEnabled: boolean;
  setIsFilterEnabled: React.Dispatch<React.SetStateAction<boolean>>;
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
  sort,
  setSort,
  isFilterEnabled,
  setIsFilterEnabled,
}) => {
  const handleChange = (item: any) => {
    if (filter === item.id) {
      setFilter(0);
    } else {
      setFilter(item.id);
    }
  };

  const handleChangeSort = (id: number) => {
    if (sort === id) {
      setSort(0);
    } else {
      setSort(id);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.title}`}
      >
        <h4 className="mb-0">Filters</h4>
        <Form.Check
          type="switch"
          onChange={() => setIsFilterEnabled(!isFilterEnabled)}
          checked={isFilterEnabled}
          className={styles.switch}
        />
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
                onChange={() => handleChange(item)}
                checked={filter === item.id}
                className={styles.check}
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
            onChange={() => handleChangeSort(1)}
            checked={sort === 1}
            className={styles.check}
          />
          <Form.Check
            type="checkbox"
            id="descending"
            label="Price - High to low"
            onChange={() => handleChangeSort(2)}
            checked={sort === 2}
            className={styles.check}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
