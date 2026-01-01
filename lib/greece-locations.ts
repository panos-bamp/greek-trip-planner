// Comprehensive database of popular Greece locations with coordinates
// This helps extract locations from AI-generated itineraries

export interface GreekLocation {
  lat: number
  lng: number
  type: string
  aliases?: string[]
}

export const greeceLocations: Record<string, GreekLocation> = {
  // Athens & Attica
  'athens': { lat: 37.9838, lng: 23.7275, type: 'town' },
  'acropolis': { lat: 37.9715, lng: 23.7267, type: 'attraction' },
  'parthenon': { lat: 37.9715, lng: 23.7267, type: 'attraction' },
  'plaka': { lat: 37.9732, lng: 23.7281, type: 'neighborhood' },
  'monastiraki': { lat: 37.9763, lng: 23.7254, type: 'neighborhood' },
  'syntagma': { lat: 37.9755, lng: 23.7348, type: 'attraction' },
  'acropolis museum': { lat: 37.9688, lng: 23.7281, type: 'attraction' },
  'ancient agora': { lat: 37.9753, lng: 23.7219, type: 'attraction' },
  'temple of olympian zeus': { lat: 37.9693, lng: 23.7330, type: 'attraction' },
  'lycabettus hill': { lat: 37.9814, lng: 23.7436, type: 'viewpoint' },
  'national archaeological museum': { lat: 37.9890, lng: 23.7322, type: 'attraction' },
  'piraeus': { lat: 37.9484, lng: 23.6397, type: 'town' },
  'cape sounion': { lat: 37.6517, lng: 24.0258, type: 'attraction' },
  'temple of poseidon': { lat: 37.6517, lng: 24.0258, type: 'attraction' },

  // Santorini
  'santorini': { lat: 36.3932, lng: 25.4615, type: 'island' },
  'oia': { lat: 36.4618, lng: 25.3753, type: 'town' },
  'fira': { lat: 36.4166, lng: 25.4324, type: 'town' },
  'imerovigli': { lat: 36.4300, lng: 25.4260, type: 'town' },
  'firostefani': { lat: 36.4235, lng: 25.4293, type: 'town' },
  'kamari': { lat: 36.3797, lng: 25.4713, type: 'beach' },
  'perissa': { lat: 36.3637, lng: 25.4790, type: 'beach' },
  'red beach': { lat: 36.3485, lng: 25.3985, type: 'beach' },
  'akrotiri': { lat: 36.3532, lng: 25.4031, type: 'attraction' },
  'pyrgos': { lat: 36.3920, lng: 25.4470, type: 'town' },
  'megalochori': { lat: 36.3757, lng: 25.4376, type: 'town' },

  // Mykonos
  'mykonos': { lat: 37.4467, lng: 25.3289, type: 'island' },
  'mykonos town': { lat: 37.4467, lng: 25.3289, type: 'town' },
  'chora mykonos': { lat: 37.4467, lng: 25.3289, type: 'town' },
  'little venice': { lat: 37.4457, lng: 25.3253, type: 'neighborhood' },
  'paradise beach': { lat: 37.4170, lng: 25.3590, type: 'beach' },
  'super paradise beach': { lat: 37.4137, lng: 25.3643, type: 'beach' },
  'psarou beach': { lat: 37.4280, lng: 25.3455, type: 'beach' },
  'ornos': { lat: 37.4315, lng: 25.3417, type: 'beach' },
  'elia beach': { lat: 37.4080, lng: 25.3750, type: 'beach' },
  'ano mera': { lat: 37.4525, lng: 25.3867, type: 'town' },

  // Crete
  'crete': { lat: 35.2401, lng: 24.8093, type: 'island' },
  'heraklion': { lat: 35.3387, lng: 25.1442, type: 'town' },
  'chania': { lat: 35.5138, lng: 24.0180, type: 'town' },
  'rethymno': { lat: 35.3660, lng: 24.4824, type: 'town' },
  'agios nikolaos': { lat: 35.1908, lng: 25.7164, type: 'town' },
  'knossos': { lat: 35.2980, lng: 25.1631, type: 'attraction' },
  'knossos palace': { lat: 35.2980, lng: 25.1631, type: 'attraction' },
  'elafonisi': { lat: 35.2719, lng: 23.5411, type: 'beach' },
  'balos': { lat: 35.5850, lng: 23.5875, type: 'beach' },
  'samaria gorge': { lat: 35.2675, lng: 23.9664, type: 'attraction' },
  'spinalonga': { lat: 35.2970, lng: 25.7395, type: 'attraction' },

  // Rhodes
  'rhodes': { lat: 36.4341, lng: 28.2176, type: 'island' },
  'rhodes town': { lat: 36.4341, lng: 28.2176, type: 'town' },
  'rhodes old town': { lat: 36.4440, lng: 28.2249, type: 'neighborhood' },
  'lindos': { lat: 36.0919, lng: 28.0865, type: 'town' },
  'faliraki': { lat: 36.3415, lng: 28.2019, type: 'beach' },
  'tsambika': { lat: 36.2124, lng: 28.1334, type: 'beach' },
  'anthony quinn bay': { lat: 36.1961, lng: 28.1523, type: 'beach' },

  // Corfu
  'corfu': { lat: 39.6243, lng: 19.9217, type: 'island' },
  'corfu town': { lat: 39.6243, lng: 19.9217, type: 'town' },
  'paleokastritsa': { lat: 39.6756, lng: 19.7061, type: 'beach' },
  'glyfada beach': { lat: 39.5745, lng: 19.8278, type: 'beach' },
  'sidari': { lat: 39.7906, lng: 19.6772, type: 'town' },

  // Zakynthos
  'zakynthos': { lat: 37.7869, lng: 20.8988, type: 'island' },
  'zante': { lat: 37.7869, lng: 20.8988, type: 'island' },
  'navagio beach': { lat: 37.8594, lng: 20.6247, type: 'beach' },
  'shipwreck beach': { lat: 37.8594, lng: 20.6247, type: 'beach' },
  'blue caves': { lat: 37.8486, lng: 20.6350, type: 'attraction' },

  // Paros
  'paros': { lat: 37.0854, lng: 25.1484, type: 'island' },
  'parikia': { lat: 37.0851, lng: 25.1508, type: 'town' },
  'naoussa': { lat: 37.1238, lng: 25.2376, type: 'town' },
  'antiparos': { lat: 37.0374, lng: 25.0759, type: 'island' },

  // Naxos
  'naxos': { lat: 37.1039, lng: 25.3765, type: 'island' },
  'naxos town': { lat: 37.1039, lng: 25.3765, type: 'town' },
  'chora naxos': { lat: 37.1039, lng: 25.3765, type: 'town' },
  'portara': { lat: 37.1077, lng: 25.3733, type: 'attraction' },

  // Milos
  'milos': { lat: 36.7213, lng: 24.4256, type: 'island' },
  'sarakiniko': { lat: 36.7385, lng: 24.4503, type: 'beach' },
  'kleftiko': { lat: 36.6375, lng: 24.3278, type: 'attraction' },

  // Meteora
  'meteora': { lat: 39.7217, lng: 21.6306, type: 'attraction' },
  'kalambaka': { lat: 39.7055, lng: 21.6253, type: 'town' },
  'kastraki': { lat: 39.7133, lng: 21.6325, type: 'town' },

  // Delphi
  'delphi': { lat: 38.4824, lng: 22.5010, type: 'attraction' },
  'delphi archaeological site': { lat: 38.4824, lng: 22.5010, type: 'attraction' },

  // Peloponnese
  'nafplio': { lat: 37.5676, lng: 22.8050, type: 'town' },
  'epidaurus': { lat: 37.5963, lng: 23.0793, type: 'attraction' },
  'mycenae': { lat: 37.7308, lng: 22.7562, type: 'attraction' },
  'olympia': { lat: 37.6379, lng: 21.6300, type: 'attraction' },
  'monemvasia': { lat: 36.6865, lng: 23.0530, type: 'town' },
  'sparta': { lat: 37.0739, lng: 22.4298, type: 'town' },
  'mystras': { lat: 37.0718, lng: 22.3720, type: 'attraction' },

  // Thessaloniki
  'thessaloniki': { lat: 40.6401, lng: 22.9444, type: 'town' },
  'white tower': { lat: 40.6263, lng: 22.9486, type: 'attraction' },

  // Ios
  'ios': { lat: 36.7252, lng: 25.3361, type: 'island' },
  'ios town': { lat: 36.7252, lng: 25.3361, type: 'town' },
  'chora ios': { lat: 36.7252, lng: 25.3361, type: 'town' },

  // Sifnos
  'sifnos': { lat: 36.9750, lng: 24.7100, type: 'island' },
  'apollonia': { lat: 36.9750, lng: 24.7100, type: 'town' },

  // Folegandros
  'folegandros': { lat: 36.6252, lng: 24.9186, type: 'island' },

  // Hydra
  'hydra': { lat: 37.3500, lng: 23.4667, type: 'island' },
  'hydra town': { lat: 37.3500, lng: 23.4667, type: 'town' },

  // Aegina
  'aegina': { lat: 37.7486, lng: 23.4306, type: 'island' },
  'aegina town': { lat: 37.7486, lng: 23.4306, type: 'town' },

  // Skiathos
  'skiathos': { lat: 39.1620, lng: 23.4870, type: 'island' },
  'skiathos town': { lat: 39.1620, lng: 23.4870, type: 'town' },

  // Skopelos
  'skopelos': { lat: 39.1236, lng: 23.7244, type: 'island' },
  'skopelos town': { lat: 39.1236, lng: 23.7244, type: 'town' },

  // Alonissos
  'alonissos': { lat: 39.1458, lng: 23.8719, type: 'island' },

  // Kefalonia
  'kefalonia': { lat: 38.1748, lng: 20.5647, type: 'island' },
  'cephalonia': { lat: 38.1748, lng: 20.5647, type: 'island' },
  'argostoli': { lat: 38.1751, lng: 20.4910, type: 'town' },
  'myrtos beach': { lat: 38.3433, lng: 20.5406, type: 'beach' },

  // Lefkada
  'lefkada': { lat: 38.8334, lng: 20.7069, type: 'island' },
  'lefkas': { lat: 38.8334, lng: 20.7069, type: 'island' },
  'porto katsiki': { lat: 38.5428, lng: 20.5442, type: 'beach' },

  // Samos
  'samos': { lat: 37.7565, lng: 26.9773, type: 'island' },

  // Chios
  'chios': { lat: 38.3682, lng: 26.1367, type: 'island' },

  // Lesvos
  'lesvos': { lat: 39.1000, lng: 26.3000, type: 'island' },
  'lesbos': { lat: 39.1000, lng: 26.3000, type: 'island' },
  'mytilene': { lat: 39.1067, lng: 26.5550, type: 'town' },
}

// Function to extract locations from text
export function extractLocationsFromText(text: string): string[] {
  const foundLocations: string[] = []
  const lowerText = text.toLowerCase()
  
  // Sort by length (longest first) to match multi-word locations first
  const sortedKeys = Object.keys(greeceLocations).sort((a, b) => b.length - a.length)
  
  for (const locationName of sortedKeys) {
    if (lowerText.includes(locationName)) {
      foundLocations.push(locationName)
    }
  }
  
  // Remove duplicates
  return Array.from(new Set(foundLocations))
}

// Function to get location data
export function getLocationData(locationName: string): GreekLocation | null {
  return greeceLocations[locationName.toLowerCase()] || null
}
