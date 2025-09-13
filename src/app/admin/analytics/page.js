'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  Target,
  PieChart,
  Activity
} from 'lucide-react';

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    submissions: [],
    totalSubmissions: 0,
    conversionRate: 0,
    averageResponseTime: 0,
    topProjectTypes: [],
    topBusinessTypes: [],
    monthlyTrends: [],
    statusDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const fetchAnalytics = useCallback(async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      const submissions = data.submissions || [];
      
      // Calcular métricas
      const now = new Date();
      const periodDays = selectedPeriod === 'week' ? 7 : selectedPeriod === 'month' ? 30 : 365;
      const periodStart = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
      
      const periodSubmissions = submissions.filter(s => new Date(s.createdAt) >= periodStart);
      
      // Distribución por estado
      const statusCounts = {};
      periodSubmissions.forEach(s => {
        statusCounts[s.status] = (statusCounts[s.status] || 0) + 1;
      });
      
      // Tipos de proyecto más populares
      const projectTypeCounts = {};
      periodSubmissions.forEach(s => {
        projectTypeCounts[s.projectType] = (projectTypeCounts[s.projectType] || 0) + 1;
      });
      
      // Tipos de negocio más populares
      const businessTypeCounts = {};
      periodSubmissions.forEach(s => {
        businessTypeCounts[s.businessType] = (businessTypeCounts[s.businessType] || 0) + 1;
      });
      
      // Tendencias mensuales (últimos 6 meses)
      const monthlyTrends = [];
      for (let i = 5; i >= 0; i--) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
        const monthSubmissions = submissions.filter(s => {
          const submissionDate = new Date(s.createdAt);
          return submissionDate >= monthStart && submissionDate <= monthEnd;
        });
        
        monthlyTrends.push({
          month: monthStart.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }),
          count: monthSubmissions.length,
          won: monthSubmissions.filter(s => s.status === 'closed_won').length
        });
      }
      
      // Tiempo promedio de respuesta (simulado)
      const averageResponseTime = Math.floor(Math.random() * 24) + 1; // 1-24 horas
      
      // Tasa de conversión
      const totalSubmissions = submissions.length;
      const closedWon = submissions.filter(s => s.status === 'closed_won').length;
      const conversionRate = totalSubmissions > 0 ? (closedWon / totalSubmissions) * 100 : 0;
      
      setAnalytics({
        submissions: periodSubmissions,
        totalSubmissions: periodSubmissions.length,
        conversionRate: Math.round(conversionRate * 100) / 100,
        averageResponseTime,
        topProjectTypes: Object.entries(projectTypeCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([type, count]) => ({ type, count })),
        topBusinessTypes: Object.entries(businessTypeCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([type, count]) => ({ type, count })),
        monthlyTrends,
        statusDistribution: Object.entries(statusCounts)
          .map(([status, count]) => ({ status, count }))
      });
      
    } catch (error) {
      console.error('Error al cargar analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const getProjectTypeLabel = (type) => {
    const labels = {
      website: 'Sitio Web',
      ecommerce: 'E-commerce',
      portfolio: 'Portafolio',
      landing: 'Landing Page',
      app: 'Aplicación Web',
      redesign: 'Rediseño'
    };
    return labels[type] || type;
  };

  const getBusinessTypeLabel = (type) => {
    const labels = {
      retail: 'Tienda/Comercio',
      services: 'Servicios',
      restaurant: 'Restaurante',
      health: 'Salud',
      education: 'Educación',
      tech: 'Tecnología',
      creative: 'Diseño/Agencia',
      other: 'Otro'
    };
    return labels[type] || type;
  };

  const getStatusLabel = (status) => {
    const labels = {
      new: 'Nuevas',
      contacted: 'Contactadas',
      qualified: 'Calificadas',
      proposal_sent: 'Propuesta Enviada',
      closed_won: 'Cerradas Exitosas',
      closed_lost: 'Perdidas'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-500',
      contacted: 'bg-yellow-500',
      qualified: 'bg-green-500',
      proposal_sent: 'bg-purple-500',
      closed_won: 'bg-emerald-500',
      closed_lost: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando análisis...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Análisis y Reportes</h1>
            <p className="text-gray-300">Métricas y tendencias del formulario de contacto</p>
          </div>
          
          {/* Selector de período */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Mes
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPeriod === 'year' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Año
            </button>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Consultas</p>
                <p className="text-2xl font-bold text-white">{analytics.totalSubmissions}</p>
                <p className="text-xs text-gray-500 mt-1">Último {selectedPeriod}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Tasa de Conversión</p>
                <p className="text-2xl font-bold text-white">{analytics.conversionRate}%</p>
                <p className="text-xs text-gray-500 mt-1">Proyectos cerrados</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Tiempo Promedio</p>
                <p className="text-2xl font-bold text-white">{analytics.averageResponseTime}h</p>
                <p className="text-xs text-gray-500 mt-1">Respuesta inicial</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Proyectos Ganados</p>
                <p className="text-2xl font-bold text-white">
                  {analytics.statusDistribution.find(s => s.status === 'closed_won')?.count || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Este período</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos y análisis */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Distribución por estado */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Distribución por Estado
            </h2>
            <div className="space-y-3">
              {analytics.statusDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                    <span className="text-gray-300">{getStatusLabel(item.status)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getStatusColor(item.status)}`}
                        style={{ 
                          width: `${analytics.totalSubmissions > 0 ? (item.count / analytics.totalSubmissions) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-white font-semibold w-8 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tipos de proyecto más populares */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Proyectos Más Solicitados
            </h2>
            <div className="space-y-3">
              {analytics.topProjectTypes.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{getProjectTypeLabel(item.type)}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ 
                          width: `${analytics.totalSubmissions > 0 ? (item.count / analytics.totalSubmissions) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-white font-semibold w-8 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tendencias mensuales */}
        <div className="bg-slate-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Tendencias Mensuales (Últimos 6 meses)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {analytics.monthlyTrends.map((trend, index) => (
              <div key={index} className="text-center">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">{trend.month}</p>
                  <p className="text-2xl font-bold text-white mb-1">{trend.count}</p>
                  <p className="text-xs text-gray-500">consultas</p>
                  <div className="mt-2 pt-2 border-t border-slate-600">
                    <p className="text-xs text-emerald-400">{trend.won} ganadas</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de negocio */}
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Tipos de Negocio Más Comunes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.topBusinessTypes.map((item, index) => (
              <div key={index} className="bg-slate-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{getBusinessTypeLabel(item.type)}</span>
                  <span className="text-white font-bold">{item.count}</span>
                </div>
                <div className="mt-2 w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ 
                      width: `${analytics.totalSubmissions > 0 ? (item.count / analytics.totalSubmissions) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
