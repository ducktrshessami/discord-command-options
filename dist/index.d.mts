import { ApplicationCommandOptionType, APIInteractionDataOptionBase, InteractionType, APIApplicationCommandInteractionDataOption } from 'discord-api-types/v10';

type ApplicationCommandInteractionTypes = InteractionType.ApplicationCommand | InteractionType.ApplicationCommandAutocomplete;
type ExtractedOption<CommandInteractionType extends ApplicationCommandInteractionTypes, OptionType extends ApplicationCommandOptionType> = Extract<APIApplicationCommandInteractionDataOption<CommandInteractionType>, {
    type: OptionType;
}>;
type SubcommandOptionType = ApplicationCommandOptionType.Subcommand | ApplicationCommandOptionType.SubcommandGroup;
type FocusableOptionType = ApplicationCommandOptionType.String | ApplicationCommandOptionType.Integer | ApplicationCommandOptionType.Number;
interface AutocompleteFocusedOption extends APIInteractionDataOptionBase<FocusableOptionType, string> {
    focused: true;
}
interface BaseGetOptionQuery<OptionType extends ApplicationCommandOptionType> {
    name: string;
    type: OptionType;
}
interface RequiredOption<Required extends boolean = boolean> {
    required: Required;
}
declare class ApplicationCommandOptions<CommandInteractionType extends ApplicationCommandInteractionTypes> {
    private readonly _options;
    private _subcommand;
    private _group;
    private _focused;
    private mapOptions;
    constructor(options?: APIApplicationCommandInteractionDataOption<CommandInteractionType>[]);
    get<OptionType extends Exclude<ApplicationCommandOptionType, SubcommandOptionType>>(query: BaseGetOptionQuery<OptionType> & RequiredOption<true>): ExtractedOption<CommandInteractionType, OptionType>;
    get<OptionType extends Exclude<ApplicationCommandOptionType, SubcommandOptionType>>(query: BaseGetOptionQuery<OptionType> & Partial<RequiredOption>): ExtractedOption<CommandInteractionType, OptionType> | null;
    get subcommand(): string | null;
    get group(): string | null;
    getFocused(): AutocompleteFocusedOption;
}

export { ApplicationCommandOptions, type AutocompleteFocusedOption, type FocusableOptionType, type SubcommandOptionType };
