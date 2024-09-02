module.exports = async ({ migration, stackSDKInstance }) => {
  const blog = migration
    .createContentType("blog")
    .title("Blog")
    .description("The is Blog content type")
    .isPage(true)
    .singleton(false);

  blog
    .createField("title")
    .display_name("Title")
    .data_type("text")
    .mandatory(true);

  blog.createField("url").display_name("URL").data_type("text").mandatory(true);

  const createEntryTask = () => {
    return {
      title: "Create blog entries",
      successMessage: "Entry created successfully",
      failedMessage: "Failed to create entry",
      task: async () => {
        try {
          let entry = {
            title: `Awesome Blog`,
            url: `/awesome-blog`,
          };
          await stackSDKInstance.contentType("blog").entry().create({ entry });
        } catch (error) {
          throw error;
        }
      },
    };
  };

  migration.addTask(blog.getTaskDefinition());
  migration.addTask(createEntryTask());
};
