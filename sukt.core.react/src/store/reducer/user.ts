import { USER_MENU } from '@/store/actionType';
const initState = {
  menu: localStorage.getItem("menu") ?
    JSON.parse(localStorage.getItem("menu")!) :
    []
}
export default function user<T>(state = initState, action: { type: string; data: T }) {
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
