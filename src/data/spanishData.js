export const CATEGORIES = [
  {
    id: 'greetings',
    title: 'Greetings & Introductions',
    icon: 'HandWave',
    color: 'from-amber-500 to-orange-500',
    description: 'Master essential Spanish greetings, polite expressions, and self-introductions.',
    lessonsCount: 3,
  },
  {
    id: 'numbers',
    title: 'Numbers: 1 to Trillions',
    icon: 'Clock',
    color: 'from-emerald-500 to-teal-600',
    description: 'Master counting from 1–100, thousands, millions, billions, and trillions!',
    lessonsCount: 4,
  },
  {
    id: 'food',
    title: 'Food & Drinks',
    icon: 'Utensils',
    color: 'from-rose-500 to-red-600',
    description: 'Order food, express preferences, and learn delicious Spanish food vocabulary.',
    lessonsCount: 3,
  },
  {
    id: 'travel',
    title: 'Travel & Directions',
    icon: 'Compass',
    color: 'from-sky-500 to-blue-600',
    description: 'Navigate cities, ask for directions, and book accommodations.',
    lessonsCount: 3,
  },
  {
    id: 'family',
    title: 'Family & Friends',
    icon: 'Users',
    color: 'from-purple-500 to-indigo-600',
    description: 'Talk about family members, relationships, and descriptions of people.',
    lessonsCount: 2,
  },
  {
    id: 'conversations',
    title: 'Daily Conversations',
    icon: 'MessageSquare',
    color: 'from-pink-500 to-rose-600',
    description: 'Engage in natural everyday conversations and practical dialogs.',
    lessonsCount: 3,
  },
  {
    id: 'grammar',
    title: 'Grammar Basics',
    icon: 'BookOpen',
    color: 'from-violet-500 to-purple-600',
    description: 'Understand verbs (Ser vs Estar), gender, plural forms, and sentence structure.',
    lessonsCount: 3,
  },
  {
    id: 'vocabulary',
    title: 'Expanded Spanish Vocabulary',
    icon: 'Sparkles',
    color: 'from-cyan-500 to-blue-600',
    description: 'Expand your core Spanish vocabulary across animals, weather, work, and everyday life.',
    lessonsCount: 5,
  },
];

export const VOCABULARY = [
  // Greetings
  { id: 'v1', categoryId: 'greetings', spanish: '¡Hola!', english: 'Hello!', phonetic: 'OH-lah', example: '¡Hola! ¿Cómo estás?', phoneticExample: 'OH-lah, KOH-moh ehs-TAHS?' },
  { id: 'v2', categoryId: 'greetings', spanish: 'Buenos días', english: 'Good morning', phonetic: 'BWAY-nohs DEE-ahs', example: 'Buenos días, señor López.', phoneticExample: 'BWAY-nohs DEE-ahs, seh-NYOR LOH-pehz.' },
  { id: 'v3', categoryId: 'greetings', spanish: 'Buenas tardes', english: 'Good afternoon', phonetic: 'BWAY-nahs TAHR-dehs', example: 'Buenas tardes a todos.', phoneticExample: 'BWAY-nahs TAHR-dehs ah TOH-dohs.' },
  { id: 'v4', categoryId: 'greetings', spanish: 'Buenas noches', english: 'Good evening / Good night', phonetic: 'BWAY-nahs NOH-chehs', example: 'Buenas noches, hasta mañana.', phoneticExample: 'BWAY-nahs NOH-chehs, AH-stah mah-NYAH-nah.' },
  { id: 'v5', categoryId: 'greetings', spanish: '¿Cómo estás?', english: 'How are you?', phonetic: 'KOH-moh ehs-TAHS', example: 'Hola Maria, ¿cómo estás?', phoneticExample: 'OH-lah mah-REE-ah, KOH-moh ehs-TAHS?' },
  { id: 'v6', categoryId: 'greetings', spanish: 'Me llamo...', english: 'My name is...', phonetic: 'meh YAH-moh', example: 'Me llamo Carlos.', phoneticExample: 'meh YAH-moh KAHR-lohs.' },
  { id: 'v7', categoryId: 'greetings', spanish: 'Mucho gusto', english: 'Nice to meet you', phonetic: 'MOO-choh GOOS-toh', example: 'Mucho gusto en conocerte.', phoneticExample: 'MOO-choh GOOS-toh ehn koh-noh-SEHR-teh.' },
  { id: 'v8', categoryId: 'greetings', spanish: 'Gracias', english: 'Thank you', phonetic: 'GRAH-see-ahs', example: 'Muchas gracias por tu ayuda.', phoneticExample: 'MOO-chahs GRAH-see-ahs pohr too ah-YOO-dah.' },
  { id: 'v9', categoryId: 'greetings', spanish: 'Por favor', english: 'Please', phonetic: 'pohr fah-VOHR', example: 'Un café, por favor.', phoneticExample: 'oon kah-FEH, pohr fah-VOHR.' },
  { id: 'v10', categoryId: 'greetings', spanish: 'Hasta luego', english: 'See you later', phonetic: 'AH-stah LWAY-goh', example: '¡Adiós! Hasta luego.', phoneticExample: 'ah-DYOHS! AH-stah LWAY-goh.' },

  // Numbers & Time (Expanded)
  { id: 'v11', categoryId: 'numbers', spanish: 'Cero, Uno, Dos, Tres', english: '0, 1, 2, 3', phonetic: 'SEH-roh, OO-noh, DOHS, TRES', example: 'Tengo tres libros.', phoneticExample: 'TEHN-goh TRES LEE-brohs.' },
  { id: 'v12', categoryId: 'numbers', spanish: 'Cien (100)', english: 'One hundred (100)', phonetic: 'SYEHN', example: 'Tengo cien euros.', phoneticExample: 'TEHN-goh SYEHN EH-oo-rohs.' },
  { id: 'v13', categoryId: 'numbers', spanish: 'Mil (1,000)', english: 'One thousand (1,000)', phonetic: 'MEEL', example: 'Mil gracias por todo.', phoneticExample: 'MEEL GRAH-see-ahs pohr TOH-doh.' },
  { id: 'v14', categoryId: 'numbers', spanish: 'Un millón (1,000,000)', english: 'One million', phonetic: 'oon mee-YOHN', example: 'Un millón de personas.', phoneticExample: 'oon mee-YOHN deh pehr-SOH-nahs.' },
  { id: 'v15', categoryId: 'numbers', spanish: 'Un billón (1,000,000,000,000)', english: 'One trillion', phonetic: 'oon bee-YOHN', example: 'Un billón es un número gigantesco.', phoneticExample: 'oon bee-YOHN ehs oon NOO-meh-roh.' },

  // Food & Drinks
  { id: 'v16', categoryId: 'food', spanish: 'Agua', english: 'Water', phonetic: 'AH-gwah', example: 'Quiero un vaso de agua, por favor.', phoneticExample: 'KYEH-roh oon VAH-soh deh AH-gwah, pohr fah-VOHR.' },
  { id: 'v17', categoryId: 'food', spanish: 'Café', english: 'Coffee', phonetic: 'kah-FEH', example: 'Me gusta el café solo.', phoneticExample: 'meh GOOS-tah ehl kah-FEH SOH-loh.' },
  { id: 'v18', categoryId: 'food', spanish: 'La cuenta', english: 'The bill / check', phonetic: 'lah KWEHN-tah', example: 'La cuenta, por favor.', phoneticExample: 'lah KWEHN-tah, pohr fah-VOHR.' },
  { id: 'v19', categoryId: 'food', spanish: 'Delicioso', english: 'Delicious', phonetic: 'deh-lee-SYOH-soh', example: 'La comida está deliciosa.', phoneticExample: 'lah koh-MEE-dah ehs-TAH deh-lee-SYOH-sah.' },
  { id: 'v20', categoryId: 'food', spanish: 'Pan', english: 'Bread', phonetic: 'PAHN', example: 'El pan está muy fresco.', phoneticExample: 'ehl PAHN ehs-TAH mwee FREHS-koh.' },

  // Travel
  { id: 'v21', categoryId: 'travel', spanish: '¿Dónde está...?', english: 'Where is...?', phonetic: 'DOHN-deh ehs-TAH', example: '¿Dónde está el baño?', phoneticExample: 'DOHN-deh ehs-TAH ehl BAH-nyoh?' },
  { id: 'v22', categoryId: 'travel', spanish: 'El aeropuerto', english: 'The airport', phonetic: 'ehl ah-eh-roh-PWER-toh', example: 'Necesito ir al aeropuerto.', phoneticExample: 'neh-seh-SEE-toh eer ahl ah-eh-roh-PWER-toh.' },
  { id: 'v23', categoryId: 'travel', spanish: 'El hotel', english: 'The hotel', phonetic: 'ehl oh-TEHL', example: 'El hotel está cerca.', phoneticExample: 'ehl oh-TEHL ehs-TAH SEHR-kah.' },
  { id: 'v24', categoryId: 'travel', spanish: 'Un boleto', english: 'A ticket', phonetic: 'oon boh-LEH-toh', example: 'Un boleto para Madrid, por favor.', phoneticExample: 'oon boh-LEH-toh PAH-rah mah-DREED, pohr fah-VOHR.' },

  // Family & Friends
  { id: 'v25', categoryId: 'family', spanish: 'La familia', english: 'The family', phonetic: 'lah fah-MEE-lyah', example: 'Mi familia es grande.', phoneticExample: 'mee fah-MEE-lyah ehs GRAHN-deh.' },
  { id: 'v26', categoryId: 'family', spanish: 'Amigo / Amiga', english: 'Friend', phonetic: 'ah-MEE-goh / ah-MEE-gah', example: 'Juan es mi amigo.', phoneticExample: 'HWAHN ehs mee ah-MEE-goh.' },
  { id: 'v27', categoryId: 'family', spanish: 'El hermano', english: 'The brother', phonetic: 'ehl ehr-MAH-noh', example: 'Tengo un hermano mayor.', phoneticExample: 'TEHN-goh oon ehr-MAH-noh mah-YOHR.' },

  // Grammar & Extras
  { id: 'v28', categoryId: 'grammar', spanish: 'Yo soy', english: 'I am (permanent state)', phonetic: 'YOH SOY', example: 'Yo soy estudiante.', phoneticExample: 'YOH SOY ehs-too-DYAHN-teh.' },
  { id: 'v29', categoryId: 'grammar', spanish: 'Yo estoy', english: 'I am (temporary state / location)', phonetic: 'YOH ehs-TOY', example: 'Yo estoy feliz hoy.', phoneticExample: 'YOH ehs-TOY feh-LEEZ OY.' },
  { id: 'v30', categoryId: 'vocabulary', spanish: 'Tengo hambre', english: 'I am hungry', phonetic: 'TEHN-goh AHM-breh', example: 'Tengo hambre, vamos a comer.', phoneticExample: 'TEHN-goh AHM-breh, VAH-mohs ah koh-MEHR.' },
  { id: 'v31', categoryId: 'vocabulary', spanish: 'Lo siento', english: 'I am sorry', phonetic: 'loh SYEHN-toh', example: 'Lo siento, no entiendo.', phoneticExample: 'loh SYEHN-toh, noh ehn-TYEHN-doh.' },
  { id: 'v32', categoryId: 'vocabulary', spanish: 'De nada', english: "You're welcome", phonetic: 'deh NAH-dah', example: '¡De nada! Fue un placer.', phoneticExample: 'deh NAH-dah! FWAY oon plah-SEHR.' },

  // NEW Vocabulary items (Animals, Work, Weather)
  { id: 'v33', categoryId: 'vocabulary', spanish: 'El gato', english: 'The cat', phonetic: 'ehl GAH-toh', example: 'El gato duerme mucho.', phoneticExample: 'ehl GAH-toh DWER-meh MOO-choh.' },
  { id: 'v34', categoryId: 'vocabulary', spanish: 'El perro', english: 'The dog', phonetic: 'ehl PEH-rroh', example: 'El perro es muy fiel.', phoneticExample: 'ehl PEH-rroh ehs mwee FYEHL.' },
  { id: 'v35', categoryId: 'vocabulary', spanish: 'Hace buen tiempo', english: 'The weather is good', phonetic: 'AH-seh bwehn TYEHM-poh', example: 'Hoy hace buen tiempo.', phoneticExample: 'OY AH-seh bwehn TYEHM-poh.' },
  { id: 'v36', categoryId: 'vocabulary', spanish: 'El trabajo', english: 'The job / work', phonetic: 'ehl trah-BAH-hoh', example: 'Me gusta mi trabajo.', phoneticExample: 'meh GOOS-tah mee trah-BAH-hoh.' },
  { id: 'v37', categoryId: 'vocabulary', spanish: 'La computadora', english: 'The computer', phonetic: 'lah kohm-poo-tah-DOH-rah', example: 'Uso la computadora para estudiar.', phoneticExample: 'OO-soh lah kohm-poo-tah-DOH-rah.' },
];

export const LESSONS = [
  {
    id: 'greetings-1',
    categoryId: 'greetings',
    title: 'Essential Greetings',
    subtitle: 'Learn basic ways to say hello, goodbye, and introduce yourself',
    xpReward: 50,
    vocabIds: ['v1', 'v2', 'v3', 'v4', 'v10'],
    quizQuestions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'How do you say "Hello" in Spanish?',
        options: ['Hola', 'Gracias', 'Adiós', 'Por favor'],
        answer: 'Hola',
        explanation: '"¡Hola!" is the standard informal and formal greeting in Spanish.'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'What does "Buenos días" mean?',
        options: ['Good evening', 'Good morning', 'Good night', 'Goodbye'],
        answer: 'Good morning',
        explanation: '"Buenos días" is used to greet people in the morning.'
      },
      {
        id: 'q3',
        type: 'fill-in-blank',
        question: 'Complete the phrase: "Hasta _____"' ,
        sentence: 'Hasta _____',
        blankAnswer: 'luego',
        options: ['luego', 'hola', 'gracias', 'días'],
        answer: 'luego',
        explanation: '"Hasta luego" translates to "See you later".'
      }
    ]
  },
  {
    id: 'greetings-2',
    categoryId: 'greetings',
    title: 'Polite Expressions & Names',
    subtitle: 'Saying thank you, asking names, and showing politeness',
    xpReward: 50,
    vocabIds: ['v5', 'v6', 'v7', 'v8', 'v9'],
    quizQuestions: [
      {
        id: 'q4',
        type: 'multiple-choice',
        question: 'How do you say "Thank you" in Spanish?',
        options: ['Por favor', 'Gracias', 'Mucho gusto', 'Hola'],
        answer: 'Gracias',
        explanation: '"Gracias" means thank you. You can say "Muchas gracias" for thank you very much.'
      },
      {
        id: 'q5',
        type: 'fill-in-blank',
        question: 'Complete the introduction: "Me _____ Carlos."',
        sentence: 'Me _____ Carlos.',
        blankAnswer: 'llamo',
        options: ['llamo', 'soy', 'gusto', 'estoy'],
        answer: 'llamo',
        explanation: '"Me llamo..." literally means "I call myself..." and is used for stating your name.'
      },
      {
        id: 'q6',
        type: 'multiple-choice',
        question: 'What is the correct response when meeting someone for the first time?',
        options: ['Mucho gusto', 'Hasta luego', 'De nada', 'Por favor'],
        answer: 'Mucho gusto',
        explanation: '"Mucho gusto" means "Nice to meet you".'
      }
    ]
  },
  {
    id: 'numbers-1',
    categoryId: 'numbers',
    title: 'Numbers: 1 to 100 & Big Numbers',
    subtitle: 'Learn numbers 1 to 100, thousands, millions, and trillions!',
    xpReward: 50,
    vocabIds: ['v11', 'v12', 'v13', 'v14', 'v15'],
    quizQuestions: [
      {
        id: 'q7',
        type: 'multiple-choice',
        question: 'How do you say "One hundred (100)" in Spanish?',
        options: ['Cien', 'Mil', 'Diez', 'Un millón'],
        answer: 'Cien',
        explanation: '"Cien" is 100 in Spanish.'
      },
      {
        id: 'q8',
        type: 'fill-in-blank',
        question: 'Complete: "One thousand is _____ en español."',
        sentence: 'One thousand is _____ en español.',
        blankAnswer: 'mil',
        options: ['mil', 'cien', 'billón', 'diez'],
        answer: 'mil',
        explanation: '"Mil" means 1,000 in Spanish.'
      },
      {
        id: 'q9_num',
        type: 'multiple-choice',
        question: 'What is "Un billón" in Spanish counting?',
        options: ['1,000,000,000,000 (Trillion in EN)', '1,000 (Thousand)', '1,000,000 (Million)', '100 (Hundred)'],
        answer: '1,000,000,000,000 (Trillion in EN)',
        explanation: 'In standard Spanish, "un billón" equals a million millions (1,000,000,000,000 or 10^12).'
      }
    ]
  },
  {
    id: 'food-1',
    categoryId: 'food',
    title: 'At the Restaurant',
    subtitle: 'Ordering food, drinks, and asking for the bill',
    xpReward: 50,
    vocabIds: ['v16', 'v17', 'v18', 'v19', 'v20'],
    quizQuestions: [
      {
        id: 'q9',
        type: 'multiple-choice',
        question: 'How do you ask for the check/bill at a restaurant?',
        options: ['La cuenta, por favor', 'Un café, por favor', '¿Dónde está el baño?', 'Muchas gracias'],
        answer: 'La cuenta, por favor',
        explanation: '"La cuenta, por favor" is the standard polite request for the bill.'
      },
      {
        id: 'q10',
        type: 'fill-in-blank',
        question: 'Complete the request: "Un vaso de _____, por favor."',
        sentence: 'Un vaso de _____, por favor.',
        blankAnswer: 'agua',
        options: ['agua', 'pan', 'cuenta', 'día'],
        answer: 'agua',
        explanation: '"Vaso de agua" means glass of water.'
      }
    ]
  },
  {
    id: 'grammar-1',
    categoryId: 'grammar',
    title: 'Ser vs. Estar Basics',
    subtitle: 'Learn when to use "soy" vs "estoy" in basic sentences',
    xpReward: 50,
    vocabIds: ['v28', 'v29'],
    quizQuestions: [
      {
        id: 'q11',
        type: 'fill-in-blank',
        question: 'Choose the correct verb: "Yo ___ estudiante."',
        sentence: 'Yo ___ estudiante.',
        blankAnswer: 'soy',
        options: ['soy', 'estoy', 'llamo', 'tengo'],
        answer: 'soy',
        explanation: 'Use "soy" (from verb Ser) for permanent characteristics or identity like being a student.'
      },
      {
        id: 'q12',
        type: 'fill-in-blank',
        question: 'Choose the correct verb: "Yo ___ feliz hoy."',
        sentence: 'Yo ___ feliz hoy.',
        blankAnswer: 'estoy',
        options: ['estoy', 'soy', 'llamo', 'tengo'],
        answer: 'estoy',
        explanation: 'Use "estoy" (from verb Estar) for current feelings, emotions, or locations.'
      }
    ]
  }
];

export const CONVERSATION_SCENARIOS = [
  {
    id: 'intro-convo',
    title: 'Meeting a New Friend',
    description: 'Practice basic greetings and introducing yourself in Spanish.',
    icon: 'UserPlus',
    level: 'Beginner',
    initialStepId: 'step1',
    steps: {
      step1: {
        speaker: 'AI Tutor',
        spanish: '¡Hola! ¡Buenas tardes! ¿Cómo te llamas?',
        english: 'Hello! Good afternoon! What is your name?',
        options: [
          { text: '¡Hola! Me llamo Alex. ¿Y tú?', nextStepId: 'step2_alex' },
          { text: 'Buenas tardes. Me llamo Maria, mucho gusto.', nextStepId: 'step2_maria' },
          { text: 'Hola, no hablo mucho español.', nextStepId: 'step2_beginner' }
        ]
      },
      step2_alex: {
        speaker: 'AI Tutor',
        spanish: '¡Mucho gusto, Alex! Yo soy Sofia. ¿De dónde eres?',
        english: 'Nice to meet you, Alex! I am Sofia. Where are you from?',
        options: [
          { text: 'Soy de Estados Unidos. ¿Y tú?', nextStepId: 'step3_end' },
          { text: 'Soy de Canadá. Me gusta mucho España.', nextStepId: 'step3_end' }
        ]
      },
      step2_maria: {
        speaker: 'AI Tutor',
        spanish: 'El gusto es mío, Maria. ¿Cómo estás hoy?',
        english: 'The pleasure is mine, Maria. How are you today?',
        options: [
          { text: '¡Estoy muy bien, gracias! ¿Y tú?', nextStepId: 'step3_end' },
          { text: 'Un poco cansada, pero feliz de aprender español.', nextStepId: 'step3_end' }
        ]
      },
      step2_beginner: {
        speaker: 'AI Tutor',
        spanish: '¡No te preocupes! Vamos a practicar juntos poco a poco. ¿De dónde eres?',
        english: "Don't worry! We will practice together step by step. Where are you from?",
        options: [
          { text: 'Soy de Nueva York. Gracias por la ayuda.', nextStepId: 'step3_end' },
          { text: 'Soy estudiante. Mucho gusto.', nextStepId: 'step3_end' }
        ]
      },
      step3_end: {
        speaker: 'AI Tutor',
        spanish: '¡Qué bien! Es un placer conversar contigo. ¡Nos vemos pronto!',
        english: "How nice! It's a pleasure talking to you. See you soon!",
        isEnd: true
      }
    }
  },
  {
    id: 'restaurant-convo',
    title: 'Ordering Coffee & Food',
    description: 'Practice ordering drinks and snacks at a Spanish café.',
    icon: 'Coffee',
    level: 'Beginner',
    initialStepId: 'step1',
    steps: {
      step1: {
        speaker: 'Camarero (Waiter)',
        spanish: '¡Hola, buenas tardes! Bienvenido al café. ¿Qué desea tomar?',
        english: 'Hello, good afternoon! Welcome to the café. What would you like to have?',
        options: [
          { text: 'Hola, un café con leche, por favor.', nextStepId: 'step2_coffee' },
          { text: 'Buenas tardes, ¿tiene agua fría y un sándwich?', nextStepId: 'step2_food' }
        ]
      },
      step2_coffee: {
        speaker: 'Camarero (Waiter)',
        spanish: '¡Excelente elección! ¿Desea algo de comer también?',
        english: 'Excellent choice! Would you like something to eat too?',
        options: [
          { text: 'Sí, un croasán, por favor. ¿Cuánto cuesta?', nextStepId: 'step3_bill' },
          { text: 'No, gracias. Solo el café.', nextStepId: 'step3_bill' }
        ]
      },
      step2_food: {
        speaker: 'Camarero (Waiter)',
        spanish: 'Sí, claro. Tenemos sándwiches muy deliciosos.',
        english: 'Yes, of course. We have very delicious sandwiches.',
        options: [
          { text: 'Perfecto, un sándwich de queso y agua, por favor.', nextStepId: 'step3_bill' }
        ]
      },
      step3_bill: {
        speaker: 'Camarero (Waiter)',
        spanish: '¡En seguida se lo traigo! Serán 5 euros. ¡Gracias!',
        english: "I'll bring it right away! That will be 5 euros. Thank you!",
        isEnd: true
      }
    }
  },
  {
    id: 'directions-convo',
    title: 'Asking for Directions',
    description: 'Practice asking someone where places like museums or hotels are located.',
    icon: 'MapPin',
    level: 'Intermediate',
    initialStepId: 'step1',
    steps: {
      step1: {
        speaker: 'Transeúnte (Passerby)',
        spanish: '¡Hola! ¿Te puedo ayudar en algo?',
        english: 'Hello! Can I help you with something?',
        options: [
          { text: 'Disculpe, ¿dónde está el museo principal?', nextStepId: 'step2_museum' },
          { text: 'Hola, ¿dónde queda el hotel más cercano?', nextStepId: 'step2_hotel' }
        ]
      },
      step2_museum: {
        speaker: 'Transeúnte (Passerby)',
        spanish: 'El museo está muy cerca. Sigue recto dos calles y gira a la derecha.',
        english: 'The museum is very close. Go straight two blocks and turn right.',
        options: [
          { text: '¡Muchas gracias por tu ayuda!', nextStepId: 'step3_end' }
        ]
      },
      step2_hotel: {
        speaker: 'Transeúnte (Passerby)',
        spanish: 'Hay un hotel a tres manzanas de aquí, al lado de la plaza.',
        english: 'There is a hotel three blocks from here, next to the square.',
        options: [
          { text: 'Entendido, ¡muchas gracias!', nextStepId: 'step3_end' }
        ]
      },
      step3_end: {
        speaker: 'Transeúnte (Passerby)',
        spanish: '¡De nada! ¡Que tengas un buen día en la ciudad!',
        english: "You're welcome! Have a great day in the city!",
        isEnd: true
      }
    }
  }
];

export const BADGES = [
  {
    id: 'badge-streak-3',
    title: '3-Day Streak',
    description: 'Maintain a learning streak for 3 consecutive days.',
    icon: 'Flame',
    color: 'bg-amber-500',
    condition: (user) => user.streak >= 3,
  },
  {
    id: 'badge-first-word',
    title: 'First 5 Words',
    description: 'Learn your first 5 Spanish vocabulary words.',
    icon: 'Book',
    color: 'bg-emerald-500',
    condition: (user) => (user.learnedVocabIds?.length || 0) >= 5,
  },
  {
    id: 'badge-convo-starter',
    title: 'Conversation Starter',
    description: 'Complete your first practice conversation scenario.',
    icon: 'MessageCircle',
    color: 'bg-sky-500',
    condition: (user) => user.completedLessons.some((id) => id.includes('greetings') || id.includes('convo')),
  },
  {
    id: 'badge-quiz-master',
    title: 'Quiz Master',
    description: 'Score 100% on any lesson quiz.',
    icon: 'Trophy',
    color: 'bg-purple-500',
    condition: (user) => Object.values(user.quizScores || {}).some((score) => score === 100),
  },
  {
    id: 'badge-level-2',
    title: 'Rising Star',
    description: 'Reach Level 2 by earning 100 XP.',
    icon: 'Zap',
    color: 'bg-pink-500',
    condition: (user) => user.xp >= 100,
  },
];
