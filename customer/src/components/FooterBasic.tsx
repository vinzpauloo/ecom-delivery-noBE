import { Container, Row, Col } from "react-bootstrap";

import styles from "./FooterBasic.module.scss";

interface ContainerProps {}

const FooterBasic: React.FC<ContainerProps> = () => {
  return (
    <footer
      className={`d-flex justify-content-center align-items-center ${styles.footer}`}
    >
      <Container fluid="xxl" className="">
        <Row className={styles.container}>
          <Col className="">
            <div className="text-center">
              {/* Desktop version */}
              <p className="d-none d-lg-block">
                All Rights Reserved <strong>2022</strong> Food Monkey
              </p>

              {/* Mobile version */}
              <p className="d-lg-none">
                All Rights Reserved <strong>2022</strong>
                <br />
                Food Monkey
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterBasic;
