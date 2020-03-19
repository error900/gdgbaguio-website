export class GroupForm {
  // key: string;
  type: string;
  fullName: string;
  companyORschool: string;
  positionORprofession: string;
  mobileNumber: number;
  email: string;
  message: string;
}

export class SpeakerRequestForm {
  key: string;
  type: string;
  fullName: string;
  email: string;
  eventName: string;
  eventLocation: string;
  eventDescription: string;
  targetAudience: string;
  targetNumber: string;
  googleTech: {
    id: string;
    name: string;
    url: string;
  }[];
}