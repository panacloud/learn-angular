import { NumberFormatStyle } from 'angular2/src/core/facade/intl';
import { PipeTransform } from 'angular2/src/core/change_detection';
export declare class NumberPipe {
    static _format(value: number, style: NumberFormatStyle, digits: string, currency?: string, currencyAsSymbol?: boolean): string;
}
/**
 * WARNING: this pipe uses the Internationalization API.
 * Therefore it is only reliable in Chrome and Opera browsers.
 *
 * Formats a number as local text. i.e. group sizing and separator and other locale-specific
 * configurations are based on the active locale.
 *
 * # Usage
 *
 *     expression | number[:digitInfo]
 *
 * where `expression` is a number and `digitInfo` has the following format:
 *
 *     {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
 *
 * - minIntegerDigits is the minimum number of integer digits to use. Defaults to 1.
 * - minFractionDigits is the minimum number of digits after fraction. Defaults to 0.
 * - maxFractionDigits is the maximum number of digits after fraction. Defaults to 3.
 *
 * For more information on the acceptable range for each of these numbers and other
 * details see your native internationalization library.
 *
 * # Examples
 *
 *     {{ 123 | number }}              // output is 123
 *     {{ 123.1 | number: '.2-3' }}    // output is 123.10
 *     {{ 1 | number: '2.2' }}         // output is 01.00
 */
export declare class DecimalPipe extends NumberPipe implements PipeTransform {
    transform(value: any, args: any[]): string;
}
/**
 * WARNING: this pipe uses the Internationalization API.
 * Therefore it is only reliable in Chrome and Opera browsers.
 *
 * Formats a number as local percent.
 *
 * # Usage
 *
 *     expression | percent[:digitInfo]
 *
 * For more information about `digitInfo` see {@link DecimalPipe}
 */
export declare class PercentPipe extends NumberPipe implements PipeTransform {
    transform(value: any, args: any[]): string;
}
/**
 * WARNING: this pipe uses the Internationalization API.
 * Therefore it is only reliable in Chrome and Opera browsers.
 *
 * Formats a number as local currency.
 *
 * # Usage
 *
 *     expression | currency[:currencyCode[:symbolDisplay[:digitInfo]]]
 *
 * where `currencyCode` is the ISO 4217 currency code, such as "USD" for the US dollar and
 * "EUR" for the euro. `symbolDisplay` is a boolean indicating whether to use the currency
 * symbol (e.g. $) or the currency code (e.g. USD) in the output. The default for this value
 * is `false`.
 * For more information about `digitInfo` see {@link DecimalPipe}
 */
export declare class CurrencyPipe extends NumberPipe implements PipeTransform {
    transform(value: any, args: any[]): string;
}
