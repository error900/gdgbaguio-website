export class GDGBaguioEvent {
  description: string;
  start_time_stamp: string;
  title: string;
  upcoming: boolean;
}

export class FirebaseEvent {
  id: string;
  name: string;
  rsvp_limit: number;
  status: string;
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
  featured_photo: {
    highres_link: string;
  };
}

export interface FirebaseEventInterface {
  id: string,
  name: string,
  rsvp_limit: number,
  status: string,
  local_date: string,
  waitlist_count: number,
  yes_rsvp_count: number,
  venue: {
    name: string,
    address_1: string,
    city: string,
    localized_country_name: string,
  },
  link: string,
  manual_attendance_count: number,
  description: string,
  featured_photo: {
    highres_link: string,
  }
}

export interface event {
  id: string,
  name: string,
  local_date: string,
  rsvp_limit: number,
  waitlist_count: number,
  yes_rsvp_count: number,
  venue: {
    name: string,
    address_1: string,
    city: string,
    localized_country_name: string,
  },
  link: string,
}

// MEETUP

export interface plannedEvent {
  id: string,
  name: string,
  status: string,
  local_date: string,
  local_time: string,
  rsvp_limit: number,
  waitlist_count: number,
  yes_rsvp_count: number,
  link: string,
  venue: {
    name: string,
    address_1: string,
    city: string,
    localized_country_name: string
  },
  description: string,
  featured_photo: {
    highres_link: string
  }
}

export interface recentEvent {
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

export interface pastEvent {
  id: string,
  name: string,
  local_date: string,
  rsvp_limit: number,
  waitlist_count: number,
  yes_rsvp_count: number,
  venue: {
    name: string,
    address_1: string
  },
  link: string,
  manual_attendance_count: number
}

export class FirebaseEventHost {
  id: string;
  event_hosts: {
    id: string;
    name: string;
    photo: {
      thumb_link: string;
    };
  }[];
}

export class FirebaseGoogleTech {
  name: string;
  url: string;
}

export interface FirebaseGoogleTechInterface {
  name: string,
  url: string,
}

export interface eventInfo {
  id: string;
  name: string;
  rsvp_limit: number;
  status: string;
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
  featured_photo: {
    highres_link: string;
  };
  event_hosts: {
    id: string;
    name: string;
    photo: {
      thumb_link: string;
    };
  }[];
}

export interface draftEvent {
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

export interface memberRSVP {
  member: {
    id: string,
    name: string,
    photo: {
      photo_link: string
    }
  },
  status: string
}

export interface memberAttendance {
  id: string,

}