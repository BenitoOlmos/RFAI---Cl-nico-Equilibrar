import { ClientProfile, GuideStep, User } from './types';

// --- MOCK USERS ---

export const MOCK_ADMIN: User = {
  id: 'u-admin', name: 'Claudio Reyes', email: 'admin@equilibrar.cl', role: 'ADMIN', avatar: 'https://picsum.photos/200/200?random=1', status: 'ACTIVE'
};

export const MOCK_COORD: User = {
  id: 'u-coord', name: 'María Coordinadora', email: 'coord@equilibrar.cl', role: 'COORDINATOR', avatar: 'https://picsum.photos/200/200?random=2', status: 'ACTIVE'
};

export const MOCK_PROF: User = {
  id: 'u-prof', name: 'Dr. Especialista', email: 'prof@equilibrar.cl', role: 'PROFESSIONAL', avatar: 'https://picsum.photos/200/200?random=3', status: 'ACTIVE'
};

// Client in Week 1
export const MOCK_CLIENT_W1: ClientProfile = {
  id: 'c-w1', name: 'Lucía Fernández (Sem 1)', email: 'lucia@client.com', role: 'CLIENT', avatar: 'https://picsum.photos/200/200?random=4', status: 'ACTIVE',
  currentWeek: 1, startDate: '2023-10-25', nextSession: '2023-10-28T10:00:00',
  progress: {
    week1: { isLocked: false, isCompleted: false, initialTestDone: false, guideCompleted: false, audioListened: 0, meetingAttended: false },
    week2: { isLocked: true, isCompleted: false, guideCompleted: false, audioListened: 0 },
    week3: { isLocked: true, isCompleted: false, guideCompleted: false, audioListened: 0 },
    week4: { isLocked: true, isCompleted: false, guideCompleted: false, audioListened: 0 },
  },
  clinicalData: { testScores: [], audioUsage: [] }
};

// Client in Week 2
export const MOCK_CLIENT_W2: ClientProfile = {
  id: 'c-w2', name: 'Carlos Díaz (Sem 2)', email: 'carlos@client.com', role: 'CLIENT', avatar: 'https://picsum.photos/200/200?random=6', status: 'ACTIVE',
  currentWeek: 2, startDate: '2023-10-18',
  progress: {
    week1: { isLocked: false, isCompleted: true, initialTestDone: true, guideCompleted: true, audioListened: 6, meetingAttended: true },
    week2: { isLocked: false, isCompleted: false, guideCompleted: false, audioListened: 0 },
    week3: { isLocked: true, isCompleted: false, guideCompleted: false, audioListened: 0 },
    week4: { isLocked: true, isCompleted: false, guideCompleted: false, audioListened: 0 },
  },
  clinicalData: {
      testScores: [{ date: '2023-10-18', week: 1, scores: { autojuicio: 24, culpaNoAdaptativa: 20, responsabilidadConsciente: 12, humanizacionError: 5 } }],
      audioUsage: [{ date: '2023-10-19', minutesListened: 15, audioId: 'audio1' }]
  }
};

// Client in Week 3
export const MOCK_CLIENT_W3: ClientProfile = {
  id: 'c-w3', name: 'Pedro Pascal (Sem 3)', email: 'pedro@client.com', role: 'CLIENT', avatar: 'https://picsum.photos/200/200?random=5', status: 'ACTIVE',
  currentWeek: 3, startDate: '2023-10-01',
  progress: {
    week1: { isLocked: false, isCompleted: true, initialTestDone: true, guideCompleted: true, audioListened: 5, meetingAttended: true },
    week2: { isLocked: false, isCompleted: true, initialTestDone: true, guideCompleted: true, audioListened: 4 },
    week3: { isLocked: false, isCompleted: false, initialTestDone: false, guideCompleted: false, audioListened: 1 },
    week4: { isLocked: true, isCompleted: false, guideCompleted: false, audioListened: 0 },
  },
  clinicalData: {
    testScores: [
      { date: '2023-10-01', week: 1, scores: { autojuicio: 25, culpaNoAdaptativa: 22, responsabilidadConsciente: 10, humanizacionError: 3 } },
      { date: '2023-10-15', week: 2, scores: { autojuicio: 18, culpaNoAdaptativa: 15, responsabilidadConsciente: 18, humanizacionError: 6 } },
    ],
    audioUsage: [
      { date: '2023-10-02', minutesListened: 15, audioId: 'audio1' },
      { date: '2023-10-03', minutesListened: 15, audioId: 'audio1' },
      { date: '2023-10-16', minutesListened: 20, audioId: 'audio2' },
    ]
  }
};

// Client in Week 4
export const MOCK_CLIENT_W4: ClientProfile = {
  id: 'c-w4', name: 'Ana Ruiz (Sem 4)', email: 'ana@client.com', role: 'CLIENT', avatar: 'https://picsum.photos/200/200?random=7', status: 'ACTIVE',
  currentWeek: 4, startDate: '2023-09-20', nextSession: '2023-10-30T16:00:00',
  progress: {
    week1: { isLocked: false, isCompleted: true, initialTestDone: true, guideCompleted: true, audioListened: 7, meetingAttended: true },
    week2: { isLocked: false, isCompleted: true, initialTestDone: true, guideCompleted: true, audioListened: 5 },
    week3: { isLocked: false, isCompleted: true, initialTestDone: true, guideCompleted: true, audioListened: 6 },
    week4: { isLocked: false, isCompleted: false, guideCompleted: false, audioListened: 0, meetingAttended: false },
  },
  clinicalData: {
    testScores: [
      { date: '2023-09-20', week: 1, scores: { autojuicio: 28, culpaNoAdaptativa: 24, responsabilidadConsciente: 8, humanizacionError: 2 } },
      { date: '2023-10-04', week: 2, scores: { autojuicio: 20, culpaNoAdaptativa: 18, responsabilidadConsciente: 15, humanizacionError: 5 } },
      { date: '2023-10-18', week: 3, scores: { autojuicio: 14, culpaNoAdaptativa: 10, responsabilidadConsciente: 22, humanizacionError: 8 } },
    ],
    audioUsage: []
  }
};

export const ALL_USERS = [MOCK_ADMIN, MOCK_COORD, MOCK_PROF, MOCK_CLIENT_W1, MOCK_CLIENT_W2, MOCK_CLIENT_W3, MOCK_CLIENT_W4];

// --- CONTENT DATA ---

export const WEEKLY_CONTENT = {
  1: {
    title: "Comprender la culpa",
    subtitle: "Sin juzgarla",
    description: "Diferenciar la culpa como señal de la culpa como castigo interno.",
    audioTitle: "Audio 1: Desactivar la Alerta",
    hasMeet: true,
  },
  2: {
    title: "Regular la culpa no adaptativa",
    subtitle: "Reducir el autoataque",
    description: "Reducir el autoataque y permitir la regulación del sistema nervioso.",
    audioTitle: "Audio 1: Desactivar la Alerta (Refuerzo)",
    hasMeet: false,
  },
  3: {
    title: "Separar identidad de experiencia",
    subtitle: "Diferenciación",
    description: "Diferenciar lo que ocurrió de quién soy. Reorganizar la respuesta.",
    audioTitle: "Audio 2: Reorganizar la Respuesta",
    hasMeet: false,
  },
  4: {
    title: "Diálogo interno saludable",
    subtitle: "Consolidación",
    description: "Consolidar una relación interna basada en responsabilidad consciente.",
    audioTitle: "Audio 2: Reorganizar la Respuesta (Consolidación)",
    hasMeet: true,
  }
};

export const GUIDES: Record<number, GuideStep[]> = {
  1: [
    {
      title: "Exploración Inicial",
      description: "Observa tu experiencia sin intentar cambiarla todavía.",
      questions: [
        { id: 'w1-q1', text: "¿En qué situaciones aparece con más fuerza la culpa?", type: 'text' },
        { id: 'w1-q2', text: "¿Qué frases internas la acompañan?", type: 'text' },
      ]
    },
    {
      title: "Observación Corporal",
      description: "Conecta con la sensación física.",
      questions: [
        { id: 'w1-q3', text: "¿Dónde la siento en el cuerpo?", type: 'text' },
        { id: 'w1-q4', text: "¿Qué cambia en mi respiración o tensión corporal?", type: 'text' },
      ]
    }
  ],
  2: [
    {
      title: "Exploración de Miedos",
      description: "Entendiendo la función protectora del castigo.",
      questions: [
        { id: 'w2-q1', text: "¿Qué temo que ocurra si no me castigo?", type: 'text' },
        { id: 'w2-q2', text: "¿Qué pasaría si fuera más amable conmigo?", type: 'text' },
      ]
    },
    {
      title: "Post-Audio",
      description: "Reflexión después de la práctica auditiva.",
      questions: [
        { id: 'w2-q3', text: "¿Baja la intensidad de la culpa después de escuchar?", type: 'scale' },
      ]
    }
  ],
  3: [
    {
      title: "Identidad vs Experiencia",
      description: "Separando el ser del hacer.",
      questions: [
        { id: 'w3-q1', text: "¿Qué me digo cuando me equivoco?", type: 'text' },
        { id: 'w3-q2', text: "¿Le diría esto a alguien que quiero?", type: 'choice' },
      ]
    }
  ],
  4: [
    {
      title: "Integración Final",
      description: "Hacia una responsabilidad consciente.",
      questions: [
        { id: 'w4-q1', text: "¿Qué entiendo hoy por culpa que antes no veía?", type: 'text' },
        { id: 'w4-q2', text: "Puedo hacerme responsable de ______ sin dañarme.", type: 'text' },
      ]
    }
  ]
};