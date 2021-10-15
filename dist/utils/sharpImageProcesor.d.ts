/// <reference types="node" />
import * as fileS from 'fs';
import { sharpColorOptions, sharpChannelOptions, sharpImageOptions, sharpImageOperations } from './interfaces';
/** Read the file, nothing more and nothing less. And returns it, of course */
export declare function readFilePassedBy(imagePath: any): fileS.ReadStream;
/**
 * @param sharp
 * @param colorOptions
 *
 * This method handles everything about the image color options
 *
 * Returns the sharp object with the color filters you choose to apply.
 */
export declare function setSharpColorOptions(sharp: any, colorOptions: sharpColorOptions): any;
/**
 *
 * @param sharp
 * @param channelsOptions
 *
 * This method handles everything about the image channel options
 *
 * Returns the sharp object with the channel filters you choose to apply.
 */
export declare function setSharpChannelOptions(sharp: any, channelsOptions: sharpChannelOptions): any;
/**
 * @param sharp
 * @param options
 *
 * This method handles everything about the image filter options
 *
 * Returns the sharp object with the filters you choose to apply.
 */
export declare function setSharpImageOperation(sharp: any, options: sharpImageOperations): any;
/**
 * @param options.
 * @param optionsImageOperations.
 * @param optionsChannelOperations.
 * @param optionsColorOperations.
 * Gets all the filters and puts them together.
 */
export declare function createSharpFilter(options?: sharpImageOptions, optionsImageOperations?: sharpImageOperations, optionsChannelOperations?: sharpChannelOptions, optionsColorOperations?: sharpColorOptions): any;
/**
 *
 * @param imagePath
 * @param name
 * @param res
 * @param options
 * @param optionsImageOperations
 * @param optionsColorOperations
 * @param optionsChannelOperations
 *-*-
 *
 * Main function of the package. Here you need to specify the image path, the final name and the response (you need to pass the response variable of your own method - Ex: express -> res)
 *
 * Those were the mandatory parameters. Now, you can specify the optional parameters:
 *
 * options -> Image output options such as format or quality, by default, the format is 'webp' and the quality is 80.
 *
 * optionsImageOperations -> The filters that will be used on the image as blur; by default it is not defined
 *
 * optionsColorOperations -> The image color manipulation filter as the color mode; by defalut is not defined
 *
 * optionsChannelOperations-> Image channel manipulation operations such as extract mode; by defalut is not defined
 *
 * This method does not return a value, it will send the final image via http
 */
export declare function sharpImageProcess(imagePath: string, name: any, res: any, options?: sharpImageOptions, optionsImageOperations?: sharpImageOperations, optionsColorOperations?: sharpColorOptions, optionsChannelOperations?: sharpChannelOptions): Promise<void>;
