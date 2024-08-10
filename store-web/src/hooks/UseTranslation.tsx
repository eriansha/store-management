import { Language, useLanguage } from '@/provider/LanguageProvider'
import { useCallback } from 'react'

type TranslationKeys = 'LOG_IN' |
  'LOG_OUT' |
  'CANCEL' |
  'LOGIN_FORGET_PASSWORD_DESC' |
  'LOGIN_CHANGE_PASSWORD' |
  'EMAIL' |
  'PASSWORD' |
  'FORGET_PASSWORD' |
  'REQUIRED_FIELD' |
  'ENTER_YOUR_EMAIL' |
  'ENTER_YOUR_PASSWORD' |
  'FIND_STORE_NAME' |
  'STORE_LIST' |
  'ADD_NEW_STORE' |
  'ADD_NEW_STORE_DESC' |
  'TODAY_INCOME' |
  'TODAY_MONTHLY_INCOME' |
  'TOTAL_STORE' |
  'TOTAL_STORE_DESC' |
  'TOTAL_TRANSACTION' |
  'OFFICIAL_COMPANY_NAME_LABEL' |
  'BRAND_NAME_LABEL' |
  'OFFICIAL_COMPANY_PLACEHOLDER' |
  'BRAND_NAME_PLACEHOLDER' |
  'COMPANY_SCALE_LABEL' |
  'COMPANY_CATEGORY_LABEL' |
  'SELECT_COMPANY_SCALE' |
  'SELECT_COMPANY_CATEGORY' |
  'NEW_STORE_TNC' |
  'STORE_SUBMISSION_VERIFICATION_PROCESS_LABEL' |
  'CONFIRM_LOGOUT_DESC' |
  'PAGE_UNDER_CONSTRUCTION'

type Translations = {
  [key in Language]: {
    [key in TranslationKeys]: string
  }
}

const translations: Translations = {
  en: {
    EMAIL: 'Email',
    PASSWORD: 'Password',
    CANCEL: 'Cancel',
    LOG_IN: 'Log In',
    LOG_OUT: 'Log Out',
    LOGIN_FORGET_PASSWORD_DESC: 'Already have account?',
    LOGIN_CHANGE_PASSWORD: 'Change Password',
    FORGET_PASSWORD: 'Forget Your Password',
    REQUIRED_FIELD: 'This field is required',
    ENTER_YOUR_PASSWORD: 'Enter Your Password',
    ENTER_YOUR_EMAIL: 'Enter Your Email',
    FIND_STORE_NAME: 'Find store name',
    STORE_LIST: 'Store List',
    ADD_NEW_STORE: 'Add new store',
    ADD_NEW_STORE_DESC: 'Lets add new store, so the business runs well',
    TODAY_INCOME: 'Today Income',
    TODAY_MONTHLY_INCOME: 'Today Monthly Income',
    TOTAL_STORE: 'Total Store',
    TOTAL_STORE_DESC: 'Number of stores you own',
    TOTAL_TRANSACTION: 'Total Transaction',
    OFFICIAL_COMPANY_NAME_LABEL: 'Official Company Name',
    BRAND_NAME_LABEL: 'Brand Name',
    OFFICIAL_COMPANY_PLACEHOLDER: 'Please input Official Company Name',
    BRAND_NAME_PLACEHOLDER: 'Please input Brand Name',
    COMPANY_SCALE_LABEL: 'Company Scale',
    COMPANY_CATEGORY_LABEL: 'Company Category',
    SELECT_COMPANY_SCALE: 'Select company scale',
    SELECT_COMPANY_CATEGORY: 'Select company category',
    NEW_STORE_TNC: 'I agree with Terms and Condition QRIS Merchant Service',
    STORE_SUBMISSION_VERIFICATION_PROCESS_LABEL: 'Submission verification process',
    CONFIRM_LOGOUT_DESC: "Are you sure you want to logout? You'll need to login again to access your account",
    PAGE_UNDER_CONSTRUCTION: "This page is under construction"
  },
  id: {
    EMAIL: 'Email',
    PASSWORD: 'Kata Sandi',
    CANCEL: 'Kembali',
    LOG_IN: 'Masuk',
    LOG_OUT: 'Keluar',
    LOGIN_FORGET_PASSWORD_DESC: 'Sudah punya akun?',
    LOGIN_CHANGE_PASSWORD: 'Ubah Password',
    FORGET_PASSWORD: 'Lupa Kata Kunci',
    REQUIRED_FIELD: 'Harus diisi',
    ENTER_YOUR_PASSWORD: 'Masukkan Kata Kunci Anda',
    ENTER_YOUR_EMAIL: 'Masukkan Email Anda',
    FIND_STORE_NAME: 'Cari nama toko',
    STORE_LIST: 'Daftar Toko',
    ADD_NEW_STORE: 'Tambah toko baru',
    ADD_NEW_STORE_DESC: 'Tambah toko baru agar bisnis berjalan sukses',
    TODAY_INCOME: 'Penghasilan Hari Ini',
    TODAY_MONTHLY_INCOME: 'Penghasilan Bulan Ini',
    TOTAL_STORE: 'Jumlah Toko',
    TOTAL_STORE_DESC: 'Jumlah toko yang kamu miliki',
    TOTAL_TRANSACTION: 'Jumlah Transaksi',
    OFFICIAL_COMPANY_NAME_LABEL: 'Nama Perusahaan Resmi',
    BRAND_NAME_LABEL: 'Nama Brand',
    OFFICIAL_COMPANY_PLACEHOLDER: 'Masukkan nama Perusahaan Resmi',
    BRAND_NAME_PLACEHOLDER: 'Masukan nama Brand',
    COMPANY_SCALE_LABEL: 'Skala Perusahaan',
    COMPANY_CATEGORY_LABEL: 'Kategori Perusahaan',
    SELECT_COMPANY_SCALE: 'Pilih skala perusahaan',
    SELECT_COMPANY_CATEGORY: 'Pilih kategori perusahaan',
    NEW_STORE_TNC: 'Saya setuju dengan Syarat dan Ketentuan berlaku dari QRIS Merchant Service',
    STORE_SUBMISSION_VERIFICATION_PROCESS_LABEL: 'Verifikasi pengajuan sedang diproses',
    CONFIRM_LOGOUT_DESC: "Apakah kamu yakin ingin keluar? Kamu perlu melakukan login lagi untuk mengakses akunmu",
    PAGE_UNDER_CONSTRUCTION: "Halaman ini sedang dalam perbaikan"
  },
}

const useTranslation = () => {
  const { language } = useLanguage()

  const t = useCallback((key: TranslationKeys): string => {
    return translations[language][key] || key
  }, [language])

  return { t }
}

export default useTranslation
