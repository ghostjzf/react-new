import { observable } from "mobx";

export class UI {
    @observable
    settings = {
        language: getBrowserLang()
    };
}

export default new UI();

function getBrowserLang() {
    const { language: browserlang } = window.navigator;

    if (/en/i.test(browserlang)) {
        return "en_US";
    }

    return "zh_CN";
}
