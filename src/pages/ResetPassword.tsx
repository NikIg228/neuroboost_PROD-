import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/lib/supabase'
import { Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ResetPassword: React.FC = () => {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [canUpdate, setCanUpdate] = useState(false)
  const [tokenChecked, setTokenChecked] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')

    const exchangeCode = async (token: string) => {
      const { error } = await supabase.auth.exchangeCodeForSession(token)
      if (error) {
        setError(t('resetPassword.invalidLink'))
        setCanUpdate(false)
      } else {
        setCanUpdate(true)
      }
      setTokenChecked(true)
    }

    if (code) {
      exchangeCode(code)
    } else {
      supabase.auth.getSession().then(({ data }) => {
        setCanUpdate(!!data.session)
        if (!data.session) {
          setError(t('resetPassword.invalidLink'))
        }
        setTokenChecked(true)
      })
    }
  }, [t])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canUpdate) {
      setError(t('resetPassword.invalidLink'))
      return
    }
    if (password.length < 6) {
      setError(t('resetPassword.tooShort'))
      return
    }
    if (password !== confirmPassword) {
      setError(t('resetPassword.mismatch'))
      return
    }
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setMessage(t('resetPassword.success'))
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => navigate('/login'), 2500)
    } catch (err: any) {
      setError(err.message || t('resetPassword.generalError'))
    } finally {
      setLoading(false)
    }
  }

  if (!tokenChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('resetPassword.title')}</h1>
        <p className="text-sm text-gray-500 mb-6">{t('resetPassword.description')}</p>

        {message && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('resetPassword.newPassword')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('resetPassword.newPasswordPlaceholder')}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('resetPassword.confirmPassword')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? t('resetPassword.saving') : t('resetPassword.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword

