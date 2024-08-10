import Button from '@/components/buttons/Button'
import InputField from '@/components/fields/InputField'
import useTranslation from '@/hooks/UseTranslation'
import { useForm } from 'react-hook-form'

interface ForgetPasswordFormProps {
  toggleForgetPassword: () => void
}

const FIELD_NAME = {
  EMAIL: 'email'
}

const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({ toggleForgetPassword }) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: {
      isValid
    }
  } = useForm({ mode: 'all' });

  const onSubmit = () => {
    // TODO
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5 className="mb-6 font-bold text-center">{t("FORGET_PASSWORD")}</h5>

      <InputField
        {...register(FIELD_NAME.EMAIL, { required: true })}
        label={t("EMAIL")}
        placeholder={t("ENTER_YOUR_EMAIL")}
      />

      <Button
        type='submit'
        pill
        className='mt-4'
        disabled={!isValid}
      >
        {t("LOGIN_CHANGE_PASSWORD")}
      </Button>

      <div className='flex justify-center mt-5'>
        <div className='font-light text-xs'>
          {t("LOGIN_FORGET_PASSWORD_DESC")}
          {" "}
          <span
            onClick={toggleForgetPassword}
            className='underline text-violet-500 cursor-pointer'
          >
            {t("LOG_IN")}
          </span>
        </div>
      </div>
    </form>
  )
}

export default ForgetPasswordForm
