/* eslint-disable consistent-return, no-undef, no-unused-expressions */

import { expect } from "chai";
import { stub } from "sinon";
import { env } from "jsdom";

import * as copySharer from "../../src/sharers/copy";

describe("Copy sharer", () => {
    it("must have name 'copy'", () => {
        expect(copySharer.name).to.equal("copy");
    });

    it("must render a link with title attribute", (done) => {
        const html = copySharer.render("foo", "foo", "path/to/whatever");
        env(html, (err, _window) => {
            if (err) return done(err);

            const anchor = _window.document.querySelector("a[title]");
            expect(anchor).to.not.be.null;
            done();
        });
    });

    describe("`action` method", () => {
        it("must have a `action` method", () => {
            expect(typeof copySharer.action).to.equal("function");
        });

        it("must prevent the event's default", (done) => {
            const html = copySharer.render("foo", "foo", "path/to/whatever");
            env(html, (err, _window) => {
                if (err) return done(err);

                const event = new _window.Event("click");
                const preventStub = stub(event, "preventDefault");
                stub(_window, "open").returns({});

                copySharer.action(event, _window.document.body);
                expect(preventStub.called).to.be.true;
                done();
            });
        });
    });
});
