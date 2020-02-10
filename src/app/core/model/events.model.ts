export class GDGBaguioEvents {
  description: string;
  start_time_stamp: string;
  title: string;
  upcoming: boolean;
}

// PUBLIC

export interface sitePastMeetupEvents {
  id: string,
  name: string,
  local_date: string,
  venue: {
    name: string,
    address_1: string
  },
  link: string,
  description: string,
  how_to_find_us: string
}

export interface siteRecentMeetupEvents {
  id: string,
  name: string,
  local_date: string,
  description: string,
  venue: {
    name: string,
    address_1: string,
    city: string,
    country: string
  }
}

// ADMIN DASHBOARD

export interface dashboardOngoingMeetupEvents {
  id: string,
  name: string
}

export interface dashboardUpcomingMeetupEvents {
  id: string,
  name: string
}

export interface dashboardDraftMeetupEvents {
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

export interface dashboardPastMeetupEvents {
  created: number,
  // duration: number,
  id: string,
  name: string,
  rsvp_limit: number,
  locate_date: string,
  local_time: string,
  waitlist_count: number,
  yes_rsvp_count: number,
  venue: {
    name: string,
    address_1: string
  },
  manual_attendance_count: number
}