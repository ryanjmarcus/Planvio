import { User } from './user';

export class Course {
  title: string;
  days: [boolean, boolean, boolean, boolean, boolean]
  startTime: string;
  endTime: string;
  instructorName: string;
  instructorImage: string;
  username: string;
  createdAt: Date;
}
