import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import styles from "./NewAddress.module.scss";

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

const API_KEY: string = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || "";

const PlacesAutocomplete = ({
  address,
  setAddress,
}: {
  address: string;
  setAddress: any;
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: any) => {
    setValue(address, false);
    setAddress(address);
    clearSuggestions();
    console.log(address);
  };

  return (
    <Form.Group className="position-relative">
      <Form.Label>Full Address</Form.Label>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className={styles.addressInput}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </Form.Group>
  );
};

interface ContainerProps {
  newAddress: string;
  setNewAddress: React.Dispatch<React.SetStateAction<string>>;
  isNewAddress: boolean;
  setIsNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewAddress: React.FC<ContainerProps> = ({
  newAddress,
  setNewAddress,
  isNewAddress,
  setIsNewAddress,
}) => {
  const handleOnClick = () => {
    console.log("Confirming new address ...");
  };

  const handleUseNewAddress = () => {
    setIsNewAddress(!isNewAddress);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h4>New Address</h4>

      <Form className={styles.form}>
        <Row xs={1}>
          <Col>
            {/* <Form.Group className="position-relative">
              <Form.Label>Enter Address</Form.Label>
              <Form.Control
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                required
              />
            </Form.Group> */}
            <PlacesAutocomplete
              address={newAddress}
              setAddress={setNewAddress}
            />
          </Col>
        </Row>

        <Row className="mt-2">
          <Col lg={{ span: 8, offset: 2 }}>
            <div className="d-flex justify-content-between align-items-center">
              <div
                className={`d-flex justify-content-center gap-4 ${styles.checkbox}`}
              >
                <Form.Check
                  type="checkbox"
                  id="address_this_new"
                  label="Use this Address"
                  checked={isNewAddress}
                  onChange={handleUseNewAddress}
                />
              </div>

              <Button variant="primary" type="submit" onClick={handleOnClick}>
                Confirm new address
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewAddress;
