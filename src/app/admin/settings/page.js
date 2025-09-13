'use client';

import { useState } from 'react';
import { Settings, Database, Bell, Shield, Download, Upload } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    notifications: {
      newSubmission: true,
      statusChange: true,
      followUpReminder: true,
      emailNotifications: true
    },
    display: {
      itemsPerPage: 10,
      defaultSort: 'newest',
      showFollowUps: true
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 90
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'data', name: 'Datos', icon: Database },
    { id: 'security', name: 'Seguridad', icon: Shield }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const exportData = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      
      const blob = new Blob([JSON.stringify(data.submissions, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `consultas-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al exportar datos:', error);
      alert('Error al exportar los datos');
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configuración de Visualización</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Elementos por página
            </label>
            <select
              value={settings.display.itemsPerPage}
              onChange={(e) => handleSettingChange('display', 'itemsPerPage', parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ordenamiento por defecto
            </label>
            <select
              value={settings.display.defaultSort}
              onChange={(e) => handleSettingChange('display', 'defaultSort', e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Más recientes</option>
              <option value="oldest">Más antiguos</option>
              <option value="name">Por nombre</option>
              <option value="company">Por empresa</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="showFollowUps"
              checked={settings.display.showFollowUps}
              onChange={(e) => handleSettingChange('display', 'showFollowUps', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="showFollowUps" className="text-sm text-gray-300">
              Mostrar seguimientos en la lista principal
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configuración de Notificaciones</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="newSubmission"
              checked={settings.notifications.newSubmission}
              onChange={(e) => handleSettingChange('notifications', 'newSubmission', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="newSubmission" className="text-sm text-gray-300">
              Notificar nuevas consultas
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="statusChange"
              checked={settings.notifications.statusChange}
              onChange={(e) => handleSettingChange('notifications', 'statusChange', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="statusChange" className="text-sm text-gray-300">
              Notificar cambios de estado
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="followUpReminder"
              checked={settings.notifications.followUpReminder}
              onChange={(e) => handleSettingChange('notifications', 'followUpReminder', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="followUpReminder" className="text-sm text-gray-300">
              Recordatorios de seguimiento
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="emailNotifications"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="emailNotifications" className="text-sm text-gray-300">
              Notificaciones por email
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Gestión de Datos</h3>
        <div className="space-y-4">
          <div className="bg-slate-700 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Exportar Datos</h4>
            <p className="text-sm text-gray-300 mb-3">
              Descarga todos los datos de consultas en formato JSON
            </p>
            <button
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Datos</span>
            </button>
          </div>
          
          <div className="bg-slate-700 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Respaldo Automático</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="autoBackup"
                  checked={settings.system.autoBackup}
                  onChange={(e) => handleSettingChange('system', 'autoBackup', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="autoBackup" className="text-sm text-gray-300">
                  Habilitar respaldo automático
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Frecuencia de respaldo
                </label>
                <select
                  value={settings.system.backupFrequency}
                  onChange={(e) => handleSettingChange('system', 'backupFrequency', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Retención de datos (días)
                </label>
                <input
                  type="number"
                  value={settings.system.retentionDays}
                  onChange={(e) => handleSettingChange('system', 'retentionDays', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="30"
                  max="365"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configuración de Seguridad</h3>
        <div className="space-y-4">
          <div className="bg-slate-700 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Acceso Administrativo</h4>
            <p className="text-sm text-gray-300 mb-3">
              Esta área administrativa está protegida. Para mayor seguridad, considera implementar autenticación.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Panel administrativo accesible públicamente</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Datos protegidos por Supabase</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-700 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Recomendaciones de Seguridad</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Implementar autenticación de usuarios</li>
              <li>• Configurar HTTPS en producción</li>
              <li>• Limitar acceso por IP si es necesario</li>
              <li>• Realizar respaldos regulares</li>
              <li>• Monitorear accesos al panel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'data':
        return renderDataSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Configuración</h1>
          <p className="text-gray-300">Administra la configuración del panel administrativo</p>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800 rounded-lg p-1 mb-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-800 p-6 rounded-lg">
          {renderTabContent()}
        </div>

        {/* Save button */}
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}
