import { contentType, entry } from "./lib";
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
  await contentType.create(testType);

  const testEntry: TestEntry = { title: "Test entry" };

  // const entryUid = await createEntry(testType.uid, testEntry);
  const entryUid = await entry.create(testType.uid, testEntry);

  await entry.publish(testType.uid, entryUid);
}

if (argv["delete-model"]) {
  await entry.deleteAll(testType.uid);
  await contentType.delete(testType.uid);
}
