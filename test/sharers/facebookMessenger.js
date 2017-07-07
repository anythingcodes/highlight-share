/* eslint-disable consistent-return, no-undef, no-unused-expressions */
import { parse } from "url";

import chai, { expect } from "chai";
import { stub, match } from "sinon";
import sinonChai from "sinon-chai";
import { env } from "jsdom";

import * as facebookMessengerSharer from "../../src/sharers/facebookMessenger";

chai.use(sinonChai);

describe("Facebook Messenger sharer", () => {
    it("must have name 'facebookMessenger'", () => {
        expect(facebookMessengerSharer.name).to.equal("facebookMessenger");
    });

    it("must render a link to Facebook Messenger", (done) => {
        const html = facebookMessengerSharer.render("foo", "foo", "path/to/whatever");
        env(html, (err, _window) => {
            if (err) return done(err);

            const anchor = _window.document.querySelector("a[href^='fb-messenger://']");
            expect(anchor).to.not.be.null;
            done();
        });
    });

    describe("`getShareUrl` method", () => {
        it("must have a `getShareUrl` helper method", () => {
            expect(typeof facebookMessengerSharer.getShareUrl).to.equal("function");
        });

        it("must have a `u` parameter in the sharing URL", () => {
            const shareUrl = facebookMessengerSharer.getShareUrl("path/to/whatever");
            const parsed = parse(shareUrl, true);
            expect(parsed.query).to.eql({ app_id: "123456789", link: "path/to/whatever" });
        });
    });

    describe("`action` method", () => {
        it("must have a `action` method", () => {
            expect(typeof facebookMessengerSharer.action).to.equal("function");
        });

        it("must prevent the event's default", (done) => {
            const html = facebookMessengerSharer.render("foo", "foo", "path/to/whatever");
            env(html, (err, _window) => {
                if (err) return done(err);

                const event = new _window.Event("click");
                const preventStub = stub(event, "preventDefault");
                stub(_window, "open").returns({});

                facebookMessengerSharer.action(event, _window.document.body);
                expect(preventStub.called).to.be.true;
                done();
            });
        });

        it("must open a new window", (done) => {
            const html = facebookMessengerSharer.render("foo", "foo", "path/to/whatever");
            env(html, (err, _window) => {
                if (err) return done(err);

                const event = new _window.Event("click");
                const openStub = stub(_window, "open");
                openStub.returns({});

                facebookMessengerSharer.action(event, _window.document.body);
                expect(openStub.calledOnce).to.be.true;
                done();
            });
        });

        it("must open a new window with the link provided by `getShareUrl`", (done) => {
            const html = facebookMessengerSharer.render("foo", "foo", "path/to/whatever");
            env(html, (err, _window) => {
                if (err) return done(err);

                const event = new _window.Event("click");
                const openStub = stub(_window, "open");
                openStub.returns({});
                const url = facebookMessengerSharer.getShareUrl("path/to/whatever");

                facebookMessengerSharer.action(event, _window.document.body);
                expect(openStub).to.have.been.calledWith(url, match.any, match.any);
                done();
            });
        });

        it("must nullify the popup's `opener` property", (done) => {
            const html = facebookMessengerSharer.render("foo", "foo", "path/to/whatever");
            env(html, (err, _window) => {
                if (err) return done(err);

                const event = new _window.Event("click");
                const openStub = stub(_window, "open");
                const popup = {};
                openStub.returns(popup);

                facebookMessengerSharer.action(event, _window.document.body);
                expect(popup.opener).to.be.null;
                done();
            });
        });
    });
});
