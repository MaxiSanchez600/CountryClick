import "./how.scss";
import { Card, Divider, Row, Text, Spacer } from "@nextui-org/react";
export default function How() {
  return (
    <div className="how_container">
      <div className="how_subContainer">
        <h1>
          Podes actualizar su estado acercandote a cada comedero y scaneando su
          codigo QR
        </h1>
        <h2>¿Que podes actualizar?</h2>
        <div className="how_CardContainer">
          <Card css={{ mw: "330px", margin: "24px" }}>
            <Card.Header>
              <Text css={{ fontWeight: "900" }}>🐶 Actualiza estado</Text>
            </Card.Header>
            <Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text>
                En el caso de que te hayas acercado para{" "}
                <span>rellenar comida.</span>
              </Text>
              <Spacer />
              <Text>
                Ej: Lo encontraste vacio mientras caminabas en la plaza / Viste
                en la web que alguien reporto que faltaba comida, y te acercaste
                a rellenarlo.
              </Text>
            </Card.Body>
            <Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Text
                  css={{
                    backgroundColor: "#50723c",
                    color: "white",
                    padding: "5px",
                    borderRadius: "5px",
                    fontWeight: "500",
                  }}
                >
                  Es muy importante{" "}
                  <span>solo rellenarlo con comida balanceada </span>
                  para perros, nada mas.
                </Text>
              </Row>
            </Card.Footer>
          </Card>
          <Card css={{ mw: "330px", margin: "24px" }}>
            <Card.Header>
              <Text css={{ fontWeight: "900" }}>📝 Reporta estado</Text>
            </Card.Header>
            <Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text>
                En el caso de que lo hayas encontrado <span>sin comida.</span>
              </Text>
              <Spacer />
              <Text>
                Ej: Lo encontraste vacio mientras caminabas por el parque, pero
                no tenias como rellenarlo, por lo que decidiste reportar el
                estado para que alguien pueda enterarse y rellenarlo despues.
              </Text>
            </Card.Body>
            <Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Text
                  css={{
                    backgroundColor: "#50723c",
                    color: "white",
                    padding: "5px",
                    borderRadius: "5px",
                    fontWeight: "500",
                  }}
                >
                  Es muy importante <span>reportar estos estados</span> para que
                  la gente pueda enterarse y ir a rellenarlos.
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </div>
        <h2 className="how_problemText">
          Tambien podes reportar si tiene algun problema (se mojo, se rompio, se
          trabo, etc) y actualizar si lo solucionaste.
        </h2>
      </div>
    </div>
  );
}
