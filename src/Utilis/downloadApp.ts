export const downloadApp = async () => {
    const apkFilePath = '/scheduleWork.apk';

    const anchor = document.createElement('a');
    anchor.href = apkFilePath;
    anchor.download = 'scheduleWork.apk';

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
}