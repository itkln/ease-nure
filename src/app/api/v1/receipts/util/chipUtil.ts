export const setChipClassNames = (status: string) => {
    switch (status) {
        case 'Pending':
            return 'bg-pending border-yellow-600';
        case 'Approved':
            return 'bg-approved border-green-600';
        case 'Rejected':
            return 'bg-rejected border-rose-600';
        case 'Uploaded':
            return 'bg-uploaded border-orange-600';
        default:
            return 'bg-gray-200 border-gray-300 text-gray-700'; // Default or unknown status
    }
};