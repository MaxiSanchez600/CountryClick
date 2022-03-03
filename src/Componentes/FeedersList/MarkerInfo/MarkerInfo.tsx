import React, { useContext } from "react";
import "./MarkerInfo.scss";
import { contextFeeders } from "../../Context/ReactContext";
import { Card, Divider, Text } from "@nextui-org/react";
import { getStatusDescription, getStatusColor } from "../../../Helpers/status";

export default function MarkerInfo() {
  const { selectedFeeder } = useContext(contextFeeders);

  return (
    <div className="markerInfo_Container">
      {selectedFeeder && (
        <Card hoverable>
          <div className="markerInfo_CardItemsContainer">
            {/* <div
              style={{ backgroundImage: selectedFeeder.FeederReport.img }}
            ></div> */}
            <img
              src={selectedFeeder.FeederReport.img}
              alt={selectedFeeder.qrId}
              className="markerInfo_img"
            />
            <div className="markerInfo_CardTextContainer">
              <Card.Header>
                <Text css={{ fontWeight: "900" }}>
                  📍 Ubicacion y descripcion
                </Text>
              </Card.Header>
              <Divider />
              <Text>Ubicacion: {selectedFeeder.location}</Text>
              <Text>Descripcion: {selectedFeeder.description}</Text>
              <Card.Header>
                <Text css={{ fontWeight: "900" }}>📰 Estado actual</Text>
              </Card.Header>
              <Divider />
              <Text
                css={{
                  color: "white",
                  backgroundColor: getStatusColor(
                    selectedFeeder.FeederReport.status
                  ),
                  padding: "5px",
                  borderRadius: "5px",
                  backgroundSize: "cover",
                }}
              >
                {getStatusDescription(selectedFeeder.FeederReport.status)}
              </Text>
              <Text>
                Ultimo reporte: {selectedFeeder.FeederReport.description}
              </Text>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
