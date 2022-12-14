export type TimerStatusUpdater = {
    setCurrentMinutes: function(number);
    setCurrentSeconds: function(number);
    setBreakMinutes: function(number);
    breakMinutes: number;
    setWorkMinutes: function(number);
    workMinutes: number;
    paused: boolean;
    isOnBreak: boolean;
};
