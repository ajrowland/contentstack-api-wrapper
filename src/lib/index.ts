import contentstack from "@contentstack/management";
import consola from "consola";
import { type ClientConfig } from "../types/clientConfig";
import contentTypeApi from "./contentTypeApi";
import entryApi from "./entryApi";
import assetApi from "./assetApi";

const client = contentstack.client({
  host: process.env.HOST,
});

const api_key = process.env.API_KEY;
const locales = process.env.LOCALES?.split(",");
const environments = process.env.ENVIRONMENTS?.split(",");
const publishDetails = { locales, environments };
const management_token = process.env.MANAGEMENT_TOKEN;

const config: ClientConfig = {
  client,
  api_key,
  management_token,
  locales,
  environments,
  publishDetails,
  logger: consola,
};

export const contentType = contentTypeApi(config);

export const entry = entryApi(config);

export const asset = assetApi(config);
