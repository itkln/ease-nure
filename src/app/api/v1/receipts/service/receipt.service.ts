import {receiptClient} from "@/app/api/v1/receipts/api/receipt/api";
import {llmClient} from "@/app/api/v1/receipts/api/llm/api";

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
        return llmClient.get<IGetById>(`/receipts/${id}`);
    }

    async approve(id: string, receiptInfo: ReceiptInfo) {
        return receiptClient.post<any, any, ReceiptInfo>(`/receipts/${id}/approve`, receiptInfo);
    }

    async reject(id: string) {
        return receiptClient.post<any, any, any>(`/receipts/${id}/reject`);
    }
}

export default new ReceiptService();