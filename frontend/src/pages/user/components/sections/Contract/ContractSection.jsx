import React from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { useContracts } from '../../../hooks/useContracts';

const ContractSection = () => {
  const { user } = useAuth();
  const {
    contractStatus,
    uploadedContract,
    isUploading,
    uploadProgress,
    contractFile,
    error,
    uploadContract,
    handleContractFileChange,
    setContractFile
  } = useContracts(user?.id);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleContractFileChange(file);
    }
  };

  const handleContractUpload = async () => {
    try {
      await uploadContract(contractFile);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="min-h-screen w-full space-y-6 py-6 px-0">
      {/* PDF Viewing Section */}
      <div className>
        <div className>
          <h3 className="text-lg font-semibold text-white mb-4">
            📄 Voir et Télécharger le Contrat
          </h3>
          <div className="space-y-6">
            <p className="text-gray-300 text-sm">
              Vous pouvez consulter votre contrat modèle ci-dessous et le télécharger pour le signer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.open('/contrat.pdf', '_blank')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Voir le Contrat
              </button>
              
              <a
                href="/contrat.pdf"
                download="contrat.pdf"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
              >
                <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Télécharger le Contrat
              </a>
            </div>
            
            <div className>
              <p className="text-gray-400 text-xs">
                <strong>Note:</strong> Le contrat doit être téléversé au format PDF après avoir été signé.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section - Show only when status is PENDING */}
      {contractStatus === 'PENDING' && (
        <div className="space-y-6">
          <div className>
            <h3 className="text-lg font-semibold text-white mb-2">
              📋 Instructions
            </h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Téléversez votre contrat signé au format PDF</li>
              <li>• Taille maximale: 10MB</li>
              <li>• Assurez-vous que le document est clair et lisible</li>
              <li>• Une fois téléversé, le contrat sera vérifié par l'administration</li>
            </ul>
          </div>

          <div className="border-2 border-dashed border-gray-500 rounded-lg p-8 text-center">
            <div className="mb-4">
              <span className="text-4xl">📁</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Téléverser le Contrat Signé
            </h3>
            <p className="text-gray-400 mb-4">
              Glissez-déposez votre fichier PDF ici ou cliquez pour sélectionner
            </p>
            
            <input
              id="contract-file-input"
              type="file"
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            <label
              htmlFor="contract-file-input"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              Sélectionner un fichier
            </label>
            
            {contractFile && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">
                  ✅ Fichier sélectionné: {contractFile.name}
                </p>
                <p className="text-gray-400 text-xs">
                  Taille: {(contractFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>

          {contractFile && (
            <button
              onClick={handleContractUpload}
              disabled={isUploading}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Téléversement en cours...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Téléverser le Contrat
                </>
              )}
            </button>
          )}

          {uploadProgress > 0 && (
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">❌ {error}</p>
            </div>
          )}
        </div>
      )}

      {/* Status-specific messages - Show when user already has contract */}
      {(contractStatus === 'UPLOADED' || contractStatus === 'CONFIRMED' || contractStatus === 'REJECTED') && (
        <div className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              📋 Statut de votre contrat
            </h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">
                <strong>État actuel:</strong> {
                  contractStatus === 'UPLOADED' ? 'En cours de vérification' :
                  contractStatus === 'CONFIRMED' ? 'Approuvé' :
                  'Rejeté'
                }
              </p>
              {uploadedContract && (
                <>
                  <p className="text-gray-300 text-sm">
                    <strong>Fichier:</strong> {uploadedContract.fileName}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>Date de soumission:</strong> {new Date(uploadedContract.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="text-center py-8">
            <span className="text-4xl mb-4 block">
              {contractStatus === 'UPLOADED' ? '⏳' :
               contractStatus === 'CONFIRMED' ? '🎉' : '❌'}
            </span>
            <h3 className="text-lg font-semibold text-white mb-2">
              {contractStatus === 'UPLOADED' ? 'Contrat en cours de vérification' :
               contractStatus === 'CONFIRMED' ? 'Contrat Approuvé!' : 'Contrat Rejeté'}
            </h3>
            <p className="text-gray-400">
              {contractStatus === 'UPLOADED' ? 
                'Votre contrat est en cours d\'examen par l\'administration. Vous recevrez une notification dès qu\'une décision sera prise.' :
               contractStatus === 'CONFIRMED' ? 
                'Félicitations! Votre contrat a été approuvé. Vous pouvez maintenant continuer avec les prochaines étapes de votre dossier.' :
                'Votre contrat a été rejeté. Veuillez contacter le support pour plus d\'informations.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractSection;