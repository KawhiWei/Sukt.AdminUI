import { USER_MENU } from '@/store/actionType';
export default function user(state: any = null, action: { type: string; data: any }) {
  switch (action.type) {
    case USER_MENU:
      return {
        ...state,
        "menu": action.data
      }
    default:
      return state
  }
}