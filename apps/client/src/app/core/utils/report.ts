export class ReportUtil {
    static convertResourceToBlob(resource, fileType: string, fileName: string) {
        const blob = new Blob([resource], {
            type: fileType,
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);

        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }, 100);
    }
}
