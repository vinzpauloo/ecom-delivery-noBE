import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./ProfileContainer.module.scss";
import Navigation from "../Navigation";
import ProfileContent from "./ProfileContent";

interface ContainerProps {}

type TRider = {
  user: string;
  photo: string;
  photos: string;
};

type TBike = {
  photos: string;
  photo: string;
};

type TTest = {
  photo: string;
};

const ProfileContainer: React.FC<ContainerProps> = ({}) => {
  const [user, setUser] = useState<TRider | null>(null);
  const [photos, setPhotos] = useState<TBike[]>([]);
  const [photo, setPhoto] = useState<TTest | null>(null);
  return (
    <Container fluid="xxl">
      <Row className={styles.container}>
        <Col lg={4} className="d-none d-lg-block">
          <div className={styles.navigationContainer}>
            <Navigation />
          </div>
        </Col>
        <Col lg={8} className="">
          <div className={styles.contentContainer}>
            <ProfileContent user={user} photos={photos} photo={photo} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileContainer;
