import { useLanguage } from '@/provider/LanguageProvider'

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage()

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value

    if (value === 'id') {
      changeLanguage('id')
    } else {
      changeLanguage('en')
    }
  }

  return (
    <select value={language} className='text-right outline-none' onChange={handleChangeLanguage}>
      <option value="en">English</option>
      <option value="id">Bahasa Indonesia</option>
    </select>
  )
}

export default LanguageSwitcher
