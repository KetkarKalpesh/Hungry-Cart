import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api inputValue = '';

    handleChildInputChange(event) {
        this.inputValue = event.target.value;
    }

    handleSubmitToParent() {
        const inputChangeEvent = new CustomEvent('childchange', {
            detail: { value: this.inputValue }
        });
        this.dispatchEvent(inputChangeEvent);
    }
}