import { create } from 'zustand';
import { BookingState } from '@/types/bookingStoreTypes';

const useBookingStore = create<BookingState>((set) => ({
  selectedDate: new Date(),
  selectedTime: null,
  participants: 1,
  isOpen: false,
  availableDates: [],
  selectedTimeId: null,
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
}));

export default useBookingStore;
