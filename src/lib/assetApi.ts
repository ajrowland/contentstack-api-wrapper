import path from "path";
import { type ClientConfig } from "../types/clientConfig";
import type { Asset } from "@contentstack/management/types/stack/asset";

const createAsset = async (
  config: ClientConfig,
  filename: string,
  title: string
): Promise<Asset> => {
  const { client, api_key, logger } = config;

  const asset = {
    upload: path.join("assets/", filename),
    title,
  };

  const res = await client.stack({ api_key }).asset().create({
    asset,
    upload: asset.upload,
  });

  logger.success(`Created asset: ${res.uid}`);

  return res;
};

const deleteAsset = async (config: ClientConfig, uid: string) => {
  const { client, api_key, logger } = config;

  await client.stack({ api_key }).asset(uid).delete();

  logger.success(`Delete asset: ${uid}`);
};

export default (config: any) => ({
  create: (filename: string, title: string) =>
    createAsset(config, filename, title),
  delete: (uid: string) => deleteAsset(config, uid),
});
