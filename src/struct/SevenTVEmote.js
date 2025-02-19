const Emote = require('./Emote');
const Constants = require('../util/Constants');

/** @extends Emote */
class SevenTVEmote extends Emote {
    /**
     * A 7TV emote.
     * @param {Channel} channel - Channel this emote belongs to.
     * @param {string} id - ID of the emote.
     * @param {data} data - The raw emote data.
     */
    constructor(channel, id, data) {
        super(channel, id, data);
        this.type = '7tv';
    }

    /**
     * The channel of this emote's creator.
     * Not guaranteed to contain the emote, or be cached.
     * @readonly
     * @type {?Channel}
     */
    get owner() {
        return this.fetcher.channels.get(this.ownerName);
    }

    _setup(data) {
        super._setup(data);
        this.code = data.name;

        /**
         * The name of the emote creator's channel.
         * @type {string}
         */
        this.ownerName = data.owner?.display_name || 'UNKNOWN';

        /**
         * Available image sizes.
         * @type {string[]}
         */
        this.sizes = data.host.files
            .filter(el => el.format === this.channel.format.toUpperCase())
            .map(el => el.name);

        /**
         * If emote is animated.
         * @type {boolean}
         */
        this.animated = data.animated;

        /**
         * The image type of the emote.
         * @type {string}
         */
        this.imageType = this.channel.format;
    }

    /**
     * Gets the image link of the emote.
     * @param {number} size - The size of the image.
     * @returns {string}
     */
    toLink(size = 0) {
        size = this.sizes[size];
        return Constants.SevenTV.CDN(this.id, size); // eslint-disable-line new-cap
    }
}

module.exports = SevenTVEmote;
