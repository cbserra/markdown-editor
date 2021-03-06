import axios, { AxiosResponse } from 'axios'
import { MarkdownDocument } from '../types/MarkdownTypes'

const API_ENDPOINT = 'https://markdown-db.herokuapp.com/docs'
axios.defaults.baseURL = API_ENDPOINT

export const getDocs = async (): Promise<AxiosResponse<MarkdownDocument[]>> => {
    const response = axios.get<MarkdownDocument[]>('/')
    console.log('🚀 ~ file: MarkdownApi.ts ~ line 9 ~ getDocs ~ response', response)
    return response
}

export const updateDoc = async (doc: MarkdownDocument): Promise<AxiosResponse<MarkdownDocument>> => {
    const response = axios.put<MarkdownDocument>(`/${doc.id}`, doc)
    console.log('🚀 ~ file: MarkdownApi.ts ~ line 15 ~ updateDoc ~ response', response)
    return response

    // return resp.data
}

export const saveDoc = async (doc: MarkdownDocument): Promise<AxiosResponse<MarkdownDocument>> => {
    const response = axios.post<MarkdownDocument>('/', doc)
    console.log('🚀 ~ file: MarkdownApi.ts ~ line 21 ~ saveDoc ~ response', response)
    return response
}

export const deleteDoc = async (id: number): Promise<AxiosResponse<MarkdownDocument>> => {
    const response = axios.delete<MarkdownDocument>(`/${id}`)
    console.log('🚀 ~ file: MarkdownApi.ts ~ line 29 ~ deleteDoc ~ response', response)
    return response
}
