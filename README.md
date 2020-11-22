## Event binding library for Web Components

### how to use:
```
import { bindEventsMethods } 'hee-event-system';

bindEventsMethods(['click']);

export class Header extends HTMLElement {

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = this.render();
    }

    foo(){
        console.log('foo work!');
    }

    foo2(){
        console.log('capture work!');
    }

    render() {
        return `
           <div>
            <button (click)="foo()">click</button>
            <button (click,true)="foo2()">click capture</button>
           </div> 
        `;
    }

   
}

customElements.define('ee-header',Header);

```