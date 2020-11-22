import { bindEventsMethods } from "./index";
describe("Base", () => {
    beforeAll(() => {
        bindEventsMethods(['click']);
    });
    it("Test Bubble", () => {

        class Foo extends HTMLElement {
            logs = [];
            constructor() {
                super();
                const shadow = this.attachShadow({ mode: 'open' });
                shadow.innerHTML = `
                    <div id="father" (click)="father()"> <div id="child" (click)="child()">child</div></div>
                   
                `
            }
            father() {
                this.logs.push('father');
            }
            child() {
                this.logs.push('child');
            }
        }
        customElements.define('ee-foo', Foo);
        let foo = new Foo();
        document.body.appendChild(foo);
        foo.shadowRoot.querySelector('#child')['click']();
        expect(foo.logs.length).toEqual(2);
        expect(foo.logs[0]).toEqual('child');
        expect(foo.logs[1]).toEqual('father');
        document.body.removeChild(foo);
    });
    it("Test Capture", () => {
        class Foo extends HTMLElement {
            logs = []
            constructor() {
                super();
                const shadow = this.attachShadow({ mode: 'open' });
                shadow.innerHTML = `
                    <div id="father" (click,true)="father()"> <div id="child" (click,true)="child()">child</div></div>
                   
                `
            }
            father() {
                this.logs.push('father');
            }
            child() {
                this.logs.push('child');
            }
        }
        customElements.define('ee-foo2', Foo);
        let foo = new Foo();
        document.body.appendChild(foo);
        foo.shadowRoot.querySelector('#child')['click']();
        expect(foo.logs.length).toEqual(2);
        expect(foo.logs[0]).toEqual('father');
        expect(foo.logs[1]).toEqual('child');
        document.body.removeChild(foo);
    });
});