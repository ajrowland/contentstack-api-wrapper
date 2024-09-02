import contentstack from "@contentstack/management";
import type { ContentstackCollection } from "@contentstack/management/types/contentstackCollection";
import type { ContentTypeData } from "@contentstack/management/types/stack/contentType";
import type {
  Entry,
  EntryData,
} from "@contentstack/management/types/stack/contentType/entry";
import consola from "consola";

const client = contentstack.client({
  host: process.env.HOST,
});

// Or use management token.
const res = await client.login({
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
});

consola.success(res.notice);

const api_key = process.env.API_KEY;
const locales = process.env.LOCALES?.split(",");
const environments = process.env.ENVIRONMENTS?.split(",");
const publishDetails = { locales, environments };

export const createType = async (content_type: ContentTypeData) => {
  const res = await client
    .stack({ api_key })
    .contentType()
    .create({ content_type });

  consola.success(`Created content type: ${res.uid}`);
};

export const deleteType = async (typeUid: string) => {
  await client.stack({ api_key }).contentType(typeUid).delete();

  consola.success(`Deleted content type: ${typeUid}`);
};

export const createEntry = async (
  typeUid: string,
  entry: EntryData
): Promise<string> => {
  const res = await client
    .stack({ api_key })
    .contentType(typeUid)
    .entry()
    .create({
      entry,
    });

  consola.success(`Created entry: ${res.uid}`);

  return res.uid;
};

export const getEntry = async (
  typeUid: string,
  uid: string
): Promise<Entry> => {
  return await client.stack({ api_key }).contentType(typeUid).entry(uid);
};

export const getEntries = async (
  typeUid: string
): Promise<ContentstackCollection<Entry>> => {
  return await client
    .stack({ api_key })
    .contentType(typeUid)
    .entry()
    .query()
    .find();
};

export const deleteEntry = async (typeUid: string, uid: string) => {
  await client.stack({ api_key }).contentType(typeUid).entry(uid).delete();

  consola.success(`Deleted entry: ${uid}`);
};

export const deleteEntries = async (typeUid: string) => {
  const entries = await getEntries(typeUid);

  entries.items.forEach(async (entry) => await deleteEntry(typeUid, entry.uid));

  consola.success(`Deleted entries of content type: ${typeUid}`);
};

export const publishEntry = async (typeUid: string, uid: string) => {
  const res = await client
    .stack({ api_key })
    .contentType(typeUid)
    .entry(uid)
    .publish({ publishDetails });

  consola.success(`Published entry: ${res.notice}`);
};

export const publishEntries = async (typeUid: string) => {
  const entries = await getEntries(typeUid);

  entries.items.forEach(
    async (entry) => await publishEntry(typeUid, entry.uid)
  );

  consola.success(`Deleted entries of content type: ${typeUid}`);
};
