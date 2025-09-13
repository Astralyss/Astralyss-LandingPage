'use client';

import { useState, useEffect } from 'react';
import { formatContactData, CONTACT_STATUSES, FOLLOW_UP_TYPES, PROJECT_TYPES, BUSINESS_TYPES } from '@/lib/contactUtils';
import { Search, Filter, Calendar, User, Building, Phone, Mail, ExternalLink, Check, X, Trash2, Eye, EyeOff } from 'lucide-react';

export default function AdminContactos() {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [followUpData, setFollowUpData] = useState({
    type: 'email',
    description: '',
    nextAction: '',
    nextActionDate: '',
    status: ''
  });

  // Filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [projectTypeFilter, setProjectTypeFilter] = useState('');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [readFilter, setReadFilter] = useState('');

  // Selección múltiple
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchTerm, statusFilter, projectTypeFilter, businessTypeFilter, dateFilter, sortBy, readFilter]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Error al cargar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    // Búsqueda por texto
    if (searchTerm) {
      filtered = filtered.filter(submission => 
        submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por estado
    if (statusFilter) {
      filtered = filtered.filter(submission => submission.status === statusFilter);
    }

    // Filtro por tipo de proyecto
    if (projectTypeFilter) {
      filtered = filtered.filter(submission => submission.projectType === projectTypeFilter);
    }

    // Filtro por tipo de negocio
    if (businessTypeFilter) {
      filtered = filtered.filter(submission => submission.businessType === businessTypeFilter);
    }

    // Filtro por estado de lectura
    if (readFilter) {
      if (readFilter === 'read') {
        filtered = filtered.filter(submission => submission.isRead === true);
      } else if (readFilter === 'unread') {
        filtered = filtered.filter(submission => submission.isRead === false);
      }
    }

    // Filtro por fecha
    if (dateFilter) {
      const now = new Date();
      let filterDate;
      
      switch (dateFilter) {
        case 'today':
          filterDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          filterDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          filterDate = null;
      }
      
      if (filterDate) {
        filtered = filtered.filter(submission => new Date(submission.createdAt) >= filterDate);
      }
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

    setFilteredSubmissions(filtered);
  };

  const updateSubmissionStatus = async (id, status, notes) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, notes }),
      });

      if (response.ok) {
        fetchSubmissions();
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const addFollowUp = async (submissionId) => {
    try {
      const response = await fetch(`/api/contact/${submissionId}/follow-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followUpData),
      });

      if (response.ok) {
        setShowFollowUpForm(false);
        setFollowUpData({
          type: 'email',
          description: '',
          nextAction: '',
          nextActionDate: '',
          status: ''
        });
        fetchSubmissions();
      }
    } catch (error) {
      console.error('Error al agregar seguimiento:', error);
    }
  };

  // Funciones para acciones individuales
  const markAsRead = async (id) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }),
      });

      if (response.ok) {
        fetchSubmissions();
      }
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    }
  };

  const markAsUnread = async (id) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: false }),
      });

      if (response.ok) {
        fetchSubmissions();
      }
    } catch (error) {
      console.error('Error al marcar como no leída:', error);
    }
  };

  const deleteSubmission = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta consulta? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubmissions();
        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission(null);
        }
      }
    } catch (error) {
      console.error('Error al eliminar consulta:', error);
    }
  };

  // Funciones para selección múltiple
  const toggleSelection = (id) => {
    setSelectedSubmissions(prev => 
      prev.includes(id) 
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedSubmissions(filteredSubmissions.map(sub => sub.id));
  };

  const clearSelection = () => {
    setSelectedSubmissions([]);
  };

  const bulkAction = async (action) => {
    if (selectedSubmissions.length === 0) {
      alert('Selecciona al menos una consulta');
      return;
    }

    let confirmMessage = '';
    switch (action) {
      case 'markRead':
        confirmMessage = `¿Marcar ${selectedSubmissions.length} consultas como leídas?`;
        break;
      case 'markUnread':
        confirmMessage = `¿Marcar ${selectedSubmissions.length} consultas como no leídas?`;
        break;
      case 'delete':
        confirmMessage = `¿Eliminar ${selectedSubmissions.length} consultas? Esta acción no se puede deshacer.`;
        break;
    }

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await fetch('/api/contact/bulk', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: selectedSubmissions,
          action: action
        }),
      });

      if (response.ok) {
        fetchSubmissions();
        setSelectedSubmissions([]);
        setShowBulkActions(false);
      }
    } catch (error) {
      console.error('Error en acción masiva:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando consultas...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Administración de Consultas</h1>
          <div className="text-sm text-gray-400">
            {filteredSubmissions.length} de {submissions.length} consultas
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-slate-800 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por nombre, email, empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro por estado */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              {Object.entries(CONTACT_STATUSES).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>

            {/* Filtro por tipo de proyecto */}
            <select
              value={projectTypeFilter}
              onChange={(e) => setProjectTypeFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los proyectos</option>
              {Object.entries(PROJECT_TYPES).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>

            {/* Filtro por fecha */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las fechas</option>
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Filtro por estado de lectura */}
            <select
              value={readFilter}
              onChange={(e) => setReadFilter(e.target.value)}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="unread">No leídas</option>
              <option value="read">Leídas</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {/* Ordenamiento */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Más recientes</option>
                <option value="oldest">Más antiguos</option>
                <option value="name">Por nombre</option>
                <option value="company">Por empresa</option>
              </select>
            </div>

            {/* Botón para limpiar filtros */}
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                setProjectTypeFilter('');
                setBusinessTypeFilter('');
                setDateFilter('');
                setReadFilter('');
                setSortBy('newest');
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* Acciones masivas */}
        {selectedSubmissions.length > 0 && (
          <div className="bg-blue-900/30 border border-blue-500/50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-blue-300 font-medium">
                  {selectedSubmissions.length} consulta{selectedSubmissions.length > 1 ? 's' : ''} seleccionada{selectedSubmissions.length > 1 ? 's' : ''}
                </span>
                <button
                  onClick={clearSelection}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Limpiar selección
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => bulkAction('markRead')}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Marcar como leídas</span>
                </button>
                <button
                  onClick={() => bulkAction('markUnread')}
                  className="flex items-center space-x-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-sm"
                >
                  <EyeOff className="w-4 h-4" />
                  <span>Marcar como no leídas</span>
                </button>
                <button
                  onClick={() => bulkAction('delete')}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lista de consultas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Consultas</h2>
              <div className="flex space-x-2">
                <button
                  onClick={selectAll}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Seleccionar todas
                </button>
                <span className="text-gray-400">|</span>
                <button
                  onClick={clearSelection}
                  className="text-sm text-gray-400 hover:text-gray-300"
                >
                  Limpiar selección
                </button>
              </div>
            </div>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => {
                const formatted = formatContactData(submission);
                return (
                  <div
                    key={submission.id}
                    className={`bg-slate-800 p-4 rounded-lg transition-colors ${
                      submission.isRead ? 'opacity-75' : ''
                    } ${selectedSubmissions.includes(submission.id) ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedSubmissions.includes(submission.id)}
                          onChange={() => toggleSelection(submission.id)}
                          className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className={`w-3 h-3 rounded-full ${
                          submission.status === 'new' ? 'bg-blue-500' :
                          submission.status === 'contacted' ? 'bg-yellow-500' :
                          submission.status === 'qualified' ? 'bg-green-500' :
                          submission.status === 'closed_won' ? 'bg-emerald-500' :
                          'bg-gray-500'
                        }`}></div>
                        <h3 className="font-semibold">{formatted.cliente.nombre}</h3>
                        {!submission.isRead && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          submission.status === 'new' ? 'bg-blue-500' :
                          submission.status === 'contacted' ? 'bg-yellow-500' :
                          submission.status === 'qualified' ? 'bg-green-500' :
                          submission.status === 'closed_won' ? 'bg-emerald-500' :
                          'bg-gray-500'
                        }`}>
                          {formatted.estado.status}
                        </span>
                        <div className="flex space-x-1">
                          {submission.isRead ? (
                            <button
                              onClick={() => markAsUnread(submission.id)}
                              className="p-1 text-yellow-400 hover:text-yellow-300"
                              title="Marcar como no leída"
                            >
                              <EyeOff className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => markAsRead(submission.id)}
                              className="p-1 text-green-400 hover:text-green-300"
                              title="Marcar como leída"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteSubmission(submission.id)}
                            className="p-1 text-red-400 hover:text-red-300"
                            title="Eliminar consulta"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="space-y-1 cursor-pointer"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Building className="w-4 h-4" />
                        <span>{formatted.cliente.empresa}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Mail className="w-4 h-4" />
                        <span>{formatted.cliente.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Phone className="w-4 h-4" />
                        <span>{formatted.cliente.telefono}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-sm text-gray-400">{formatted.fecha}</p>
                      <p className="text-sm text-blue-400">{formatted.proyecto.tipo}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-400">
                No se encontraron consultas con los filtros aplicados
              </div>
            )}
          </div>

          {/* Detalles de la consulta seleccionada */}
          {selectedSubmission && (
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold">Detalles de la Consulta</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {(() => {
                const formatted = formatContactData(selectedSubmission);
                return (
                  <div className="space-y-4">
                    {/* Información del cliente */}
                    <div>
                      <h3 className="font-semibold mb-2">Información del Cliente</h3>
                      <div className="bg-slate-700 p-3 rounded">
                        <p><strong>Nombre:</strong> {formatted.cliente.nombre}</p>
                        <p><strong>Email:</strong> {formatted.cliente.email}</p>
                        <p><strong>Teléfono:</strong> {formatted.cliente.telefono}</p>
                        <p><strong>Empresa:</strong> {formatted.cliente.empresa}</p>
                      </div>
                    </div>

                    {/* Información del proyecto */}
                    <div>
                      <h3 className="font-semibold mb-2">Proyecto</h3>
                      <div className="bg-slate-700 p-3 rounded">
                        <p><strong>Tipo:</strong> {formatted.proyecto.tipo}</p>
                        <p><strong>Negocio:</strong> {formatted.proyecto.tipoNegocio}</p>
                        {formatted.proyecto.tipoNegocioOtro && (
                          <p><strong>Otro:</strong> {formatted.proyecto.tipoNegocioOtro}</p>
                        )}
                        <p><strong>Enfoque:</strong> {formatted.proyecto.enfoque}</p>
                        <p><strong>Tiempo:</strong> {formatted.proyecto.tiempo}</p>
                        {formatted.proyecto.sitioActual && (
                          <p><strong>Sitio actual:</strong> <a href={formatted.proyecto.sitioActual} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{formatted.proyecto.sitioActual}</a></p>
                        )}
                      </div>
                    </div>

                    {/* Objetivos */}
                    <div>
                      <h3 className="font-semibold mb-2">Objetivos</h3>
                      <div className="bg-slate-700 p-3 rounded">
                        <p><strong>Objetivo principal:</strong> {formatted.objetivos.objetivoPrincipal}</p>
                        <p><strong>Público objetivo:</strong> {formatted.objetivos.publicoObjetivo}</p>
                        {formatted.objetivos.competidores && (
                          <p><strong>Competidores:</strong> {formatted.objetivos.competidores}</p>
                        )}
                        {formatted.objetivos.requerimientosEspeciales && (
                          <p><strong>Requerimientos especiales:</strong> {formatted.objetivos.requerimientosEspeciales}</p>
                        )}
                        <p><strong>Mensaje:</strong> {formatted.objetivos.mensaje}</p>
                      </div>
                    </div>

                    {/* Seguimientos */}
                    {selectedSubmission.followUps && selectedSubmission.followUps.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Seguimientos</h3>
                        <div className="space-y-2">
                          {selectedSubmission.followUps.map((followUp, index) => (
                            <div key={index} className="bg-slate-700 p-3 rounded">
                              <div className="flex justify-between items-start">
                                <span className="font-medium">{FOLLOW_UP_TYPES[followUp.type] || followUp.type}</span>
                                <span className="text-sm text-gray-400">
                                  {new Date(followUp.createdAt).toLocaleDateString('es-ES')}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{followUp.description}</p>
                              {followUp.nextAction && (
                                <p className="text-sm mt-1 text-blue-400">
                                  <strong>Próxima acción:</strong> {followUp.nextAction}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Acciones */}
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowFollowUpForm(!showFollowUpForm)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                      >
                        {showFollowUpForm ? 'Cancelar' : 'Agregar Seguimiento'}
                      </button>

                      {showFollowUpForm && (
                        <div className="bg-slate-700 p-4 rounded space-y-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">Tipo de seguimiento</label>
                            <select
                              value={followUpData.type}
                              onChange={(e) => setFollowUpData({...followUpData, type: e.target.value})}
                              className="w-full bg-slate-600 text-white p-2 rounded"
                            >
                              {Object.entries(FOLLOW_UP_TYPES).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Descripción</label>
                            <textarea
                              value={followUpData.description}
                              onChange={(e) => setFollowUpData({...followUpData, description: e.target.value})}
                              className="w-full bg-slate-600 text-white p-2 rounded"
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Próxima acción</label>
                            <input
                              type="text"
                              value={followUpData.nextAction}
                              onChange={(e) => setFollowUpData({...followUpData, nextAction: e.target.value})}
                              className="w-full bg-slate-600 text-white p-2 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Fecha de próxima acción</label>
                            <input
                              type="date"
                              value={followUpData.nextActionDate}
                              onChange={(e) => setFollowUpData({...followUpData, nextActionDate: e.target.value})}
                              className="w-full bg-slate-600 text-white p-2 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Actualizar estado</label>
                            <select
                              value={followUpData.status}
                              onChange={(e) => setFollowUpData({...followUpData, status: e.target.value})}
                              className="w-full bg-slate-600 text-white p-2 rounded"
                            >
                              <option value="">Mantener estado actual</option>
                              {Object.entries(CONTACT_STATUSES).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                              ))}
                            </select>
                          </div>
                          <button
                            onClick={() => addFollowUp(selectedSubmission.id)}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                          >
                            Guardar Seguimiento
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
