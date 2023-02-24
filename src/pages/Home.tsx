import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useRouteGeocodes from "../hooks/useRouteGeocodes";
import { getGeocoordinates } from "../api";
import RoutesHistory from "../components/RoutesHistory";
import useHistory from "../hooks/useHistory";
import { TFormValues, TGeocode } from "../types";

function Home() {
  const [formValues, setFormValues] = useState<TFormValues>({ start: "", end: "" });
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const { setCodes } = useRouteGeocodes();
  const { routes, addRoute } = useHistory();
  const navigate = useNavigate();

  const validate = () => {
    const { start, end } = formValues;
    const startArr = start.split(" ");
    const endArr = end.split(" ");

    if (startArr.length <= 1 || endArr.length <= 1) {
      setValidationMessage("You have to provide more information");
      setIsValid(false);
    } else if (startArr.every((startItem) => Number.isNaN(Number(startItem)) || endArr.every((endItem) => Number.isNaN(Number(endItem))))) {
      setValidationMessage("Addresses have to contain a street number");
      setIsValid(false);
    } else {
      setValidationMessage("");
      setIsValid(true);
    }
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>, valueKey: keyof TFormValues) => {
    setFormValues({ ...formValues, [`${valueKey}`]: e.currentTarget.value });
    validate();
  };

  const handleFormSubmission = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isValid) {
      const { items: startCoordinates }: { items: TGeocode[] } = await getGeocoordinates(formValues.start.split(" ").join("+"));
      const { items: endCoordinates }: { items: TGeocode[] } = await getGeocoordinates(formValues.end.split(" ").join("+"));

      if (startCoordinates && endCoordinates) {
        if (!startCoordinates.length && !endCoordinates.length) {
          setValidationMessage("Addresses not found");
          setIsValid(false);
        } else if (!startCoordinates.length) {
          setValidationMessage("Starting address not found");
          setIsValid(false);
        } else if (!endCoordinates.length) {
          setValidationMessage("Destination address not found");
          setIsValid(false);
        } else {
          setCodes(startCoordinates[0], endCoordinates[0]);
          addRoute({ start: startCoordinates[0], end: endCoordinates[0] });
          navigate("/map");
        }
      }
    }
  };

  return (
    <div className="container">
      <h1 className="header">Write your starting address and your destination address</h1>
      <form className="route-form">
        {validationMessage.length > 1 && <div className="validation">{validationMessage}</div>}
        <div className="inputs">
          <div className="input-container">
            <label htmlFor="start">
              Starting address <input id="start" type="text" name="start" value={formValues.start} onChange={(e) => handleInputChange(e, "start")} />
            </label>
          </div>
          <div className="input-container">
            <label htmlFor="end">
              Destination address <input id="end" type="text" name="end" value={formValues.end} onChange={(e) => handleInputChange(e, "end")} />
            </label>
          </div>
        </div>
        <button type="button" onClick={(e) => handleFormSubmission(e)}>
          Get route
        </button>
      </form>
      <RoutesHistory routes={routes} />
    </div>
  );
}

export default Home;
