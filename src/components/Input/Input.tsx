/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from './Input.style'
import { useSaveData } from 'hooks/useSaveData'
import { useLocalStorage } from 'hooks/useLocalStorage'

type Props = {
  id: string
  localStorageId?: string
  label: string
  placeholder: string
  index?: number
  size?: string
  listType?: string
  maxlength?: any
  saveType?: string
}

export const Input: React.FC<Props> = ({
  id,
  localStorageId,
  index,
  label,
  placeholder,
  size,
  listType,
  maxlength,
  saveType = 'UPDATE_DATA'
}) => {
  const { updateMonsterData } = useSaveData()
  const { saveOnLocalStorage, defaultValue } = useLocalStorage({
    id: localStorageId || id
  })

  return (
    <Container size={size}>
      <label>{label}</label>
      <input
        type="text"
        maxLength={maxlength}
        placeholder={placeholder}
        defaultValue={defaultValue && defaultValue}
        onKeyUp={event => {
          saveOnLocalStorage({
            value: (event.target as HTMLInputElement).value
          })
          updateMonsterData({
            type: saveType,
            listType,
            index,
            id,
            value: (event.target as HTMLInputElement).value
          })
        }}
      />
    </Container>
  )
}
