export type FormattedDateTime = {
  iso: string;
  dateTime: string;
  date: string;
  time: string;
  relativeToNow: string;
  isFresh: boolean;
};

const dateFormatOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
} satisfies Intl.DateTimeFormatOptions;

const timeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'Europe/London',
} satisfies Intl.DateTimeFormatOptions;

const longDateFormatter = new Intl.DateTimeFormat('en-GB', dateFormatOptions);
const timeFormatter = new Intl.DateTimeFormat('en-GB', timeFormatOptions);
const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  ...dateFormatOptions,
  ...timeFormatOptions,
});

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en-GB', {
  numeric: 'auto',
});

const getDateDifference = (date: Date) => date.getTime() - new Date().getTime();

const getRelative = (date: Date) => {
  const timeDifferenceInMilliseconds = getDateDifference(date);

  const minutes = Math.ceil(timeDifferenceInMilliseconds / 1000 / 60);
  if (minutes > -60) {
    return relativeTimeFormatter.format(minutes, 'minutes');
  }

  const hours = Math.ceil(minutes / 60);
  if (hours > -24) {
    return relativeTimeFormatter.format(hours, 'hours');
  }

  const days = Math.ceil(hours / 24);
  if (days > -14) {
    return relativeTimeFormatter.format(days, 'days');
  }

  const weeks = Math.floor(days / 7);
  if (weeks > -8) {
    return relativeTimeFormatter.format(weeks, 'weeks');
  }

  const months = Math.floor(days / 30);
  if (months > -12) {
    return relativeTimeFormatter.format(months, 'month');
  }

  const years = Math.floor(days / 365);
  return relativeTimeFormatter.format(years, 'years');
};

export const getFormattedDateTime = (dateString: string): FormattedDateTime => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return {
      iso: 'Invalid Date',
      dateTime: 'Invalid Date',
      date: 'Invalid Date',
      time: 'Invalid Date',
      relativeToNow: 'Invalid Date',
      isFresh: false,
    };
  }

  const relativeToNow = getRelative(date);

  return {
    iso: date.toISOString(),
    dateTime: dateTimeFormatter.format(date),
    date: longDateFormatter.format(date),
    time: timeFormatter.format(date),
    relativeToNow: relativeToNow,
    isFresh: getDateDifference(date) > -(1000 * 60 * 60 * 24 * 3), // within 3 days
  };
};
