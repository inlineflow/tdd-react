import { Appointment } from "./types/customer";

type TimeSlot = { startsAt: number };

type AppointmentFromProps = {
  selectableServices?: string[];
  original: Appointment;
  salonOpensAt?: number;
  salonClosesAt?: number;
  today?: Date;
  availableTimeSlots: TimeSlot[];
  checkedTimeSlot: TimeSlot;
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
  availableTimeSlots,
  checkedTimeSlot,
}: AppointmentFromProps) => (
  <div>
    <form>
      <select
        name="service"
        id="service"
        defaultValue={original.service}
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
        availableTimeSlots={availableTimeSlots}
        checkedTimeSlot={checkedTimeSlot}
      />
    </form>
    <input type="submit" value="Add" />
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

const mergeDateAndTime = (date: number, timeSlot: number) => {
  const time = new Date(timeSlot);
  return new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  );
};

type TimeSlotTableProps = {
  salonOpensAt: number;
  salonClosesAt: number;
  today: Date;
  availableTimeSlots: TimeSlot[];
  checkedTimeSlot: TimeSlot;
};
const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  checkedTimeSlot,
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
            {dates.map((date) => (
              <td key={date}>
                <RadioButtonIfAvailable
                  availableTimeSlots={availableTimeSlots}
                  date={date}
                  timeSlot={timeSlot}
                  checkedTimeSlot={checkedTimeSlot}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type RadioButtonProps = {
  availableTimeSlots: TimeSlot[];
  date: number;
  timeSlot: number;
  checkedTimeSlot: TimeSlot;
};
const RadioButtonIfAvailable = ({
  availableTimeSlots,
  date,
  timeSlot,
  checkedTimeSlot,
}: RadioButtonProps) => {
  const startsAt = mergeDateAndTime(date, timeSlot);
  const isChecked = startsAt === checkedTimeSlot.startsAt;

  if (
    availableTimeSlots.some(
      (availableTimeSlot) => availableTimeSlot.startsAt === startsAt
    )
  ) {
    return (
      <input
        type="radio"
        name="startsAt"
        value={startsAt}
        checked={isChecked}
      />
    );
  }
  return null;
};
