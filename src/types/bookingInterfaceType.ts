export interface BookingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  onBooking?: boolean;
  className?: string;
}
