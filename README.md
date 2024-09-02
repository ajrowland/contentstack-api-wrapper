# Contentstack content managment API wrapper

## 🚀 About

Solution to aid the content modeling in Contentstack.

You will need the following `.env` file:

```
HOST=eu-api.contentstack.com
API_KEY=stack_api_key
USER_EMAIL=login_email_address
USER_PASSWORD=login_passowrd
ENVIRONMENTS=development
LOCALES=en-gb
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                          | Action                                        |
| :------------------------------- | :-------------------------------------------- |
| `bun install`                    | Installs dependencies                         |
| `bun run test -- --create-model` | Create a test type, a test entry, and publish |
| `bun run test -- --delete-model` | Deletes all test entries, and types           |
| `bun run migrate`                | Run an example migration script via the CLI   |

I've used Bun, but you can use NPM/Node.
