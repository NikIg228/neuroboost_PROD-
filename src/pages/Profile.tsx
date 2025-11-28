import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Order } from '../lib/supabase'
import { services } from '@/data/services'
import { useCurrency } from '@/contexts/CurrencyContext'
import AnimatedSection from '@/components/AnimatedSection'
import PurchaseModal from '@/components/PurchaseModal'
import { User, Mail, Lock, LogOut, Package, Calendar, DollarSign, Heart, Trash2, X } from 'lucide-react'
import { Service } from '@/types/index'

const Profile: React.FC = () => {
  const { t } = useTranslation('profile')
  const { t: tServices } = useTranslation('services')
  const { user, signOut, updateProfile } = useAuth()
  const { formatPrice, convertPrice } = useCurrency()
  const [orders, setOrders] = useState<Order[]>([])
  const [favoriteServices, setFavoriteServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [favoritesLoading, setFavoritesLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [purchaseService, setPurchaseService] = useState<Service | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    fetchOrders()
    fetchFavorites()
  }, [user])

  useEffect(() => {
    setProfileData({
      name: user?.user_metadata?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: ''
    })
  }, [user])

  const fetchOrders = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error('Error fetching orders:', err)
    } finally {
      setOrdersLoading(false)
    }
  }

  const fetchFavorites = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      // Get service details for favorites
      const favoriteServicesList = (data || [])
        .map(fav => services.find(service => service.id === fav.product_id))
        .filter(Boolean) as Service[]
      
      setFavoriteServices(favoriteServicesList)
    } catch (err) {
      console.error('Error fetching favorites:', err)
    } finally {
      setFavoritesLoading(false)
    }
  }

  const handleRemoveFavorite = async (productId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)

      if (error) throw error
      await fetchFavorites()
    } catch (err) {
      console.error('Error removing favorite:', err)
    }
  }

  const handlePurchase = (service: Service) => {
    setPurchaseService(service)
    setIsPurchaseModalOpen(true)
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const updates: any = {}
      const emailChanged = profileData.email !== user?.email
      const passwordChanged = Boolean(profileData.password)

      if (profileData.password && profileData.password !== profileData.confirmPassword) {
        throw new Error(t('profileInfo.passwordMismatch'))
      }
      
      if (profileData.name !== user?.user_metadata?.name) {
        updates.name = profileData.name
      }
      
      if (emailChanged) {
        updates.email = profileData.email
      }

      if (Object.keys(updates).length > 0) {
        const { error } = await updateProfile(updates)
        if (error) throw error
      }

      if (passwordChanged) {
        const { error } = await supabase.auth.resetPasswordForEmail(profileData.email, {
          redirectTo: `${window.location.origin}/reset-password`
        })
        if (error) throw error
      }

      if (emailChanged && passwordChanged) {
        setMessage(t('profileInfo.bothConfirmation'))
      } else if (emailChanged) {
        setMessage(t('profileInfo.emailConfirmation'))
      } else if (passwordChanged) {
        setMessage(t('profileInfo.passwordConfirmation'))
      } else {
        setMessage(t('profileInfo.success'))
      }

      setProfileData({ ...profileData, password: '', confirmPassword: '' })
      setIsEditModalOpen(false)
    } catch (err: any) {
      setError(err.message || t('profileInfo.error'))
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return t('orders.statuses.paid')
      case 'pending':
        return t('orders.statuses.pending')
      case 'cancelled':
        return t('orders.statuses.cancelled')
      case 'failed':
        return t('orders.statuses.failed')
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
              <button
                onClick={handleSignOut}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                {t('logout')}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Info */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t('profileInfo.title')}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    {t('profileInfo.editButton')}
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-xl p-4 flex items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('profileInfo.name')}</p>
                      <p className="text-lg font-semibold text-gray-900">{profileData.name || '—'}</p>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4 flex items-start gap-4">
                    <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('profileInfo.email')}</p>
                      <p className="text-lg font-semibold text-gray-900">{profileData.email || '—'}</p>
                    </div>
                  </div>
                </div>

                {message && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

              </div>

              {/* User Stats */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('stats.title')}
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                        <div className="text-blue-600 text-sm">{t('stats.totalOrders')}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <DollarSign className="h-8 w-8 text-green-600 mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {orders.filter(o => o.status === 'paid').length}
                        </div>
                        <div className="text-green-600 text-sm">{t('stats.paidOrders')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Favorites Section */}
        <AnimatedSection delay={300}>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Heart className="h-6 w-6 text-red-500 mr-2" />
              {t('favorites.title')}
            </h2>
            
            {favoritesLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : favoriteServices.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{t('favorites.empty')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteServices.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm">{tServices(service.title)}</h3>
                      <button
                        onClick={() => handleRemoveFavorite(service.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tServices(service.description)}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">{formatPrice(convertPrice(parseInt(service.price.replace(/\D/g, ''))))}</span>
                      <button
                        onClick={() => handlePurchase(service)}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        {t('favorites.buy')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Orders Table */}
        <AnimatedSection delay={400}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('orders.title')}</h2>
            
            {ordersLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{t('orders.empty')}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('orders.service')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('orders.amount')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('orders.status')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('orders.date')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.product_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.amount.toLocaleString()} тг
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(order.created_at).toLocaleDateString('ru-RU')}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>

      <PurchaseModal
        service={purchaseService}
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => {
                setIsEditModalOpen(false)
                setProfileData({
                  name: user?.user_metadata?.name || '',
                  email: user?.email || '',
                  password: '',
                  confirmPassword: ''
                })
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('profileInfo.modalTitle')}</h3>
            <p className="text-sm text-gray-500 mb-6">{t('profileInfo.modalDescription')}</p>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profileInfo.name')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profileInfo.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profileInfo.newPassword')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="password"
                    value={profileData.password}
                    onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('profileInfo.newPasswordPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profileInfo.confirmPassword')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('profileInfo.confirmPasswordPlaceholder')}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false)
                    setProfileData({
                      name: user?.user_metadata?.name || '',
                      email: user?.email || '',
                      password: '',
                      confirmPassword: ''
                    })
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {t('profileInfo.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
                >
                  {loading ? t('profileInfo.saving') : t('profileInfo.saveChanges')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile