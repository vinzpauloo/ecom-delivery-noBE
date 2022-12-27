import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useGoogleAPI } from "../../hooks/useGoogleAPI";
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

const Map = ({
  lat,
  lng,
  mapOnClick,
}: {
  lat: number;
  lng: number;
  mapOnClick: any;
}) => {
  const center = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  return (
    <GoogleMap
      zoom={16}
      center={center}
      mapContainerClassName={styles.map}
      onClick={(e) => mapOnClick(e)}
      options={{
        gestureHandling: "greedy",
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

const PlacesAutocomplete = ({
  address,
  setAddress,
  setLat,
  setLng,
}: {
  address: string;
  setAddress: any;
  setLat: any;
  setLng: any;
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

    // Address to Geocode conversion
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setLat(lat);
    setLng(lng);
  };

  useEffect(() => {
    setValue(address, false);
    clearSuggestions();
  }, [address]);

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
  lat: number;
  lng: number;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
}

const NewAddress: React.FC<ContainerProps> = ({
  newAddress,
  setNewAddress,
  isNewAddress,
  setIsNewAddress,
  lat,
  lng,
  setLat,
  setLng,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [status, setStatus] = useState("");
  const { reverseGeocode } = useGoogleAPI();

  const handleUseNewAddress = () => {
    setIsNewAddress(!isNewAddress);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const handleReverseGeocode = async (lat: number, lng: number) => {
    console.log("handleReverseGeocode ...");

    const response = await reverseGeocode(lat, lng);
    console.log(response);

    setNewAddress(response);
  };

  const mapErrorAlert = () => {
    setTimeout(
      () =>
        alert("Location permission is not granted by your browser or device."),
      500
    );
  };

  const handlePinLocation = () => {
    console.log("handlePinLocation ...");

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
      alert("Geolocation is not supported by your browser or device.");
    } else {
      setStatus("Requesting location access ...");
      setModalShow(true);

      navigator.permissions
        .query({
          name: "geolocation",
        })
        .then(function (result) {
          // console.log(result.state);

          if (result.state === "denied") {
            mapErrorAlert();
          }

          if (result.state === "granted") setIsGranted(true);

          result.onchange = function () {
            // console.log("Result changed!", result);

            if (result.state === "denied") {
              mapErrorAlert();
            }

            if (result.state === "granted") setIsGranted(true);
          };
        });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log("Granted permission to get coordinates");
          // console.log("Mapping ...");

          setStatus("");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setModalShow(true);

          // Reverse Geocode
          handleReverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          setStatus("Unable to retrieve your location.");
        }
      );
    }
  };

  const mapOnClick = async (e: any) => {
    // console.log("mapOnClick clicked!");
    // console.log(e);

    setLat(e.latLng.lat());
    setLng(e.latLng.lng());

    // Reverse Geocode
    handleReverseGeocode(e.latLng.lat(), e.latLng.lng());
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Modal
        size="xl"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-0">
          {/* Old flow, need */}
          {/* {!isGranted ? (
            <div className="text-center py-5">
              <p>Waiting for location permission.</p>
              <div className="spinner-grow text-primary" role="status"></div>
            </div>
          ) : (
            <>
              <p
                className={`px-2 py-2 mb-0 text-center ${styles.modalAddress}`}
              >
                <strong>LOCATION:</strong> {newAddress}
              </p>
              <Map lat={lat} lng={lng} mapOnClick={mapOnClick} />
            </>
          )} */}

          {/* Revised flow, show default Google Map coordinates */}
          <>
            <p className={`px-2 py-2 mb-0 text-left ${styles.modalAddress}`}>
              {isGranted ? (
                <>
                  <strong>LOCATION:</strong> {newAddress}
                </>
              ) : (
                <>
                  <strong>WARNING:</strong> {status}
                </>
              )}
            </p>
            <Map lat={lat} lng={lng} mapOnClick={mapOnClick} />
          </>
        </Modal.Body>
      </Modal>

      <div className={styles.container}>
        <h4>New Address</h4>

        <Form className={styles.form}>
          <Row xs={1}>
            <Col>
              <PlacesAutocomplete
                address={newAddress}
                setAddress={setNewAddress}
                setLat={setLat}
                setLng={setLng}
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

                <Button
                  variant="primary"
                  className={styles.pin}
                  onClick={handlePinLocation}
                >
                  Pin my location
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default NewAddress;
