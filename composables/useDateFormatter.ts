import dayjs from "dayjs";

export function useDateFormatter() {
  const dateFormat = "DD/MM/YYYY";
  const dateFormatWithTime = "DD/MM/YYYY hh:mm";

  function toUnixTimestamp(unixTimestamp: number): string {
    return dayjs.unix(unixTimestamp).format(dateFormat);
  }

  function formatDate(value: string, displayTime?: boolean) {
    return !value ? null : dayjs(value).format(displayTime ? dateFormatWithTime : dateFormat);
  }

  return { toUnixTimestamp, formatDate };
}
