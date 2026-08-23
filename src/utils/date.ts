import dayjs from "dayjs";

const DATE_KEY_FORMAT = "YYYY-MM-DD";

export const toDateKey = (date: dayjs.ConfigType): string =>
  dayjs(date).format(DATE_KEY_FORMAT);
