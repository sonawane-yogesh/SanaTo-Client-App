export class RegExExtensions {
    static escape = function (input: string): string {
        return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    };
    static isRegExp = (input: string): boolean => {
        try {
            new RegExp(escape(input));
            return true;
        } catch (e) {
            return false;
        }
    }
}
