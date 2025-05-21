# discord-command-options
Standalone type-safe application command option parser

## Usage

```js
import { ApplicationCommandOptionType } from "discord-api-types/v10";
import { ApplicationCommandOptions } from "discord-command-options";

// interaction: APIChatInputApplicationCommandInteraction
const options = new ApplicationCommandOptions(interaction.data.options);
const subcommandGroup = options.group; // string | null
const subcommand = options.subcommand; // string | null
const foo = options.get({
    type: ApplicationCommandOptionType.String,
    name: "foo"
}); // APIApplicationCommandInteractionDataStringOption | null
const bar = options.get({
    type: ApplicationCommandOptionType.Integer,
    name: "bar",
    required: true
}); // APIApplicationCommandInteractionDataIntegerOption
```
