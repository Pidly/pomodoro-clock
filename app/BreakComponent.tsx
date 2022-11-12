'use-client';
import { TimerStatusUpdater } from "../typings";

export default function BreakComponent({setCurrentMinutes, setCurrentSeconds, currentMinutes, setBreakMinutes, breakMinutes, setWorkMinutes, workMinutes, paused, isOnBreak}: TimerStatusUpdater) {


    return (
        <div>
            <p>Break Length</p>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512">
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                </svg>
                <p>5</p>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512">
                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                </svg>
            </div>
        </div>
    )
}