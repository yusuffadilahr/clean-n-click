'use client' 

import { MapPin, AlertTriangle, RefreshCw, Chrome, Smartphone, Settings, ExternalLink, Ban } from 'lucide-react'
import { useState } from 'react'

export default function LocationPermissionResetPage() { 
    const [activeTab, setActiveTab] = useState('desktop')

    return ( 
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-red-200">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg">
                            <Ban className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Akses Lokasi Ditolak</h1>
                            <p className="text-sm text-red-600">Perlu reset permission untuk melanjutkan</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Alert Banner */}
                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white mb-8 shadow-xl">
                    <div className="flex items-center space-x-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">⛔ Izin Lokasi Telah Ditolak</h2>
                            <p className="text-white/90 text-lg">
                                Aplikasi memerlukan akses lokasi untuk berfungsi. Anda perlu mengatur ulang permission di browser Anda.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Status Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden sticky top-24">
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <MapPin className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Status Permission</h3>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                                    <span className="font-medium text-red-800">Lokasi</span>
                                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">DITOLAK</span>
                                </div>
                                
                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Yang Perlu Dilakukan:</h4>
                                    <ul className="text-sm text-yellow-700 space-y-1">
                                        <li>✅ Reset permission browser</li>
                                        <li>✅ Izinkan akses lokasi</li>
                                        <li>✅ Refresh halaman</li>
                                        <li>✅ Coba aplikasi lagi</li>
                                    </ul>
                                </div>
                                
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Coba Lagi</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Instructions Panel */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                                <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                                    <Settings className="w-6 h-6 mr-3" />
                                    Cara Reset Permission Lokasi
                                </h3>
                                <p className="text-white/90">
                                    Ikuti langkah-langkah berikut untuk mengatur ulang izin lokasi
                                </p>
                            </div>

                            {/* Tab Navigation */}
                            <div className="flex border-b border-gray-200">
                                <button 
                                    onClick={() => setActiveTab('desktop')}
                                    className={`flex-1 py-4 px-6 font-medium transition-colors flex items-center justify-center space-x-2 ${activeTab === 'desktop' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-800'}`}
                                >
                                    <Chrome className="w-4 h-4" />
                                    <span>Desktop/Laptop</span>
                                </button>
                                <button 
                                    onClick={() => setActiveTab('mobile')}
                                    className={`flex-1 py-4 px-6 font-medium transition-colors flex items-center justify-center space-x-2 ${activeTab === 'mobile' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-800'}`}
                                >
                                    <Smartphone className="w-4 h-4" />
                                    <span>Mobile</span>
                                </button>
                            </div>

                            <div className="p-8">
                                {activeTab === 'desktop' && (
                                    <div className="space-y-8">
                                        {/* Chrome Method 1 */}
                                        <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                                            <h4 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
                                                <div className="bg-blue-500 text-white p-1 rounded mr-3">1</div>
                                                🔒 Metode Address Bar (Tercepat)
                                            </h4>
                                            <ol className="space-y-3 text-gray-700">
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">1</span>
                                                    <div>
                                                        <span className="font-semibold">Lihat di sebelah kiri URL</span> - cari ikon <strong>🔒 gembok</strong> atau <strong>⚠️ warning</strong>
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">2</span>
                                                    <div>
                                                        <span className="font-semibold">Klik ikon tersebut</span> - akan muncul popup kecil
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">3</span>
                                                    <div>
                                                        <span className="font-semibold">Cari &apos;Location&apos; atau &apos;Lokasi&apos;</span> - ubah dari <span className="text-red-600 font-bold">&apos;Block/Blokir&apos;</span> ke <span className="text-green-600 font-bold">&apos;Allow/Izinkan&apos;</span>
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">4</span>
                                                    <div>
                                                        <span className="font-semibold">Refresh halaman</span> - tekan <kbd className="bg-gray-200 px-2 py-1 rounded text-sm">F5</kbd> atau <kbd className="bg-gray-200 px-2 py-1 rounded text-sm">Ctrl+R</kbd>
                                                    </div>
                                                </li>
                                            </ol>
                                        </div>

                                        {/* Chrome Method 2 */}
                                        <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                                            <h4 className="font-bold text-green-900 mb-4 text-lg flex items-center">
                                                <div className="bg-green-500 text-white p-1 rounded mr-3">2</div>
                                                ⚙️ Metode Chrome Settings
                                            </h4>
                                            <ol className="space-y-3 text-gray-700">
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">1</span>
                                                    <div>
                                                        Buka Chrome Settings: <kbd className="bg-gray-200 px-2 py-1 rounded text-sm">Ctrl+,</kbd> atau klik menu <strong>⋮</strong> → Settings
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">2</span>
                                                    <div>
                                                        Pilih <strong>&apos;Privacy and Security&apos;</strong> → <strong>&apos;Site Settings&apos;</strong>
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">3</span>
                                                    <div>
                                                        Klik <strong>&apos;Location&apos;</strong> dalam daftar permissions
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">4</span>
                                                    <div>
                                                        Cari domain website ini di <strong>&apos;Blocked&apos;</strong> → klik <strong>&apos;Remove&apos;</strong> atau pindahkan ke <strong>&apos;Allowed&apos;</strong>
                                                    </div>
                                                </li>
                                            </ol>
                                        </div>

                                        {/* Edge Method */}
                                        <div className="border border-purple-200 rounded-xl p-6 bg-purple-50">
                                            <h4 className="font-bold text-purple-900 mb-4 text-lg flex items-center">
                                                <div className="bg-purple-500 text-white p-1 rounded mr-3">3</div>
                                                🌐 Microsoft Edge
                                            </h4>
                                            <ol className="space-y-3 text-gray-700">
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">1</span>
                                                    <div>
                                                        Klik ikon <strong>🔒</strong> di address bar atau menu <strong>⋯</strong> → Settings
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">2</span>
                                                    <div>
                                                        Pilih <strong>&apos;Cookies and Site Permissions&apos;</strong> → <strong>&apos;Location&apos;</strong>
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">3</span>
                                                    <div>
                                                        Reset permission untuk website ini dari <strong>Block</strong> ke <strong>Allow</strong>
                                                    </div>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'mobile' && (
                                    <div className="space-y-8">
                                        {/* Android Chrome */}
                                        <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                                            <h4 className="font-bold text-green-900 mb-4 text-lg flex items-center">
                                                <div className="bg-green-500 text-white p-1 rounded mr-3">📱</div>
                                                Android - Chrome
                                            </h4>
                                            <ol className="space-y-3 text-gray-700">
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">1</span>
                                                    <div>
                                                        Tap ikon <strong>🔒</strong> di sebelah URL atau <strong>ⓘ</strong> info
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">2</span>
                                                    <div>
                                                        Pilih <strong>&apos;Permissions&apos;</strong> atau <strong>&apos;Site Settings&apos;</strong>
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">3</span>
                                                    <div>
                                                        Tap <strong>&apos;Location&apos;</strong> → ubah ke <strong>&apos;Allow&apos;</strong>
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">4</span>
                                                    <div>
                                                        <strong>Pull down</strong> pada halaman untuk refresh
                                                    </div>
                                                </li>
                                            </ol>
                                        </div>

                                        {/* iOS Safari */}
                                        <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                                            <h4 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
                                                <div className="bg-blue-500 text-white p-1 rounded mr-3">🍎</div>
                                                iPhone/iPad - Safari
                                            </h4>
                                            <ol className="space-y-3 text-gray-700">
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">1</span>
                                                    <div>
                                                        Buka <strong>Settings</strong> iPhone → <strong>Safari</strong>
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">2</span>
                                                    <div>
                                                        Scroll ke <strong>&apos;Privacy & Security&apos;</strong> → <strong>&apos;Location&apos;</strong>
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">3</span>
                                                    <div>
                                                        Pastikan Location Service untuk Safari <strong>ON</strong>
                                                    </div>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">4</span>
                                                    <div>
                                                        Kembali ke Safari → tap <strong>aA</strong> di address bar → <strong>Website Settings</strong> → <strong>Location: Allow</strong>
                                                    </div>
                                                </li>
                                            </ol>
                                        </div>

                                        {/* Device Settings */}
                                        <div className="border border-orange-200 rounded-xl p-6 bg-orange-50">
                                            <h4 className="font-bold text-orange-900 mb-4 text-lg flex items-center">
                                                <Settings className="w-5 h-5 mr-2" />
                                                Pengaturan Perangkat
                                            </h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <h5 className="font-semibold text-orange-800 mb-2">Android:</h5>
                                                    <p className="text-sm text-orange-700">Settings → Apps → Chrome → Permissions → Location → Allow</p>
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold text-orange-800 mb-2">iPhone:</h5>
                                                    <p className="text-sm text-orange-700">Settings → Privacy & Security → Location Services → Safari → While Using App</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Troubleshooting */}
                                <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-200">
                                    <h4 className="font-bold text-red-900 mb-4 flex items-center">
                                        <AlertTriangle className="w-5 h-5 mr-2" />
                                        Masih Tidak Bisa? Coba Ini:
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm text-red-800">
                                        <div>
                                            <h5 className="font-semibold mb-2">🔄 Reset Total:</h5>
                                            <ul className="space-y-1">
                                                <li>• Clear cookies dan cache website</li>
                                                <li>• Restart browser sepenuhnya</li>
                                                <li>• Coba mode incognito/private</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-semibold mb-2">📍 Pastikan GPS Aktif:</h5>
                                            <ul className="space-y-1">
                                                <li>• Location service device ON</li>
                                                <li>• Browser permission di OS</li>
                                                <li>• Tidak ada VPN yang memblok</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 mt-12">
                <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-3">🎯 Setelah Reset Permission</h3>
                        <p className="text-white/90 mb-4">
                            Pastikan untuk <strong>refresh halaman ini</strong> dan izinkan akses lokasi ketika browser meminta konfirmasi.
                        </p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 inline-flex items-center space-x-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Muat Ulang Halaman</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ); 
}