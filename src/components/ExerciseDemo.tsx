import React from 'react';
import { Info, AlertCircle } from 'lucide-react';

interface ExerciseDemoProps {
  exercise: {
    name: string;
    description?: string;
    tips?: string[];
    gifUrl?: string;
  };
}

const exerciseData = {
  'Bow-to-Stern Walks': {
    description: 'A balance-focused exercise that strengthens your core and improves stability.',
    instructions: [
      'Start at the bow of the boat',
      'Walk heel-to-toe (like on a tightrope)',
      'Keep your arms out for balance',
      'Engage your core throughout the movement',
      'Walk to the stern, then return to start'
    ],
    tips: [
      'Look forward, not down, to improve balance',
      'Take slow, controlled steps',
      'Use the boat\'s natural movement to challenge stability',
      'Breathe steadily throughout'
    ],
    images: [
      'https://images.unsplash.com/photo-1468581264429-2548ef9eb732',
      'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2',
      'https://images.unsplash.com/photo-1514649923863-ceaf75b7ec00'
    ],
    difficulty: 'Beginner',
    musclesTargeted: ['Core', 'Legs', 'Balance']
  },
  'Port-Side Planks': {
    description: 'A core-strengthening exercise that uses the boat\'s movement for added challenge.',
    instructions: [
      'Position yourself on the port side deck',
      'Place forearm flat on deck, elbow under shoulder',
      'Stack feet or stagger them for stability',
      'Lift hips, creating straight line from head to heels',
      'Hold position while maintaining proper form'
    ],
    tips: [
      'Keep body aligned from head to heels',
      'Don\'t let hips sag or lift too high',
      'Engage core throughout the hold',
      'Modify by dropping to knees if needed'
    ],
    images: [
      'https://images.unsplash.com/photo-1434596922112-19c563067271',
      'https://images.unsplash.com/photo-1596357395217-80de13130e92',
      'https://images.unsplash.com/photo-1591258370814-01609b341790'
    ],
    difficulty: 'Intermediate',
    musclesTargeted: ['Core', 'Shoulders', 'Obliques']
  },
  'Mast Climber Squats': {
    description: 'A lower body strengthening exercise using the mast for support and stability.',
    instructions: [
      'Stand facing the mast, feet shoulder-width apart',
      'Hold the mast lightly for balance',
      'Lower your body as if sitting in a chair',
      'Keep weight in your heels',
      'Push through heels to return to start'
    ],
    tips: [
      'Keep chest up and proud',
      'Don\'t let knees cave inward',
      'Breathe in on descent, out on ascent',
      'Use the boat\'s movement to engage stabilizers'
    ],
    images: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
      'https://images.unsplash.com/photo-1579722820308-d74e571900a9',
      'https://images.unsplash.com/photo-1566351566999-d679fc5f6f2f'
    ],
    difficulty: 'Beginner',
    musclesTargeted: ['Quads', 'Glutes', 'Core']
  },
  'Deck Push-Ups': {
    description: 'Upper body strengthening exercise adapted for the boat\'s deck.',
    instructions: [
      'Place hands shoulder-width apart on deck',
      'Set feet back in plank position',
      'Lower chest toward deck with control',
      'Keep elbows at 45-degree angle',
      'Push back up to start position'
    ],
    tips: [
      'Maintain rigid plank throughout',
      'Don\'t let hips sag or lift',
      'Modify angle using railings if needed',
      'Control the movement both up and down'
    ],
    images: [
      'https://images.unsplash.com/photo-1598971639058-fab3c3109a00',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
      'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff'
    ],
    difficulty: 'Intermediate',
    musclesTargeted: ['Chest', 'Shoulders', 'Triceps']
  },
  'Hull-Side Lunges': {
    description: 'A lower body exercise that improves balance and leg strength.',
    instructions: [
      'Stand parallel to the hull',
      'Step forward with one leg',
      'Lower back knee toward deck',
      'Keep front knee aligned with ankle',
      'Push back to start position'
    ],
    tips: [
      'Keep torso upright',
      'Use hull for light support if needed',
      'Take shorter steps when seas are rough',
      'Engage core throughout movement'
    ],
    images: [
      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155',
      'https://images.unsplash.com/photo-1550259979-ed79b48d2a30'
    ],
    difficulty: 'Intermediate',
    musclesTargeted: ['Quads', 'Glutes', 'Hamstrings']
  },
  'Sea Unt Burpees': {
    description: 'A full-body exercise modified for boat conditions.',
    instructions: [
      'Start in standing position',
      'Lower to deck with controlled squat',
      'Step or jump feet back to plank',
      'Perform one push-up',
      'Step or jump feet forward',
      'Stand and reach arms up'
    ],
    tips: [
      'Modify jump based on conditions',
      'Step feet instead of jumping if unstable',
      'Keep movements controlled and precise',
      'Focus on form over speed'
    ],
    images: [
      'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5',
      'https://images.unsplash.com/photo-1590239926044-0654380ba876'
    ],
    difficulty: 'Advanced',
    musclesTargeted: ['Full Body', 'Core', 'Cardio']
  }
};

const ExerciseDemo: React.FC<ExerciseDemoProps> = ({ exercise }) => {
  const data = exerciseData[exercise.name as keyof typeof exerciseData] || {
    description: 'Perform the exercise with proper form and control',
    instructions: ['Focus on form', 'Maintain control', 'Follow proper technique'],
    tips: ['Maintain steady breathing', 'Keep movements controlled', 'Focus on form'],
    images: ['https://images.unsplash.com/photo-1468581264429-2548ef9eb732'],
    difficulty: 'Beginner',
    musclesTargeted: ['Full Body']
  };

  // Randomly select an image from the available ones
  const randomImageIndex = Math.floor(Math.random() * data.images.length);
  const selectedImage = data.images[randomImageIndex];

  return (
    <div className="bg-white/10 rounded-xl p-6 text-white">
      <h3 className="text-xl font-semibold mb-4">{exercise.name}</h3>
      
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <img
          src={selectedImage}
          alt={exercise.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-1">
          <span className="text-sm font-medium">{data.difficulty}</span>
          <span className="mx-2">•</span>
          <span className="text-sm">{data.musclesTargeted.join(', ')}</span>
        </div>
      </div>

      <p className="mb-4 text-blue-100">{data.description}</p>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold flex items-center mb-2">
            <Info className="h-4 w-4 mr-2" />
            Instructions:
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-blue-100">
            {data.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="font-semibold flex items-center mb-2">
            <AlertCircle className="h-4 w-4 mr-2" />
            Tips:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-blue-100">
            {data.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDemo;