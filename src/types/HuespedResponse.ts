import Huesped from "./Huesped";

export default interface HuespedResponse {
    result: string;
    errors: string[];
    results: Huesped[];
  }