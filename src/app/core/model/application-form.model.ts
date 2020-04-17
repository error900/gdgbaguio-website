export class GroupForm {
  type: string;
  fullName: string;
  companyORschool: string;
  positionORprofession: string;
  mobileNumber: number;
  email: string;
  message: string;
}

export class SpeakerRequestForm {
  type: string;
  email: string;
  eventName: string;
  eventLocation: string;
  eventDescription: string;
  targetAudience: string;
  targetNumber: number;
  googleTech: {
    id: string;
    name: string;
    url: string;
  }[];
}