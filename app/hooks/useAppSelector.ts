import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/app/redux/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
