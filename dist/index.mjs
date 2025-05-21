// src/index.ts
import { ApplicationCommandOptionType } from "discord-api-types/v10";

// src/error.ts
var ApplicationCommandOptionResolutionError = class extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
};

// src/index.ts
var ApplicationCommandOptions = class {
  _options;
  _subcommand;
  _group;
  _focused;
  mapOptions(options) {
    options?.forEach((option) => {
      switch (true) {
        case option.type === ApplicationCommandOptionType.Subcommand:
          this._subcommand = option.name;
          break;
        case option.type === ApplicationCommandOptionType.SubcommandGroup:
          this._group = option.name;
          break;
        default:
          if ("focused" in option && option.focused) {
            this._focused = option.name;
          }
          this._options.set(option.name, option);
          break;
      }
      if ("options" in option) {
        this.mapOptions(option.options);
      }
    });
  }
  constructor(options) {
    this._options = /* @__PURE__ */ new Map();
    this._subcommand = null;
    this._group = null;
    this._focused = null;
    this.mapOptions(options);
  }
  get(query) {
    const option = this._options.get(query.name) ?? null;
    if (query.required && !option) {
      throw new ApplicationCommandOptionResolutionError(`Unable to find required option: ${query.name}`);
    }
    if (option && option.type !== query.type) {
      throw new ApplicationCommandOptionResolutionError(`Expected option type ${ApplicationCommandOptionType[query.type]}. Received: ${ApplicationCommandOptionType[option.type]}`);
    }
    return option;
  }
  get subcommand() {
    return this._subcommand;
  }
  get group() {
    return this._group;
  }
  getFocused() {
    if (!this._focused) {
      throw new ApplicationCommandOptionResolutionError("Unabled to find focused option");
    }
    return this._options.get(this._focused);
  }
};
function getFocusedOption(options) {
  const focused = options.find((option) => "focused" in option && option.focused);
  if (!focused) {
    throw new ApplicationCommandOptionResolutionError("Unabled to find focused option");
  }
  return focused;
}
export {
  ApplicationCommandOptions,
  getFocusedOption
};
//# sourceMappingURL=index.mjs.map