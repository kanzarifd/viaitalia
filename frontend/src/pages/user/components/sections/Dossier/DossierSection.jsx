import React from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { useDossier } from '../../../hooks/useDossier';

const DossierSection = () => {
  const { user } = useAuth();
  const {
    dossier,
    isLoading,
    error
  } = useDossier(user?.id);

  const loadingDossier = isLoading;
  const dossierData = dossier;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Mon Dossier Administratif
      </h2>
      
      {loadingDossier ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent"></div>
        </div>
      ) : !dossierData ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            📁 Vous n'avez pas encore de dossier
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Dossier Title */}
          <div className="bg-white/10 border border-white/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              {dossierData.title}
            </h3>
            <p className="text-gray-300 text-sm">
              Créé le {new Date(dossierData.createdAt).toLocaleDateString('fr-FR')}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
            
            {/* Traduction Step */}
            <div className="relative flex items-center mb-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 ${
                dossierData.traductionStatus === 'VALIDE' ? 'bg-green-500' :
                dossierData.traductionStatus === 'EN_COURS' ? 'bg-blue-500' : 'bg-gray-500'
              }`}>
                <span className="text-white text-2xl">📝</span>
              </div>
              <div className="ml-6 flex-1">
                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Traduction
                  </h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Statut: {
                      dossierData.traductionStatus === 'VALIDE' ? '✅ Validé' :
                      dossierData.traductionStatus === 'EN_COURS' ? '🔄 En cours' : '⏳ En attente'
                    }
                  </p>
                  {dossierData.traductionStatus === 'VALIDE' && (
                    <p className="text-green-400 text-sm">
                      Étape terminée avec succès
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Inscription Step */}
            <div className="relative flex items-center mb-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 ${
                dossierData.inscriptionStatus === 'VALIDE' ? 'bg-green-500' :
                dossierData.inscriptionStatus === 'EN_COURS' ? 'bg-blue-500' : 'bg-gray-500'
              }`}>
                <span className="text-white text-2xl">📋</span>
              </div>
              <div className="ml-6 flex-1">
                <div className={`bg-white/10 border border-white/20 rounded-lg p-4 ${
                  dossierData.traductionStatus !== 'VALIDE' ? 'opacity-50' : ''
                }`}>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Inscription
                  </h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Statut: {
                      dossierData.inscriptionStatus === 'VALIDE' ? '✅ Validé' :
                      dossierData.inscriptionStatus === 'EN_COURS' ? '🔄 En cours' : '⏳ En attente'
                    }
                  </p>
                  {dossierData.traductionStatus !== 'VALIDE' && (
                    <p className="text-yellow-400 text-sm">
                      ⚠️ Disponible après validation de la traduction
                    </p>
                  )}
                  {dossierData.inscriptionStatus === 'VALIDE' && (
                    <p className="text-green-400 text-sm">
                      Étape terminée avec succès
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Dossier Visa Step */}
            <div className="relative flex items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 ${
                dossierData.visaStatus === 'VALIDE' ? 'bg-green-500' :
                dossierData.visaStatus === 'EN_COURS' ? 'bg-blue-500' : 'bg-gray-500'
              }`}>
                <span className="text-white text-2xl">🛂</span>
              </div>
              <div className="ml-6 flex-1">
                <div className={`bg-white/10 border border-white/20 rounded-lg p-4 ${
                  dossierData.inscriptionStatus !== 'VALIDE' ? 'opacity-50' : ''
                }`}>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Dossier Visa
                  </h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Statut: {
                      dossierData.visaStatus === 'VALIDE' ? '✅ Validé' :
                      dossierData.visaStatus === 'EN_COURS' ? '🔄 En cours' : '⏳ En attente'
                    }
                  </p>
                  {dossierData.inscriptionStatus !== 'VALIDE' && (
                    <p className="text-yellow-400 text-sm">
                      ⚠️ Disponible après validation de l'inscription
                    </p>
                  )}
                  {dossierData.visaStatus === 'VALIDE' && (
                    <p className="text-green-400 text-sm">
                      Étape terminée avec succès
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white/10 border border-white/20 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">
              Progression Générale
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Étapes complétées</span>
                <span className="text-white font-medium">
                  {[
                    dossierData.traductionStatus === 'VALIDE',
                    dossierData.inscriptionStatus === 'VALIDE', 
                    dossierData.visaStatus === 'VALIDE'
                  ].filter(Boolean).length} / 3
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${([
                      dossierData.traductionStatus === 'VALIDE',
                      dossierData.inscriptionStatus === 'VALIDE', 
                      dossierData.visaStatus === 'VALIDE'
                    ].filter(Boolean).length / 3) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DossierSection;
