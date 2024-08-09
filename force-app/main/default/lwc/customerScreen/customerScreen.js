import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import NAME from '@salesforce/messageChannel/Name__c';

export default class CustomerScreen extends LightningElement {
    @api firstName = '';
    @api lastName = '';

    @wire (MessageContext)
    messageContext;

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handlePublishData() {
        const message = {
            firstName : this.firstName,
            lastName : this.lastName
        };
        publish(this.messageContext, NAME, message);
    }
}