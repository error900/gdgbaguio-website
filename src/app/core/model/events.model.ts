export class GDGBaguioEvent {
  description: string;
  start_time_stamp: string;
  title: string;
  upcoming: boolean;
}

// PUBLIC

export interface siteOngoingUpcomingMeetupEvent {
  id: string,
  name: string,
  status: string,
  local_date: string,
  local_time: string,
  waitlist_count: number,
  yes_rsvp_count: number,
  venue: {
    name: string,
    address_1: string,
    city: string,
    localized_country_name: string
  },
  description: string
}

export interface siteRecentMeetupEvent {
  id: string,
  name: string,
  local_date: string,
  description: string,
  venue: {
    name: string,
    address_1: string,
    city: string,
    localized_country_name: string
  }
}

export interface sitePastMeetupEvent {
  id: string,
  name: string,
  rsvp_limit: number,
  locate_date: string,
  waitlist_count: number,
  yes_rsvp_count: number,
  venue: {
    name: string,
    address_1: string
  },
  link: string,
  manual_attendance_count: number
}

export interface siteMeetupEventInfo {
  id: string;
  name: string;
  rsvp_limit: number;
  local_date: string;
  waitlist_count: number;
  yes_rsvp_count: number;
  venue: {
    name: string;
    address_1: string;
    city: string;
    localized_country_name: string;
  };
  link: string;
  manual_attendance_count: number;
  description: string;
  event_hosts: {
    name: string;
    photo: {
      thumb_link: string;
    };
  }[];

}

// ADMIN DASHBOARD

export interface dashboardOngoingUpcomingMeetupEvent {
  id: string,
  name: string
}

export interface dashboardDraftMeetupEvent {
  id: string,
  created: number,
  duration: number,
  name: string,
  rsvp_limit: number,
  local_date: string,
  local_time: string,
  waitlist_count: number,
  yes_rsvp_count: number,
  venue: {
    name: string,
    address_1: string,
    city: string
  },
  description
}