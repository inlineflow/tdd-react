export type Customer = { 
    id: number;
    firstName: string;
    lastName: string 
    phoneNumber: string;
};


export type TimeSlot = { startsAt: number };

export type Appointment = {
    startsAt: number;
    customer: Customer;
    stylist: string;
    service: string;
    notes: string[];
}