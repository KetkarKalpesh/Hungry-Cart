import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api childInputValue;

    handleChildInputChange(event) {
        this.childInputValue = event.target.value;
    }

    handleSubmitToParent() {
        const inputChangeEvent = new new CustomEvent('childChange', {
            detail: {value: this.childInputValue}
        });
        this.dispatchEvent(inputChangeEvent);
    }
}