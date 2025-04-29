import { readFile, writeFile } from "fs/promises";
import prompts, { PromptObject } from "prompts";

interface Answers {
  body?: string;
  scope?: string;
  subject?: string;
  type?: string;
}

interface MyPromptChoice {
  description: string;
  title: string;
  value: string;
}

interface MyPromptObject<T extends string = string> extends PromptObject<T> {
  choices?: MyPromptChoice[];
  multiline?: boolean;
}

const typeConfig: Record<string, { description: string; icon: string }> = {
  build: { description: "Changes to the build system or external dependencies.", icon: "📦" },
  chore: { description: "General maintenance tasks not related to features or bugs.", icon: "🧹" },
  ci: { description: "Changes to continuous integration or deployment.", icon: "👷" },
  docs: { description: "Changes to documentation only.", icon: "📝" },
  feat: { description: "Adds a new feature to the application.", icon: "✨" },
  fix: { description: "Corrects a bug in the application.", icon: "🐛" },
  perf: { description: "Changes that improve performance.", icon: "⚡️" },
  refactor: { description: "Changes that neither add a feature nor fix a bug.", icon: "♻️" },
  style: { description: "Changes that do not affect the meaning of the code (e.g., formatting).", icon: "🎨" },
  test: { description: "Adds or updates tests.", icon: "✅" },
  wip: { description: "Marks a commit as work in progress (should not be included in final commits).", icon: "🚧" },
};

const commitMessageFile: string = process.argv[2];

if (!commitMessageFile) {
  process.exit(1);
}

const promptQuestions: MyPromptObject<"body" | "scope" | "subject" | "type">[] = [
  {
    choices: Object.keys(typeConfig).map((key) => ({
      description: typeConfig[key].description,
      title: `${typeConfig[key].icon} ${key}`,
      value: key,
    })),
    initial: 0,
    message: "Select a commit type:",
    name: "type",
    type: "select",
  },
  {
    message: "Enter commit scope (optional, leave blank if none):",
    name: "scope",
    type: "text",
  },
  {
    message: "Enter commit subject (short description):",
    name: "subject",
    type: "text",
  },
  {
    message: "Enter commit body (optional, press Enter twice to finish):",
    multiline: true,
    name: "body",
    type: "text",
  },
];

await (async () => {
  try {
    const existingMessage = await readFile(commitMessageFile, "utf8");

    if (existingMessage.trim() !== "") {
      const resp = await prompts([
        {
          choices: [
            {
              title: "Keep",
              value: "keep",
            },
            {
              title: "Create new",
              value: "create",
            },
          ],
          initial: 0,
          message: `Current commit message:\n\n"${existingMessage}"\n\nWould you like to keep this message or provide a new one?`,
          name: "shouldCreate",
          type: "select",
        },
      ]);
      const shouldCreate = resp.shouldCreate as "create" | "keep";

      if (shouldCreate === "keep") {
        process.exit(0);
      }
    }

    const answers: Answers = await prompts(promptQuestions);

    if (!answers.type || !answers.subject) {
      process.exit(1);
    }

    const typeConf = typeConfig[answers.type];
    let message = `${typeConf.icon} ${answers.type}`;

    if (answers.scope) {
      message += `(${answers.scope})`;
    }

    message += `: ${answers.subject}`;

    if (answers.body) {
      message += `\n\n${answers.body}`;
    }

    await writeFile(commitMessageFile, message + "\n", "utf8");
    process.exit(0);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "SIGINT") {
        console.log("Commit aborted by user (SIGINT).");
        process.exit(1);
      }
      console.error("Prompt error:", error);
      process.exit(1);
    } else {
      console.error("An unknown error occurred:", error);
      process.exit(1);
    }
  }
})();
