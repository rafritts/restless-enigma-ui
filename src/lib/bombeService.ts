import type { EnigmaSettings } from "./types";

const apiUrl = 'http://localhost:8081';

interface BombeBreakRequest {
  encodedMessage: string;
  searchPhrase: string;
}

interface BombeBreakResponse {
  decodedMessage: string;
  settings: EnigmaSettings;
  numberOfAttempts: string;
  elapsedTime: string;
  bombeResultStatus: 'SUCCESS' | 'FAILURE' | 'INTERRUPTED';
}

export const breakEnigma = async (request: BombeBreakRequest): Promise<BombeBreakResponse> => {
  try {
    const response = await fetch(`${apiUrl}/bombe/decode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in breakEnigma:', error);
    throw error;
  }
};

export const interruptBombe = async (): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/bombe/interrupt-bombe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error in interruptBombe:', error);
    throw error;
  }
};
