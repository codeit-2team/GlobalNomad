export interface BookingState {
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedTimeId: number | null;

  participants: number;
  isOpen: boolean;

  availableDates: {
    date: string;
    times: { id: number; startTime: string; endTime: string }[];
  }[];

  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string) => void;
  setSelectedTimeId: (id: number | null) => void;

  incrementParticipants: () => void;
  decrementParticipants: () => void;

  setIsOpen: (open: boolean) => void;
  setAvailableDates: (data: BookingState['availableDates']) => void;
  setToInitial: () => void;
}
