export const name = "facebook-messenger";

export class FacebookMessenger {
    constructor(appId) {
        this.appId = appId;
        this.name = name;
    }
    render(text, rawText, refUrl) {
        const url = this.getShareUrl("", refUrl);
        return `<a href="${url}" target="_blank" rel="noopener nofollow noreferrer"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g><path d="M16 6C9.925 6 5 10.56 5 16.185c0 3.205 1.6 6.065 4.1 7.932V28l3.745-2.056c1 .277 2.058.426 3.155.426 6.075 0 11-4.56 11-10.185C27 10.56 22.075 6 16 6zm1.093 13.716l-2.8-2.988-5.467 2.988 6.013-6.383 2.868 2.988 5.398-2.987-6.013 6.383z" fill-rule="evenodd"></path></g></svg></a>`;
    }
    getShareUrl(text, refUrl) {
        return `http://www.facebook.com/dialog/send?app_id=${this.appId}&link=${refUrl}&redirect_uri=${refUrl}`;
    }
}

