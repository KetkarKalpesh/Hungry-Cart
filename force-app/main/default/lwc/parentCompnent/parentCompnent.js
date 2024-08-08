import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
    @track parentInputValue = '';
    @track childInputValue = '';

    handleParentInputChange(event) {
        this.parentInputValue = event.target.value;
    }

    handleSubmitToChild() {
        this.childInputValue = this.parentInputValue;
    }

    handleChildInputChange(event) {
        this.parentInputValue = event.detail.value;
    }
}