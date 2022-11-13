'use-client';
import React from 'react';
import dayjs from 'dayjs';

type ControlsProps = {
    setPaused: (pause: boolean) => void;
    setEndDate: (endDate: dayjs.Dayjs) => void;
    minutes: number;
    seconds: number;
    paused: boolean;
    setWorkMinutes: (workMinutes: number) => void;
    workMinutes: number;
    setCurrentMinutes: (currentMinutes: number) => void;
    breakMinutes: number;
    setCurrentSeconds: (currentSeconds: number) => void;
    setBreakMinutes: (breakMinutes: number) => void;
    setIsOnBreak: (isOnBreak: boolean) => void;
    setLabel: (label: string) => void;
}

export const ControlsComponent = ({setPaused, setEndDate, minutes, seconds, paused, setWorkMinutes, workMinutes, setCurrentMinutes, breakMinutes, setCurrentSeconds, setBreakMinutes, setIsOnBreak, setLabel}: ControlsProps) => {

    const playOnClick = () => {
        if (paused) {
            var endDate = dayjs();
            endDate = endDate.add(minutes, 'minute');
            endDate = endDate.add(seconds, 'second');
            setEndDate(endDate);
            setPaused(false);
        }
    }

    const pauseOnClick = () => {
        setPaused(true);
    }

    const refreshOnClick = () => {
        setPaused(true);
        setWorkMinutes(workMinutes);
        setCurrentMinutes(workMinutes);
        setCurrentSeconds(0);
        setIsOnBreak(false);
        setLabel('Work');
        setBreakMinutes(breakMinutes);
    }

    return (
        <div style={{display: 'flex', gap: '10px', marginTop: '30px'}}>
            <svg 
                onClick={playOnClick}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 384 512">
                <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
            </svg>
            <svg 
                onClick={pauseOnClick}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 320 512">
                <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
            </svg>
            <svg 
                onClick={refreshOnClick}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512">
                <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/>
            </svg>
        </div>
    )
}