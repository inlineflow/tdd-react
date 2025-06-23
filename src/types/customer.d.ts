export type Customer = { 
    firstName: string;
    lastName: string 
};

export type Appointment = {
    startsAt: DateTime;
    customer: Customer;
    stylist: string;
    service: string;
    notes: string[];
}