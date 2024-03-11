export class Customer {
    private firstName: string;
    private lastName: string;
    private Age: number;

    constructor(firstName: string, lastName: string, Age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.Age = Age;
    }

    public greeter() {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }

    public GetAge() {
        console.log(`Age ${this.Age}`)
    }
}

let customer = new Customer("John", "Smith", 30);
customer.greeter();
customer.GetAge();