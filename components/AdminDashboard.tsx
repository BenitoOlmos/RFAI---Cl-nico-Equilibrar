import React, { useState, useEffect } from 'react';
import { User, ClientProfile, Role } from '../types';
import { ALL_USERS, MOCK_CLIENT_W1 } from '../constants';
import { Users, Activity, Calendar as CalendarIcon, Settings, ChevronRight, ChevronLeft, LogOut, Search, UserPlus, Video, Clock, FileText, Headphones, TrendingUp, AlertCircle, CheckCircle2, ChevronDown, MapPin, MoreVertical, Phone, ArrowLeft, ArrowRight, Sun, Moon, ToggleLeft, ToggleRight, Plus, X, Mail, Briefcase, Lock, Database, Server, HardDrive, Shield, Save, Edit, Menu } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';
import { BrandLogo } from './BrandLogo';

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
// ADMINISTRATOR VIEW COMPONENTS (NEW)
// ==========================================

const AdminGlobalPanel: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <p className="text-slate-500 text-sm">Bienvenido de nuevo,</p>
                    <h2 className="text-2xl font-bold text-slate-800">Dr. Administrador</h2>
                </div>
            </div>

            {/* Top Row Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Users Stat */}
                <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Usuarios</p>
                            <h3 className="text-4xl font-bold text-slate-800 mt-1">1,240</h3>
                        </div>
                        <div className="p-3 bg-brand-50 rounded-2xl text-brand-500">
                            <Users size={24} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-slate-600"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Admin</span>
                            <span className="font-bold">45</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-slate-600"><span className="w-2 h-2 rounded-full bg-brand-400"></span> Pro</span>
                            <span className="font-bold">120</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-slate-600"><span className="w-2 h-2 rounded-full bg-slate-300"></span> Client</span>
                            <span className="font-bold">1k+</span>
                        </div>
                    </div>
                </div>

                {/* Server Status (Dark Card) */}
                <div className="bg-slate-900 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <Server className="text-brand-400" size={24} />
                        <h3 className="font-bold tracking-wide text-brand-400">SERVIDORES</h3>
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-slate-300 text-sm">MySQLDB</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-green-400 text-xs font-mono">14ms</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300 text-sm">MobaXterm</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-green-400 text-xs font-mono">OK</span>
                            </div>
                        </div>
                    </div>
                    {/* Decorative blurred blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                </div>
            </div>

            {/* Success Rate Card */}
            <div className="bg-brand-50/50 border border-brand-100 p-6 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tasa de Éxito RFAI</p>
                        <div className="flex items-center gap-3 mt-1">
                            <h3 className="text-4xl font-bold text-slate-800">87.5%</h3>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                                <TrendingUp size={12} /> +2.3%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-full shadow-sm text-brand-500">
                        <Activity size={24} />
                    </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>Progreso Semanal</span>
                    <span>Meta: 90%</span>
                </div>
                <div className="w-full bg-white h-3 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-brand-400 h-full rounded-full w-[87.5%]"></div>
                </div>
            </div>

            {/* Activity Logs */}
            <div>
                <div className="flex justify-between items-center mb-4 px-2">
                    <h3 className="font-bold text-lg text-slate-800">Logs de Actividad</h3>
                    <button className="text-brand-600 text-sm font-bold">Ver Todo</button>
                </div>
                <div className="space-y-3">
                    <div className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 relative">
                            <UserPlus size={18} />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h4 className="font-bold text-slate-800 text-sm">Nuevo Profesional</h4>
                                <span className="text-[10px] text-slate-400">10:42 AM</span>
                            </div>
                            <p className="text-xs text-slate-500">Admin creó perfil para <span className="italic text-slate-600">Dr. Alvarez</span></p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                            <LogOut size={18} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h4 className="font-bold text-slate-800 text-sm">Cliente Desactivado</h4>
                                <span className="text-[10px] text-slate-400">10:15 AM</span>
                            </div>
                            <p className="text-xs text-slate-500">Coordinador suspendió cuenta #9928</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                        <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                            <HardDrive size={18} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h4 className="font-bold text-slate-800 text-sm">Backup MySQL</h4>
                                <span className="text-[10px] text-slate-400">09:30 AM</span>
                            </div>
                            <p className="text-xs text-slate-500">Sistema completó respaldo automático.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                            <Settings size={18} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h4 className="font-bold text-slate-800 text-sm">Configuración RFAI</h4>
                                <span className="text-[10px] text-slate-400">Yesterday</span>
                            </div>
                            <p className="text-xs text-slate-500">Admin actualizó parámetros del módulo 2.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminUserManagement: React.FC<{ onSelectUser: (u: User) => void }> = ({ onSelectUser }) => {
    const [filter, setFilter] = useState<'ALL' | 'ADMIN' | 'PROF' | 'COORD'>('ALL');
    
    // Filter users logic
    const filteredUsers = ALL_USERS.filter(u => {
        if (filter === 'ALL') return true;
        if (filter === 'ADMIN') return u.role === 'ADMIN';
        if (filter === 'PROF') return u.role === 'PROFESSIONAL';
        if (filter === 'COORD') return u.role === 'COORDINATOR';
        return true;
    });

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header with Search and Add */}
            <div className="bg-white p-4 border-b border-slate-100 sticky top-0 z-10 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-xl text-slate-800">Gestión de Usuarios</h2>
                    <button className="bg-brand-400 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand-200 transition-all">
                        <Plus size={18} /> Nuevo
                    </button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Buscar por nombre, email..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-200 transition-all" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Settings size={16} />
                    </div>
                </div>
                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {['Todos', 'Admin', 'Profesional', 'Coordinador'].map((label, idx) => {
                        const key = ['ALL', 'ADMIN', 'PROF', 'COORD'][idx] as any;
                        return (
                            <button 
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === key ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
                <div className="flex justify-between items-center px-1 mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resultados ({filteredUsers.length})</span>
                    <button className="text-brand-500 text-xs font-bold hover:underline">Exportar CSV</button>
                </div>

                {filteredUsers.map(user => {
                    const roleColor = user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : user.role === 'PROFESSIONAL' ? 'bg-brand-50 text-brand-700' : user.role === 'COORDINATOR' ? 'bg-slate-100 text-slate-700' : 'bg-blue-50 text-blue-600';
                    const roleLabel = user.role === 'ADMIN' ? 'Administrador' : user.role === 'PROFESSIONAL' ? 'Profesional RFAI' : user.role === 'COORDINATOR' ? 'Coordinador' : 'Cliente';
                    
                    return (
                        <div key={user.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img src={user.avatar} className="w-12 h-12 rounded-full object-cover border border-slate-100" alt="" />
                                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">{user.name}</h3>
                                        <p className="text-xs text-slate-400">{user.email}</p>
                                    </div>
                                </div>
                                <button className="text-slate-300 hover:text-slate-600"><MoreVertical size={20}/></button>
                            </div>
                            
                            <div className="flex gap-2">
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 ${roleColor}`}>
                                    {user.role === 'PROFESSIONAL' && <Briefcase size={12}/>}
                                    {user.role === 'ADMIN' && <Shield size={12}/>}
                                    {roleLabel}
                                </span>
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${user.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                                    {user.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-50">
                                <button onClick={() => onSelectUser(user)} className="bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                                    <Lock size={14}/> Permisos
                                </button>
                                <button className="bg-white border border-slate-200 text-slate-600 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                                    <Clock size={14}/> Log
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const AdminUserDetail: React.FC<{ user: User; onBack: () => void }> = ({ user, onBack }) => {
    // Dynamic Content based on Role
    const isPro = user.role === 'PROFESSIONAL';
    const isCoord = user.role === 'COORDINATOR';

    return (
        <div className="h-full flex flex-col bg-slate-50 overflow-y-auto pb-20 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full text-slate-600"><ArrowLeft size={20}/></button>
                    <h3 className="font-bold text-slate-800">
                        {isPro ? 'Perfil Profesional' : isCoord ? 'Detalle de Coordinador' : 'Perfil de Usuario'}
                    </h3>
                </div>
                <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={20}/></button>
            </div>

            <div className="p-4 space-y-6">
                {/* Profile Card */}
                <div className="flex flex-col items-center pt-4 pb-6 bg-gradient-to-b from-white to-slate-50 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="relative mb-4">
                        <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" alt="" />
                        <div className="absolute bottom-1 right-1 bg-green-500 p-1.5 rounded-full border-4 border-white">
                            <CheckCircle2 size={12} className="text-white"/>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                    <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mt-1">
                        {isPro ? 'ESPECIALISTA RFAI' : isCoord ? 'Coordinador de Zona RFAI' : user.role}
                    </p>
                    <p className="text-slate-400 text-[10px] mt-1">ID: {user.id.toUpperCase()}-2023</p>

                    {isCoord && (
                        <div className="flex gap-2 mt-4 text-[10px] font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                            ID: #CORD-8821
                        </div>
                    )}
                </div>

                {/* Status Toggle Card */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-sm font-bold text-slate-800">Estado de Cuenta</p>
                        <p className="text-xs text-green-500 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Usuario Activo</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-brand-400 cursor-pointer">
                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"/>
                    </div>
                </div>

                {/* Action Buttons */}
                {isCoord && (
                    <div className="flex gap-3">
                        <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg">
                            <Edit size={16} /> Editar Perfil
                        </button>
                        <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
                            <Settings size={16} /> Resetear Pass
                        </button>
                    </div>
                )}

                {/* ROLE SPECIFIC SECTIONS */}
                
                {/* 1. COORDINATOR SPECIFIC */}
                {isCoord && (
                    <>
                        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-start mb-2">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Users size={20} /></div>
                                <Activity size={16} className="text-slate-300" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-lg">Capacidad de Gestión</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase mb-4">USUARIOS ACTIVOS</p>
                            
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-bold text-slate-900">18</span>
                                <span className="text-lg text-slate-400 mb-1">/ 25 usuarios</span>
                            </div>
                            
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                                <div className="bg-brand-400 h-full rounded-full w-[72%]"></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-slate-500">72% ocupado</span>
                                <span className="text-green-500">7 cupos disponibles</span>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><MapPin size={20}/></div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">Zonas Asignadas</h3>
                                        <p className="text-[10px] text-slate-400 uppercase">Cobertura Operativa</p>
                                    </div>
                                </div>
                                <button className="text-xs font-bold text-brand-500">Gestionar</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-xs font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Servicio de la Culpa</span>
                                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> RFAI Básico</span>
                                <span className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Zona Norte</span>
                                <button className="w-8 h-8 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-brand-300 hover:text-brand-500"><Plus size={14}/></button>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <h3 className="font-bold text-slate-800">Historial de Coordinación</h3>
                                <button className="text-brand-500 text-xs font-bold">Ver todo</button>
                            </div>
                            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm relative">
                                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-100"></div>
                                <div className="space-y-6">
                                    <div className="relative flex gap-4">
                                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center z-10 shrink-0"><CalendarIcon size={14}/></div>
                                        <div>
                                            <div className="flex justify-between w-full">
                                                <h4 className="text-sm font-bold text-slate-800">Reunión Agendada</h4>
                                                <span className="text-[10px] text-slate-400">2h</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">Sesión de seguimiento RFAI con <span className="font-bold text-slate-700">Maria Jiménez</span> para el 15 Oct.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-4">
                                        <div className="w-8 h-8 bg-green-50 text-green-600 rounded-full flex items-center justify-center z-10 shrink-0"><CheckCircle2 size={14}/></div>
                                        <div>
                                            <div className="flex justify-between w-full">
                                                <h4 className="text-sm font-bold text-slate-800">Perfil Actualizado</h4>
                                                <span className="text-[10px] text-slate-400">Yesterday</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">Se completó la ficha técnica y médica de <span className="font-bold text-slate-700">Carlos Ruiz</span>.</p>
                                        </div>
                                    </div>
                                     <div className="relative flex gap-4">
                                        <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center z-10 shrink-0"><AlertCircle size={14}/></div>
                                        <div>
                                            <div className="flex justify-between w-full">
                                                <h4 className="text-sm font-bold text-slate-800">Alerta de Capacidad</h4>
                                                <span className="text-[10px] text-slate-400">10 Oct</span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">El coordinador alcanzó el 70% de usuarios asignados. Se recomienda revisión.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* 2. PROFESSIONAL SPECIFIC */}
                {isPro && (
                    <>
                        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2"><Users size={20} className="text-brand-500"/> Pacientes Asignados</h3>
                                <button className="text-xs font-bold text-brand-500">Ver todos</button>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                {[1, 2].map(i => (
                                    <div key={i} className="min-w-[140px] bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold mb-2">
                                            {i === 1 ? 'MJ' : 'CR'}
                                        </div>
                                        <p className="text-xs font-bold text-slate-800 text-center">{i === 1 ? 'Maria Jiménez' : 'Carlos Ruiz'}</p>
                                        <p className="text-[10px] text-slate-400 text-center">{i === 1 ? 'Programa Fase 1' : 'Mantenimiento'}</p>
                                        <button className="mt-2 w-full py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm">Ver Perfil</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2"><Shield size={20} className="text-brand-500"/> Permisos Específicos</h3>
                            
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div className="flex gap-3 items-center">
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Edit size={16}/></div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Editar Evaluaciones</p>
                                        <p className="text-[10px] text-slate-500">Modificar resultados RFAI</p>
                                    </div>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-500 cursor-pointer">
                                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"/>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div className="flex gap-3 items-center">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><CalendarIcon size={16}/></div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Agendar Reuniones</p>
                                        <p className="text-[10px] text-slate-500">Crear sesiones de seguimiento</p>
                                    </div>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 cursor-pointer">
                                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"/>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl opacity-60">
                                <div className="flex gap-3 items-center">
                                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Database size={16}/></div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Borrar Historial</p>
                                        <p className="text-[10px] text-slate-500">Eliminar registros antiguos</p>
                                    </div>
                                </div>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 cursor-pointer">
                                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"/>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><Clock size={20} className="text-brand-500"/> Acceso a Logs</h3>
                            <div className="space-y-6 relative pl-2">
                                <div className="absolute left-2.5 top-2 bottom-2 w-px bg-slate-200"></div>
                                <div className="relative pl-6">
                                    <span className="absolute left-0 top-1.5 w-5 h-5 bg-green-500 rounded-full border-4 border-white z-10"></span>
                                    <p className="text-[10px] text-slate-400 mb-0.5">Hoy, 10:42 AM</p>
                                    <p className="text-xs text-slate-700">Inició sesión desde dispositivo móvil</p>
                                </div>
                                <div className="relative pl-6">
                                    <span className="absolute left-0 top-1.5 w-5 h-5 bg-blue-400 rounded-full border-4 border-white z-10"></span>
                                    <p className="text-[10px] text-slate-400 mb-0.5">Hoy, 09:15 AM</p>
                                    <p className="text-xs text-slate-700">Actualizó expediente clínico: <span className="font-bold text-brand-500">Carlos Ruiz</span></p>
                                </div>
                                <div className="relative pl-6">
                                    <span className="absolute left-0 top-1.5 w-5 h-5 bg-slate-300 rounded-full border-4 border-white z-10"></span>
                                    <p className="text-[10px] text-slate-400 mb-0.5">Ayer, 16:30 PM</p>
                                    <p className="text-xs text-slate-700">Finalizó sesión de terapia</p>
                                </div>
                            </div>
                            <button className="w-full text-center text-xs font-bold text-slate-400 mt-4 pt-4 border-t border-slate-50">Ver historial completo</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const AdminView: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'files' | 'settings'>('dashboard');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Bottom Navigation Logic
    const renderContent = () => {
        if (selectedUser) return <AdminUserDetail user={selectedUser} onBack={() => setSelectedUser(null)} />;
        
        switch(activeTab) {
            case 'users': return <AdminUserManagement onSelectUser={setSelectedUser} />;
            case 'dashboard':
            default: return <div className="p-4 md:p-6 pb-24 overflow-y-auto h-full"><AdminGlobalPanel /></div>;
        }
    };

    return (
        <div className="h-full bg-slate-50 flex flex-col relative">
            {/* Conditional Mobile Header or Desktop Layout */}
            {!selectedUser && activeTab !== 'users' && (
                <div className="px-6 py-6 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <Menu size={24} className="text-slate-800" />
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">EQUILIBRAR</p>
                            <h2 className="text-lg font-bold text-slate-900 leading-none">Panel Global</h2>
                        </div>
                    </div>
                    <div className="relative">
                        <img src={ALL_USERS[0].avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Admin" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-hidden relative">
                {renderContent()}
            </div>

            {/* Admin Bottom Navigation (Screenshot 1 Bottom) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex justify-around items-center z-50">
                <button onClick={() => {setActiveTab('dashboard'); setSelectedUser(null);}} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-brand-500' : 'text-slate-400'}`}>
                    <div className={`p-1 rounded-lg ${activeTab === 'dashboard' ? 'bg-brand-50' : ''}`}><HardDrive size={20} /></div>
                    <span className="text-[10px] font-bold">Inicio</span>
                </button>
                <button onClick={() => {setActiveTab('users'); setSelectedUser(null);}} className={`flex flex-col items-center gap-1 ${activeTab === 'users' ? 'text-brand-500' : 'text-slate-400'}`}>
                    <div className={`p-1 rounded-lg ${activeTab === 'users' ? 'bg-brand-50' : ''}`}><Users size={20} /></div>
                    <span className="text-[10px] font-bold">Usuarios</span>
                    {/* Notification Dot */}
                    <span className="absolute top-3 ml-4 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <button onClick={() => setActiveTab('files')} className={`flex flex-col items-center gap-1 ${activeTab === 'files' ? 'text-brand-500' : 'text-slate-400'}`}>
                    <CalendarIcon size={20} />
                    <span className="text-[10px] font-bold">Agenda</span>
                </button>
                <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-brand-500' : 'text-slate-400'}`}>
                    <Settings size={20} />
                    <span className="text-[10px] font-bold">Ajustes</span>
                </button>
            </div>
            
            {/* Desktop FAB for new Action */}
            <button className="hidden md:flex fixed bottom-8 right-8 w-14 h-14 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg shadow-brand-200 items-center justify-center transition-transform hover:scale-105 z-50">
                <Plus size={28} />
            </button>
        </div>
    );
};

// ==========================================
// COORDINATOR VIEW COMPONENTS (RESTORED & ISOLATED)
// ==========================================
// ... (The Coordinator components remain largely the same, ensuring isolation) ...

const CoordinatorCalendar: React.FC = () => {
  // Simple calendar mock
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const dates = Array.from({length: 30}, (_, i) => i + 1);
  
  return (
    <div className="p-6 h-full flex flex-col bg-white overflow-hidden">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-xl font-bold text-slate-800">Agenda Octubre 2023</h2>
         <div className="flex gap-2">
           <button className="p-2 border rounded-lg hover:bg-slate-50"><ChevronLeft size={20}/></button>
           <button className="p-2 border rounded-lg hover:bg-slate-50"><ChevronRight size={20}/></button>
         </div>
       </div>
       <div className="grid grid-cols-7 gap-4 mb-4">
         {days.map(d => <div key={d} className="text-center font-bold text-slate-400 uppercase text-xs">{d}</div>)}
       </div>
       <div className="grid grid-cols-7 gap-4 flex-1 overflow-y-auto">
         {dates.map(date => (
            <div key={date} className={`border border-slate-100 rounded-xl p-2 min-h-[80px] hover:border-cyan-200 transition-colors cursor-pointer relative ${date === 25 ? 'bg-cyan-50' : ''}`}>
               <span className={`text-sm font-bold ${date === 25 ? 'text-cyan-600' : 'text-slate-600'}`}>{date}</span>
               {date === 25 && <div className="mt-2 text-[10px] bg-cyan-100 text-cyan-700 px-1 py-0.5 rounded font-bold truncate">10:00 Lucia F.</div>}
               {date === 28 && <div className="mt-2 text-[10px] bg-purple-100 text-purple-700 px-1 py-0.5 rounded font-bold truncate">15:30 Carlos D.</div>}
            </div>
         ))}
       </div>
    </div>
  );
};

const ScheduleModal: React.FC<{ client: ClientProfile; onClose: () => void }> = ({ client, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden p-6 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Agendar Sesión</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Paciente</label>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-bold flex items-center gap-2">
                             <img src={client.avatar} className="w-6 h-6 rounded-full"/> {client.name}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fecha</label>
                             <input type="date" className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 transition-colors text-sm" />
                        </div>
                        <div>
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hora</label>
                             <input type="time" className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 transition-colors text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo de Sesión</label>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 rounded-lg border border-cyan-500 bg-cyan-50 text-cyan-700 font-bold text-sm">Videollamada</button>
                            <button className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-500 font-bold text-sm hover:border-slate-300">Presencial</button>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="w-full mt-6 bg-cyan-600 text-white font-bold py-3 rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-200">Confirmar Cita</button>
            </div>
        </div>
    );
};

const CreateUserModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden p-6 animate-in slide-in-from-bottom-10 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Nuevo Usuario</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre Completo</label>
                            <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500 transition-colors text-sm" placeholder="Ej. Juan Pérez" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Correo Electrónico</label>
                            <input type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-brand-500 transition-colors text-sm" placeholder="juan@ejemplo.com" />
                        </div>
                         <div>
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rol</label>
                             <select className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500 transition-colors text-sm">
                                 <option>Cliente (Paciente)</option>
                                 <option>Profesional</option>
                                 <option>Coordinador</option>
                             </select>
                        </div>
                         <div>
                             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Semana Inicio</label>
                             <select className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500 transition-colors text-sm">
                                 <option>Semana 1</option>
                                 <option>Semana 2</option>
                                 <option>Semana 3</option>
                                 <option>Semana 4</option>
                             </select>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors">Cancelar</button>
                    <button onClick={onClose} className="flex-1 bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">Crear Usuario</button>
                </div>
            </div>
        </div>
    );
};

const CoordinatorClientDetail: React.FC<{ client: ClientProfile; onBack: () => void; onSchedule: () => void }> = ({ client, onBack, onSchedule }) => {
    // ... Existing logic ...
    const meetingInfo = getMeetingDate(client.startDate, client.currentWeek);
    return (
        <div className="h-full flex flex-col bg-slate-50 overflow-y-auto pb-20">
            <div className="bg-white px-4 py-4 flex items-center gap-3 border-b border-slate-100 shadow-sm sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full text-slate-600"><ArrowLeft size={20}/></button>
                <div className="relative"><img src={client.avatar} className="w-10 h-10 rounded-full object-cover" alt="" /><div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div></div>
                <div><h3 className="font-bold text-slate-800 text-sm">{client.name}</h3><p className="text-[10px] text-slate-500 font-medium">Paciente | Inicio: {client.startDate}</p></div>
            </div>
            <div className="p-4 space-y-6">
                <div className="flex gap-3"><button className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl shadow-sm text-sm hover:bg-slate-50 transition-colors">Ver Ficha</button><button onClick={onSchedule} className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-3 rounded-xl shadow-md shadow-cyan-200 text-sm hover:to-cyan-700 transition-colors">Agendar Sesión</button></div>
                <div className="flex items-center gap-2"><Settings size={18} className="text-cyan-500" /><h3 className="font-bold text-slate-800">Resumen General</h3></div>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200 relative overflow-hidden"><div className="relative z-10"><div className="inline-block bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold mb-3 uppercase tracking-wide">Próxima Reunión</div><h2 className="text-xl font-bold mb-1">{meetingInfo.formatted}</h2><p className="text-indigo-100 text-xs mb-4">10:00 AM - 11:00 AM • Videollamada</p><button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-50 transition-colors"><Video size={14} /> Iniciar Videollamada</button></div><CalendarIcon className="absolute top-4 right-4 text-white/20" size={60} /></div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estado del Programa</p><div className="flex items-end gap-1 mb-2"><span className="text-3xl font-bold text-cyan-600">Semana {client.currentWeek}</span><span className="text-lg text-slate-300 font-light">/4</span></div><p className="text-xs text-slate-500 mb-3">Fase: <strong className="text-cyan-600">"{client.currentWeek === 1 ? 'Comprender' : 'Regular'}"</strong></p><div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-cyan-500 h-full rounded-full" style={{width: `${(client.currentWeek/4)*100}%`}}></div></div></div>
            </div>
        </div>
    );
}

const CoordinatorStats: React.FC = () => {
    return (
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
            <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:border-brand-100 transition-colors group"><div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"><Users size={20} /></div><h3 className="text-2xl md:text-3xl font-bold text-slate-800">12</h3><p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Total Clientes</p></div>
            <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:border-brand-100 transition-colors group relative overflow-hidden"><div className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div><div className="w-10 h-10 md:w-12 md:h-12 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"><CalendarIcon size={20} /></div><h3 className="text-2xl md:text-3xl font-bold text-slate-800">5</h3><p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Sesiones Hoy</p></div>
            <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:border-brand-100 transition-colors group"><div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"><FileText size={20} /></div><h3 className="text-2xl md:text-3xl font-bold text-slate-800">3</h3><p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Revisiones Pend.</p></div>
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
                    <div key={client.id} onClick={() => onSelect(client)} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${client.status === 'ACTIVE' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>{client.name.split(' ').map(n => n[0]).join('').substring(0,2)}</div>
                                <div><h4 className={`font-bold text-sm ${client.status === 'ACTIVE' ? 'text-slate-800' : 'text-slate-400'}`}>{client.name}</h4><span className="text-[10px] text-slate-400 font-bold uppercase">Semana {client.currentWeek}</span></div>
                            </div>
                            <button onClick={(e) => toggleStatus(client.id, e)} className="focus:outline-none">{client.status === 'ACTIVE' ? <ToggleRight size={32} className="text-cyan-500" /> : <ToggleLeft size={32} className="text-slate-300" />}</button>
                        </div>
                        <div className="h-px bg-slate-50 w-full mb-3"></div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 flex items-center justify-center"><svg className="w-full h-full transform -rotate-90"><circle cx="20" cy="20" r="16" stroke="#f1f5f9" strokeWidth="3" fill="none" /><circle cx="20" cy="20" r="16" stroke={client.status === 'ACTIVE' ? '#06b6d4' : '#cbd5e1'} strokeWidth="3" fill="none" strokeDasharray="100" strokeDashoffset={100 - progress} strokeLinecap="round" /></svg><span className="absolute text-[9px] font-bold text-slate-600">{progress}%</span></div>
                                <div><p className="text-[9px] text-slate-400 font-bold uppercase">Progreso</p><p className="text-xs font-medium text-slate-700">{client.status === 'ACTIVE' ? (progress >= 75 ? 'Avanzado' : 'En curso') : 'Pausado'}</p></div>
                            </div>
                            <div className="flex gap-2"><div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center"><FileText size={16}/></div><div className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center"><Video size={16}/></div></div>
                        </div>
                    </div>
                );
            })}
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
                <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex justify-around items-center z-50"><button onClick={() => setActiveTab('dashboard')} className="flex flex-col items-center gap-1 text-slate-400"><Users size={20} /><span className="text-[10px] font-bold">Gestión</span></button><button onClick={() => setActiveTab('calendar')} className="flex flex-col items-center gap-1 text-cyan-600"><CalendarIcon size={20} /><span className="text-[10px] font-bold">Agenda</span></button></div>
            </div>
        );
    }

    if (selectedClient) {
        return (<><CoordinatorClientDetail client={selectedClient} onBack={() => setSelectedClient(null)} onSchedule={() => setShowScheduleModal(true)} />{showScheduleModal && <ScheduleModal client={selectedClient} onClose={() => setShowScheduleModal(false)} />}</>)
    }

    return (
        <div className="h-full bg-slate-50 flex flex-col relative">
            <div className="px-6 py-6 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10"><div><h2 className="text-xl font-bold text-slate-800">Panel de Gestión</h2><p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Centro Equilibrar</p></div><div className="flex gap-2"><button onClick={() => setIsCreateUserOpen(true)} className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center hover:bg-cyan-100 transition-colors"><UserPlus size={20} /></button></div></div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24"><div className="mb-6"><h3 className="font-bold text-lg text-slate-800 mb-4">Resumen de Gestión</h3><CoordinatorStats /></div><CoordinatorClients onSelect={setSelectedClient} /></div>
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex justify-around items-center z-50"><button onClick={() => setActiveTab('dashboard')} className="flex flex-col items-center gap-1 text-cyan-600"><Users size={20} /><span className="text-[10px] font-bold">Gestión</span></button><button onClick={() => setActiveTab('calendar')} className="flex flex-col items-center gap-1 text-slate-400"><CalendarIcon size={20} /><span className="text-[10px] font-bold">Agenda</span></button></div>
            {isCreateUserOpen && <CreateUserModal onClose={() => setIsCreateUserOpen(false)} />}
        </div>
    );
};

const ProfessionalView: React.FC<{ currentUser: User; onLogout: () => void }> = ({ currentUser, onLogout }) => {
    // Reusing parts of AdminUserDetail logic but specific for professional dashboard
    return (
        <div className="h-screen bg-slate-50 flex flex-col md:flex-row">
             <aside className="hidden md:flex w-20 bg-slate-900 text-white flex-col items-center py-6 gap-8 z-20 shadow-xl">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white font-bold">P.</div>
                <nav className="flex-1 flex flex-col gap-4 w-full px-2">
                    <button className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-lg"><Briefcase size={24} /></button>
                </nav>
                 <div className="flex flex-col gap-4">
                    <button onClick={onLogout} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-500/20 text-slate-400 flex items-center justify-center"><LogOut size={18} /></button>
                    <img src={currentUser.avatar} className="w-10 h-10 rounded-full border-2 border-slate-700" alt="Profile" />
                </div>
            </aside>
            <main className="flex-1 relative overflow-hidden flex flex-col">
                 <div className="px-6 py-6 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Panel Profesional</h2>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Bienvenido, {currentUser.name}</p>
                    </div>
                    <div className="md:hidden">
                        <button onClick={onLogout}><LogOut size={20} className="text-slate-400"/></button>
                    </div>
                 </div>
                 <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {/* Stats */}
                         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                             <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Pacientes Activos</h3>
                             <p className="text-4xl font-bold text-slate-800">8</p>
                         </div>
                         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                             <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Próximas Sesiones</h3>
                             <p className="text-4xl font-bold text-slate-800">3</p>
                         </div>
                         
                         {/* Patient List Mock */}
                         <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                             <h3 className="text-lg font-bold text-slate-800 mb-4">Mis Pacientes</h3>
                             <div className="space-y-4">
                                {ALL_USERS.filter(u => u.role === 'CLIENT').slice(0,3).map(client => (
                                    <div key={client.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <img src={client.avatar} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-bold text-sm text-slate-800">{client.name}</p>
                                                <p className="text-xs text-slate-500">Semana {(client as ClientProfile).currentWeek}</p>
                                            </div>
                                        </div>
                                        <button className="text-brand-600 text-xs font-bold">Ver Ficha</button>
                                    </div>
                                ))}
                             </div>
                         </div>
                    </div>
                 </div>
            </main>
        </div>
    );
};

// ==========================================
// MAIN CONTROLLER
// ==========================================

export const AdminDashboard: React.FC<Props> = ({ currentUser, onLogout }) => {
  // ADMINISTRATOR VIEW
  if (currentUser.role === 'ADMIN') {
      return (
        <div className="h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Desktop Sidebar Admin */}
            <aside className="hidden md:flex w-20 bg-slate-900 text-white flex-col items-center py-6 gap-8 z-20 shadow-xl">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white font-bold">A.</div>
                <nav className="flex-1 flex flex-col gap-4 w-full px-2">
                    <button className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg"><HardDrive size={24} /></button>
                    <button className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Users size={24} /></button>
                </nav>
                 <div className="flex flex-col gap-4">
                    <button onClick={onLogout} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-500/20 text-slate-400 flex items-center justify-center"><LogOut size={18} /></button>
                    <img src={currentUser.avatar} className="w-10 h-10 rounded-full border-2 border-slate-700" alt="Profile" />
                </div>
            </aside>
            <main className="flex-1 relative overflow-hidden">
                <AdminView onLogout={onLogout} />
            </main>
        </div>
      );
  }

  // COORDINATOR VIEW
  if (currentUser.role === 'COORDINATOR') {
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

  // PROFESSIONAL VIEW
  return <ProfessionalView currentUser={currentUser} onLogout={onLogout} />;
};