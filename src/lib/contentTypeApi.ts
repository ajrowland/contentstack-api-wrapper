import { type ContentTypeData } from "@contentstack/management/types/stack/contentType";
import { type ClientConfig } from "../types/clientConfig";

const createType = async (
  config: ClientConfig,
  content_type: ContentTypeData
) => {
  const { client, api_key, management_token, logger } = config;

  const res = await client
    .stack({ api_key, management_token })
    .contentType()
    .create({ content_type });

  logger.success(`Created content type: ${res.uid}`);
};

const deleteType = async (config: ClientConfig, typeUid: string) => {
  const { client, api_key, management_token, logger } = config;

  await client
    .stack({ api_key, management_token })
    .contentType(typeUid)
    .delete();

  logger.success(`Deleted content type: ${typeUid}`);
};

export default (config: ClientConfig) => ({
  create: (content_type: ContentTypeData) => createType(config, content_type),
  delete: (typeUid: string) => deleteType(config, typeUid),
});
