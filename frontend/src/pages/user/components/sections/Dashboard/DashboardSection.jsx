import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import dashboardService from '../../../../../api/dashboardService';
import axiosInstance from '../../../../../api/axiosInstance';

const DashboardSection = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    appointments: [],
    messages: [],
    contract: null,
    dossier: null,
    announcements: [],
    payments: [],
    payment: null,
    stats: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get all dashboard data in parallel
      const [
        appointmentsData,
        messagesData,
        contractData,
        dossierData,
        announcementsData,
        paymentsData,
        paymentData,
        statsData
      ] = await Promise.all([
        dashboardService.getLatestAppointments(user.id, 5).catch(() => ({ data: [] })),
        dashboardService.getLatestMessages(user.id, 5).catch(() => ({ data: [] })),
        dashboardService.getContractInfo(user.id).catch(() => ({ data: null })),
        dashboardService.getDossierInfo(user.id).catch(() => ({ data: null })),
        dashboardService.getLatestAnnouncements(3).catch(() => ({ data: [] })),
        dashboardService.getPaymentInfo(user.id).catch(() => ({ data: [] })),
        dashboardService.getLatestPayment(user.id).catch(() => ({ data: null })),
        dashboardService.getDashboardStats(user.id).catch(() => ({ data: null }))
      ]);

      // Process payment data
      let processedPayment = null;
      let processedPayments = [];
      
      if (paymentsData && paymentsData.success) {
        processedPayments = paymentsData.data || [];
        console.log('✅ All payments fetched:', processedPayments);
        
        if (processedPayments.length > 0) {
          processedPayment = processedPayments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          console.log('✅ Latest payment found:', processedPayment);
        }
      }

      // Calculate payment stats locally
      const calculatePaymentStats = () => {
        if (!processedPayments || processedPayments.length === 0) {
          return {
            totalPayments: 0,
            paidPayments: 0,
            pendingPayments: 0,
            totalRemaining: 0
          };
        }

        const totalPayments = processedPayments.length;
        const paidPayments = processedPayments.filter(p => p.status === 'PAID').length;
        const pendingPayments = processedPayments.filter(p => p.status !== 'PAID').length;
        const totalRemaining = processedPayments
          .filter(p => p.status !== 'PAID')
          .reduce((sum, p) => sum + (p.prixReste || 0), 0);

        return {
          totalPayments,
          paidPayments,
          pendingPayments,
          totalRemaining
        };
      };

      const paymentStats = calculatePaymentStats();

      setDashboardData({
        appointments: appointmentsData.data || [],
        messages: messagesData.data || [],
        contract: contractData.data || null,
        dossier: dossierData.data || null,
        announcements: announcementsData.data || [],
        payments: processedPayments,
        payment: processedPayment,
        paymentStats: paymentStats,
        stats: statsData.data || null
      });

      console.log('=== DASHBOARD DATA FETCHED ===');
      console.log('Appointments:', appointmentsData.data);
      console.log('Messages:', messagesData.data);
      console.log('Contract:', contractData.data);
      console.log('Dossier:', dossierData.data);
      console.log('Announcements:', announcementsData.data);
      console.log('Payments raw response:', paymentsData);
      console.log('Payment raw response:', paymentData);
      console.log('Payment processed:', processedPayment);
      console.log('All payments processed:', processedPayments);
      console.log('Payment stats calculated:', paymentStats);
      console.log('Stats:', statsData.data);
      
      // Debug payment data specifically
      if (paymentsData) {
        console.log('Payments API success:', paymentsData.success);
        console.log('Payments API data array:', paymentsData.data);
        console.log('Payments API data length:', paymentsData.data?.length);
        console.log('Payments API data type:', typeof paymentsData.data);
        console.log('PaymentsData structure:', JSON.stringify(paymentsData, null, 2));
      } else {
        console.log('❌ Payments API returned no data');
        console.log('PaymentsData object:', paymentsData);
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Erreur lors du chargement des données du tableau de bord');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDossierProgress = (dossier) => {
    if (!dossier) return 0;
    
    // Calculate progress based on completed steps
    const completedSteps = [
      dossier.traductionStatus === 'VALIDE',
      dossier.inscriptionStatus === 'VALIDE',
      dossier.visaStatus === 'VALIDE'
    ].filter(Boolean).length;
    
    const progress = Math.round((completedSteps / 3) * 100);
    
    console.log('Dossier progress calculation:', {
      traductionStatus: dossier.traductionStatus,
      inscriptionStatus: dossier.inscriptionStatus,
      visaStatus: dossier.visaStatus,
      completedSteps,
      progress
    });
    
    return progress;
  };

  if (loading) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div>Chargement du tableau de bord...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#ef4444'
      }}>
        <div>⚠️ {error}</div>
      </div>
    );
  }

  // Helper components and styles
const cardStyle = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '1rem',
  padding: '1.25rem',
  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
};

const CardHeader = ({ icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
    <span style={{
      fontSize: '1.5rem',
      width: '40px', height: '40px',
      display: 'grid', placeItems: 'center',
      background: 'rgba(255,255,255,0.07)',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.1)',
      flexShrink: 0
    }}>{icon}</span>
    <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, letterSpacing: '-0.01em' }}>
      {title}
    </h3>
  </div>
);

const EmptyState = ({ text }) => (
  <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, fontStyle: 'italic' }}>{text}</p>
);

  return (
    <div style={{ padding: '2rem', color: 'white' }}>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem',
          letterSpacing: '-0.5px',
          display: 'inline-block'
        }}>
          Tableau de Bord
        </h2>
        <p style={{ fontSize: '1rem', color: '#e5e7eb', margin: 0 }}>
          Bienvenue sur votre tableau de bord personnel
        </p>
      </div>

      {/* ── Main grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'auto auto',
        gridTemplateAreas: `
          "annonces annonces paiement"
          "messages contrat  paiement"
        `,
        gap: '1.25rem',
        marginBottom: '1.5rem',
      }}>

        {/* Responsive override via a <style> tag injected once */}
        <style>{`
          @media (max-width: 768px) {
            .dash-grid {
              grid-template-columns: 1fr 1fr !important;
              grid-template-areas:
                "annonces annonces"
                "paiement paiement"
                "messages contrat" !important;
            }
          }
          @media (max-width: 480px) {
            .dash-grid {
              grid-template-columns: 1fr !important;
              grid-template-areas:
                "annonces"
                "paiement"
                "messages"
                "contrat" !important;
            }
          }
        `}</style>

        {/* ── Annonces ── */}
        <div className="dash-grid" style={{
          gridArea: 'annonces',
          ...cardStyle
        }}>
          <CardHeader icon="📢" title="Annonces" />
          {dashboardData.announcements && dashboardData.announcements.length > 0 ? (
            <div style={{
              padding: '0.75rem',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '0.5rem',
            }}>
              <p style={{ color: '#e5e7eb', fontWeight: '600', fontSize: '0.9rem', margin: '0 0 0.25rem' }}>
                {dashboardData.announcements[0].title}
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.78rem', margin: '0 0 0.25rem' }}>
                {formatDate(dashboardData.announcements[0].createdAt)}
              </p>
              {dashboardData.announcements[0].content && (
                <p style={{ color: '#9ca3af', fontSize: '0.78rem', margin: 0 }}>
                  {dashboardData.announcements[0].content.substring(0, 120)}...
                </p>
              )}
            </div>
          ) : (
            <EmptyState text="Aucune annonce disponible" />
          )}
        </div>

        {/* ── Paiement ── */}
      <div
  style={{
    gridArea: 'paiement',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    ...cardStyle,
    position: 'relative',
    overflow: 'hidden'
  }}
>
  {/* Subtle gradient overlay */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, transparent 50%, rgba(168, 85, 247, 0.05) 100%)',
    pointerEvents: 'none'
  }} />

  <div style={{ position: 'relative', zIndex: 2 }}>
    <CardHeader icon="💳" title="Paiement" />

    {dashboardData.payment ? (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>

        {/* Status Badge - Top Right */}
        <div style={{
          position: 'absolute',
          top: '1.75rem',
          right: '1.75rem'
        }}>
          <span style={{
            fontSize: '0.7rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontWeight: '600',
            color: dashboardData.payment.status === 'PAID' ? '#10b981' : '#f59e0b',
            background: dashboardData.payment.status === 'PAID'
              ? 'rgba(16,185,129,0.15)'
              : 'rgba(245,158,11,0.15)',
            border: `1px solid ${dashboardData.payment.status === 'PAID'
              ? 'rgba(16,185,129,0.3)'
              : 'rgba(245,158,11,0.3)'}`
          }}>
            {dashboardData.payment.status === 'PAID' ? '✅ Payé' : '⏳ En attente'}
          </span>
        </div>

        {/* Main Amount Display - Stripe Style */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#ffffff',
            lineHeight: 1,
            marginBottom: '0.5rem',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}>
            {(dashboardData.payment.prixPaye || 0).toFixed(2)} DT
          </div>
          <div style={{ 
            fontSize: '0.85rem', 
            color: '#9ca3af',
            marginBottom: '1.5rem'
          }}>
             Payment.id #{dashboardData.payment.id}
          </div>
        </div>

        {/* Amount Details */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '0.75rem',
          padding: '1rem',
          marginBottom: 'auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Total</span>
            <span style={{ color: '#e5e7eb', fontSize: '0.95rem', fontWeight: '600' }}>
              {(dashboardData.payment.prixTotal || 0).toFixed(2)} DT
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Payé</span>
            <span style={{ color: '#10b981', fontSize: '0.95rem', fontWeight: '600' }}>
              {(dashboardData.payment.prixPaye || 0).toFixed(2)} DT
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '0.75rem'
          }}>
            <span style={{ color: '#e5e7eb', fontSize: '0.9rem', fontWeight: '600' }}>Reste</span>
            <span style={{ 
              color: '#f59e0b', 
              fontSize: '1.1rem', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {Math.max(0, (dashboardData.payment.prixTotal || 0) - (dashboardData.payment.prixPaye || 0)).toFixed(2)} DT
            </span>
          </div>
        </div>

        {/* Progress Bar - Always at Bottom */}
        <div style={{ marginTop: '1.5rem' }}>
          {(() => {
            const pct = dashboardData.payment.prixTotal > 0
              ? Math.round((dashboardData.payment.prixPaye / dashboardData.payment.prixTotal) * 100)
              : 0;

            return (
              <>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ color: '#9ca3af' }}>Progression</span>
                  <span style={{ color: '#e5e7eb', fontWeight: '600' }}>{pct}%</span>
                </div>

                <div style={{
                  height: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                    borderRadius: '999px',
                    transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
                    boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)'
                  }} />
                </div>
              </>
            );
          })()}
        </div>

      </div>
    ) : (
      <EmptyState text="Aucun paiement trouvé" />
    )}
  </div>
</div>

        {/* ── Messages ── */}
        <div style={{ gridArea: 'messages', ...cardStyle }}>
          <CardHeader icon="💬" title="Messages" />
          {dashboardData.messages && dashboardData.messages.length > 0 ? (
            <>
              <p style={{ fontSize: '0.88rem', color: '#e5e7eb', margin: '0 0 0.25rem' }}>
                De: <strong>{dashboardData.messages[0].sender || 'Inconnu'}</strong>
              </p>
              <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '0 0 0.4rem' }}>
                {formatDate(dashboardData.messages[0].createdAt)} · {formatTime(dashboardData.messages[0].createdAt)}
              </p>
              <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>
                {dashboardData.messages[0].content?.substring(0, 60)}...
              </p>
            </>
          ) : (
            <EmptyState text="Aucun message reçu" />
          )}
        </div>

        {/* ── Contrat ── */}
        <div style={{ gridArea: 'contrat', ...cardStyle }}>
          <CardHeader icon="📄" title="Contrat" />
          {dashboardData.contract ? (
            <>
              <p style={{ fontSize: '0.88rem', color: '#e5e7eb', margin: '0 0 0.25rem' }}>
                Statut: <strong>{dashboardData.contract.status || 'En cours'}</strong>
              </p>
              <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>
                Type: {dashboardData.contract.type || "Contrat d'admission"}
              </p>
            </>
          ) : (
            <EmptyState text="Aucun contrat disponible" />
          )}
        </div>

      </div>

      {/* General Progress Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '0.75rem',
        padding: '1rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Mobile Responsive Styles */}
        <style>{`
          @media (max-width: 768px) {
            .progress-section {
              padding: 0.75rem !important;
              margin-bottom: 1.5rem !important;
            }
            .progress-header {
              margin-bottom: 1rem !important;
            }
            .progress-header h3 {
              font-size: 1.1rem !important;
            }
            .progress-display {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
              padding: 1rem !important;
              margin-bottom: 1.5rem !important;
            }
            .progress-percentage {
              font-size: 2.5rem !important;
              margin-bottom: 0.5rem !important;
            }
            .progress-status {
              margin-top: 1rem !important;
              align-self: center !important;
            }
            .steps-count {
              margin-bottom: 1.5rem !important;
              font-size: 0.85rem !important;
            }
            .timeline {
              padding: 1rem 0 !important;
            }
            .timeline-line {
              left: 20px !important;
              right: auto !important;
              width: 2px !important;
              height: 100% !important;
              top: 0 !important;
              transform: none !important;
            }
            .timeline-steps {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1.5rem !important;
            }
            .timeline-step {
              flex: none !important;
              text-align: left !important;
              display: flex !important;
              align-items: center !important;
              gap: 1rem !important;
            }
            .timeline-step-circle {
              margin: 0 !important;
              flex-shrink: 0 !important;
            }
            .timeline-step-content {
              flex: 1 !important;
            }
          }
          @media (max-width: 480px) {
            .progress-section {
              padding: 0.5rem !important;
              margin-bottom: 1rem !important;
            }
            .progress-header h3 {
              font-size: 1rem !important;
            }
            .progress-percentage {
              font-size: 2rem !important;
            }
            .timeline-step-circle {
              width: 28px !important;
              height: 28px !important;
              font-size: 0.7rem !important;
            }
            .timeline-step-title {
              font-size: 0.7rem !important;
            }
            .timeline-step-number {
              font-size: 0.65rem !important;
            }
          }
        `}</style>
        {/* Decorative gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="progress-header" style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <div style={{
              fontSize: '1.5rem',
              marginRight: '0.5rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3))'
            }}>
              
            </div>
            <h3 style={{ 
              fontSize: '1.2rem', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px'
            }}>
              Progression générale
            </h3>
          </div>
          
          <div className="progress-display" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            padding: '0.75rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '0.5rem',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div>
              <div className="progress-percentage" style={{ 
                fontSize: '2rem', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1
              }}>
                100%
              </div>
              <div style={{ fontSize: '0.7rem', color: '#6ee7b7', marginTop: '0.25rem' }}>
                Complété
              </div>
            </div>
            <div className="progress-status" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}>
              <span style={{ 
                fontSize: '0.8rem', 
                padding: '0.25rem 0.75rem',
                borderRadius: '0.25rem',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Statut: Actif
              </span>
            </div>
          </div>
          
          <div className="steps-count" style={{
            fontSize: '0.9rem',
            color: '#9ca3af',
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            Étapes complétées: <span style={{ color: '#ffffff', fontWeight: '700' }}>3 / 3</span>
          </div>
          
          {/* Timeline */}
          <div className="timeline" style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1rem'
          }}>
            {/* Timeline Line */}
            <div className="timeline-line" style={{
              position: 'absolute',
              top: '50%',
              left: '1rem',
              right: '1rem',
              height: '2px',
              background: 'linear-gradient(90deg, #10b981 0%, #059669 50%, #10b981 100%)',
              transform: 'translateY(-50%)',
              zIndex: 1
            }} />
            
            {/* Timeline Steps */}
            <div className="timeline-steps" style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              position: 'relative',
              zIndex: 2
            }}>
              <div className="timeline-step" style={{ textAlign: 'center' }}>
                <div className="timeline-step-circle" style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.5rem',
                  fontSize: '0.8rem',
                  color: 'white',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  border: '2px solid rgba(16, 185, 129, 0.3)'
                }}>
                  1
                </div>
                <div className="timeline-step-content">
                  <div className="timeline-step-title" style={{ 
                    fontSize: '0.75rem', 
                    color: '#d1fae5',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Inscription
                  </div>
                  <div className="timeline-step-number" style={{
                    fontSize: '0.65rem',
                    color: '#22c55e',
                    fontWeight: '500',
                    marginTop: '0.25rem'
                  }}>
                    Étape 1
                  </div>
                </div>
              </div>
              
              <div className="timeline-step" style={{ textAlign: 'center' }}>
                <div className="timeline-step-circle" style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.5rem',
                  fontSize: '0.8rem',
                  color: 'white',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  border: '2px solid rgba(16, 185, 129, 0.3)'
                }}>
                  2
                </div>
                <div className="timeline-step-content">
                  <div className="timeline-step-title" style={{ 
                    fontSize: '0.75rem', 
                    color: '#d1fae5',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Validation
                  </div>
                  <div className="timeline-step-number" style={{
                    fontSize: '0.65rem',
                    color: '#22c55e',
                    fontWeight: '500',
                    marginTop: '0.25rem'
                  }}>
                    Étape 2
                  </div>
                </div>
              </div>
              
              <div className="timeline-step" style={{ textAlign: 'center' }}>
                <div className="timeline-step-circle" style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.5rem',
                  fontSize: '0.8rem',
                  color: 'white',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  border: '2px solid rgba(16, 185, 129, 0.3)'
                }}>
                  3
                </div>
                <div className="timeline-step-content">
                  <div className="timeline-step-title" style={{ 
                    fontSize: '0.75rem', 
                    color: '#d1fae5',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Finalisation
                  </div>
                  <div className="timeline-step-number" style={{
                    fontSize: '0.65rem',
                    color: '#22c55e',
                    fontWeight: '500',
                    marginTop: '0.25rem'
                  }}>
                    Étape 3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Section */}
    
    </div>
  );
};

export default DashboardSection;