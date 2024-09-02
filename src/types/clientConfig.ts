import { type ContentstackClient } from "@contentstack/management";
import { type ConsolaInstance } from "consola";

export type ClientConfig = {
  client: ContentstackClient;
  api_key: string;
  locales: string[];
  environments: string[];
  publishDetails: {
    locales: string[];
    environments: string[];
  };
  logger: ConsolaInstance;
};
