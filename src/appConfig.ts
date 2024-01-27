export const appConfig = {
    name: "Schedule Work",
    version: "0.1.2",
    releaseNotes: [
        {
            createdAt: new Date(2024, 0, 25),
            patch: '0.1.2',
            features: [
                {
                    name: "Możliwość zmiany grupy",
                    description: "Użytkownicy i admin mogą zmieniać aktualnie wybraną grupę, w zależności do której grupy użytkownik jest przypisany, może on w niej dokonywać zmiany w grafiku."
                },
                {
                    name: "Ładowanie użytkwoników z wybranego dnia",
                    description: "Gdy użytkownik wybierze konkretny dzień z grafiku, wyświetli się jej lista pracowników w tym dniu."
                },
                {
                    name: "Możliwość usunięcia się z dnia",
                    description: "Jeżeli użytkownik jest zapisany w dany dzień może on się wypisać, jednak jego ślad wcześniejszego wpisania zostaje"
                },
                {
                    name: "Dynamiczna zmiana wybranego dnia",
                    description: "Domyślnie użytkownik wybrany ma aktualny dzień i aktualny miesiąc, zmieniając miesiąc automatycznie ustawia się pierwszy dzień wybranego miesiąca."
                },
                {
                    name: "Dostosowanie wyglądu aplikacji do mniejszego urządzenia",
                    description: "Wygląd apliakcji jest proporcjonalnie dostosowany do różnych urządzeń, tak aby interfejs był czytelny."
                },
                {
                    name: "Zabezpieczenie nieznanych scieżek",
                    description: "Gdy użytkownik wpiszę nieznaną scieżkę, automatyczmie zostanie przekierowany na strone główną."
                },
                {
                    name: "Ilość osób w grupie",
                    description: "Każda grupa posiada osobny podgląd do ilości osób w grupie."
                },
                {
                    name: "Dodatkowe powiadomienia",
                    description: "Gdy użytkownik zapisze się do dnia, wyskoczy powiadomienie o udanym lub nieudanym zapisie."
                }
            ]
        }
    ]
        
    
}