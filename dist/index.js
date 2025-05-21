"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ApplicationCommandOptions: () => ApplicationCommandOptions
});
module.exports = __toCommonJS(index_exports);
var import_v10 = require("discord-api-types/v10");

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
        case option.type === import_v10.ApplicationCommandOptionType.Subcommand:
          this._subcommand = option.name;
          break;
        case option.type === import_v10.ApplicationCommandOptionType.SubcommandGroup:
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
      throw new ApplicationCommandOptionResolutionError(`Expected option type ${import_v10.ApplicationCommandOptionType[query.type]}. Received: ${import_v10.ApplicationCommandOptionType[option.type]}`);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApplicationCommandOptions
});
//# sourceMappingURL=index.js.map