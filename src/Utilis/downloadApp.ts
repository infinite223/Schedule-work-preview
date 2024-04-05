export const downloadApp = async () => {
    const apkFilePath = '/ScheduleWork v1.0.3.apk';

    const anchor = document.createElement('a');
    anchor.href = apkFilePath;
    anchor.download = 'ScheduleWork v1.0.3.apk';

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
}