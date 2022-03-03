import { Status, StatusValue } from "../Config/typescript/enums";

export function getNewStatus(
  previousStatus: Status,
  actualStatus: StatusValue
): Status {
  switch (actualStatus) {
    // LLENAR COMIDA
    case StatusValue.FOOD_UPDATE_FILL:
      // Estado bebedero roto
      if (previousStatus === Status.NO_OK) {
        return Status.OK;
      }

      // Estado bebedero OK o con FOOD_MISSING
      if (
        previousStatus === Status.FOOD_MISSING ||
        previousStatus === Status.OK
      ) {
        return Status.OK;
      }

      // Estado bebedero WATER_MISSING o FW_MISSING
      if (
        previousStatus === Status.FW_MISSING ||
        previousStatus === Status.WATER_MISSING
      ) {
        return Status.WATER_MISSING;
      }

      // Estado BASE
      return Status.OK;

    // REPORTAR COMIDA VACIA
    case StatusValue.FOOD_UPDATE_NO_FILL:
      // Estado bebedero roto
      if (previousStatus === Status.NO_OK) {
        return Status.FOOD_MISSING;
      }

      // Estado bebedero OK
      if (previousStatus === Status.OK) {
        return Status.FOOD_MISSING;
      }

      // Estado bebedero FOOD_MISSING o FW_MISSING
      if (
        previousStatus === Status.FOOD_MISSING ||
        previousStatus === Status.FW_MISSING
      ) {
        return previousStatus;
      }

      // Estado bebedero WATER_MISSING
      if (previousStatus === Status.WATER_MISSING) {
        return Status.FW_MISSING;
      }

      // Estado BASE
      return Status.OK;

    // LLENAR AGUA
    case StatusValue.WATER_UPDATE_FILL:
      // Estado bebedero roto
      if (previousStatus === Status.NO_OK) {
        return Status.OK;
      }

      // Estado bebedero OK o con WATER_MISSING
      if (
        previousStatus === Status.WATER_MISSING ||
        previousStatus === Status.OK
      ) {
        return Status.OK;
      }

      // Estado bebedero FOOD_MISSING o FW_MISSING
      if (
        previousStatus === Status.FW_MISSING ||
        previousStatus === Status.FOOD_MISSING
      ) {
        return Status.FOOD_MISSING;
      }

      // Estado BASE
      return Status.OK;

    // REPORTAR AGUA VACIA
    case StatusValue.WATER_UPDATE_NO_FILL:
      // Estado bebedero roto
      if (previousStatus === Status.NO_OK) {
        return Status.WATER_MISSING;
      }

      // Estado bebedero OK
      if (previousStatus === Status.OK) {
        return Status.WATER_MISSING;
      }

      // Estado bebedero FOOD_MISSING o FW_MISSING
      if (
        previousStatus === Status.WATER_MISSING ||
        previousStatus === Status.FW_MISSING
      ) {
        return previousStatus;
      }

      // Estado bebedero FOOD_MISSING
      if (previousStatus === Status.FOOD_MISSING) {
        return Status.FW_MISSING;
      }

      // Estado BASE
      return Status.OK;

    // LLENAR COMIDA Y AGUA
    case StatusValue.FW_UPDATE_FILL:
      return Status.OK;

    // REPORTAR COMIDA Y AGUA VACIA
    case StatusValue.FW_UPDATE_NO_FILL:
      return Status.FW_MISSING;

    // REPORTAR PROBLEMA
    case StatusValue.PROBLEM:
      return Status.NO_OK;

    // REPORTAR ARREGLE
    case StatusValue.FIX:
      if (previousStatus === Status.NO_OK) {
        return Status.OK;
      }
      return previousStatus;
    default:
      return Status.OK;
  }
}

export function getStatusDescription(status: Status) {
  switch (status) {
    case Status.OK:
      return "El comedero se encuentra con comida y agua";
    case Status.NO_OK:
      return "El comedero se encuentra con algun problema";
    case Status.FOOD_MISSING:
      return "Al comedero le falta comida";
    case Status.WATER_MISSING:
      return "Al comedero le falta agua";
    case Status.FW_MISSING:
      return "Al comedero le falta comida y agua";
  }
}

export function getStatusColor(status: Status) {
  switch (status) {
    case Status.OK:
      return "#50723C";
    case Status.NO_OK:
      return "#e24036";
    case Status.FOOD_MISSING:
      return "#e24036";
    case Status.WATER_MISSING:
      return "#e24036";
    case Status.FW_MISSING:
      return "#e24036";
  }
}
