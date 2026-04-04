import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";

export function useDateTimePicker() {
  //   const [startDate, setStartDate] = useState<string | undefined>("");
  //   const [endDate, setEndDate] = useState<string | undefined>("");
  const [date, setDate] = useState<Date | null>(null);
  // const [time, setTime] = useState<string | undefined>("");
  async function openCalendar() {
    const dateResult = await new Promise<Date | undefined>((resolve) =>
      DateTimePickerAndroid.open({
        timeZoneName: "Asia/Jerusalem",
        value: new Date(),
        onChange: (event, date) => {
          switch (event.type) {
            case "set":
              const stringDate = date;
              resolve(stringDate);
              break;
            case "dismissed":
              resolve(undefined);
              break;
          }
        },
      }),
    );
    if (!dateResult) return;

    const timeResult = await new Promise<Date | undefined>((resolve) => {
      DateTimePickerAndroid.open({
        value: new Date(),
        mode: "time",
        timeZoneName: "Asia/Jerusalem",
        onChange: (event, date) => {
          switch (event.type) {
            case "set":
              const stringTime = date;
              resolve(stringTime);
              break;
            case "dismissed":
              resolve(undefined);
              break;
          }
        },
      });
    });
    if (!timeResult) return;
    console.log(dateResult);
    const fullDate = new Date(dateResult);
    fullDate.setHours(timeResult.getHours());
    fullDate.setMinutes(timeResult.getMinutes());
    // fullDate.setHours(timeResult.getHours())
    // console.log(fullDate);
    setDate(fullDate);
  }

  return { openCalendar, date };
}
