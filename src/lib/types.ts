

export interface EnigmaSettings {
    rotor1Position: string;
    rotor2Position: string;
    rotor3Position: string;
    plugboardSwaps: Record<string, string>;
}

export interface BombeResponse {
    decodedMessage: string;
    settings: EnigmaSettings; // Assuming this uses the same settings as the Enigma machine
    numberOfAttempts: string;
    elapsedTime: string;
    bombeResultStatus: 'SUCCESS' | 'FAILURE' | 'INTERRUPTED';
}

export interface BombeErrorResponse {
    error: string;
}

export enum BombeInternalStatusEnum {
    STARTED = "STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    USER_INTERRUPTED = "USER_INTERRUPTED",
    COMPLETE = "COMPLETE",
    // Add other statuses as needed
}

export interface BombeStatus {
    internalStatus: BombeInternalStatusEnum;
    currentSetting: EnigmaSettings;
    numberOfAttempts: string;
    elapsedTime: string;
}
