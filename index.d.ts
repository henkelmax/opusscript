declare module 'opusscript' {
    /**
     * Opus application type
     */
    export enum OpusApplication {
        /**
         * Voice Over IP
         */
        VOIP = 2048,
        /**
         * Audio
         */
        AUDIO = 2049,
        /**
         * Restricted Low-Delay
         */
        RESTRICTED_LOWDELAY = 2051
    }

    export enum OpusError {
        "OK" = 0,
        "Bad argument" = -1,
        "Buffer too small" = -2,
        "Internal error" = -3,
        "Invalid packet" = -4,
        "Unimplemented" = -5,
        "Invalid state" = -6,
        "Memory allocation fail" = -7
    }

    /**
     * Valid audio sampling rates
     */
    export type VALID_SAMPLING_RATES = 8000 | 12000 | 16000 | 24000 | 48000;
    /**
     * Maximum bytes in a frame
     */
    export type MAX_FRAME_SIZE = 2880;
    /**
     * Maximum bytes in a packet
     */
    export type MAX_PACKET_SIZE = 3828;

    /**
     * Constructor options for OpusScript
     */
    export interface OpusScriptOptions {
        /**
         * Whether or not to use the WASM-compiled version of OpusScript. This is true by default.
         */
        wasm?: boolean;
    }

    export class OpusScript {
        /**
         * Different Opus application types
         */
        static Application: typeof OpusApplication;
        /**
         * Opus Error codes
         */
        static Error: typeof OpusError;
        /**
         * Array of sampling rates that Opus can use
         */
        static VALID_SAMPLING_RATES: [8000, 12000, 16000, 24000, 48000];
        /**
         * The maximum size (in bytes) to send in a packet
         */
        static MAX_PACKET_SIZE: MAX_PACKET_SIZE;

        /**
         * OpusScript options being used
         */
        options: OpusScriptOptions;

        /**
         * Create a new Opus en/decoder
         */
        constructor(samplingRate: VALID_SAMPLING_RATES, channels?: number, application?: OpusApplication, options?: OpusScriptOptions);

        /**
         * Encode a buffer into Opus
         */
        encode(buffer: ArrayBuffer, frameSize: number): ArrayBuffer;

        /**
         * Decode an opus buffer
         */
        decode(buffer: ArrayBuffer): ArrayBuffer;

        /**
         * Set the encoder bitrate
         */
        setBitrate(bitrate: number): void;

        /**
         * Encoder/decoder parameters
         */
        encoderCTL(ctl: number, arg: number): void;

        decoderCTL(ctl: number, arg: number): void;

        /**
         * Delete the opus object
         */
        delete(): void;
    }

    /**
     * Loads the wasm binary
     * @param binary the binary or url
     */
    export function init(binary: ArrayBuffer | string): void;

}
