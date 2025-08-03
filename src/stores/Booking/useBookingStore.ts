import { create } from 'zustand';
import { BookingState } from '@/types/bookingStoreTypes';

const initialState: Omit<
  BookingState,
  | 'setAvailableDates'
  | 'setSelectedTimeId'
  | 'setSelectedDate'
  | 'setSelectedTime'
  | 'incrementParticipants'
  | 'decrementParticipants'
  | 'setIsOpen'
  | 'setToInitial'
> = {
  selectedDate: new Date(),
  selectedTime: null,
  participants: 1,
  isOpen: false,
  availableDates: [],
  selectedTimeId: null,
};

const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  setAvailableDates: (data) => set({ availableDates: data }),
  setSelectedTimeId: (id) => set({ selectedTimeId: id }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),

  incrementParticipants: () =>
    set((state) => ({ participants: state.participants + 1 })),
  decrementParticipants: () =>
    set((state) => ({
      participants: state.participants > 1 ? state.participants - 1 : 1,
    })),
  setIsOpen: (open) => set({ isOpen: open }),

  setToInitial: () => set({ ...initialState }),
}));

export default useBookingStore;
