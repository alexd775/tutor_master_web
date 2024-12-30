import { useAuthStore } from '../stores/authStore';
import { env } from '../config/env';

export const downloadFile = async (fileId: string, fileName: string) => {
    const { accessToken } = useAuthStore.getState();

    try {
        const response = await fetch(`${env.apiUrl}/api/v1/files/${fileId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'GET',
            redirect: 'follow',
        });

        if (!response.ok) {
            throw new Error(`Download failed: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
        }, 100);
    } catch (error) {
        console.error('Error downloading file:', error);
        alert('Failed to download file. Please try again.');
    }
};