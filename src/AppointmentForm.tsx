import { Appointment } from "./types/customer";

type AppointmentFromProps = {
  selectableServices?: string[];
  original: Appointment;
  salonOpensAt?: number;
  salonClosesAt?: number;
  today?: Date;
};
export const AppointmentForm = ({
  selectableServices = [
    "Cut",
    "Blow-dry",
    "Cut & color",
    "Beard trim",
    "Cut & beard trim",
    "Extensions",
  ],
  original,
  salonOpensAt = 9,
  salonClosesAt = 19,
  today = new Date(),
}: AppointmentFromProps) => (
  <div>
    <form>
      <select
        name="service"
        id="service"
        value={original.service}
        aria-readonly
      >
        <option></option>
        {selectableServices.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
      />
    </form>
  </div>
);

const timeIncrements = (
  numTimes: number,
  startTimeMs: number,
  incrementMs: number
) =>
  Array.from({ length: numTimes }, (_, i) =>
    new Date(startTimeMs + i * incrementMs).getTime()
  );

const dailyTimeSlots = (salonOpensAt: any, salonClosesAt: any) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;

  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return timeIncrements(totalSlots, startTime, increment);
};

const toTimeValue = (timestamp: number) =>
  new Date(timestamp).toTimeString().substring(0, 5);

const weeklyDateValues = (startDate: Date) => {
  const midnight = startDate.setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return timeIncrements(7, midnight, increment);
};

const toShortDate = (timestamp: number) => {
  const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(" ");
  return `${day} ${dayOfMonth}`;
};

type TimeSlotTableProps = {
  salonOpensAt: number;
  salonClosesAt: number;
  today: Date;
};
const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today,
}: TimeSlotTableProps) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  const dates = weeklyDateValues(today);

  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {dates.map((d) => (
            <th key={d}>{toShortDate(d)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeSlot) => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
