import {
  createType,
  createEntry,
  publishEntry,
  deleteType,
  deleteEntries,
} from "./lib/contentstackApi";
import type { TestEntry } from "./types/content";

const argv = require("minimist")(process.argv.slice(2));

const testType = {
  title: "Test type",
  uid: "test_type",
  schema: [
    {
      display_name: "Title",
      uid: "title",
      data_type: "text",
    },
  ],
  options: {
    is_page: false,
    singleton: false,
    title: "",
    sub_title: [],
  },
};

if (argv["create-model"]) {
  await createType(testType);

  const testEntry: TestEntry = { title: "Test entry" };

  const entryUid = await createEntry("test_type", testEntry);

  await publishEntry("test_type", entryUid);
}

if (argv["delete-model"]) {
  await deleteEntries("test_type");
  await deleteType("test_type");
}
