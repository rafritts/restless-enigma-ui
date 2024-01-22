const apiUrl = 'http://localhost:8081';

interface EnigmaSettings {
  rotor1Position: string;
  rotor2Position: string;
  rotor3Position: string;
  plugboardSwaps: Record<string, string>;
}

interface EnigmaMessageRequest {
  message: string;
  settings: EnigmaSettings;
}

interface EnigmaMessageResponse {
  encodedMessage: string;
}

export const encodeDecodeMessage = async (request: EnigmaMessageRequest): Promise<EnigmaMessageResponse> => {
  try {
    const response = await fetch(`${apiUrl}/enigma/encode-decode`, {
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
    console.error('Error in encodeDecodeMessage:', error);
    throw error;
  }
};
