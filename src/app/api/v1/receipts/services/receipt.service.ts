import {gptClient, receiptClient} from "@/app/api/v1/receipts/api/receipt/api";

interface IGetAll {
    timestamp: string
    receipt: ReceiptFile[]
}

interface IGetById {
    receipt: ReceiptInfo
}

class ReceiptService {
    async getAll() {
        return receiptClient.get<IGetAll>("/receipts")
    }

    async upload(formData: FormData) {
        return receiptClient.post<any, any, FormData>('/receipts', formData);
    }

    async getById(id: string) {
        return gptClient.get<IGetById>(`/receipts/${id}`);
    }

    async approve(id: string, receiptInfo: ReceiptInfo) {
        return receiptClient.post<any, any, ReceiptInfo>(`/receipts/${id}/approve`, receiptInfo);
    }
}

export default new ReceiptService();