'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  DollarSign
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    newSubmissions: 0,
    contactedSubmissions: 0,
    qualifiedSubmissions: 0,
    closedWon: 0,
    closedLost: 0,
    thisWeek: 0,
    thisMonth: 0
  });
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      
      const submissions = data.submissions || [];
      
      // Calcular estadísticas
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const statsData = {
        totalSubmissions: submissions.length,
        newSubmissions: submissions.filter(s => s.status === 'new').length,
        contactedSubmissions: submissions.filter(s => s.status === 'contacted').length,
        qualifiedSubmissions: submissions.filter(s => s.status === 'qualified').length,
        closedWon: submissions.filter(s => s.status === 'closed_won').length,
        closedLost: submissions.filter(s => s.status === 'closed_lost').length,
        unreadSubmissions: submissions.filter(s => !s.isRead).length,
        thisWeek: submissions.filter(s => new Date(s.createdAt) >= weekAgo).length,
        thisMonth: submissions.filter(s => new Date(s.createdAt) >= monthAgo).length
      };
      
      setStats(statsData);
      setRecentSubmissions(submissions.slice(0, 5));
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Consultas',
      value: stats.totalSubmissions,
      icon: Users,
      color: 'bg-blue-500',
      change: `+${stats.thisWeek} esta semana`
    },
    {
      title: 'No Leídas',
      value: stats.unreadSubmissions,
      icon: MessageSquare,
      color: 'bg-red-500',
      change: 'Requieren atención'
    },
    {
      title: 'Nuevas',
      value: stats.newSubmissions,
      icon: Clock,
      color: 'bg-yellow-500',
      change: 'Sin procesar'
    },
    {
      title: 'Contactadas',
      value: stats.contactedSubmissions,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: 'En seguimiento'
    },
    {
      title: 'Calificadas',
      value: stats.qualifiedSubmissions,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: 'Leads calientes'
    },
    {
      title: 'Cerradas Exitosas',
      value: stats.closedWon,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      change: 'Proyectos ganados'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'qualified': return 'bg-green-500';
      case 'proposal_sent': return 'bg-purple-500';
      case 'closed_won': return 'bg-emerald-500';
      case 'closed_lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Nueva';
      case 'contacted': return 'Contactada';
      case 'qualified': return 'Calificada';
      case 'proposal_sent': return 'Propuesta Enviada';
      case 'closed_won': return 'Cerrada Exitosamente';
      case 'closed_lost': return 'Perdida';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Dashboard Administrativo</h1>
          <p className="text-sm sm:text-base text-gray-300">Resumen de consultas y actividad del formulario</p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-slate-800 p-3 sm:p-4 lg:p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-400 mb-1 truncate">{stat.title}</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate hidden sm:block">{stat.change}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-lg ${stat.color} flex-shrink-0 ml-1 sm:ml-2`}>
                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
                {/* Mostrar el cambio en móviles muy pequeños */}
                <p className="text-xs text-gray-500 mt-1 truncate sm:hidden">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Resumen de actividad */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Actividad semanal */}
          <div className="bg-slate-800 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Actividad Reciente
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-gray-300">Esta semana</span>
                <span className="text-sm sm:text-base text-white font-semibold">{stats.thisWeek} consultas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-gray-300">Este mes</span>
                <span className="text-sm sm:text-base text-white font-semibold">{stats.thisMonth} consultas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-gray-300">Tasa de conversión</span>
                <span className="text-sm sm:text-base text-green-400 font-semibold">
                  {stats.totalSubmissions > 0 ? Math.round((stats.closedWon / stats.totalSubmissions) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Pipeline de ventas */}
          <div className="bg-slate-800 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Pipeline de Ventas
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-gray-300">Nuevas consultas</span>
                <div className="flex items-center">
                  <div className="w-16 sm:w-20 bg-slate-700 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalSubmissions > 0 ? (stats.newSubmissions / stats.totalSubmissions) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm sm:text-base text-white">{stats.newSubmissions}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-gray-300">En seguimiento</span>
                <div className="flex items-center">
                  <div className="w-16 sm:w-20 bg-slate-700 rounded-full h-2 mr-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalSubmissions > 0 ? (stats.contactedSubmissions / stats.totalSubmissions) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm sm:text-base text-white">{stats.contactedSubmissions}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-gray-300">Calificadas</span>
                <div className="flex items-center">
                  <div className="w-16 sm:w-20 bg-slate-700 rounded-full h-2 mr-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalSubmissions > 0 ? (stats.qualifiedSubmissions / stats.totalSubmissions) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm sm:text-base text-white">{stats.qualifiedSubmissions}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base text-gray-300">Cerradas exitosas</span>
                <div className="flex items-center">
                  <div className="w-16 sm:w-20 bg-slate-700 rounded-full h-2 mr-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full" 
                      style={{ width: `${stats.totalSubmissions > 0 ? (stats.closedWon / stats.totalSubmissions) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm sm:text-base text-white">{stats.closedWon}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consultas recientes */}
        <div className="bg-slate-800 p-4 sm:p-6 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Consultas Recientes
          </h2>
          {recentSubmissions.length > 0 ? (
            <div className="space-y-3">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 sm:p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(submission.status)} flex-shrink-0`}></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate">{submission.name}</p>
                      <p className="text-sm text-gray-300 truncate">{submission.company}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-xs sm:text-sm text-gray-300">{getStatusText(submission.status)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(submission.createdAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No hay consultas recientes</p>
          )}
        </div>
      </div>
    </div>
  );
}
