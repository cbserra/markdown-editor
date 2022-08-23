import axios, { AxiosResponse } from 'axios'
import { MarkdownDocument } from '../types/MarkdownTypes'

const API_ENDPOINT = 'https://markdown-db.herokuapp.com/docs'
axios.defaults.baseURL = API_ENDPOINT

export const getDocs = async (): Promise<AxiosResponse<MarkdownDocument[]>> => {
    const response = axios.get<MarkdownDocument[]>('/')
    console.log('🚀 ~ file: MarkdownApi.ts ~ getDocs ~ response', response)
    return response
}

export const updateDoc = async (doc: MarkdownDocument): Promise<AxiosResponse<MarkdownDocument>> => {
    const response = axios.put<MarkdownDocument>(`/${doc.id}`, doc)
    console.log('🚀 ~ file: MarkdownApi.ts ~ updateDoc ~ response', response)
    return response

    // return resp.data
}

export const saveDoc = async (doc: MarkdownDocument): Promise<AxiosResponse<MarkdownDocument>> => {
    const response = axios.post<MarkdownDocument>('/', doc)
    console.log('🚀 ~ file: MarkdownApi.ts ~ saveDoc ~ response', response)
    return response
}

export const deleteDoc = async (id: number): Promise<AxiosResponse<MarkdownDocument>> => {
    const response = axios.delete<MarkdownDocument>(`/${id}`)
    console.log('🚀 ~ file: MarkdownApi.ts ~ deleteDoc ~ response', response)
    return response
}
