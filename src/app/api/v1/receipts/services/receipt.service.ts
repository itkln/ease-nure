import {apiClient} from "@/app/api/v1/receipts/api/receipt/api";

interface IGetAll {
    timestamp: string
    receipt: IReceipt[]
}

interface IUpload {
    id: string
    filename: string
    filetype: string
    current_status: string
    timestamp: string
}

export type IReceipt = {
    id: string
    filename: string
    current_status: string
    filedata: ArrayBuffer
}

class ReceiptService {
    async getAll() {
        return apiClient.get<IGetAll>("/receipts")
    }

    async upload(formData: FormData) {
        return apiClient.post<any, any, FormData>('/receipts/upload', formData);
    }

}

export default new ReceiptService();