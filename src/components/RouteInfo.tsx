import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import RouteDocument from "./RouteDocument";

type Props = {
  start: string;
  end: string;
  routeLength: number;
};

const getRoutePrice = (price: string, length: number) => {
  return parseFloat((parseFloat(price) * (length / 1000) * 1.1).toFixed(2));
};

const getRouteTime = (length: number) => {
  return parseFloat((length / 1000 / (800 / 24)).toFixed(2));
};

function RouteInfo({ start, end, routeLength }: Props) {
  const [priceInput, setPriceInput] = useState("3");
  const [routePrice, setRoutePrice] = useState(0);
  const [routeTime, setRouteTime] = useState(0);
  const [isPdf, setIsPdf] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Number.isNaN(parseFloat(e.currentTarget.value))) {
      setPriceInput(e.currentTarget.value);
    } else {
      setPriceInput("0");
    }
  };

  useEffect(() => {
    setRoutePrice(getRoutePrice(priceInput, routeLength));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    if (priceInput.length > 1 && priceInput.charAt(0) === "0") {
      const newPrice = priceInput;
      setPriceInput(newPrice.slice(1));
    }
    setRoutePrice(getRoutePrice(priceInput, routeLength));
  }, [priceInput, routeLength]);

  useEffect(() => {
    setRouteTime(getRouteTime(routeLength));
  }, [routeLength]);

  useEffect(() => {
    setIsPdf(false);
  }, [pdfGenerated]);

  return (
    <div className="route-info">
      <h2>Route information</h2>
      <div>From: {start}</div>
      <div>To: {end}</div>
      <div>Route length: {routeLength / 1000}km</div>
      <div>Route time: {routeTime}h</div>
      <div>Price: {routePrice}PLN</div>
      <div>
        <div>Price per km: {priceInput}PLN</div>
        <label htmlFor="price">
          Change price per km
          <input id="price" name="price" type="text" placeholder="0" value={priceInput} onChange={(e) => handlePriceChange(e)} />
        </label>
      </div>
      <button type="button" onClick={() => setIsPdf(true)}>
        {isPdf ? (
          <PDFDownloadLink
            document={
              <RouteDocument
                from={start}
                to={end}
                routeLength={routeLength}
                routeTime={routeTime}
                routePrice={routePrice}
                routePricePerKm={priceInput}
              />
            }
            onClick={() => setPdfGenerated(!pdfGenerated)}
            fileName="routeInformation.pdf"
          >
            Download PDF
          </PDFDownloadLink>
        ) : (
          "Generate PDF"
        )}
      </button>
    </div>
  );
}

export default RouteInfo;
