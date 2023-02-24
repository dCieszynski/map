/* eslint-disable react/function-component-definition */

import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    marginVertical: 4,
  },
  header: {
    fontSize: "24px",
    fontWeight: 900,
  },
  values: {
    fontSize: "14px",
  },
});

type Props = {
  from: string;
  to: string;
  routeLength: number;
  routeTime: number;
  routePrice: number;
  routePricePerKm: string;
};

const RouteDocument = ({ from, to, routeLength, routeTime, routePrice, routePricePerKm }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Map informations</Text>
        <Text style={styles.row}>
          <Text>From: </Text>
          <Text style={styles.values}>{from}</Text>
        </Text>
        <Text style={styles.row}>
          <Text>To: </Text>
          <Text style={styles.values}>{to}</Text>{" "}
        </Text>
        <Text style={styles.row}>
          <Text>Route length: </Text>
          <Text style={styles.values}>{routeLength / 1000}km</Text>
        </Text>
        <Text style={styles.row}>
          <Text>Route time: </Text>
          <Text style={styles.values}>{routeTime} hours</Text>
        </Text>
        <Text style={styles.row}>
          <Text>Route price: </Text>
          <Text style={styles.values}>{routePrice}PLN</Text>
        </Text>
        <Text style={styles.row}>
          <Text>Price per km: </Text>
          <Text style={styles.values}>{routePricePerKm}PLN</Text>
        </Text>
      </View>
    </Page>
  </Document>
);

export default RouteDocument;
