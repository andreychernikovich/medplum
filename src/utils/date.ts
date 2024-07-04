import moment from "moment";

export const DATE_FORMATS = {
  BIRTH_DATE: "YYYY-MM-DD",
  MONTH_DAY: "MMM DD",
  HOUR_MINUTE: "h:mm a",
};

export const formatBirthDate = (dateString: Date) : string => {
  return moment(dateString).format(DATE_FORMATS.BIRTH_DATE);
};

export const formatToMonthDay = (dateString: string) : string => {
  return moment(dateString).format(DATE_FORMATS.MONTH_DAY);
};

export const formatToTime = (dateString: string) : string => {
  return moment.utc(dateString).format(DATE_FORMATS.HOUR_MINUTE);
};
