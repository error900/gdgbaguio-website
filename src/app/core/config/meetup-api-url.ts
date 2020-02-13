export const conf = {
  host: 'https://api.meetup.com',
  event: 'https://api.meetup.com/gdgbaguio/events',
}

export const meetupApiURL = {
  // GET
  websitePastEvents: conf.event+'?sign=true&photo-host=public&desc=true&has_ended=true&status=past&only=id,name,local_date,link,description,venue,how_to_find_us&omit=venue.id,venue.lat,venue.lon,venue.repinned,venue.city,venue.country,venue.localized_country_name&no_later_than=',
  eventPast: conf.event+'?&sign=true&photo-host=public&desc=true&has_ended=true&status=past&omit=created,group,visibility,pro_is_email_shared,member_pay_fee,date_in_series_pattern,status,time,updated,utc_offset,link,description,venue.id,venue.lat,venue.lon,venue.repinned,venue.country,venue.localized_country_name,duration',
  eventOngoingUpcoming: conf.event+'?sign=true&photo-host=public&desc=true&has_ended=false&omit=group,visibility,pro_is_email_shared,member_pay_fee,date_in_series_pattern,time,updated,utc_offset,link,venue.id,venue.lat,venue.lon,venue.repinned,venue.country,venue.localized_country_name',
  eventRecent: conf.event+'?sign=true&photo-host=public&desc=true&page=3&has_ended=true&status=past&only=id,name,local_date,venue,description&omit=venue.id,venue.lat,venue.lon,venue.repinned,venue.country',
  eventDraft: conf.event+'?sign=true&photo-host=public&status=draft&desc=true&omit=created,group,visibility,pro_is_email_shared,member_pay_fee,date_in_series_pattern,time,updated,utc_offset,link,venue.id,venue.lat,venue.lon,venue.repinned,venue.country,venue.localized_country_name,waitlist_count,yes_rsvp_count',
  eventDetailsParams: '?fields=event_hosts&omit=group,created,duration,local_time,date_in_series_pattern,status,time,updated,utc_offset,venue.id,venue.lat,venue.lon,venue.repinned,venue.country,visibility,member_pay_fee,event_hosts.id,event_hosts.intro,event_hosts.role,event_hosts.host_count,event_hosts.join_date,event_hosts.photo.id,event_hosts.photo.highres_link,event_hosts.photo.photo_link,event_hosts.photo.type,event_hosts.photo.base_url',
  // POST
  // attendanceTaking: '/gdgbaguio/events/:id/attendance?member=&status=',
}

export const meetupOAuthURL = {
  authorize: 'https://secure.meetup.com/oauth2/authorize',
  access: 'https://secure.meetup.com/oauth2/access',
}