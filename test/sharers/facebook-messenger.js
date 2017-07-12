/* eslint-disable consistent-return, no-undef, no-unused-expressions */

import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { env } from "jsdom";

import * as facebookMessengerSharer from "../../src/sharers/facebook-messenger";

chai.use(sinonChai);

describe("Facebook Messenger sharer", () => {
    it("must have name 'facebook-messenger'", () => {
        expect(facebookMessengerSharer.name).to.equal("facebook-messenger");
    });

    it("must render a link to Facebook Messenger", (done) => {
        const sharer = new facebookMessengerSharer.FacebookMessenger("12345679", "path/to/whatever/");
        const html = sharer.render();
        env(html, (err, _window) => {
            if (err) return done(err);

            const anchor = _window.document.querySelector("a[href^='http://www.facebook.com/dialog/send']");
            expect(anchor).to.not.be.null;
            done();
        });
    });
});
