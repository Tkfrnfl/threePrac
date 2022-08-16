import { atom } from 'recoil';

const widthState:any = atom({
  key:'withState',
  default:0
})
const refState:any = atom({
  key:'refState',
  default:null
})

export {widthState,refState};