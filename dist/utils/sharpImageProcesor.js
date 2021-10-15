"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharpImageProcess = exports.createSharpFilter = exports.setSharpImageOperation = exports.setSharpChannelOptions = exports.setSharpColorOptions = exports.readFilePassedBy = void 0;
const fileS = __importStar(require("fs"));
const sharp = __importStar(require("sharp"));
const defaultValues_1 = require("./defaultValues");
/** Read the file, nothing more and nothing less. And returns it, of course */
function readFilePassedBy(imagePath) {
    return fileS.createReadStream(imagePath);
}
exports.readFilePassedBy = readFilePassedBy;
/**
 * @param sharp
 * @param colorOptions
 *
 * This method handles everything about the image color options
 *
 * Returns the sharp object with the color filters you choose to apply.
 */
function setSharpColorOptions(sharp, colorOptions) {
    if (colorOptions.tint != undefined) {
        if ((colorOptions.tint.r && colorOptions.tint.g && colorOptions.tint.b) >=
            0 ||
            (colorOptions.tint.r && colorOptions.tint.g && colorOptions.tint.b) <= 255) {
            sharp.tint({
                r: colorOptions.tint.r,
                g: colorOptions.tint.g,
                b: colorOptions.tint.b,
            });
        }
        else {
            console.error('The RGB values must be between 0 and 255');
        }
    }
    if (colorOptions.grayscale != undefined) {
        sharp.grayscale(colorOptions.grayscale);
    }
    if (colorOptions.pipelineColourspace != undefined) {
        sharp.pipelineColourspace(colorOptions.pipelineColourspace);
    }
    if (colorOptions.toColourspace != undefined) {
        sharp.toColourspace(colorOptions.toColourspace);
    }
    return sharp;
}
exports.setSharpColorOptions = setSharpColorOptions;
/**
 *
 * @param sharp
 * @param channelsOptions
 *
 * This method handles everything about the image channel options
 *
 * Returns the sharp object with the channel filters you choose to apply.
 */
function setSharpChannelOptions(sharp, channelsOptions) {
    if (channelsOptions.removeAlpha != undefined) {
        sharp.removeAlpha(true);
    }
    if (channelsOptions.ensureAlpha != undefined) {
        sharp.ensureAlpha(channelsOptions.ensureAlpha);
    }
    if (channelsOptions.extractChannel != undefined) {
        sharp.extractChannel(channelsOptions.extractChannel);
    }
    //   if (channelsOptions.bandbool != undefined) {
    //     sharp.bandbool(sharp.bool.and)
    //     // switch (channelsOptions.bandbool) {
    //     //   case 'and':
    //     //     sharp.bandbool(sharp.bool.and)
    //     //     break;
    //     //   case 'or':
    //     //     sharp.bandbool(sharp.bool.or)
    //     //     break;
    //     //   case 'eor':
    //     //     sharp.bandbool(sharp.bool.eor)
    //     //     break;
    //     //   default:
    //     //     break;
    //     // }
    //   }
    return sharp;
}
exports.setSharpChannelOptions = setSharpChannelOptions;
/**
 * @param sharp
 * @param options
 *
 * This method handles everything about the image filter options
 *
 * Returns the sharp object with the filters you choose to apply.
 */
function setSharpImageOperation(sharp, options) {
    if (options.blur != undefined) {
        if (options.blur >= 0.3 && options.blur < 1000)
            sharp.blur(options.blur);
        else
            console.error('The blur value is out of bound');
    }
    if (options.convolve != undefined) {
        if (options.convolve.kernel.length ==
            options.convolve.width * options.convolve.height) {
            sharp.convolve({
                width: options.convolve.width,
                height: options.convolve.height,
                kernel: options.convolve.kernel,
                scale: options.convolve.scale,
                offset: options.convolve.offset,
            });
        }
        else {
            console.error(`Kernel length higher or lower than ${options.convolve.width * options.convolve.height}`);
        }
    }
    if (options.flip != undefined) {
        sharp.flip(options.flip);
    }
    if (options.flop != undefined) {
        sharp.flop(options.flop);
    }
    if (options.gamma != undefined) {
        if (options.gamma.gamma >= 1.0 && options.gamma.gamma <= 3.0) {
            sharp.gamma(options.gamma.gamma, options.gamma.gammaOut >= 1.0 && options.gamma.gammaOut <= 3.0
                ? options.gamma.gammaOut
                : undefined);
        }
        else {
            console.error('The gamma value must be between 1.0 and 3.0. In case that you are using gammaOut, the value must be in the same range');
        }
    }
    if (options.linear != undefined) {
        sharp.linear(options.linear.multiplier, options.linear.offset);
    }
    if (options.median != undefined) {
        sharp.median(options.median);
    }
    if (options.modulate != undefined) {
        sharp.modulate({
            brightness: options.modulate.brightness,
            hue: options.modulate.hue,
            saturation: options.modulate.saturation,
            lightness: options.modulate.lightness,
        });
    }
    if (options.negate != undefined) {
        sharp.negate(true);
    }
    if (options.normalise != undefined) {
        sharp.normalise(true);
    }
    if (options.recomb != undefined) {
        sharp.recomb(options.recomb);
    }
    if (options.rotate != undefined) {
        sharp.rotate(options.rotate);
    }
    if (options.sharpen != undefined) {
        sharp.sharpen(options.sharpen.sigma, options.sharpen.flat, options.sharpen.jagged);
    }
    if (options.threshold != undefined) {
        if (options.threshold.threshold >= 0 && options.threshold.threshold < 255)
            sharp.threshold(options.threshold.threshold, {
                greyscale: options.threshold.options != undefined
                    ? options.threshold.options.greyscale
                    : false,
            });
        else
            console.error('The treshold must be between 0 and 255');
    }
    return sharp;
}
exports.setSharpImageOperation = setSharpImageOperation;
/**
 * @param options.
 * @param optionsImageOperations.
 * @param optionsChannelOperations.
 * @param optionsColorOperations.
 * Gets all the filters and puts them together.
 */
function createSharpFilter(options, optionsImageOperations, optionsChannelOperations, optionsColorOperations) {
    try {
        let width = null;
        let height = null;
        let fit = 'cover';
        let quality = 80;
        let adaptiveFiltering = false;
        let format = 'webp';
        if (options) {
            if (!options.width && !options.heigth && options.squareSize) {
                width = height = options.squareSize;
            }
            else {
                width = options.width;
                height = options.heigth;
            }
            fit = options.fit != undefined ? options.fit : fit;
            quality = options.quality != undefined ? options.quality : quality;
            adaptiveFiltering =
                options.adaptiveFiltering != undefined
                    ? options.adaptiveFiltering
                    : adaptiveFiltering;
            format =
                options.outPutFormat != undefined ? options.outPutFormat : format;
        }
        let sharkSharp = sharp()
            .resize(width, height, { fit: fit })
            .toFormat(format, {
            quality: quality,
            adaptiveFiltering: adaptiveFiltering,
        });
        if (optionsImageOperations != undefined) {
            sharkSharp = setSharpImageOperation(sharkSharp, optionsImageOperations);
        }
        if (optionsChannelOperations != undefined) {
            sharkSharp = setSharpChannelOptions(sharkSharp, optionsChannelOperations);
        }
        if (optionsColorOperations != undefined) {
            sharkSharp = setSharpColorOptions(sharkSharp, optionsColorOperations);
        }
        return sharkSharp;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}
exports.createSharpFilter = createSharpFilter;
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
function sharpImageProcess(imagePath, name, res, options, optionsImageOperations, optionsColorOperations, optionsChannelOperations) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileType = options
                ? options.outPutFormat
                : defaultValues_1.defaultSharpOptions.outPutFormat;
            const fileImage = readFilePassedBy(imagePath);
            fileImage.on('error', (e) => {
                if (e) {
                    console.log('File not found');
                    res.writeHeader(404, 'File not found');
                    res.end('File not found');
                }
                else {
                }
            });
            fileImage.on('open', (_) => {
                res.set({
                    'Content-Type': `image/${fileType}`,
                    'Content-Disposition': `filename=${name}`,
                });
            });
            const sharpFilter = createSharpFilter(options ? options : undefined, optionsImageOperations ? optionsImageOperations : undefined, optionsChannelOperations ? optionsChannelOperations : undefined, optionsColorOperations ? optionsColorOperations : undefined);
            //return new StreamableFile(fileImage.pipe(sharpFilter).pipe(res))
            fileImage.pipe(sharpFilter).pipe(res);
        }
        catch (e) {
            console.error(e);
        }
    });
}
exports.sharpImageProcess = sharpImageProcess;
//# sourceMappingURL=sharpImageProcesor.js.map