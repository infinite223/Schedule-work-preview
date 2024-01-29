export const appConfig = {
    name: "Schedule Work",
    version: "0.1.3",
    commingFetures: 
        {
            createdAt: new Date(2024, 1, 9),
            patch: '0.1.4',
            features: [
                {
                    name: "Możliwość usunięcia konta",
                    description: "Użytkownik w ustawieniach może usunąć własne konto."
                },
            ]
        },
    releaseNotes: [
        {
            createdAt: new Date(2024, 0, 25),
            patch: '0.1.3',
            features: [
                {
                    name: "Podgląd release notes",
                    description: "Użytkownik w ustawieniach może sprawdzić jakie zmiany są w najnowszej aktualizcji."
                },
                {
                    name: "Strona informacji o aplikacji",
                    description: "Strona przedstawiająca wszystkie najważniejsze informacje o apliakcji."
                },
                {
                    name: "Ograniczenia podglądu dni",
                    description: "Ilość wyświetlających kropek w dany dzień jest ograniczona do dwóch, tak aby wygląd kalendarza był niezmienny."
                },
                {
                    name: "Przedstawienie planowanych zmian",
                    description: "W zakładce release notes użytkonik może zobaczyć planowane zmiany w nadchodzącej aktualizacji."
                },
                {
                    name: "Możliwość przypisywania do grupy",
                    description: "Administrator może przypisywać użytkowników do grupy za pomocą osobnego modala."
                },
            ]
        },
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
                },
                {
                    name: "Stały nasłuch na zmiany w grafiku",
                    description: "W momencie gdy użytkownik zmienia coś w grafiku, każda osoba mająca w tej samej chwili włączoną aplikacje, widzi zmiany."
                },
                {
                    name: "Zapis wycofania obecności z dnia",
                    description: "Gdy użytkownik usunie swoją obecność z danego dnia, zostanie po nim ślad w tym dniu. (szare pole)"
                }
            ]
        }
    ]
        
    
}