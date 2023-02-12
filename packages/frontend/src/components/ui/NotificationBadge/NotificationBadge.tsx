export interface NotificationBadgeProps {
  /**
   * val to be displayed in badge
   */
  val?: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  val,
}) => (
  <div
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'max-content',
      minWidth: '1.5em',
      height: '1.5em',
      bg: '#dc4531',
      color: '#ffffff',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      fontWeight: '500',
    }}
  >
    <span>{val}</span>
  </div>
);

if (process.env.NODE_ENV !== 'production') {
  NotificationBadge.displayName = 'NotificationBadge';
}
