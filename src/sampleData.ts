import { Appointment } from "./types/customer";

const today = new Date();

const at = (hours: number) => today.setHours(hours, 0);

export const sampleAppointments: Appointment[] = [
    {
        startsAt: at(9),
        customer: { firstName: "Ashley", lastName: "Kaylegh" },
        stylist: "Ethan Patel",
        service: "Deep Conditioning Treatment",
        notes: ["Dry ends, needs extra moisture", "Schedule follow-up in 4 weeks"]
    },{
        startsAt: at(10),
        customer: { firstName: "Jordan", lastName: "Wilds" },
        stylist: "Emma Johnson",
        service: "Hair Straightening",
        notes: ["Frizz control needed", "Use smoothing serum post-treatment"]
    },
    {
        startsAt: at(11),
        customer: { firstName: "Casey", lastName: "Hawkins" },
        stylist: "Sophia Lee",
        service: "Highlights",
        notes: ["Add subtle blonde highlights", "Avoid bleach on roots"]
    },
    {
        startsAt: at(12),
        customer: { firstName: "Charlie", lastName: "Bennett" },
        stylist: "Maya Thompson",
        service: "Haircut and Styling",
        notes: ["Prefers a short, layered cut", "Likes natural products"]
    },
    {
        startsAt: at(13),
        customer: { firstName: "Jay", lastName: "Ellis" },
        stylist: "Olivia Nguyen",
        service: "Men’s Haircut",
        notes: ["Keep sides short, top medium length", "Trim beard slightly"]
    },
    {
        startsAt: at(14),
        customer: { firstName: "Alex", lastName: "Grayson" },
        stylist: "Noah Kim",
        service: "Perm",
        notes: ["Loose curls requested", "Check hair health before treatment"]
    },
    {
        startsAt: at(15),
        customer: { firstName: "Jules", lastName: "Fletcher" },
        stylist: "Isabella Martinez",
        service: "Blowout",
        notes: ["Voluminous blowout for event", "Use heat protectant spray"]
    },
    {
        startsAt: at(16),
        customer: { firstName: "Stevie", lastName: "Dawson" },
        stylist: "James Wilson",
        service: "Balayage",
        notes: ["Natural sun-kissed look", "Focus on mid-lengths to ends"]
    },
    {
        startsAt: at(17),
        customer: { firstName: "Frankie", lastName: "Morrison" },
        stylist: "Liam Garcia",
        service: "Color Treatment",
        notes: ["Wants a warm caramel tone", "Sensitive scalp, use gentle dye"]
    },
]

