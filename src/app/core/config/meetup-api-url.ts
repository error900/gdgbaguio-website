export const conf = {
  host: 'https://api.meetup.com',
  event: '/gdgbaguio/events',
}

export const meetupApiURL = {
  // GET
  websitePastEvents: conf.host+conf.event+'?sign=true&photo-host=public&desc=true&has_ended=true&status=past&only=id,name,local_date,link,description,venue,how_to_find_us&omit=venue.id,venue.lat,venue.lon,venue.repinned,venue.city,venue.country,venue.localized_country_name&no_later_than=',
  eventPast: conf.host+conf.event+'?&sign=true&photo-host=public&desc=true&has_ended=true&status=past&omit=group,visibility,pro_is_email_shared,member_pay_fee,date_in_series_pattern,status,time,updated,utc_offset,link,description,venue.id,venue.lat,venue.lon,venue.repinned,venue.country,venue.localized_country_name,duration',
  eventOngoing: conf.host+conf.event+'?sign=true&photo-host=public&desc=true&status=upcoming&omit=group,visibility,pro_is_email_shared,member_pay_fee,date_in_series_pattern,time,updated,utc_offset,link,venue.id,venue.lat,venue.lon,venue.repinned,venue.country,venue.localized_country_name',
  eventUpcoming: conf.host+conf.event+'?sign=true&photo-host=public&desc=true&status=upcoming&omit=created,group,visibility,pro_is_email_shared,member_pay_fee,date_in_series_pattern,time,updated,utc_offset,link,venue.id,venue.lat,venue.lon,venue.repinned,venue.country,venue.localized_country_name,waitlist_count,yes_rsvp_count',
  eventDraft: conf.host+conf.event+'?sign=true&photo-host=public&status=draft&desc=true&omit=created,group,visibility,pro_is_email_shared,member_pay_fee,date_in_series_pattern,time,updated,utc_offset,link,venue.id,venue.lat,venue.lon,venue.repinned,venue.country,venue.localized_country_name,waitlist_count,yes_rsvp_count',
  eventRecent: conf.host+conf.event+'?sign=true&photo-host=public&desc=true&has_ended=true&status=past&only=id,name,local_date,venue,description&page=3&omit=venue.id,venue.lat,venue.lon,venue.repinned,venue.localized_country_name',
  // POST
  // attendanceTaking: '/gdgbaguio/events/:id/attendance?member=&status=',
  attendanceTaking: conf.host+conf.event,
}



export const meetupOAuthURL = {
  authorize: 'https://secure.meetup.com/oauth2/authorize',
  access: 'https://secure.meetup.com/oauth2/access',
}