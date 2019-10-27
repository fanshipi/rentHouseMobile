import {SAVE_COMMUNITY,GET_COMMUNITY} from './actionType'

export const saveCommunity = community => {
    return {
        type:SAVE_COMMUNITY,
        community
    }
}
export const getCommunity = () => {
    return {
        type:GET_COMMUNITY
    }
}