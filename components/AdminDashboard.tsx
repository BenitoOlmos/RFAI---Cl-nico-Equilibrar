import React, { useState, useEffect } from 'react';
import { User, ClientProfile, Role } from '../types';
import { ALL_USERS, MOCK_CLIENT_W1 } from '../constants';
import { Users, Activity, Calendar as CalendarIcon, Settings, ChevronRight, LogOut, Search, UserPlus, Video, Clock, FileText, Headphones, TrendingUp, AlertCircle, CheckCircle2, ChevronDown, MapPin, MoreVertical, Phone, ArrowLeft, ArrowRight, Sun, Moon, ToggleLeft, ToggleRight, Plus, X, Mail, Briefcase, Lock } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';

interface Props {
  currentUser: User;
  onLogout: () => void;
}

// ==========================================
// SHARED HELPERS
// ==========================================

const getMeetingDate = (startDateStr: string, weekNum: number) => {
    const date = new Date(startDateStr);
    date.setDate(date.getDate() + (weekNum - 1) * 7); // Add weeks
    date.setDate(date.getDate() + 2); // Wed
    date.setHours(10, 0, 0, 0); // 10 AM
    
    const now = new Date();
    const isPast = date < now;
    const dateStr = date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    const formatted = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    
    return { formatted, isPast, fullDate: date };
};

const getDailyAudioData = () => [
    { day: 'Lun', mins: 45 },
    { day: 'Mar', mins: 30 },
    { day: 'Mié', mins: 0 },
    { day: 'Jue', mins: 60 },
    { day: 'Vie', mins: 25 },
    { day: 'Sáb', mins: 15 },
    { day: 'Dom', mins: 45 },
];

// ==========================================
// PROFESSIONAL VIEW COMPONENTS (RESTORED)
// ==========================================

const ProCalendarModule: React.FC<{ onSelectClient: (c: ClientProfile) => void }> = ({ onSelectClient }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        const day = selectedDate.getDay();
        const apps = (day === 0 || day === 6) ? [] : [
            { id: 'apt-1', time: '09:00', duration: 60, type: 'Evaluación Inicial', client: ALL_USERS[3] as ClientProfile, status: 'completed' },
            { id: 'apt-2', time: '11:30', duration: 45, type: 'Sesión de Seguimiento', client: ALL_USERS[4] as ClientProfile, status: 'pending' },
            { id: 'apt-3', time: '15:00', duration: 60, type: 'Revisión de Guía', client: ALL_USERS[5] as ClientProfile, status: 'pending' },
        ];
        setAppointments(day % 2 === 0 ? apps : [apps[1], apps[0]]);
    }, [selectedDate]);

    const weekDays = Array.from({length: 14}, (_, i) => {
        const d = new Date(); d.setDate(new Date().getDate() + i); return d;
    });

    return (
        <div className="h-full flex flex-col bg-slate-50">
            <div className="bg-white px-6 py-6 border-b border-slate-100 shadow-sm z-10 sticky top-0">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 capitalize">
                            {selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                        </h2>
                        <p className="text-slate-500 text-sm">Agenda Profesional</p>
                    </div>
                    <button className="bg-brand-50 text-brand-700 p-3 rounded-xl hover:bg-brand-100 transition-colors">
                        <CalendarIcon size={20} />
                    </button>
                </div>
                <div className="flex overflow-x-auto gap-3 pb-2 -mx-2 px-2 no-scrollbar">
                    {weekDays.map((date, idx) => {
                        const isSelected = date.toDateString() === selectedDate.toDateString();
                        const isToday = date.toDateString() === new Date().toDateString();
                        return (
                            <button key={idx} onClick={() => setSelectedDate(date)} className={`flex flex-col items-center justify-center min-w-[4.5rem] h-20 rounded-2xl border transition-all duration-300 ${isSelected ? 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-200 scale-105' : 'bg-white border-slate-100 text-slate-400 hover:border-brand-200'}`}>
                                <span className="text-xs font-medium uppercase tracking-wider mb-1">{date.toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                                <span className={`text-xl font-bold ${isSelected ? 'text-white' : isToday ? 'text-brand-600' : 'text-slate-700'}`}>{date.getDate()}</span>
                                {isToday && !isSelected && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1"></span>}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {appointments.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                        <CalendarIcon size={48} className="mb-4 text-slate-300" />
                        <p>No hay citas programadas para este día.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {appointments.map((apt) => (
                            <div key={apt.id} className="flex gap-4 group">
                                <div className="flex flex-col items-center min-w-[3.5rem] pt-2">
                                    <span className="font-bold text-slate-800">{apt.time}</span>
                                    <div className="h-full w-0.5 bg-slate-200 mt-2 group-last:bg-transparent relative">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-300"></div>
                                    </div>
                                </div>
                                <div className="flex-1 bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${apt.status === 'completed' ? 'bg-slate-300' : 'bg-brand-500'}`}></div>
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${apt.status === 'completed' ? 'bg-slate-100 text-slate-500' : 'bg-brand-50 text-brand-700'}`}>{apt.type}</span>
                                        <MoreVertical size={16} className="text-slate-300"/>
                                    </div>
                                    <div className="flex items-center gap-4 mb-4 cursor-pointer" onClick={() => onSelectClient(apt.client)}>
                                        <img src={apt.client.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt="" />
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-lg leading-tight">{apt.client.name}</h3>
                                            <p className="text-slate-500 text-xs">Semana {apt.client.currentWeek} • RFAI</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <a href="#" className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors ${apt.status === 'completed' ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                                            <Video size={16} /> {apt.status === 'completed' ? 'Finalizada' : 'Unirse'}
                                        </a>
                                        <button onClick={() => onSelectClient(apt.client)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors">
                                            <FileText size={16} /> Ficha
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProClientsList: React.FC<{ onSelect: (c: ClientProfile) => void, selectedId?: string, className?: string }> = ({ onSelect, selectedId, className }) => {
    const clients = ALL_USERS.filter(u => u.role === 'CLIENT') as ClientProfile[];
  
    return (
        <div className={`bg-white h-full flex flex-col ${className}`}>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 sticky top-0 z-10 backdrop-blur-md">
                <h3 className="font-bold text-lg text-slate-800 tracking-tight">Mis Pacientes</h3>
                <button className="text-brand-600 bg-brand-50 hover:bg-brand-100 p-2 rounded-full transition-colors"><UserPlus size={18} /></button>
            </div>
            
            <div className="p-4 border-b border-slate-100 bg-white sticky top-[80px] z-10">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-all" />
                </div>
            </div>
      
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {clients.map(client => {
                     const progressPercent = (client.currentWeek / 4) * 100;
                     const tags = client.id === 'c-w1' ? 'RFAI - Culpa' : client.id === 'c-w2' ? 'RFAI - Ansiedad' : 'RFAI - Trauma';
                     return (
                      <div key={client.id} onClick={() => onSelect(client)} className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative overflow-hidden group hover:shadow-md ${selectedId === client.id ? 'bg-brand-50/50 border-brand-500 shadow-sm' : 'bg-white border-slate-100 hover:border-brand-200'}`}>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="relative">
                                <img src={client.avatar} alt={client.name} className="w-12 h-12 rounded-full bg-slate-200 object-cover border-2 border-white shadow-sm" />
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${client.status === 'ACTIVE' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className={`font-bold text-sm truncate ${selectedId === client.id ? 'text-brand-900' : 'text-slate-800'}`}>{client.name}</h4>
                                <p className="text-xs text-slate-500 font-medium">{tags}</p>
                            </div>
                            <div className="text-right">
                                 <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-lg">Sem {client.currentWeek}</span>
                            </div>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                            <div className="bg-brand-500 h-full rounded-full" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                      </div>
                    );
                })}
            </div>
        </div>
    );
};

const TabOverview: React.FC<{ client: ClientProfile }> = ({ client }) => {
    const meetingInfo = getMeetingDate(client.startDate, client.currentWeek);
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-indigo-500/50 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">Próxima Reunión</span>
                                {!meetingInfo.isPast && <span className="bg-green-500 text-white px-2 py-1 rounded text-[10px] font-bold animate-pulse">Confirmada</span>}
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{meetingInfo.formatted}</h3>
                            <p className="text-indigo-200 text-sm mb-6">10:00 AM - 11:00 AM • Videollamada</p>
                            <button className="inline-flex items-center gap-2 bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-sm">
                                <Video size={18} /> Iniciar Videollamada
                            </button>
                        </div>
                        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md"><CalendarIcon size={32} className="text-white" /></div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                </div>
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Estado del Programa</h4>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-3xl font-bold text-brand-600">Semana {client.currentWeek}</span>
                            <span className="text-slate-400 text-xl font-light">/ 4</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">Fase: <strong className="text-brand-600">"{client.currentWeek === 1 ? 'Comprender' : client.currentWeek === 2 ? 'Regular' : client.currentWeek === 3 ? 'Diferenciar' : 'Consolidar'}"</strong>.</p>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                        <div className="bg-brand-500 h-full rounded-full" style={{ width: `${(client.currentWeek / 4) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-slate-400"><Activity size={16} /> <span className="text-xs font-bold uppercase">Tests</span></div>
                    <p className="text-xl font-bold text-slate-800">{client.clinicalData.testScores.length} <span className="text-xs font-normal text-slate-400">realizados</span></p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-slate-400"><Headphones size={16} /> <span className="text-xs font-bold uppercase">Audios</span></div>
                    <p className="text-xl font-bold text-slate-800">{client.clinicalData.audioUsage.length} <span className="text-xs font-normal text-slate-400">sesiones</span></p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-slate-400"><FileText size={16} /> <span className="text-xs font-bold uppercase">Guías</span></div>
                    <p className="text-xl font-bold text-slate-800">{client.currentWeek - 1} <span className="text-xs font-normal text-slate-400">completadas</span></p>
                </div>
                 <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-slate-400"><AlertCircle size={16} /> <span className="text-xs font-bold uppercase">Alertas</span></div>
                    <p className="text-xl font-bold text-green-600">0 <span className="text-xs font-normal text-slate-400">pendientes</span></p>
                </div>
            </div>
        </div>
    );
};

const TabClinical: React.FC<{ client: ClientProfile }> = ({ client }) => {
    const latestTest = client.clinicalData.testScores.length > 0 ? client.clinicalData.testScores[client.clinicalData.testScores.length - 1] : null;
    const historyData = client.clinicalData.testScores.length > 1 ? client.clinicalData.testScores.map(t => ({ week: `Sem ${t.week}`, autojuicio: t.scores.autojuicio, promedio: 20 })) : [{ week: 'Sem 1', autojuicio: 28, promedio: 25 }, { week: 'Sem 2', autojuicio: 24, promedio: 22 }, { week: 'Sem 3', autojuicio: 18, promedio: 19 }, { week: 'Sem 4', autojuicio: 12, promedio: 15 }];
    const radarData = latestTest ? Object.entries(latestTest.scores).map(([k, v]) => ({ subject: k === 'culpaNoAdaptativa' ? 'Culpa N.A.' : k.charAt(0).toUpperCase() + k.slice(1), A: v, fullMark: 30 })) : [{ subject: 'Autojuicio', A: 0, fullMark: 30 }, { subject: 'Culpa N.A.', A: 0, fullMark: 25 }, { subject: 'Responsabilidad', A: 0, fullMark: 35 }, { subject: 'Humanización', A: 0, fullMark: 10 }];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
                <div className="mb-6">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><Activity className="text-brand-500" size={20} /> Perfil de Culpa Actual</h3>
                    <p className="text-xs text-slate-500 mt-1">Basado en el test de la Semana {latestTest?.week || client.currentWeek}</p>
                </div>
                <div className="flex-1 min-h-[300px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 30]} tick={false} axisLine={false} />
                            <Radar name="Paciente" dataKey="A" stroke="#0097b2" fill="#0097b2" fillOpacity={0.3} />
                            <Tooltip contentStyle={{borderRadius: '8px', border:'none', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
                 <div className="mb-6 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><TrendingUp className="text-indigo-500" size={20} /> Progreso Emocional</h3>
                    <div className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">Último mes</div>
                </div>
                
                <div className="block md:hidden h-[250px] w-full mb-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={historyData}>
                            <defs>
                                <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0097b2" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#0097b2" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                            <YAxis hide domain={[0, 40]} />
                            <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                            <Area type="monotone" dataKey="autojuicio" stroke="#0097b2" strokeWidth={3} fillOpacity={1} fill="url(#colorAuto)" />
                        </AreaChart>
                     </ResponsiveContainer>
                     <div className="flex justify-center gap-4 mt-2">
                         <div className="flex items-center gap-1 text-[10px] text-slate-500"><span className="w-2 h-2 rounded-full bg-brand-500"></span> Nivel de Culpa</div>
                     </div>
                </div>

                <div className="hidden md:block overflow-hidden rounded-xl border border-slate-100">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                            <tr><th className="px-4 py-3">Fecha</th><th className="px-4 py-3">Semana</th><th className="px-4 py-3 text-right">Autojuicio</th><th className="px-4 py-3 text-right">Resp. Consc.</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {client.clinicalData.testScores.length === 0 ? (
                                <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-400 italic">No hay registros aún</td></tr>
                            ) : (
                                client.clinicalData.testScores.map((test, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="px-4 py-3 font-medium text-slate-700">{test.date}</td>
                                        <td className="px-4 py-3 text-slate-500">Semana {test.week}</td>
                                        <td className="px-4 py-3 text-right font-bold text-red-400">{test.scores.autojuicio}</td>
                                        <td className="px-4 py-3 text-right font-bold text-green-500">{test.scores.responsabilidadConsciente}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-auto p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <h5 className="text-yellow-800 font-bold text-xs uppercase mb-2">Interpretación Rápida</h5>
                    <p className="text-xs text-yellow-700 leading-relaxed">Se observa una tendencia a la baja en Autojuicio. Verificar adherencia en Semana 3 para consolidar la Responsabilidad Consciente.</p>
                </div>
            </div>
        </div>
    );
};

const TabAdherence: React.FC<{ client: ClientProfile }> = ({ client }) => {
    const dailyData = getDailyAudioData();
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2"><Headphones size={20} className="text-brand-500" /> Hábito de Escucha</h4>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+15% vs sem. ant</span>
                    </div>
                    <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="day" tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border:'none', boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                                <Bar dataKey="mins" radius={[4, 4, 0, 0]}>
                                    {dailyData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.mins > 40 ? '#0097b2' : '#cbd5e1'} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-2">Minutos por día (Última semana)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 text-white p-5 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
                         <div className="relative z-10">
                            <Clock size={24} className="mb-3 text-brand-400" />
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Tiempo Total</p>
                            <h3 className="text-3xl font-bold mt-1">4h 12m</h3>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                    </div>

                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                             <div className="flex items-center gap-2 mb-3 text-orange-500"><Sun size={24} /></div>
                             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Momento Favorito</p>
                             <h3 className="text-xl font-bold text-slate-800 mt-1">Mañana</h3>
                        </div>
                        <p className="text-xs text-slate-500">80% de las sesiones</p>
                    </div>

                     <div className="col-span-2 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                         <div>
                             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Adherencia</p>
                             <h3 className="text-2xl font-bold text-slate-800">85% <span className="text-sm font-normal text-slate-400">Excelente</span></h3>
                         </div>
                         <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 size={24} /></div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText className="text-amber-500" size={20} /> Progreso de Guías Semanales</h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(week => {
                        const isDone = client.currentWeek > week || (client.currentWeek === week && client.progress[`week${week}` as keyof typeof client.progress].guideCompleted);
                        const isLocked = client.currentWeek < week;
                        return (
                            <div key={week} className={`flex items-center p-4 rounded-xl border ${isDone ? 'bg-green-50 border-green-100' : isLocked ? 'bg-slate-50 border-slate-100 opacity-50' : 'bg-white border-brand-100 shadow-sm'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${isDone ? 'bg-green-500 text-white' : isLocked ? 'bg-slate-200 text-slate-400' : 'bg-brand-100 text-brand-600'}`}>
                                    {isDone ? <CheckCircle2 size={16} /> : <span className="font-bold text-xs">{week}</span>}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold text-sm ${isDone ? 'text-green-800' : 'text-slate-700'}`}>Guía Semana {week}</h4>
                                    <p className="text-xs text-slate-500">{isDone ? 'Completada y revisada' : isLocked ? 'Bloqueada' : 'En progreso'}</p>
                                </div>
                                {isDone && <button className="text-xs font-bold text-green-600 bg-white px-3 py-1.5 rounded-lg border border-green-200 hover:bg-green-50">Ver Respuestas</button>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

const ProClientDetail: React.FC<{ client: ClientProfile; onBack?: () => void }> = ({ client, onBack }) => {
    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm z-10 shrink-0 gap-4">
                <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto">
                    {onBack && <button onClick={onBack} className="md:hidden mr-1 text-slate-500"><ArrowLeft size={24} /></button>}
                    <div className="relative">
                        <img src={client.avatar} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-md object-cover" alt="" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-none mb-1">{client.name}</h2>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] md:text-xs font-medium text-slate-600">Paciente</span>
                            <span className="text-slate-300">|</span>
                            <span>Inicio: {client.startDate}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-xs md:text-sm rounded-xl hover:bg-slate-50 transition shadow-sm">Ver Ficha</button>
                    <button className="flex-1 md:flex-none px-4 py-2 bg-brand-600 text-white font-bold text-xs md:text-sm rounded-xl hover:bg-brand-700 transition shadow-md shadow-brand-200">Agendar Sesión</button>
                </div>
            </div>

            {/* Content Vertical Stack */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 md:space-y-12 pb-24 md:pb-8">
                <section>
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2"><Settings size={20} className="text-brand-500" /> Resumen General</h3>
                        <div className="h-px flex-1 bg-slate-200"></div>
                    </div>
                    <TabOverview client={client} />
                </section>
                <section>
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2"><Activity size={20} className="text-brand-500" /> Evolución Clínica</h3>
                         <div className="h-px flex-1 bg-slate-200"></div>
                    </div>
                    <TabClinical client={client} />
                </section>
                <section>
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2"><Clock size={20} className="text-brand-500" /> Adherencia y Trabajo</h3>
                         <div className="h-px flex-1 bg-slate-200"></div>
                    </div>
                    <TabAdherence client={client} />
                </section>
                <div className="h-12"></div>
            </div>
        </div>
    );
};

const ProfessionalView: React.FC<{ currentUser: User, onLogout: () => void }> = ({ currentUser, onLogout }) => {
    const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(MOCK_CLIENT_W1);
    const [activeSidebarTab, setActiveSidebarTab] = useState<'clients' | 'calendar' | 'settings'>('clients');
    const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

    const handleClientSelect = (client: ClientProfile) => {
        setSelectedClient(client);
        setIsMobileDetailOpen(true);
        setActiveSidebarTab('clients');
    };

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-800">
             <aside className="hidden md:flex w-20 bg-slate-900 text-white flex-col items-center py-6 gap-8 z-20 shadow-xl">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-brand-900/50">E.</div>
                <nav className="flex-1 flex flex-col gap-4 w-full px-2">
                    <button onClick={() => setActiveSidebarTab('clients')} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeSidebarTab === 'clients' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Users size={24} /></button>
                    <button onClick={() => setActiveSidebarTab('calendar')} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeSidebarTab === 'calendar' ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><CalendarIcon size={24} /></button>
                </nav>
                <div className="flex flex-col gap-4">
                    <button onClick={onLogout} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 flex items-center justify-center transition-colors"><LogOut size={18} /></button>
                    <img src={currentUser.avatar} className="w-10 h-10 rounded-full border-2 border-slate-700" alt="Profile" />
                </div>
            </aside>

             <div className={`hidden md:flex w-80 bg-white border-r border-slate-200 z-10 flex-col shadow-sm transition-all duration-300 ${activeSidebarTab === 'clients' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'}`}>
                <ProClientsList onSelect={handleClientSelect} selectedId={selectedClient?.id} />
             </div>

             <main className="flex-1 relative bg-slate-50 overflow-hidden flex flex-col">
                <div className="hidden md:block h-full w-full">
                    {activeSidebarTab === 'calendar' ? <ProCalendarModule onSelectClient={handleClientSelect} /> : (selectedClient ? <ProClientDetail client={selectedClient} /> : <div className="h-full flex items-center justify-center text-slate-400"><p>Selecciona un paciente</p></div>)}
                </div>

                <div className="md:hidden h-full w-full relative">
                    {isMobileDetailOpen && selectedClient && activeSidebarTab === 'clients' && <div className="absolute inset-0 z-30 bg-white animate-in slide-in-from-right duration-200"><ProClientDetail client={selectedClient} onBack={() => setIsMobileDetailOpen(false)} /></div>}
                    {activeSidebarTab === 'calendar' && <div className="absolute inset-0 z-20 bg-white pb-20"><ProCalendarModule onSelectClient={handleClientSelect} /></div>}
                    {activeSidebarTab === 'clients' && !isMobileDetailOpen && <div className="absolute inset-0 z-20 bg-white pb-20"><ProClientsList onSelect={handleClientSelect} selectedId={selectedClient?.id} /></div>}
                </div>
             </main>

            <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex justify-around items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button onClick={() => { setActiveSidebarTab('clients'); setIsMobileDetailOpen(false); }} className={`flex flex-col items-center gap-1 ${activeSidebarTab === 'clients' ? 'text-brand-600' : 'text-slate-400'}`}><Users size={20} /><span className="text-[10px] font-bold">Pacientes</span></button>
                <button onClick={() => setActiveSidebarTab('calendar')} className={`flex flex-col items-center gap-1 ${activeSidebarTab === 'calendar' ? 'text-brand-600' : 'text-slate-400'}`}><CalendarIcon size={20} /><span className="text-[10px] font-bold">Agenda</span></button>
                <button onClick={onLogout} className="flex flex-col items-center gap-1 text-slate-400 hover:text-red-500"><LogOut size={20} /><span className="text-[10px] font-bold">Salir</span></button>
            </div>
        </div>
    );
};


// ==========================================
// COORDINATOR VIEW COMPONENTS (NEW DESIGNS)
// ==========================================

const CoordinatorClientDetail: React.FC<{ client: ClientProfile; onBack: () => void; onSchedule: () => void }> = ({ client, onBack, onSchedule }) => {
    const meetingInfo = getMeetingDate(client.startDate, client.currentWeek);
    
    return (
        <div className="h-full flex flex-col bg-slate-50 overflow-y-auto pb-20">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center gap-3 border-b border-slate-100 shadow-sm sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full text-slate-600"><ArrowLeft size={20}/></button>
                <div className="relative">
                    <img src={client.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">{client.name}</h3>
                    <p className="text-[10px] text-slate-500 font-medium">Paciente | Inicio: {client.startDate}</p>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Action Buttons (Screenshot 1) */}
                <div className="flex gap-3">
                    <button className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl shadow-sm text-sm hover:bg-slate-50 transition-colors">Ver Ficha</button>
                    <button onClick={onSchedule} className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-3 rounded-xl shadow-md shadow-cyan-200 text-sm hover:to-cyan-700 transition-colors">Agendar Sesión</button>
                </div>

                <div className="flex items-center gap-2">
                    <Settings size={18} className="text-cyan-500" />
                    <h3 className="font-bold text-slate-800">Resumen General</h3>
                </div>

                {/* Purple Meeting Card (Screenshot 1) */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold mb-3 uppercase tracking-wide">Próxima Reunión</div>
                        <h2 className="text-xl font-bold mb-1">{meetingInfo.formatted}</h2>
                        <p className="text-indigo-100 text-xs mb-4">10:00 AM - 11:00 AM • Videollamada</p>
                        <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-50 transition-colors">
                            <Video size={14} /> Iniciar Videollamada
                        </button>
                    </div>
                    <CalendarIcon className="absolute top-4 right-4 text-white/20" size={60} />
                </div>

                {/* Status Card (Screenshot 1) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estado del Programa</p>
                    <div className="flex items-end gap-1 mb-2">
                        <span className="text-3xl font-bold text-cyan-600">Semana {client.currentWeek}</span>
                        <span className="text-lg text-slate-300 font-light">/4</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">Fase: <strong className="text-cyan-600">"{client.currentWeek === 1 ? 'Comprender' : 'Regular'}"</strong></p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full rounded-full" style={{width: `${(client.currentWeek/4)*100}%`}}></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                         <div className="flex items-center gap-2 mb-2 text-slate-400"><Activity size={16}/><span className="text-[10px] font-bold uppercase">Tests</span></div>
                         <p className="text-xl font-bold text-slate-800">0 <span className="text-[10px] text-slate-400 font-normal">realizados</span></p>
                     </div>
                     <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                         <div className="flex items-center gap-2 mb-2 text-slate-400"><Headphones size={16}/><span className="text-[10px] font-bold uppercase">Audios</span></div>
                         <p className="text-xl font-bold text-slate-800">0 <span className="text-[10px] text-slate-400 font-normal">sesiones</span></p>
                     </div>
                </div>
            </div>
        </div>
    );
}

const CreateUserModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative">
                <div className="h-32 bg-gradient-to-b from-slate-200 to-slate-50 relative flex justify-center">
                    <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-white/50 rounded-full hover:bg-white transition-colors"><ArrowLeft size={20} className="text-slate-600"/></button>
                    <div className="text-center pt-8 z-10"><h2 className="text-xl font-bold text-slate-800">Crear Nuevo Usuario</h2></div>
                    <div className="absolute bottom-0 w-24 h-48 bg-gradient-to-b from-brand-200 to-brand-700 rounded-t-full shadow-lg transform translate-y-10 border-4 border-white"></div>
                </div>
                <div className="pt-16 pb-8 px-8 space-y-5">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 ml-1">Nombre Completo</label>
                            <div className="relative"><Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="text" placeholder="Ej. Maria Rodriguez" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-brand-500 outline-none transition-all" /></div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 ml-1">Correo Electrónico</label>
                            <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="email" placeholder="usuario@ejemplo.com" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-brand-500 outline-none transition-all" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600 ml-1">Rol</label>
                                <div className="relative"><Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><select className="w-full pl-11 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-brand-500 outline-none appearance-none text-slate-600"><option>Paciente</option><option>Profesional</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} /></div>
                            </div>
                             <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600 ml-1">Programa</label>
                                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-brand-500 outline-none appearance-none text-slate-600"><option>RFAI - Ansiedad</option><option>RFAI - Culpa</option><option>RFAI - Trauma</option></select>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-full py-4 mt-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-200 transition-all flex items-center justify-center gap-2">Crear y Notificar <ArrowRight size={18} /></button>
                </div>
            </div>
        </div>
    );
};

const ScheduleModal: React.FC<{ client?: ClientProfile; onClose: () => void }> = ({ client, onClose }) => {
    // Matches Screenshot 2 Design
    const displayClient = client || ALL_USERS[3]; // Fallback to demo user if none selected
    
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
             <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 animate-in slide-in-from-bottom duration-300 relative">
                 <div className="flex justify-between items-center mb-6">
                     <h3 className="text-xl font-bold text-slate-800">Agendar Cita</h3>
                     <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><X size={20}/></button>
                 </div>

                 {/* Patient Card Pill (Screenshot 2) */}
                 <div className="bg-cyan-50 p-4 rounded-2xl flex items-center gap-4 mb-6 border border-cyan-100">
                    <div className="w-12 h-12 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-800 font-bold text-lg">
                        {displayClient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">{displayClient.name}</h4>
                        <p className="text-xs text-cyan-700 font-medium">Semana {displayClient.currentWeek as number} Completada • Requiere Sesión</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 mb-8">
                     <div>
                         <label className="text-xs font-bold text-slate-500 mb-1 block">Fecha</label>
                         <div className="relative">
                             <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                             <input type="text" defaultValue="06 Oct, 2023" className="w-full pl-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-cyan-500" />
                         </div>
                     </div>
                     <div>
                         <label className="text-xs font-bold text-slate-500 mb-1 block">Hora</label>
                         <div className="relative">
                             <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                             <input type="text" defaultValue="10:00 AM" className="w-full pl-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-cyan-500" />
                         </div>
                     </div>
                 </div>

                 <div className="flex gap-3">
                     <button onClick={onClose} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors">Cancelar</button>
                     <button onClick={onClose} className="flex-1 py-3 bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-200 transition-all">Confirmar Cita</button>
                 </div>
             </div>
        </div>
    );
};

const CoordinatorStats: React.FC = () => {
    return (
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
            <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:border-brand-100 transition-colors group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"><Users size={20} /></div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800">12</h3><p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Total Clientes</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:border-brand-100 transition-colors group relative overflow-hidden">
                <div className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"><CalendarIcon size={20} /></div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800">5</h3><p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Sesiones Hoy</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:border-brand-100 transition-colors group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"><FileText size={20} /></div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800">3</h3><p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Revisiones Pend.</p>
            </div>
        </div>
    );
};

const CoordinatorClients: React.FC<{ onSelect: (c: ClientProfile) => void }> = ({ onSelect }) => {
    const clients = ALL_USERS.filter(u => u.role === 'CLIENT') as ClientProfile[];
    const [localClients, setLocalClients] = useState(clients);
    const toggleStatus = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setLocalClients(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : c));
    };

    return (
        <div className="space-y-4 pb-20">
            <div className="flex justify-between items-center px-2"><h3 className="text-lg font-bold text-slate-800">Gestión de Clientes</h3><button className="text-sm font-medium text-brand-600 hover:underline flex items-center gap-1">Ver Todos <ArrowRight size={14}/></button></div>
            {localClients.map(client => {
                const progress = (client.currentWeek / 4) * 100;
                return (
                    // Card Design matching Screenshot 3
                    <div key={client.id} onClick={() => onSelect(client)} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${client.status === 'ACTIVE' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                                    {client.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                                </div>
                                <div>
                                    <h4 className={`font-bold text-sm ${client.status === 'ACTIVE' ? 'text-slate-800' : 'text-slate-400'}`}>{client.name}</h4>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">Semana {client.currentWeek}</span>
                                </div>
                            </div>
                            {/* Toggle Switch */}
                            <button onClick={(e) => toggleStatus(client.id, e)} className="focus:outline-none">
                                {client.status === 'ACTIVE' ? <ToggleRight size={32} className="text-cyan-500" /> : <ToggleLeft size={32} className="text-slate-300" />}
                            </button>
                        </div>
                        
                        <div className="h-px bg-slate-50 w-full mb-3"></div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Circular Progress */}
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90"><circle cx="20" cy="20" r="16" stroke="#f1f5f9" strokeWidth="3" fill="none" /><circle cx="20" cy="20" r="16" stroke={client.status === 'ACTIVE' ? '#06b6d4' : '#cbd5e1'} strokeWidth="3" fill="none" strokeDasharray="100" strokeDashoffset={100 - progress} strokeLinecap="round" /></svg>
                                    <span className="absolute text-[9px] font-bold text-slate-600">{progress}%</span>
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase">Progreso</p>
                                    <p className="text-xs font-medium text-slate-700">{client.status === 'ACTIVE' ? (progress >= 75 ? 'Avanzado' : 'En curso') : 'Pausado'}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center"><FileText size={16}/></div>
                                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center"><Video size={16}/></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const CoordinatorCalendar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const days = Array.from({length: 31}, (_, i) => i + 1);
    const today = 5;

    return (
        <div className="h-full flex flex-col bg-slate-50 relative">
            <div className="bg-white px-6 py-6 border-b border-slate-100 shadow-sm z-10 sticky top-0">
                <div className="flex justify-between items-center mb-6"><button className="p-2 hover:bg-slate-50 rounded-lg"><ArrowLeft size={20} className="text-slate-400"/></button><h2 className="text-lg font-bold text-slate-800">Octubre 2023</h2><button className="p-2 hover:bg-slate-50 rounded-lg"><ChevronRight size={20} className="text-slate-400"/></button></div>
                <div className="grid grid-cols-7 mb-2">{['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'].map(d => (<div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">{d}</div>))}</div>
                <div className="grid grid-cols-7 gap-y-4">
                     <div className="aspect-square"></div><div className="aspect-square"></div><div className="aspect-square"></div>
                     {days.map(day => (<div key={day} className="flex justify-center items-center"><button className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${day === today ? 'bg-cyan-200 text-slate-900 font-bold shadow-sm relative' : 'text-slate-600 hover:bg-slate-100'}`}>{day}{day === today && <span className="absolute -bottom-1 w-1 h-1 bg-cyan-600 rounded-full"></span>}</button></div>))}
                </div>
            </div>
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="flex justify-between items-center"><h3 className="font-bold text-slate-800">Sesiones de Hoy</h3><span className="text-xs font-bold text-cyan-500 uppercase">Jueves 5</span></div>
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3"><img src={ALL_USERS[3].avatar} className="w-10 h-10 rounded-full object-cover" alt="" /><div><h4 className="font-bold text-slate-800">Ana García</h4><p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Semana 1 • RFAI</p></div></div>
                        <div className="text-right"><span className="block font-bold text-slate-800">10:00 AM</span><span className="text-xs text-slate-400">45 min</span></div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl flex items-center justify-between">
                         <div className="flex items-center gap-2 overflow-hidden"><div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0"><Video size={14} /></div><div className="truncate"><p className="text-[10px] text-slate-400 uppercase font-bold">Enlace de Google Meet</p><p className="text-xs text-slate-600 truncate">meet.google.com/abc-defg-hij</p></div></div>
                         <button className="px-4 py-2 bg-cyan-100 text-cyan-700 text-xs font-bold rounded-xl shadow-sm hover:bg-cyan-200 transition-colors">Unirse</button>
                    </div>
                </div>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="fixed bottom-24 right-6 w-14 h-14 bg-cyan-400 text-white rounded-full shadow-lg shadow-cyan-200/50 flex items-center justify-center hover:scale-105 transition-transform z-20"><Plus size={28} /></button>
            {isModalOpen && <ScheduleModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

const CoordinatorView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar'>('dashboard');
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    if (activeTab === 'calendar') {
        return (
            <div className="h-full flex flex-col">
                <CoordinatorCalendar />
                <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex justify-around items-center z-50">
                    <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-cyan-600' : 'text-slate-400'}`}><Users size={20} /><span className="text-[10px] font-bold">Gestión</span></button>
                    <button onClick={() => setActiveTab('calendar')} className={`flex flex-col items-center gap-1 ${activeTab === 'calendar' ? 'text-cyan-600' : 'text-slate-400'}`}><CalendarIcon size={20} /><span className="text-[10px] font-bold">Agenda</span></button>
                </div>
            </div>
        );
    }

    if (selectedClient) {
        return (
            <>
                <CoordinatorClientDetail 
                    client={selectedClient} 
                    onBack={() => setSelectedClient(null)} 
                    onSchedule={() => setShowScheduleModal(true)}
                />
                {showScheduleModal && <ScheduleModal client={selectedClient} onClose={() => setShowScheduleModal(false)} />}
            </>
        )
    }

    return (
        <div className="h-full bg-slate-50 flex flex-col relative">
            <div className="px-6 py-6 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
                <div><h2 className="text-xl font-bold text-slate-800">Panel de Gestión</h2><p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Centro Equilibrar</p></div>
                <div className="flex gap-2"><button onClick={() => setIsCreateUserOpen(true)} className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center hover:bg-cyan-100 transition-colors"><UserPlus size={20} /></button></div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
                <div className="mb-6"><h3 className="font-bold text-lg text-slate-800 mb-4">Resumen de Gestión</h3><CoordinatorStats /></div>
                <CoordinatorClients onSelect={setSelectedClient} />
            </div>

            <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex justify-around items-center z-50">
                <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-cyan-600' : 'text-slate-400'}`}><Users size={20} /><span className="text-[10px] font-bold">Gestión</span></button>
                <button onClick={() => setActiveTab('calendar')} className={`flex flex-col items-center gap-1 ${activeTab === 'calendar' ? 'text-cyan-600' : 'text-slate-400'}`}><CalendarIcon size={20} /><span className="text-[10px] font-bold">Agenda</span></button>
            </div>
            {isCreateUserOpen && <CreateUserModal onClose={() => setIsCreateUserOpen(false)} />}
        </div>
    );
};

// ==========================================
// MAIN CONTROLLER
// ==========================================

export const AdminDashboard: React.FC<Props> = ({ currentUser, onLogout }) => {
  if (currentUser.role === 'COORDINATOR' || currentUser.role === 'ADMIN') {
      return (
        <div className="h-screen bg-slate-50 flex flex-col md:flex-row">
            <aside className="hidden md:flex w-20 bg-slate-900 text-white flex-col items-center py-6 gap-8 z-20 shadow-xl">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white font-bold">C.</div>
                <nav className="flex-1 flex flex-col gap-4 w-full px-2"><button className="w-14 h-14 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-lg"><Users size={24} /></button></nav>
                 <div className="flex flex-col gap-4">
                    <button onClick={onLogout} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-500/20 text-slate-400 flex items-center justify-center"><LogOut size={18} /></button>
                    <img src={currentUser.avatar} className="w-10 h-10 rounded-full border-2 border-slate-700" alt="Profile" />
                </div>
            </aside>
            <main className="flex-1 relative overflow-hidden"><CoordinatorView /></main>
        </div>
      );
  }
  return <ProfessionalView currentUser={currentUser} onLogout={onLogout} />;
};