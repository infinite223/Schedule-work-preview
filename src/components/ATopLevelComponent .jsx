import NotificationsSystem, {atalhoTheme, useNotifications} from 'reapop'

export const ATopLevelComponent = () => {
    const {notifications, dismissNotification} = useNotifications()
    return (
        <div>
            <NotificationsSystem
                notifications={notifications}
                dismissNotification={(id) => dismissNotification(id)}
                theme={atalhoTheme}
            />
        </div>
    )
}