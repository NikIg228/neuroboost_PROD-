import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, Order, Favorite } from '../lib/supabase'
import { services } from '../data/services'
import AnimatedSection from '../components/AnimatedSection'
import PurchaseModal from '../components/PurchaseModal'
import { User, Mail, Lock, LogOut, Package, Calendar, DollarSign, Heart, Trash2 } from 'lucide-react'
import { Service } from '../types'

const Profile: React.FC = () => {
  const { user, signOut, updateProfile, updatePassword } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [favoriteServices, setFavoriteServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [favoritesLoading, setFavoritesLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [purchaseService, setPurchaseService] = useState<Service | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    password: ''
  })

  useEffect(() => {
    fetchOrders()
    fetchFavorites()
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
      setFavorites(data || [])
      
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
      
      if (profileData.name !== user?.user_metadata?.name) {
        updates.name = profileData.name
      }
      
      if (profileData.email !== user?.email) {
        updates.email = profileData.email
      }

      if (Object.keys(updates).length > 0) {
        const { error } = await updateProfile(updates)
        if (error) throw error
      }

      if (profileData.password) {
        const { error } = await updatePassword(profileData.password)
        if (error) throw error
      }

      setMessage('Профиль успешно обновлен')
      setProfileData({ ...profileData, password: '' })
    } catch (err: any) {
      setError(err.message || 'Ошибка при обновлении профиля')
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
        return 'Оплачен'
      case 'pending':
        return 'Ожидает оплаты'
      case 'cancelled':
        return 'Отменен'
      case 'failed':
        return 'Ошибка оплаты'
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
              <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
              <button
                onClick={handleSignOut}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Выйти
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Информация профиля
                </h2>
                
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

                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя
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
                      Email
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
                      Новый пароль (оставьте пустым, если не хотите менять)
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="password"
                        value={profileData.password}
                        onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Новый пароль"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
                  >
                    {loading ? 'Сохранение...' : 'Сохранить изменения'}
                  </button>
                </form>
              </div>

              {/* User Stats */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Статистика
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                        <div className="text-blue-600 text-sm">Всего заказов</div>
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
                        <div className="text-green-600 text-sm">Оплаченных заказов</div>
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
              Мои избранные тарифы
            </h2>
            
            {favoritesLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : favoriteServices.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">У вас пока нет избранных тарифов</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteServices.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm">{service.title}</h3>
                      <button
                        onClick={() => handleRemoveFavorite(service.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">{service.price}</span>
                      <button
                        onClick={() => handlePurchase(service)}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        Купить
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">История заказов</h2>
            
            {ordersLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">У вас пока нет заказов</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Услуга
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Сумма
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата
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
    </div>
  )
}

export default Profile