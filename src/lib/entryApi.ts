import type { ContentstackCollection } from "@contentstack/management/types/contentstackCollection";
import type {
  Entry,
  EntryData,
} from "@contentstack/management/types/stack/contentType/entry";
import { type ClientConfig } from "../types/clientConfig";

const createEntry = async (
  config: any,
  typeUid: string,
  entry: EntryData
): Promise<string> => {
  const { client, api_key, management_token, logger } = config;

  const res = await client
    .stack({ api_key, management_token })
    .contentType(typeUid)
    .entry()
    .create({
      entry,
    });

  logger.success(`Created entry: ${res.uid}`);

  return res.uid;
};

const getEntry = async (
  config: ClientConfig,
  typeUid: string,
  uid: string
): Promise<Entry> => {
  const { client, management_token, api_key } = config;

  return client
    .stack({ api_key, management_token })
    .contentType(typeUid)
    .entry(uid);
};

const getEntries = async (
  config: ClientConfig,
  typeUid: string
): Promise<ContentstackCollection<Entry>> => {
  const { client, api_key, management_token } = config;

  return await client
    .stack({ api_key, management_token })
    .contentType(typeUid)
    .entry()
    .query()
    .find();
};

const deleteEntry = async (
  config: ClientConfig,
  typeUid: string,
  uid: string
) => {
  const { client, api_key, management_token, logger } = config;

  await client
    .stack({ api_key, management_token })
    .contentType(typeUid)
    .entry(uid)
    .delete();

  logger.success(`Deleted entry: ${uid}`);
};

const deleteEntries = async (config: ClientConfig, typeUid: string) => {
  const { logger } = config;

  const entries = await getEntries(config, typeUid);

  entries.items.forEach(
    async (entry) => await deleteEntry(config, typeUid, entry.uid)
  );

  logger.success(`Deleted entries of content type: ${typeUid}`);
};

const publishEntry = async (
  config: ClientConfig,
  typeUid: string,
  uid: string
) => {
  const { client, api_key, management_token, publishDetails, logger } = config;

  const res = await client
    .stack({ api_key, management_token })
    .contentType(typeUid)
    .entry(uid)
    .publish({ publishDetails });

  logger.success(`Published entry: ${res.notice}`);
};

const publishEntries = async (config: ClientConfig, typeUid: string) => {
  const { logger } = config;

  const entries = await getEntries(config, typeUid);

  entries.items.forEach(
    async (entry) => await publishEntry(config, typeUid, entry.uid)
  );

  logger.success(`Deleted entries of content type: ${typeUid}`);
};

export default (config: ClientConfig) => ({
  get: (typeUid: string, uid: string) => getEntry(config, typeUid, uid),
  create: (typeUid: string, entry: EntryData) =>
    createEntry(config, typeUid, entry),
  delete: (typeUid: string, uid: string) => deleteEntry(config, typeUid, uid),
  deleteAll: (typeUid: string) => deleteEntries(config, typeUid),
  publish: (typeUid: string, uid: string) => publishEntry(config, typeUid, uid),
  publishAll: (typeUid: string) => publishEntries(config, typeUid),
});
