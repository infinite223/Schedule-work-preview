export const appConfig = {
    name: "Schedule Work",
    version: "0.1.6",
    commingFetures: 
        {
            createdAt: new Date(2024, 2, 25),
            patch: '0.1.7',
            features: [
                {
                    name: "Implementacja dodatkowych animacji.",
                    description: "Proste animacje zostaną zaimplementowane głównie w modalach ale i innych częściach aplikacji."
                },
            ]
        },
    releaseNotes: [
        {
            createdAt: new Date(2024, 2, 15),
            patch: '0.1.6',
            features: [
                {
                    name: "Nowa logika indeksowania dni",
                    description: "Dni są indeksowane do bazy w taki sposób aby były one rozumiane przez aplikacje mobilną."
                },
                {
                    name: "Performance upgrade",
                    description: "Dane grup zostały przeniesione do globalnego stanu w aplikacji, co zmniejszy częstotliwość ich pobierania."
                },
                {
                    name: "Dodatkowe zabezpieczenia z brakiem danych.",
                    description: "Zostały zaimplementowane zabezpieczenia weryfikujące przetwarzane dane dotyczące dni i użytkowników."
                },
            ]
        },
        {
            createdAt: new Date(2024, 2, 4),
            patch: '0.1.5',
            features: [
                {
                    name: "Potwierdzenie przy wyczyszczeniu grafiku.",
                    description: "Gdy aministrator usuwa grafik na dany miesiąc, musi on dodatkowo zatwierdzić czynność."
                },
                {
                    name: "Możliwość wybierania konkretnych godzin oraz minut",
                    description: "Każdy użytkownik może wpisać precyzyjnie godziny w danym dniu."
                },
                {
                    name: "Dostosowanie aplikacji pod przeglądarkę safari",
                    description: ""
                },
            ]
        },
        {
            createdAt: new Date(2024, 1, 8),
            patch: '0.1.4',
            features: [
                {
                    name: "Podliczanie godzin dla pracownika.",
                    description: "Użytkownik ma możliwość automatycznie podliczyć sobie godziny w aktualnym miesiącu."
                },
                {
                    name: "Edycja profilu.",
                    description: "Użytkownik ma możliwość edycji własnego profilu."
                },
                {
                    name: "Możliwość wyczyszczenia harmonogramu dla danego miesiąca.",
                    description: "Administrator ma możliwość wyczyszczenia całego miesiąca z wpsanych dni (reset)."
                },
                {
                    name: "Możliwość zablokowania użytkownika.",
                    description: "Administrator ma możliwość zablokowania wybranego użytkownika w danym dniu pracy."
                },
                {
                    name: "Dynamiczne podliczanie godzin na dany miesiąc.",
                    description: "Gdy użytkownik zmiania miesiące w kalendarzu, automatycznie aktualizuje się status ilości godzin."
                },
            ]
        },
        {
            createdAt: new Date(2024, 1, 3),
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
                    name: "Możliwość usunięcia konta",
                    description: "Użytkownik w ustawieniach może usunąć własne konto."
                },
                {
                    name: "Możliwość przypisywania do grupy",
                    description: "Administrator może przypisywać użytkowników do grupy za pomocą osobnego modala."
                },
                {
                    name: "Możliwość usuwania pracownika z grupy przez administratora",
                    description: "Administrator może łatwo usunąć użytkowników z grupy za pomocą osobnego odpowiedniego przycisku w zakładce grupy."
                },
                {
                    name: "Start dla nowego użytkownika",
                    description: "Gdy mowy użytkownik założy konto i nie jest przypisany do grupy wyświeli się stosowna informacja w osobnym oknie."
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
        },
        {
            createdAt: new Date(2024, 0, 10),
            patch: '0.1.1',
            features: [
                {
                    name: "Możliwość dołączania do dnia",
                    description: "Użytkownik ma możliwość dołączyć do wybranego wcześniej dnia,  wybierając godziny pracy."
                },
                {
                    name: "Wyświetlanie grup",
                    description: "Każdy użytkownik ma możliwość zobaczenia dostępnych grup w aplikacji."
                },
                {
                    name: "Możliwość podglądu innych grup",
                    description: "Każdy użytkownik ma możliwość przełączenia do innej grupy tak abby zobaczyć jej harmonogram pracy."
                },
                {
                    name: "Dostęp do ustawień aplikacji",
                    description: "Aplikacja zawiera w sobie ustawienia w których są dodatkowe opcje."
                },
                {
                    name: "Powiadomienia w aplikacji",
                    description: "Większość funkcjonalności aplikacji zawiera w sobie dodatkowo powiadomienia tak aby informować użytkownika o powodzeniu danej czynności."
                },
                {
                    name: "ładownaie listy użytkowników z grupy do dnia",
                    description: "Aby zaoszczędzić ilości pobieranych danych z bazy danych, użytkownicy nie są za wybraniem dnia pobierani na nowo tylko ładowani z pamięci."
                },
            ]
        },
        {
            createdAt: new Date(2023, 11, 30),
            patch: '0.1.0',
            features: [
                {
                    name: "Możliwość przemieszczania się pomiędzy miesiącami",
                    description: "Użytkownik ma możliwość zmiany wybranego miesiąca w kalendarzu."
                },
                {
                    name: "Możliwość wylogowywania",
                    description: "Użytkownik ma możliwość wylogować się z aplikacji."
                },
                {
                    name: "Logowanie i rejestracja użytkowników",
                    description: "Każdy użytkownik ma możliwość stworzenia sobie konta w aplikacji."
                },
                {
                    name: "Informacje na kalendarzu",
                    description: "Gdy użytkownik jest zapisany w dany dzień, jest to zaznaczone w kalendarzu za pomocą kropki o konkretnym kolorze."
                },
                {
                    name: "Dynamiczne ładowanie się kalendarza",
                    description: "Nasłuch do bazy jest zaimplememntowany na dany miesiąc."
                },
                {
                    name: "Strona starowa",
                    description: "Aplikacja posiada podstawową strone startową która ma za zadanie prezentować aplikacje."
                },
                {
                    name: "Nawigacja w apliakcja",
                    description: "Aplikacja posiada intuicyjną dolną nawigracje, która pozwala się przemieszczać pomiędzy grupami, grafikiem a ustawieniami."
                },
            ]
        }
    ]
        
    
}